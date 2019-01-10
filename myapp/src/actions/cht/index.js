import {
//  CREATE_CHAT_BEGIN,
//  CREATE_CHAT_SUCCESS,
//  CREATE_CHAT_FAILURE,
  LOAD_CHATS_BEGIN,
  LOAD_CHATS_SUCCESS,
  LOAD_CHATS_FAILURE,
  SET_CURRENT_CHAT,
  SELECT_CHAT_BEGIN,
  SELECT_CHAT_SUCCESS,
  SELECT_CHAT_FAILURE
} from "../../../src/constants/actions/index";

import {
  sleeping,
  fetchRestResponse
} from "../../../src/api/api";

import {
    SEC_FORCE_TIMEOUT,
} from "../../../src//settings";

import {
  CONSOLE_LOG_ACTIONS,
} from "../../../src/settings";

//import {
//  getNewKick,
//} from "../../../src/functions/index";

//export function CreateChat(name) {
//  console.group('actions.cht.index.CreateChat:');
//  console.log('name: ' + name);
//  console.log('userId: ' + localStorage.getItem('userId'));
//  console.groupEnd();
//
//  const params = buildRestRequestParams({owner_id: localStorage.getItem('user_id'), name: name}, 'POST');
//
//  return dispatch => {
//    dispatch(createBegin());
//    // для демонстрации искусственно увеличиваю время ответа
//    sleeping(SEC_FORCE_TIMEOUT).then(() => {
//      fetchRestResponse('/api/ver.0/chat/create', params)
//      .then(() => dispatch(createSuccess()))
//      .catch(error => dispatch(createFailure(error)))
//    });
//  };
//
//};
//
//export const createBegin = () => ({
//  type: CREATE_CHAT_BEGIN,
//  payload: { creating: true }
//});
//
//export const createSuccess = () => ({
//  type: CREATE_CHAT_SUCCESS,
//  payload: { creating: false, name: null, kick: getNewKick() }
//});
//
//export const createFailure = error => ({
//  type: CREATE_CHAT_FAILURE,
//  payload: { errorMessage: error.message, creating: false, kick: getNewKick() }
//});

export function LoadChats() {

  const myNameIs = 'src.actions.cht.LoadChats';

  if (CONSOLE_LOG_ACTIONS.includes(myNameIs)) {
    console.group('ACTION# ' + myNameIs + '(...)');
    console.groupEnd();
  }

  return dispatch => {
    dispatch(loadBegin());
    // для демонстрации искусственно увеличиваю время ответа
    sleeping(SEC_FORCE_TIMEOUT).then(() => {
      fetchRestResponse( '/api/ver.0/chat/list')
      .then(response => response.json())
      .then(json => {
        if (CONSOLE_LOG_ACTIONS.includes(myNameIs)) {
          console.group('ACTION# ' + myNameIs + ' => dispatch');
          console.log(json);
          console.groupEnd();
        }
        dispatch(loadSuccess(json));
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


export function SelectChat(chatId) {

  const myNameIs = 'src.actions.cht.SelectChat';

//  if (CONSOLE_LOG_ACTIONS.includes(myNameIs)) {
  if (1) {
    console.group('ACTION# ' + myNameIs + '(...)');
    console.group(chatId);
    console.groupEnd();
  }

  return dispatch => {
    dispatch(selectChatBegin());
    // для демонстрации искусственно увеличиваю время ответа
    sleeping(SEC_FORCE_TIMEOUT).then(() => {
      fetchRestResponse( '/api/ver.0/chat/' + chatId)
      .then(response => response.json())
      .then(json => {
        if (CONSOLE_LOG_ACTIONS.includes(myNameIs)) {
          console.group('ACTION# ' + myNameIs + ' => dispatch');
          console.log(json);
          console.groupEnd();
        }
        dispatch(selectChatSuccess(json));
      })
      .catch(error => dispatch(selectChatFailure(error)));
    });
  };
};

export const selectChatBegin = () => ({
  type: SELECT_CHAT_BEGIN,
  payload: { chatSelecting: true }
});

export const selectChatSuccess = json => ({
  type: SELECT_CHAT_SUCCESS,
  payload: { chatSelecting: false, currentChatId: json.id, currentChatName: json.name }
});

export const selectChatFailure = error => ({
  type: SELECT_CHAT_FAILURE,
  payload: { errorMessage: error.message, chatSelecting: false }
});

export function SetCurrentChat(chatId, chatName) {
  console.group('actions.cht.index.SetCurrentChat:');
  console.log(chatId);
  console.log(chatName);
  console.groupEnd();

  return {
    type: SET_CURRENT_CHAT,
    payload: {
      currentChatId: chatId,
      currentChatName: chatName
    }
  };
};