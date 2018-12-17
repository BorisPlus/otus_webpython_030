import { combineReducers } from "redux";
import authReducer from "./auth/index";
import msgReducer from "./msg/index";

export default combineReducers({
  authReducer,
  msgReducer
});