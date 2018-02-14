import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import loginReducer from "./reducer";
import quizReducer from "./quizReducer";

// const store = createStore(loginReducer, applyMiddleware(promiseMiddleware()));
// export default store;

const reducers = combineReducers({ loginReducer, quizReducer });

export default createStore(reducers, applyMiddleware(reduxPromiseMiddleware()));
