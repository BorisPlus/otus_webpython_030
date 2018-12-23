import {
  CREATE_CHAT_BEGIN,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAILURE,
  LOAD_CHATS_BEGIN,
  LOAD_CHATS_SUCCESS,
  LOAD_CHATS_FAILURE,
} from "../../constants/actions/index";
import {
  sleeping,
  fetchRestJson,
  defaultObjectedParams
} from "../../api/api";

export function CreateChat(name) {
  console.group('actions.cht.index.CreateChat:');
  console.log('name: ' + name);
  console.log('user_id: ' + localStorage.getItem('user_id'));
  console.groupEnd();

  let params = defaultObjectedParams;
  params.method = 'POST';
  params.body = JSON.stringify({owner_id: localStorage.getItem('user_id'), name: name});

  return dispatch => {
    dispatch(createBegin());
    // для демонстрации искусственно увеличиваю время ответа
    sleeping(1000).then(() => {
      fetchRestJson('/api/ver.0/chat/create', params)
      .then(() => dispatch(createSuccess()))
      .catch(error => dispatch(createFailure(error)))
    });
  };

};

export const createBegin = () => ({
  type: CREATE_CHAT_BEGIN,
  payload: { creating: true }
});

export const createSuccess = () => ({
  type: CREATE_CHAT_SUCCESS,
  payload: { creating: false, name: null, kick: new Date() }
});

export const createFailure = error => ({
  type: CREATE_CHAT_FAILURE,
  payload: { errorMessage: error.message, creating: false, kick: new Date() }
});


export function LoadChats() {
  console.group('actions.cht.index.LoadChats:');
  console.groupEnd();

  return dispatch => {
    dispatch(loadBegin());
    // для демонстрации искусственно увеличиваю время ответа
    sleeping(3000).then(() => {
      fetchRestJson( '/api/ver.0/chat/list')
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
  type: LOAD_CHATS_BEGIN,
  payload: { loading: true }
});

export const loadSuccess = json => ({
  type: LOAD_CHATS_SUCCESS,
  payload: { loading: false, wasOnceLoaded: true, chats: json }
});

export const loadFailure = error => ({
  type: LOAD_CHATS_FAILURE,
  payload: { errorMessage: error.message, loading: false }
});
