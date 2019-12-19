const express = require('express');
const session = require('express-session');
const handleBars = require('express-handlebars');
const DBQuery = require('./DBQuery.js');
const app = express();





//listen on 3000
app.listen(3000, () => console.log("Listening on port 3000..."));


//define customHandlebars
const customHandlebars = handleBars.create({
    helpers: {
        "switch": function (value, options) {
            this.switch_value = value;
            return options.fn(this);
        },
        "case": function (value, options) {
            if (value == this.switch_value) {
                return options.fn(this);
            }
        },
        "exists": function (variable, options) {
            if (typeof variable !== 'undefined') {
                return options.fn(this);
            }
        },
    }

})

//configure express
app.use(express.static("static"));
app.engine('handlebars', customHandlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "87654dddkl", resave: true, saveUninitialized: true }));


//global variables and functions area

// function createUser(parentListArray, first, last, password, balance, address, ) {
//     const newUser = {
//         accountNumber: accountNumberCounter,
//         cash: balance,
//         firstName: first,
//         lastName: last,
//         password: password,
//         address: address,
//         interestRate: 0.004,
//     }
//     return newUser;
// };

function verifyDigitsLessThan(target, number) {
    let count = 1;
    while (number > 10) {
        number /= 10;
        count++
    }
    return count <= target;
}

function authorize(req, res, next) {
    if (!req.session.user) {
        res.redirect('/login?error=notauthorized');
        return;
    }
    next();

}   

function passAccountLinkText (user) {
    return (user) ? 
    { accountLink:  '<li><a href="/account">MyAccount</a></li> <li><a href="/logout">Log Out</a></li>'} :
    { accountLink: '<li><a href="/login">Log In</a></li>'};
}


//routes
app.get('/', (req, res) => {
    
    let logoutMessage = req.query.logout ? "Come again soon." : undefined;
    res.render("index.handlebars", {
        accountLinks: passAccountLinkText(req.session.user),
        message: logoutMessage,
    });
});

app.get('/userInfo', (req, res) => {
    res.send(users);
})

app.get('/userInfo/:user', (req, res) => {
    const user = users.find((user) => user.firstName === req.params.user);
    if (!user) {
        res.status(404);
        res.send("The user with the given name was not found...");
    }
    res.send(user);
});

app.post('/deposit/:first/:last/:amount', (req, res) => {
    const user = users.find((user) => user.firstName === req.params.first);
    if (!user) {
        res.status(404);
        res.send("The user with the given name was not found...");
        return;
    }
    user.cash += parseInt(req.params.amount);
    res.send("The amount you requested, " + req.params.amount + " has been posted to " + user.firstName + "'s account. \n The new account balance is $" + user.cash + ".");

});

app.get('/balance/:first', (req, res) => {
    const user = users.find((user) => user.firstName === req.params.first);
    if (!user) {
        res.status(404);
        res.send("The user with the given name was not found...");
        return;
    }
    res.send(user.firstName + "'s balance is $" + user.cash);
});

app.get('/open_account', (req, res) => {
    let errorMessage = "";
    if (req.query.error) {
        if (req.query.error == "invalidInfo") {
            errorMessage = "Some or all of the required fields were improperly filled in";
        }
    }
    res.render("open_account.handlebars", {
        errorMessage: errorMessage,
        accountLinks: passAccountLinkText(req.session.user)
    });
});

app.post('/open_account', (req, res) => {

    //reject unclean incoming data
    let clean = true;
        clean = (
            req.body.first.length !== 0 && 
            req.body.last.length !== 0 && 
            req.body.password.length !== 0 && 
            req.body.address.length !== 0 && 
            req.body.balance !== 0 &&
            req.body.first.length <= 20 && 
            req.body.last.length <= 20 && 
            req.body.password.length <= 20 && 
            req.body.address.length <= 50 &&
            verifyDigitsLessThan(11, req.body.balance)
        );

    if (!clean) {
        res.redirect('/open_account?error=invalidInfo');
        return;
    }

    //make sure user doesnt already exist and then write to database
    DBQuery.searchForUser(req.body.first, req.body.last)
        .then((result) => {
            if (result !== null) {
                console.log("Found results!: ", result)
                return DBQuery.newUser(req.body.first, req.body.last, req.body.password, req.body.balance, req.body.address);
            }
        })
        .then((result) => {
            console.log(result, "User written to database...");
            req.session.user = result;
        })
         //do some shit with results
        .catch((reject) => {
            console.log("Error at index 158.", reject);
        })


        res.redirect('/login');
        return;
});


app.get('/login', (req, res) => {
   
    if (req.session.user) {
        res.redirect('/account');
        return;
    }

    let errorMessage = "";
    if (req.query.error) {
        errorMessage = "Sorry, Bad Login Credentials";
    }

    res.render("login.handlebars", {
        errorMessage: errorMessage
    });
});

app.post('/login', (req, res) => {

    //check credentials
    DBQuery.getUser(req.body.last, req.body.password)
        .then((result) => {

            //direct to account if credentials match up. Assign to req.session. 
            const currentUser = 

            req.session.user = result[0];
            console.log("user assigned to session. Logged in successfully.");
            res.redirect('/account');
            return;
        })
        .catch((reject) => {

            //direct to login with query error. Credentails bad.
            console.log("user login attempt failed. Check DB messages for exact cause..");
            res.redirect('/login?error=credentials');
            return;
        })
})

app.get('/account', authorize, (req, res) => {
    res.render("account.handlebars", {
        user: req.session.user,
        accountLinks: passAccountLinkText(req.session.user)
    });
})

app.get('/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/?logout=y');
})