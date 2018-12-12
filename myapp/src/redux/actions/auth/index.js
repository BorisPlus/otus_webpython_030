import {
    AUTH_BEGIN,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    DEAUTH_BEGIN,
    DEAUTH_SUCCESS,
    DEAUTH_FAILURE,
//    DEAUTHORIZE,
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
    sleeping(2000).then(() => {
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
        dispatch(authSuccess(username, json.token));
        return json.token;
      })
      .catch(error => {dispatch(authFailure(error));
      });
    });
  };
};

export const authBegin = () => ({
  type: AUTH_BEGIN,
  payload: { authorizing: true }
});

export const authSuccess = ( username, restApiToken ) => ({
  type: AUTH_SUCCESS,
  payload: {  username, restApiToken }
});

export const authFailure = error => ({
  type: AUTH_FAILURE,
  payload: { error: error.message }
});


export function Deauthorize() {
  return dispatch => {
    dispatch(deathorizeBegin());
    sleeping(1000).then(() => {
        dispatch(deathorizeSuccess());
    })
    .catch(error => {dispatch(deathorizeFailure(error))});
  };
};

export const deathorizeBegin = () => ({
  type: DEAUTH_BEGIN
});

export const deathorizeSuccess = () => ({
  type: DEAUTH_SUCCESS
});

export const deathorizeFailure = () => ({
  type: DEAUTH_FAILURE
});

