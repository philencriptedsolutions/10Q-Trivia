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
let playerCount = 0;
let difficulty = 1;

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

io.on("connection", socket => {
  //client joined
  playerCount++;
  console.log("Client connected: ", socket);

  //onClick of button in front-end activate this.socket.emit("next question")
  socket.on("next question", () => {
    app
      .get("db")
      .get_questions([difficulty])
      .then(questions => {
        io.emit("new question", {
          isQuestion: true,
          isAnswer: false,
          response: questions
        });
      })
      .catch(console.log);

    if (difficulty < 10) {
      difficulty++;
      console.log(difficulty);
    } else {
      console.log("THIS IS THE END");
    }

    setTimeout(() => {
      io.emit("new answer", { isQuestion: false, isAnswer: true });
    }, 10000);
  });

 

  //client disconnected
  socket.on("disconnect", () => console.log("Client disconnected"));
});

app.get("/api/register", (req, res) => {
  const { first_name, last_name, email, img, balance, uid } = req.body;
  app
    .get("db")
    .add_user([first_name, last_name, email, img, balance, uid])
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json(err));
});

http.listen(PORT || 3001, () => {
  console.log(`Listening on port: ${PORT}`);
});
