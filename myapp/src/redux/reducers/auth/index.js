import {
  AUTH_BEGIN,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  DEAUTH_BEGIN,
  DEAUTH_SUCCESS,
  DEAUTH_FAILURE,
} from "../../constants/actions/index";

const initialState = {
  authorizing: false,
  deauthorizing: false,
  errorMessage: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {

    case AUTH_BEGIN:
      return {
        ...state,
        authorizing: action.payload.authorizing,
        errorMessage: action.payload.errorMessage
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        authorizing: action.payload.authorizing,
        errorMessage: action.payload.errorMessage,
        kick: action.payload.kick
      };

    case AUTH_FAILURE:
      return {
        ...state,
        authorizing: action.payload.authorizing,
        errorMessage: action.payload.errorMessage,
        kick: action.payload.kick
      };

    case DEAUTH_BEGIN:
      return {
        ...state,
        deauthorizing: action.payload.deauthorizing,
        errorMessage: action.payload.errorMessage
      };

    case DEAUTH_SUCCESS:
      return {
        ...state,
        deauthorizing: action.payload.deauthorizing,
        restApiToken: action.payload.restApiToken,
        kick: action.payload.kick
      };

    case DEAUTH_FAILURE:
      return {
        ...state,
        deauthorizing: action.payload.deauthorizing,
        errorMessage: action.payload.error,
        kick: action.payload.kick
      };

    default:
      return state;
  }
};
