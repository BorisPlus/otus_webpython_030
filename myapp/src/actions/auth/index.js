import {
  AUTH_BEGIN,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  DE_AUTH_BEGIN,
  DE_AUTH_SUCCESS,
  DE_AUTH_FAILURE,
} from "../../../src/constants/actions/index";

import {
  sleeping,
  fetchRestResponse,
  buildRestRequestParams
} from "../../../src/api/api";

import {
    SEC_FORCE_TIMEOUT,
} from "../../../src/settings";

import {
  CONSOLE_LOG_ACTIONS,
} from "../../../src/settings";

import {
  getNewKick,
} from "../../../src/functions/index";


export function Authorize(username, password) {

  const params = buildRestRequestParams({username: username, password: password}, 'POST');

  const myNameIs = 'src.actions.auth.Authorize';

  if (CONSOLE_LOG_ACTIONS.includes(myNameIs)) {
    console.group('ACTION# ' + myNameIs + '(...)');
    console.log('username = ' + username);
    console.log('password = *********');
    console.log('');
    console.log('params = ' + JSON.stringify(params));
    console.groupEnd();
  }

  return dispatch => {
    dispatch(authBegin());
    // для демонстрации искусственно увеличиваю время ответа
    sleeping(SEC_FORCE_TIMEOUT).then(() => {
      fetchRestResponse('/token-auth/', params)
      .then(response => response.json())
      .then(json => {
        localStorage.setItem('restApiToken', json.token); // Use for GET\POST
        // TODO: Be careful, stored type ignored!!!
        localStorage.setItem('userId', json.user_id); // Use for GUI, not for GET\POST
        localStorage.setItem('username', username); // Use for GUI, not for GET\POST

        if (CONSOLE_LOG_ACTIONS.includes(myNameIs)) {
          console.group('ACTION# ' + myNameIs + ' => dispatch');
          console.log('restApiToken = ' + json.token);
          console.log('userId = ' + json.user_id);
          console.log('username = ' + username);
          console.groupEnd();
        };

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

export const authSuccess = (username, restApiToken, userId) => ({
  type: AUTH_SUCCESS,
  payload: {
    authorizing: false,
    kick: getNewKick(),
    isAuthorize: true,
    username: username,
    userId: userId,
    restApiToken: restApiToken
  }
});

export const authFailure = error => ({
  type: AUTH_FAILURE,
  payload: {
    errorMessage: error.message,
    authorizing: false,
    kick: getNewKick(),
    isAuthorize: false,
    username: null,
    userId: null,
    restApiToken: null
  }
});


export function DeAuthorize() {

  const myNameIs = 'src.actions.auth.DeAuthorize';

  if (CONSOLE_LOG_ACTIONS.includes(myNameIs)) {
    console.groupEnd();
  }

  return dispatch => {
    dispatch(deAuthorizeBegin());
    sleeping(2000).then(() => {
      localStorage.removeItem('restApiToken');
      localStorage.removeItem('userId');
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
    deAuthorizing: false,
    kick: getNewKick(),
    isAuthorize: false,
    username: null,
    userId: null,
    restApiToken: null }
});

export const deAuthorizeFailure = error => ({
  type: DE_AUTH_FAILURE,
  payload: { errorMessage: error.message, deAuthorizing: false, kick: getNewKick() }
});

