import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from "redux-thunk";
//import { createLogger } from 'redux-logger';
import rootReducer from "../../src/reducers/index";

// No need "redux-logger" info
//const loggerMiddleware = createLogger();
//const store = createStore(rootReducer, applyMiddleware(thunk, loggerMiddleware));
//store.subscribe(() => console.log(store.getState()));

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;