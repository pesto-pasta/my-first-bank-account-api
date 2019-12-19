const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'roadrat',
    database: 'store'
});

connection.connect();

connection.query('USE store', (error, results, fields) => {
    if (error) console.log("this is an error selecting the table");
    if (results) console.log("Table selected successfully ");
});

function searchForUser(first, last) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE first = ? AND last = ?', [first, last], function (error, results, fields) {
            if (error) {
                console.log("error finding user with first and last in database.");
                reject(error);
            }
            if (results) {
                if (results.length === 0) {
                    console.log("No users found, no error.");
                    resolve(results);
                } else {
                    console.log("See results for user(s) with those params. User conflict: Cant create account.");
                    resolve(results);
                }
            }
        });
    })

};

function newUser(first, last, password, balance, address) {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO user (first, last, password, balance, address) VALUES (?, ?, ?, ?, ?)', [first, last, password, balance, address], function (error, results) {
            if (error) {
                console.log(error, "Error writing to database");
                reject(error);
            } else {
                console.log("success..", results);
                resolve({
                    first: first,
                    last: last,
                    password: password,
                    balance: balance,
                    address: address
                });
            }
        })

    })
};

function getUser(last, password) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE last = ? AND password = ?', [last, password], (error, results) => {
            if (error) {
                console.log(error, "Error finding user");
                reject(error);
            } else if (results.length === 0) {
                console.log("FROM DB: Found zero users with those credentials", results);
                reject(results);
            } else if (results.length > 1) {
                console.log("FROM DB: Internal error, too many entries with those credentials");
                reject(results);
            } else {
                console.log("FROM DB: found exactly one user with those credentials");
                resolve(results);
            }
        })
    })
}


exports.searchForUser = searchForUser;
exports.newUser = newUser;
exports.getUser = getUser;
