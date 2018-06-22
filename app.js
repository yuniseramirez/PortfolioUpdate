const express = require('express');
const app = express();
const port = 9000;
const { Pool, Client } = require('pg');
const parser = require('body-parser');
app.use(parser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1001',
    port: 8080,
});

let newObj = {};

// ROUTE FOR THE POST LINK
app.get('/', (req1, res1) => {
    res1.render('index');
});

// ROUTE FOR THE MESSAGES
app.get('/messages', (req, res) => {
  pool.query('SELECT * FROM blog', (req2, res2) => {

    newObj = res2.rows;

    res.render('messages', {
      data: newObj
    });
  });
});

// GETTING INFORMATION AND INSERTING IT INTO THE DATABASE
app.post('/post', (req, res) => {

  var inserQuery = {
    text: 'INSERT INTO blog(subject, message) VALUES($1, $2)',
    values: [req.body.subject, req.body.message]
  }

  pool.query(inserQuery, (req, res) => {
    console.log('Data inserted to database');
  });

  res.redirect('/');

});


// THE PORT IS LISTENING AND IS BEING LOG INTO THE TERMINAL
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});