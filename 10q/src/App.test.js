import { saveNewQuestion, changeToEndOfGame } from "./ducks/quizReducer";
import * as quizReducer from "./ducks/quizReducer";
import {
  gameIsStarting,
  winnerList
} from "../src/Components/Dashboard/Dashboard";
import { first_name } from "../src/Components/Login/Login";
import {
  userChoice,
  hidden
} from "../src/Components/SubComponents/Answer/Answer";

test("should change the game to true", () => {
  expect(changeToEndOfGame()).toBeTruthy();
});

test("should bring in new question and set isAnswer false and isQuestion true", () => {
  const questionSwitch = true;
  const answerSwitch = false;
  const question = {
    question_id: 1,
    difficulty: 1,
    question: "What is Stevens favorite accessory?",
    first_answer: "Backwards hat",
    second_answer: "Monocle",
    third_answer: "Tory Burch Purse",
    correct_answer: "Backwards hat"
  };
  expect(saveNewQuestion(questionSwitch, answerSwitch, question));
});

// Josh

describe("changeToWrong functions as expected", function() {
  test("should create an action", function() {
    expect(quizReducer.changeToWrong()).toBeTruthy();
  });

  test("should create an action that sets wrong to true", function() {
    const expectedAction = {
      type: "CHANGE_WRONG",
      payload: true
    };
    expect(quizReducer.changeToWrong()).toEqual(expectedAction);
  });

  test("should create an action that matches expected action", function() {
    const expectedAction = {
      type: "CHANGE_WRONG",
      payload: true
    };
    expect(quizReducer.changeToWrong()).toEqual(expectedAction);
  });

  test("should create an action that matches type", function() {
    const expectedType = { type: "CHANGE_WRONG" };
    expect(quizReducer.changeToWrong()).toMatchObject(expectedType);
  });

  test("should create an action that matches payload", function() {
    const expectedPayload = { payload: true };
    expect(quizReducer.changeToWrong()).toMatchObject(expectedPayload);
  });
});

//Michael

it("gameIsStarting initial value is set to false", () => {
  expect(gameIsStarting).toBeFalsy();
});

it("winnerList initial value is set to false", () => {
  expect(winnerList).toBeFalsy();
});

it("first name set to first name ", () => {
  expect(first_name).toBe(first_name);
});

it("userChoice initial value is set to false", () => {
  expect(userChoice).toBeFalsy();
});

it("hidden initial value is set to false", () => {
  expect(hidden).toBeFalsy();
});
