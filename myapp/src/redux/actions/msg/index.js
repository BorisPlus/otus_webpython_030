import {
    SEND_BEGIN,
    SEND_SUCCESS,
    SEND_FAILURE,

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
        localStorage.setItem('restApiToken', json.token);
        localStorage.setItem('user_id', json.user_id);
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
    sleeping(3000).then(() => {
        localStorage.removeItem('restApiToken');
        localStorage.removeItem('user_id');
        dispatch(deathorizeSuccess());
        return true;
    })
    .catch(error => {dispatch(deathorizeFailure(error))});
  };
};

export const deathorizeBegin = () => ({
  type: DEAUTH_BEGIN,
  payload: { deauthorizing: true }
});

export const deathorizeSuccess = () => ({
  type: DEAUTH_SUCCESS,
  payload: { deauthorizing: false }
});

export const deathorizeFailure = error => ({
  type: DEAUTH_FAILURE,
  payload: { error: error.message, deauthorizing: false }
});

