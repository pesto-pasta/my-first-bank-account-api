const express = require('express');
const session = require('express-session');
const handleBars = require('express-handlebars');
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
const users = [
    {
        cash: 0.00,
        firstName: "Tyler",
        lastName: "Sayvetz",
        address: "1015 west nickerson",
        ssn: 098765456,
        interestRate: 0.004,
    },
    {
        cash: 0.00,
        firstName: "Jordan",
        lastName: "Soltman",
        adress: "vashon island",
        ssn: 234567733,
        interestRate: 0.004,
    }
];

let accountNumberCounter = 34830339467;
function createUser(parentListArray, first, last, ssn, balance, address) {
   const newUser = {
        accountNumber: accountNumberCounter,
        cash: balance,
        firstName: first,
        lastName: last,
        address: address,
        ssn: ssn,
        interestRate: 0.004,
    }
    return newUser;
};

//routes
app.get('/', (req, res) => {
    res.render("index.handlebars");
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
            errorMessage = "Please fill in the required fields prior to opening a coconut";
        }
    }
    res.render("open_account.handlebars", {
        errorMessage: errorMessage,
    });
});

app.post('/open_account', (req, res) => {
    //do some shit with dat info yo
    if (!(req.body.first && req.body.last && req.body.ssn && req.body.address && req.body.balance)) {
        res.redirect('/open_account?error=invalidInfo');
        return;
    }
    
    users.push(createUser(users, req.body.first, req.body.last, req.body.snn, req.body.balance, req.body.address));
    const activeUser = users.find((user) => user.accountNumber === accountNumberCounter);
    accountNumberCounter++;
    res.render('account.handlebars', {
        user: activeUser,
    })

});


app.get('/account', (req, res) => {
    res.render("account.handlebars");
});
