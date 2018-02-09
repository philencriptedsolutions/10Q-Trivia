require('dotenv').config();
const express = require('express');

//  MIDDLEWARE DEP
const { json } = require('body-parser');
const session = require('express-session');
const cors = require('cors');

// DATABASE DEP
const massive = require('massive');
const mainCtrl = require('./mainCtrl');

//INITIALIZE APP
const app = express();


// CONSTS FOR FUNCTIONS
const{  }= require('./mainCtrl')

const port = process.env.SERVER_PORT || 3001;
const connectionString = process.env.CONNECTION_STRING;

//MASSIVE CONNECTION TO DB
massive(process.env.CONNECTION_STRING)
.then(db => {
   app.set( 'db', db )
})
.catch(console.log);
console.log('HIT');

//BASIC MIDDLEWARES 
app.use(json());
app.use(cors());

// app.use(
//    session({
//        secret: process.env.SECRET,
//        saveUninitialized: false,
//        resave: false,
//        cookie: {
//            maxAge: 1000
//        }
//    })
// );

app.get('/api/test', (req,res,next) => {
   app
       .get('db')
       .person.find({})
       .then(response => {
           res.json(response);
       });
});

app.listen(port, () => {
   console.log(`Listening on port: ${port}`);
});