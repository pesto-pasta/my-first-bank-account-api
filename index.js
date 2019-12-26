const express = require('express');
const fs = require('fs');
const session = require('express-session');
const handleBars = require('express-handlebars');
const Handlebars = require('handlebars');
const DBQuery = require('./DBQuery.js');
const currency = require('currency.js');
const app = express();



//listen on 3001
app.listen(3001, () => console.log("Listening on port 3001..."));

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


//globals
const pendingData = {};


//anonymous functions area
function refreshSessionData(user) {
    return new Promise((resolve, reject) => {
        DBQuery.getUser(user.last, user.password)
            .then((result) => {
                console.log();
                user = result[0];
                resolve(user);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
    })

}

function registerPartial(partialType, name) {
    let file = __dirname + "/views/subviews/" + name + ".handlebars";
    fs.readFile(file, 'utf-8', (error, result) => {
        if (error) {
            console.log(error);
        } else {
            Handlebars.registerPartial(partialType, result);
        }
    })
}

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

function passAccountLinkText(user) {
    return (user) ?
        { accountLink: '<li><a href="/account/home">MyAccount</a></li> <li><a href="/logout">Log Out</a></li>' } :
        { accountLink: '<li><a href="/login">Log In</a></li>' };
}


//ROUTES
app.get('/', (req, res) => {
    let message = "";
    if (req.query.logout) {
        message = "Come again soon";
    } else if (req.query.error === "serverrlogout") {
        message = "An error has occurred and you have been securely logged out. Please try again later"
    }
    res.render("index.handlebars", {
        accountLinks: passAccountLinkText(req.session.user),
        message: message,
    });
});

app.get('/userInfo/:last/:pass', (req, res) => {
    DBQuery.getUser(req.params.last, req.params.pass)
        .then((result) => {
            res.send(JSON.stringify(result[0]));
        })
        .catch((error) => {
            res.status(404);
            res.send("The user with the given credentials was not found...");
        })
                
    });

app.post('/deposit/:account/:amount', (req, res) => {
    let oldBalance;
    DBQuery.getBalance(req.params.account)
        .then((result) => {
            oldBalance = result;
            result += parseInt(req.params.amount);
            return DBQuery.updateUser('balance', req.params.account, result);
        })
        .then((result) => {
            console.log("The balance change request has been made");
            return DBQuery.getBalance(req.params.account);  //eventually returns balance as a number.
        })
        .then((result) => {
            console.log("The balance change has been posted to your account");
            res.send("The new balance was posted to your account. \n Old balance:" + oldBalance + ".\n New balance: " + result + ".");
        })        
        .catch((error) => {
            res.send("There was an error posting the new balance to your account.");
        })
});

app.post('/withdrawl/:account/:amount', (req, res) => {
    let withdrawl = req.params.amount * -1;
    res.redirect(307, '/deposit/' + req.params.account + '/' + withdrawl);
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
        
        .catch((reject) => {
            console.log(reject);
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
            const currentUser = req.session.user = result[0];
            console.log("user assigned to session. Logged in successfully.");
            res.redirect('/account/home');
            return;
        })
        .catch((reject) => {

            //direct to login with query error. Credentails bad.
            console.log("user login attempt failed. Check DB messages for exact cause..");
            res.redirect('/login?error=credentials');
            return;
        })
})

app.get('/account/:page', authorize, (req, res) => {
    refreshSessionData(req.session.user)
        .then((result) => {
            req.session.user = result;
            registerPartial("sub_page", req.params.page);
            req.session.user.balance = currency(req.session.user.balance, { formatWithSymbol: true }).format();
            


            res.render("account.handlebars", {
                user: req.session.user,
                accountLinks: passAccountLinkText(req.session.user),
                message: message,
                pendingBalance: pendingData.balance

            });
        })
        .catch((error) => {
            console.log(error);
            delete req.session.user;
            res.redirect('/?error=serverrlogout');
        })

    let message = undefined;
    if (req.query.message === "passchanged") {
        message = "Your password was successfully changed"
    } else if (req.query.message === "credentials") {
        message = "There was an error with credentials you entered"
    } else if (req.query.message === "balance") {
        message = "Your balance was successfully changed"
    } else if (req.query.message === "procerror") {
        message = "There was an error processing your request"
    }


})

app.get('/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/?logout=y');
})

app.post('/changepass', authorize, (req, res) => {
    //check that the new passwords match fail? redirect to account/changepass?error="dontmatch"

    //check database that password matches existing password fail? redirect to account/changepass?error="invalidpass"
    //write the new password to the database
    //redirect to account/home

    //check validity of the old password
    DBQuery.checkPass(req.session.user.account, req.body.currentPass)

        //then write the new pass to the db
        .then((result) => {
            console.log("Found a user..")
            return DBQuery.updateUser('password', req.session.user.account, req.body.newPass);
        })

        .then((result) => {
            console.log("password change request successfull")
            return DBQuery.checkPass(req.session.user.account, req.body.newPass);
        })

        .then((result) => {
            console.log("Password was successfully changed.");
            req.session.user.password = result[0].password;
            res.redirect('/account/home?message=passchanged')
        })
        .catch((reject) => {
            console.log(reject, "somthing went wrong... ");
            res.redirect('/account/changepass?message=credentials');
        })
})

app.post('/changebal', authorize, (req, res) => {
    if (!req.query.confirm) {
        pendingData.balance = req.body.newBalance; //set pending balance to the user.
        console.log();
        registerPartial('popup', 'confirmbalance');
        res.redirect('/account/changebalance');
    } else {

        //req.query.confirm must exist..
        delete req.query.confirm;
        //query database and set balance = req.session.user.pendingBalance
        DBQuery.updateUser('balance', req.session.user.account, pendingData.balance)
            .then((result) => {
                console.log('balance successfully changed for' + req.session.user.account, req.session.user.first);
                delete pendingData.balance;
                res.redirect('/account/home?message=balance');
            })
            .catch((error) => {
                console.log('There was an error updating the balance. Check DB logs.')
                res.redirect('/account/home?message=procerror');
            })
    }

})
