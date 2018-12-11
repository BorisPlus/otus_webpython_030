import {
    AUTH_BEGIN,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    DEAUTHORIZE,
    BACKEND_API_URL
} from "../../constants/index";

import {
    handleErrors,
    sleeping
} from "../_utils/index";


export function Authorize(username, password) {
  return dispatch => {
    dispatch(authBegin());
    // для отладки искусственно увеличиваю время ответа
    sleeping(10000).then(() => {
      fetch( '' + BACKEND_API_URL + '/token-auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})
      })
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(authSuccess(json.token));
        return json.token;
      })
      .catch(error => dispatch(authFailure(error)));
    });
  };
};

export const authBegin = () => ({
  type: AUTH_BEGIN
});

export const authSuccess = restApiToken => ({
  type: AUTH_SUCCESS,
  payload: { restApiToken }
});

export const authFailure = error => ({
  type: AUTH_FAILURE,
  payload: { error }
});

//

export const Deauthorize = () => ({
  type: DEAUTHORIZE
});
