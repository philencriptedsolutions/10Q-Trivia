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

// Jin

it("should change the game to true", () => {
  expect(quizReducer.changeToEndOfGame()).toBeTruthy();
});

describe("saveNewQuestion function runs as expected", () => {
  it("should bring in new question and set isAnswer false and isQuestion true", () => {
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
    const expectedAction = {
      type: "NEW_QUESTION",
      payload: {
        isQuestion: true,
        isAnswer: false,
        question: {
          question_id: 1,
          difficulty: 1,
          question: "What is Stevens favorite accessory?",
          first_answer: "Backwards hat",
          second_answer: "Monocle",
          third_answer: "Tory Burch Purse",
          correct_answer: "Backwards hat"
        }
      }
    };
    expect(
      quizReducer.saveNewQuestion(questionSwitch, answerSwitch, question)
    ).toEqual(expectedAction);
  });

  it("should create an action that matches type", () => {
    const expectedType = { type: "NEW_QUESTION" };
    expect(quizReducer.saveNewQuestion()).toMatchObject(expectedType);
  });

  it("should create an action that matches payload", () => {
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
    const expectedPayload = {
      payload: {
        isQuestion: true,
        isAnswer: false,
        question: {
          question_id: 1,
          difficulty: 1,
          question: "What is Stevens favorite accessory?",
          first_answer: "Backwards hat",
          second_answer: "Monocle",
          third_answer: "Tory Burch Purse",
          correct_answer: "Backwards hat"
        }
      }
    };
    expect(
      quizReducer.saveNewQuestion(questionSwitch, answerSwitch, question)
    ).toMatchObject(expectedPayload);
  });
});

it("Should change isQuestion and isAnswer states according to the object brought in", () => {
  const choice = {
    isQuestion: false,
    isAnswer: true
  };

  const expectedAction = {
    type: "HANDLE_ANSWER",
    payload: {
      isQuestion: false,
      isAnswer: true
    }
  };

  expect(quizReducer.handleAnswer(choice)).toEqual(expectedAction);
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
