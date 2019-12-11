const express = require('express');
const app = express();

app.listen(3000, () => console.log("Listening on port 3000..."));

//global variables area
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


app.get('/', (req, res) => {
    res.send("Hello World! ! ! ");
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
    res.send("The amount you requested, " + req.params.amount + " has been posted to " + user.firstName + "'s account. <br> The new account balance is $" + user.cash + ".");

});

app.get('/balance/:first', (req, res) => {
    const user = users.find((user) => user.firstName === req.params.first);
    if (!user) {    
        res.status(404);
        res.send("The user with the given name was not found...");
        return;
    }
    res.send(user.firstName + "'s balance is $" + user.cash );
})

