import {
  AUTH_BEGIN,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  DE_AUTH_BEGIN,
  DE_AUTH_SUCCESS,
  DE_AUTH_FAILURE,
} from "../../constants/actions/index";

import {
  sleeping,
  fetchRestJson,
  defaultObjectedParams
} from "../../api/api";

import {
    SEC_FORCE_TIMEOUT,
} from "../../constants/settings/index";

export function Authorize(username, password) {
  console.group('actions.auth.index.Authorize:');
  console.log('username: ' + username);
  console.log('password: *********');
  console.groupEnd();

  let params = defaultObjectedParams;
  params.method = 'POST';
  params.body = JSON.stringify({username: username, password: password});

  return dispatch => {
    dispatch(authBegin());
    // для демонстрации искусственно увеличиваю время ответа
    sleeping(SEC_FORCE_TIMEOUT).then(() => {
      fetchRestJson('/token-auth/', params)
      .then(response => response.json())
      .then(json => {
        localStorage.setItem('restApiToken', json.token);
        localStorage.setItem('user_id', json.user_id); // Is it safe ? hmm...
        localStorage.setItem('username', username); // Is it safe ? hmm...
        dispatch(authSuccess(username, json.token, json.user_id));
        return json.token;
      })
      .catch(error => dispatch(authFailure(error)))
    });
  };
};
// (localStorage.getItem('restApiToken') !== null)
export const authBegin = () => ({
  type: AUTH_BEGIN,
  payload: { authorizing: true }
});

export const authSuccess = (username, restApiToken, user_id) => ({
  type: AUTH_SUCCESS,
  payload: {
    authorizing: false,
    kick: new Date(),
    isAuthorize: true,
    username: username,
    user_id: user_id,
    restApiToken: restApiToken
  }
});

export const authFailure = error => ({
  type: AUTH_FAILURE,
  payload: {
    errorMessage: error.message,
    authorizing: false,
    kick: new Date(),
    isAuthorize: false,
    username: null ,
    user_id: null,
    restApiToken: null
  }
});


export function DeAuthorize() {
  console.group('actions.auth.index.DeAuthorize:');
  console.groupEnd();

  return dispatch => {
    dispatch(deAuthorizeBegin());
    sleeping(2000).then(() => {
      localStorage.removeItem('restApiToken');
      localStorage.removeItem('user_id');
      localStorage.removeItem('username');
      dispatch(deAuthorizeSuccess());
      return true;
    })
    .catch(error => {dispatch(deAuthorizeFailure(error))});
  };
};

export const deAuthorizeBegin = () => ({
  type: DE_AUTH_BEGIN,
  payload: { deAuthorizing: true }
});

export const deAuthorizeSuccess = () => ({
  type: DE_AUTH_SUCCESS,
  payload: {
    deAuthorizing: false, kick: new Date(),
    isAuthorize: false,
    username: null,
    user_id: null,
    restApiToken: null }
});

export const deAuthorizeFailure = error => ({
  type: DE_AUTH_FAILURE,
  payload: { errorMessage: error.message, deAuthorizing: false, kick: new Date() }
});

