//  ACTION TYPES

const NEW_QUESTION = "NEW_QUESTION";
const NEW_ANSWER = "NEW_ANSWER";
const END_OF_GAME = "END_OF_GAME";
const CHANGE_WRONG = "CHANGE_WRONG";

//  INITIAL STATE
const initialState = {
  endOfGame: false,
  isQuestion: false,
  isAnswer: false,
  isAuthenticated: false,
  wrong: false
};

//  ACTION CREATORS
export function saveNewQuestion(question) {
  return {
    type: NEW_QUESTION,
    payload: question
  };
}
export function changeToAnswerView() {
  return {
    type: NEW_ANSWER,
    payload: true
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

//  REDUCER
export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case `${NEW_QUESTION}`:
      return Object.assign({}, state, {
        question: action.payload,
        isQuestion: true
      });

    case `${NEW_ANSWER}`:
      return Object.assign({}, state, { isAnswer: true, isQuestion: false });

    case `${END_OF_GAME}`:
      return Object.assign({}, state, {
        endOfGame: true,
        isQuestion: false,
        isAnswer: false
      });
    case `${CHANGE_WRONG}`:
      return Object.assign({}, state, { wrong: action.payload });
    default:
      return state;
  }
}
