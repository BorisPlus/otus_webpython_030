import {
  AUTH_BEGIN,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  DEAUTH_BEGIN,
  DEAUTH_SUCCESS,
  DEAUTH_FAILURE,
} from "../../constants/actions/index";
import {
  sleeping,
  fetchRestJson,
  defaultObjectedParams
} from "../../api/api";


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
    sleeping(2000).then(() => {
      fetchRestJson('/token-auth/', params)
      .then(response => response.json())
      .then(json => {
        localStorage.setItem('restApiToken', json.token);
        localStorage.setItem('user_id', json.user_id);
        localStorage.setItem('username', json.username);
        dispatch(authSuccess(username, json.token));
        return json.token;
      })
      .catch(error => dispatch(authFailure(error)))
    });
  };
};

export const authBegin = () => ({
  type: AUTH_BEGIN,
  payload: { authorizing: true }
});

export const authSuccess = () => ({
  type: AUTH_SUCCESS,
  payload: { authorizing: false, kick: new Date() }
});

export const authFailure = error => ({
  type: AUTH_FAILURE,
  payload: { errorMessage: error.message, authorizing: false, kick: new Date() }
});


export function Deauthorize() {
  console.group('actions.auth.index.Deauthorize:');
  console.groupEnd();

  return dispatch => {
    dispatch(deathorizeBegin());
    sleeping(2000).then(() => {
      localStorage.removeItem('restApiToken');
      localStorage.removeItem('user_id');
      localStorage.removeItem('username');
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
  payload: { deauthorizing: false, kick: new Date() }
});

export const deathorizeFailure = error => ({
  type: DEAUTH_FAILURE,
  payload: { errorMessage: error.message, deauthorizing: false, kick: new Date() }
});

