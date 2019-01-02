import { combineReducers } from "redux";
import authReducer from "./auth/index";
import { reducer as msgReducer } from "./msg/index";
import { reducer as chtReducer } from "./cht/index";
import { reducer as sidebarReducer } from "./sidebar/index" ;

export default combineReducers({
  authReducer,
  msgReducer,
  chtReducer,
  sidebarReducer
});