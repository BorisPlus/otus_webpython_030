import {
  SEND_BEGIN,
  SEND_SUCCESS,
  SEND_FAILURE,
  LOAD_BEGIN,
  LOAD_SUCCESS,
  LOAD_FAILURE,
} from "../../constants/actions/index";
import {
  sleeping,
  fetchRestJson,
  defaultObjectedParams
} from "../../api/api";

export function Send(text) {
  console.group('actions.msg.index.Send:');
  console.log('text: ' + text);
  console.log('user_id: ' + localStorage.getItem('user_id'));
  console.groupEnd();

  let params = defaultObjectedParams;
  params.method = 'POST';
  params.body = JSON.stringify({owner_id: localStorage.getItem('user_id'), text: text});

  return dispatch => {
    dispatch(sendBegin());
    // для демонстрации искусственно увеличиваю время ответа
    sleeping(1000).then(() => {
      fetchRestJson('/api/ver.0/message/create', params)
      .then(() => dispatch(sendSuccess()))
      .catch(error => dispatch(sendFailure(error)))
    });
  };

};

export const sendBegin = () => ({
  type: SEND_BEGIN,
  payload: { sending: true }
});

export const sendSuccess = () => ({
  type: SEND_SUCCESS,
  payload: { sending: false, text: null, kick: new Date() }
});

export const sendFailure = error => ({
  type: SEND_FAILURE,
  payload: { errorMessage: error.message, sending: false, kick: new Date() }
});


export function Load() {
  console.group('actions.msg.index.Load:');
  console.groupEnd();

  return dispatch => {
    dispatch(loadBegin());
    // для демонстрации искусственно увеличиваю время ответа
    sleeping(3000).then(() => {
      fetchRestJson( '/api/ver.0/message/list')
      .then(response => response.json())
      .then(json => {
        dispatch(loadSuccess(json));
        return;
      })
      .catch(error => dispatch(loadFailure(error)));
    });
  };
};

export const loadBegin = () => ({
  type: LOAD_BEGIN,
  payload: { loading: true }
});

export const loadSuccess = json => ({
  type: LOAD_SUCCESS,
  payload: { loading: false, wasOnceLoaded: true, messages: json }
});

export const loadFailure = error => ({
  type: LOAD_FAILURE,
  payload: { errorMessage: error.message, loading: false }
});
