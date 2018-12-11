import { createStore, applyMiddleware } from 'redux';
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
//import { promiseMiddleware } from "../actions/index";

// v1
//const store = createStore(rootReducer);,

// v2
import { createLogger } from 'redux-logger';
const loggerMiddleware = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunk, loggerMiddleware));
store.subscribe(() => console.log(store.getState()));

// v3
//import thunkMiddleware from 'redux-thunk';
//import { createLogger } from 'redux-logger';

//import { Authorize, Deauthorize } from '../actions/index'
//
//
//const loggerMiddleware = createLogger();
//
//const store = createStore(
//  rootReducer,
//  applyMiddleware(
//    thunkMiddleware, // позволяет нам отправлять функции
//    loggerMiddleware // аккуратно логируем действия
//  )
//);
//Authorize, Deauthorize
//store.dispatch(Authorize('reactjs'));
//store.dispatch(Deauthorize('reactjs'));
//)
//

export default store;