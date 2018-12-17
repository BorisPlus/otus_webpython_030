import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { createLogger } from 'redux-logger';
import rootReducer from "../reducers/index";

const loggerMiddleware = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunk, loggerMiddleware));
store.subscribe(() => console.log(store.getState()));

export default store;