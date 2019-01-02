import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR
} from "../../constants/actions/index";


import {
  CONSOLE_LOG_REDUCERS,
} from "../../constants/settings/index";

const initialState = {
  styleWidth: "0"
};

export const myNameIs = 'SidebarReducer';

export function reducer(state = initialState, action) {

  let newState = {};
  switch (action.type) {
    case OPEN_SIDEBAR:
      newState = {
        ...state,
        styleWidth: "100%"
      };
      break;

    case CLOSE_SIDEBAR:
      newState = {
        ...state,
        styleWidth: "0"
      };
      break;

    default:
      newState = state;
      break;
  }

  if (CONSOLE_LOG_REDUCERS.includes(myNameIs)) {
      console.group('REDUCER# ' + myNameIs);
      console.log('action.type: ' + action.type);
      console.log('action: ' + JSON.stringify(action));
      console.log('state: ' + JSON.stringify(state));
      console.log('newState: ' + JSON.stringify(newState));
      console.groupEnd();
  }

  return newState;
};
