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
let currentQuestion = [];
let answerOne = 0;
let answerTwo = 0;
let answerThree = 0;
let videoNum = 0;

//MASSIVE CONNECTION TO DB
massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(console.log);

//BASIC MIDDLEWARES
app.use(json());
app.use(cors());
app.use(express.static(`${__dirname}/../build`));

io.on("connection", socket => {
  playerCount++;
  io.emit("new user", playerCount);
  //client joined
  socket.on("user connected", user => {
    socket.username = user.first_name;
    playerList.push({
      id: user.id,
      user: user.first_name,
      img: user.img
    });
  });

  //onClick of button in front-end activate this.socket.emit("next question")
  socket.on("next question", () => {
    app
      .get("db")
      .get_questions([difficulty])
      .then(question => {
        currentQuestion.push(question);
        console.log(currentQuestion);
        io.emit("new question", {
          isQuestion: true,
          isAnswer: false,
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

  socket.on("user choice", choice => {
    if (choice === currentQuestion[0][0].first_answer) {
      answerOne++;
    } else if (choice === currentQuestion[0][0].second_answer) {
      answerTwo++;
    } else if (choice === currentQuestion[0][0].third_answer) {
      answerThree++;
    }
  });

  socket.on("picked choices", () => {
    io.emit("display choices", {
      answerOne,
      answerTwo,
      answerThree
    });
    setTimeout(() => {
      currentQuestion.splice(0, 1);
      answerOne = 0;
      answerTwo = 0;
      answerThree = 0;
    }, 5000);
  });

  socket.on("user loser", user => {
    let i = playerList.indexOf(user === playerList.id);
    playerList.splice(i, 1);
    // playerList = playerList.filter(winner => user !== winner.id);
  });
  //----
  socket.on("start video", () => {
    console.log(videoNum);
    io.emit("next video", videoNum);
    videoNum += 1;
    console.log(videoNum);
  });
  //----
  socket.on("complete game", complete => {
    io.emit("display complete", complete);
    io.emit("winners", playerList);
    // console.log(playerList);
  });

  socket.on("send message", message => {
    io.emit("receive message", message);
  });

  //client disconnected
  socket.on("disconnect", () => {
    playerCount--;
    io.emit("new user", playerCount);
  });
});

app.post("/api/register", userCtrl.addUser);
app.post("/api/login", userCtrl.getUser);
app.put("/api/profile/update", userCtrl.updateUser);

http.listen(PORT || 3001, () => {
  console.log(`Listening on port: ${PORT}`);
});
