import { combineReducers } from "redux";
import authReducer from "./auth/index";
import { reducer as msgReducer } from "./msg/index";
import { reducer as chtReducer } from "./cht/index";
import { reducer as sideNavReducer } from "./side_nav/index" ;

export default combineReducers({
  authReducer,
  msgReducer,
  chtReducer,
  sideNavReducer
});