import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import loginReducer from "./reducer";
import quizReducer from "./quizReducer";

const reducers = combineReducers({ loginReducer, quizReducer });

export default createStore(reducers, applyMiddleware(promiseMiddleware()));
