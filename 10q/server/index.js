require("dotenv").config();
const express = require("express");

const { PORT, CONNECTION_STRING, SECRET } = process.env;

//  MIDDLEWARE DEP
const { json } = require("body-parser");
const session = require("express-session");
const cors = require("cors");

// DATABASE DEP
const massive = require("massive");
const userCtrl = require("./Controllers/user/userCtrl");

//INITIALIZE APP
const app = express();

//SOCKET.IO
const http = require("http").Server(app);
const io = require("socket.io")(http);
let playerCount = 0;
let playerList = [];
let difficulty = 1;

//MASSIVE CONNECTION TO DB
massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(console.log);

//BASIC MIDDLEWARES
app.use(json());
app.use(cors());

io.on("connection", socket => {
  //client joined
  socket.on("user connected", username => {
    playerCount++;
    socket.username = username;
    playerList.push(username);
    io.emit("new user", playerCount);
  });

  //onClick of button in front-end activate this.socket.emit("next question")
  socket.on("next question", () => {
    app
      .get("db")
      .get_questions([difficulty])
      .then(question => {
        io.emit("new question", {
          isQuestion: true,
          question
        });
      })
      .catch(console.log);

    if (difficulty < 10) {
      difficulty++;
      setTimeout(() => {
        io.emit("new answer", {
          isQuestion: false,
          isAnswer: true
        });
      }, 10000);
    } else {
      setTimeout(() => {
        difficulty = 1;
        io.emit("new answer", {
          isQuestion: false,
          isAnswer: true
        });
      }, 10000);
    }
  });

  socket.on("send message", message => {
    io.emit("receive message", message);
  });

  //client disconnected
  socket.on("disconnect", () => {
    playerCount--;
    playerList = playerList.filter(user => user !== socket.username);
    io.emit("new user", playerCount);
  });
});

app.post("/api/register", userCtrl.addUser);
app.post("/api/login", userCtrl.getUser);
app.put("/api/profile/update", userCtrl.updateUser);

http.listen(PORT || 3001, () => {
  console.log(`Listening on port: ${PORT}`);
});
