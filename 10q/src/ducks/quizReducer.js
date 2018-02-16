//  ACTION TYPES

const NEW_QUESTION = "NEW_QUESTION";
const NEW_ANSWER = "NEW_ANSWER";
const END_OF_GAME = "END_OF_GAME";
const CHANGE_WRONG = "CHANGE_WRONG";
const HANDLE_ANSWER = "HANDLE_ANSWER";

//  INITIAL STATE
const initialState = {
  isQuestion: false,
  isAnswer: false,
  question: {},
  isAuthenticated: false,
  wrong: false,
  userChoice: ""
};

//  ACTION CREATORS
export function saveNewQuestion(isQuestion, isAnswer, question) {
  return {
    type: NEW_QUESTION,
    payload: { isQuestion, isAnswer, question }
  };
}
export function changeToAnswerView(isQuestion, isAnswer) {
  return {
    type: NEW_ANSWER,
    payload: { isQuestion, isAnswer }
  };
}
export function changeToEndOfGame() {
  return {
    type: END_OF_GAME,
    payload: true
  };
}

export function changeToWrong() {
  return {
    type: CHANGE_WRONG,
    payload: true
  };
}

export function handleAnswer(choice) {
  return {
    type: HANDLE_ANSWER,
    payload: choice
  };
}

//  REDUCER
export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case `${NEW_QUESTION}`:
      return Object.assign({}, state, {
        isQuestion: action.payload.isQuestion,
        isAnswer: action.payload.isAnswer,
        question: action.payload.question
      });

    case `${NEW_ANSWER}`:
      return Object.assign({}, state, {
        isQuestion: action.payload.isQuestion,
        isAnswer: action.payload.isAnswer
      });

    case `${END_OF_GAME}`:
      return Object.assign({}, state, {
        endOfGame: true,
        isQuestion: false,
        isAnswer: false
      });
    case `${CHANGE_WRONG}`:
      return Object.assign({}, state, { wrong: action.payload });
    case `${HANDLE_ANSWER}`:
      return Object.assign({}, state, {
        userChoice: action.payload
      });

    default:
      return state;
  }
}
