import { createStore, applyMiddleware } from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import loginReducer from './reducer';
import quizReducer from './quizReducer';

import { combineReducers } from 'redux'

// const store = createStore(loginReducer, applyMiddleware(promiseMiddleware())); 
// export default store;

const reducers = combineReducers({ loginReducer, quizReducer });

export default createStore(reducers, applyMiddleware(reduxPromiseMiddleware()));
