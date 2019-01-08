import {
  AUTH_BEGIN,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  DE_AUTH_BEGIN,
  DE_AUTH_SUCCESS,
  DE_AUTH_FAILURE,
} from "../../../src/constants/actions/index";

const initialState = {
  authorizing: false,
  deAuthorizing: false,
  errorMessage: null,
//  isAuthorize: false,
  isAuthorize: localStorage.getItem('restApiToken') ? true : false,
  username: localStorage.getItem('username'),
//  username: localStorage.getItem('username'),
  userId: localStorage.getItem('userId'),
  restApiToken: localStorage.getItem('restApiToken')
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
        isAuthorize: action.payload.isAuthorize,
        userId: action.payload.userId,
        restApiToken: action.payload.restApiToken,
        username: action.payload.username,
        kick: action.payload.kick
      };

    case AUTH_FAILURE:
      return {
        ...state,
        authorizing: action.payload.authorizing,
        errorMessage: action.payload.errorMessage,
        kick: action.payload.kick
      };

    case DE_AUTH_BEGIN:
      return {
        ...state,
        deAuthorizing: action.payload.deAuthorizing,
        errorMessage: action.payload.errorMessage
      };

    case DE_AUTH_SUCCESS:
      return {
        ...state,
        deAuthorizing: action.payload.deAuthorizing,
        restApiToken: action.payload.restApiToken,
        isAuthorize: action.payload.isAuthorize,
        kick: action.payload.kick
      };

    case DE_AUTH_FAILURE:
      return {
        ...state,
        deAuthorizing: action.payload.deAuthorizing,
        errorMessage: action.payload.error,
        kick: action.payload.kick
      };

    default:
      return state;
  }
};
