import {
    AUTH_BEGIN,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    DEAUTH_BEGIN,
    DEAUTH_SUCCESS,
    DEAUTH_FAILURE,
} from "../../constants/index";

const initialState = {
  username: null,
  errorMessage: null,
  restApiToken: null,
  authorizing: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {

    case AUTH_BEGIN:
      return {
        ...state,
        authorizing: true,
        error: null,
        username: state.username
      };

    case AUTH_SUCCESS:
      console.log('username = ' + action);
      console.log('username = ' + state);
      return {
        ...state,
        authorizing: false,
        restApiToken: action.payload.restApiToken,
        username: action.payload.username
      };

    case AUTH_FAILURE:
      return {
        ...state,
        authorizing: false,
        error: action.payload.error,
        restApiToken: null
      };

    case DEAUTH_BEGIN:
      return {
        ...state,
        deauthorizing: true,
        error: null
      };

    case DEAUTH_SUCCESS:
      return {
        ...state,
        deauthorizing: false,
        restApiToken: null
      };

    case DEAUTH_FAILURE:
      return {
        ...state,
        deauthorizing: false,
        error: action.payload.error
      };

    default:
      return state;
  }
};
