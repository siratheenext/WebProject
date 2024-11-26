const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3030;
const router = express.Router();
const mysql = require('mysql2');

require('dotenv').config();

app.use(router);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(`${__dirname}/css`)));
app.use(express.static(path.join(__dirname, 'html')));

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.query('SELECT * FROM login', (err, results) => {
    if (err) {
      console.error('Database error:', err);
    } else {
      console.log('Connect database successfully!');
    }
});

app.get('/', (req, res) => {
    console.log('Request at /');
    res.sendFile(path.join(`${__dirname}/html/LoginPage.html`));
});

app.post('/form-submit', (req, res) => {
    const username = req.body.username;
    const password = req.body.pswd;
    const loginDate = Date()
    console.log('Request at /form-submit');
    console.log(`Form submitted with ${username} at ${loginDate.toString()}`);
    const query = 'SELECT * FROM login WHERE username = ? AND pw = ?';

    connection.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.sendStatus(404);
        }
        else {
            if (results.length > 0) { 
                console.log(`This username and password in database`);
                console.log(`Login Successful by ${username}`); 
                res.sendFile(path.join(`${__dirname}/html/admin.html`));
            } else {
                console.log('This username and password not found in database'); 
                console.log(`Invalid username : ${username} or password : ${password}`); 
                //res.sendFile(path.join(`${__dirname}/html/notfound.html`));
                res.send('Invalid username or password');

            }
        }
    });
});

app.listen(port, () => { 
    console.log(`Server listening on port: ${port}`); 
});

// app.post('/form-submit', (req, res) => {
//     const username = req.body.username;
//     const password = req.body.pswd;

//     const query = 'SELECT * FROM login WHERE username = ? AND pw = ?'
//     connection.execute(query, [username, password], (err, result) => {
//         if (err) {
//             console.error('Error executing query:', err);
//             res.sendStatus(404).send('Database error');
//         }
        
//         if(result.length > 0){
//             const checkUsername = 'INSERT INTO login (username,pw) VALUES (?, ?)';
//             connection.execute(checkUsername, [username,password], (err, checkResult) => {
//                 if (err) {
//                     return res.sendStatus(404).send('Error Login');
//                 }
//                 res.sendFile(path.join(`${__dirname}/html/found.html`));
//                 res.send('Login Successful');
//             });
//         }
//         else{
//             console.log(`Not found ${username} or ${password} in database`);
//             res.send('Invalid username or password');
//         }
//     });
// });

// app.get('/form-submit', (req, res) =>{
//     console.log('req select form');
//     let sql = `select * from login ;`
//     connection.query(sql, function(err, result){
//         if(err){
//             throw error;
//         }
//         res.json(result)
//     });
// });
  
/*
app.post('/form-submit', (req, res) => {
    const username = req.body.username;
    console.log('Request at /form-submit');
    console.log(`Form submitted with Admin : ${username}`);

    connection.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.sendStatus(404);
        }
        else {
            if (results.length > 0) { 
                console.log(`${results.length} rows returned`); 
                console.log(`Found ${username}`); 
                res.sendFile(path.join(`${__dirname}/html/found.html`)); 
            } else {
                console.log('0 rows returned'); 
                console.log('Not found'); 
                //res.sendFile(path.join(`${__dirname}/html/notfound.html`)); 
                res.redirect('/error');
            }
        }
    });
});
*/