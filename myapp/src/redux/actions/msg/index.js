import {
  CREATE_CHAT_MESSAGE_BEGIN,
  CREATE_CHAT_MESSAGE_SUCCESS,
  CREATE_CHAT_MESSAGE_FAILURE,
  LOAD_CHAT_MESSAGES_BEGIN,
  LOAD_CHAT_MESSAGES_SUCCESS,
  LOAD_CHAT_MESSAGES_FAILURE,
} from "../../constants/actions/index";

import {
  sleeping,
  fetchRestJson,
  defaultObjectedParams
} from "../../api/api";

import {
    SEC_FORCE_TIMEOUT
} from "../../constants/settings/index";


export function LoadChatMessages(chatId, withHideChatMessages = null) {
  console.group('actions.msg.index.LoadChatMessages:');
  console.log('withHideChatMessages := ' + withHideChatMessages);
  console.log('withHideChatMessages := ' + withHideChatMessages);
  console.groupEnd();

  return dispatch => {
    dispatch(loadChatMessagesBegin(withHideChatMessages));
    console.log('loadChatMessagesBegin()');
    // для демонстрации искусственно увеличиваю время ответа
    sleeping(SEC_FORCE_TIMEOUT).then(() => {
      fetchRestJson('/api/ver.0/chat/'+chatId+'/message/list')
      .then(response => response.json())
      .then(json => {
        console.log(json);
        dispatch(loadChatMessagesSuccess(chatId, json, withHideChatMessages));
        return;
      })
      .catch(error => dispatch(loadChatMessagesFailure(error)));
    });
  };
};

export const loadChatMessagesBegin = (withHideChatMessages = null) => {
  let payload = {
    loadingChatMessages: true
  };
  if (withHideChatMessages === true) {
    payload = {
      ...payload,
      hideChatMessages: true
    };
  }
  return {
    type: LOAD_CHAT_MESSAGES_BEGIN,
    payload: payload
  }
};

export const loadChatMessagesSuccess = (chatId, json, withHideChatMessages = null) => {
  let payload = {
    loadingChatMessages: false,
    wasChatMessagesOnceLoaded: true,
    chatMessages: json,
    currentChatId: chatId
  };
  if (withHideChatMessages === true) {
    payload = {
      ...payload,
      hideChatMessages: false
    };
  }
  return {
    type: LOAD_CHAT_MESSAGES_SUCCESS,
    payload: payload
  };
};

export const loadChatMessagesFailure = error => ({
  type: LOAD_CHAT_MESSAGES_FAILURE,
  payload: { errorMessage: error.message, loadingChatMessages: false }
});


export function CreateChatMessage(chatId, ownerId, text) {
  console.group('actions.msg.index.CreateChatMessage:');
  console.log('text: ' + text);
  console.log('user_id: ' + localStorage.getItem('user_id'));

  let params = {
    ...defaultObjectedParams,
    method: 'POST',
    body: JSON.stringify({owner_id: localStorage.getItem('user_id'), text: text})
  }
  console.log('params: ' + JSON.stringify(params));
  console.groupEnd();

//  params.method = 'POST';
//  params.body = JSON.stringify({owner_id: localStorage.getItem('user_id'), text: text});

  return dispatch => {
    dispatch(createChatMessageBegin());
    // для демонстрации искусственно увеличиваю время ответа
    sleeping(SEC_FORCE_TIMEOUT).then(() => {
      fetchRestJson('/api/ver.0/chat/' + chatId + '/message/create', params)
      .then(() => dispatch(createChatMessageSuccess()))
      .catch(error => dispatch(createChatMessageFailure(error)))
    });
  };
};

export const createChatMessageBegin = () => ({
  type: CREATE_CHAT_MESSAGE_BEGIN,
  payload: { creatingChatMessage: true }
});

export const createChatMessageSuccess = () => ({
  type: CREATE_CHAT_MESSAGE_SUCCESS,
  payload: { creatingChatMessage: false, text: null, kick: new Date(), chatMessageWasCreated: true }
});

export const createChatMessageFailure = error => ({
  type: CREATE_CHAT_MESSAGE_FAILURE,
  payload: { errorMessage: error.message, creatingChatMessage: false, kick: new Date() }
});
