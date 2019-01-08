import {
  OPEN_SIDE_NAV,
  CLOSE_SIDE_NAV
} from "../../../src/constants/actions/index";

import {
  CONSOLE_LOG_REDUCERS,
} from "../../../src/settings";

const initialState = {
  styleWidth: "0"
};

export const myNameIs = 'SideNavReducer';

export function reducer(state = initialState, action) {

  let newState = {};
  switch (action.type) {
    case OPEN_SIDE_NAV:
      newState = {
        ...state,
        styleWidth: action.payload.styleWidth
      };
      break;

    case CLOSE_SIDE_NAV:
      newState = {
        ...state,
        styleWidth: action.payload.styleWidth
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
