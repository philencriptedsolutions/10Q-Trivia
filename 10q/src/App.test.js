import { saveNewQuestion, changeToEndOfGame } from "./ducks/quizReducer";

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
