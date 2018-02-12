require("dotenv").config();
const express = require("express");

const { PORT, CONNECTION_STRING, SECRET } = process.env;

//  MIDDLEWARE DEP
const { json } = require("body-parser");
const session = require("express-session");
const cors = require("cors");

// DATABASE DEP
const massive = require("massive");
// const mainCtrl = require("./mainCtrl");

//INITIALIZE APP
const app = express();

//SOCKET.IO
// const socket = require("socket.io");
const http = require("http").Server(app);
const io = require("socket.io")(http);
let socketCount = 0;
// CONSTS FOR FUNCTIONS
// const {} = require("./mainCtrl");

//MASSIVE CONNECTION TO DB
massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(console.log);
// console.log("HIT");

//BASIC MIDDLEWARES
app.use(json());
app.use(cors());

// app.use(
//    session({
//        secret: SECRET,
//        saveUninitialized: false,
//        resave: false,
//        cookie: {
//            maxAge: 1000
//        }
//    })
// );

io.on("connection", socket => {
  socketCount++;
  console.log("Client connected: ", socket);
  socket.on("disconnect", () => console.log("Client disconnected"));
});

app.get("/api/test", (req, res, next) => {
  app
    .get("db")
    .person.find({})
    .then(response => {
      res.json(response);
    });
});

http.listen(PORT || 3001, () => {
  console.log(`Listening on port: ${PORT}`);
});
