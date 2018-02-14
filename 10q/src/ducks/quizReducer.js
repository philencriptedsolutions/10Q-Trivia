import axios from 'axios';

//  ACTION TYPES

const NEW_QUESTION = 'NEW_QUESTION';
const NEW_ANSWER = 'NEW_ANSWER';
const END_OF_GAME = "END_OF_GAME";

//  INITIAL STATE
const initialState = {
    user :{},
    question:{},
    isAuthenticated: false,
    endOfGame: false,
    isQuestion: false,
    isAnswer: false,
}

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
        }
    }

//  REDUCER
export default function quizReducer(state = initialState, action){

    switch (action.type) {
        case `${NEW_QUESTION}`:
            return Object.assign({}, state, { question: action.payload, isQuestion:true });

        case `${NEW_ANSWER}`:
            return Object.assign({}, state, { isAnswer:action.payload, isQuestion:false  });

        case `${END_OF_GAME}`:
            return Object.assign({}, state, { endOfGame: true, isQuestion: false, isAnswer: false, })
        default:
            return state;
    }
}

