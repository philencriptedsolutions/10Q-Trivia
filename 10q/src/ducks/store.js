import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import loginReducer from './reducer';

const store = createStore(loginReducer, applyMiddleware(promiseMiddleware()));
export default store;