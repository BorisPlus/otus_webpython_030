import { combineReducers } from "redux";
import authReducer from "./auth/index";
import msgReducer from "./msg/index";
import chtReducer from "./cht/index";

export default combineReducers({
  authReducer,
  msgReducer,
  chtReducer
});