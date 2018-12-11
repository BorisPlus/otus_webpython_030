import {
    AUTH_BEGIN,
    AUTH_SUCCESS,
    AUTH_FAILURE
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
        error: null
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        authorizing: false,
        restApiToken: action.payload.restApiToken
      };

    case AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        restApiToken: null
      };

    default:
      return state;
  }
};
