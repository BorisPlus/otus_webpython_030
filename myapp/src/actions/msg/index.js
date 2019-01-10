import {
  CREATE_CHAT_MESSAGE_BEGIN,
  CREATE_CHAT_MESSAGE_SUCCESS,
  CREATE_CHAT_MESSAGE_FAILURE,
  LOAD_CHAT_MESSAGES_BEGIN,
  LOAD_CHAT_MESSAGES_SUCCESS,
  LOAD_CHAT_MESSAGES_FAILURE,
} from "../../../src/constants/actions/index";

import {
  sleeping,
  fetchRestResponse,
  buildRestRequestParams
} from "../../../src/api/api";

import {
    SEC_FORCE_TIMEOUT
} from "../../../src/settings";

import {
  getNewKick,
} from "../../../src/functions/index";

import {
  CONSOLE_LOG_ACTIONS,
} from "../../../src/settings";

export function LoadChatMessages(chatId, withHideChatMessages = null) {

  const myNameIs = 'src.actions.msg.LoadChatMessages';

  if (CONSOLE_LOG_ACTIONS.includes(myNameIs)) {
    console.group('ACTION# ' + myNameIs + '(...)');
    console.log('withHideChatMessages = ' + withHideChatMessages);
    console.groupEnd();
  }

  return dispatch => {
    dispatch(loadChatMessagesBegin(withHideChatMessages));
    // для демонстрации искусственно увеличиваю время ответа
    sleeping(SEC_FORCE_TIMEOUT).then(() => {
      fetchRestResponse('/api/ver.0/chat/'+chatId+'/message/list')
      .then(response => response.json())
      .then(json => {
        if (CONSOLE_LOG_ACTIONS.includes(myNameIs)) {
          console.group('ACTION# ' + myNameIs + ' => dispatch');
          console.log(json);
          console.groupEnd();
        }
        dispatch(loadChatMessagesSuccess(chatId, json, withHideChatMessages));
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
  payload: { errorMessage: error.message, loadingChatMessages: false, hideChatMessages: false }
});


export function CreateChatMessage(chatId, ownerId, text) {
  const myNameIs = 'src.actions.msg.CreateChatMessage';

  if (CONSOLE_LOG_ACTIONS.includes(myNameIs)) {
    console.group('ACTION# ' + myNameIs + '(...)');
    console.log('chatId: ' + chatId);
    console.log('ownerId: ' + ownerId);
    console.log('text: ' + text);
    const params = buildRestRequestParams({owner_id: ownerId, text: text, chat_id: chatId}, 'POST');
    console.log('params: ' + JSON.stringify(params));
    console.groupEnd();
  }
  const params = {
    method: 'POST',
    body: JSON.stringify({text: text})
  };

  return dispatch => {
    dispatch(createChatMessageBegin());
    // для демонстрации искусственно увеличиваю время ответа
    sleeping(SEC_FORCE_TIMEOUT).then(() => {
      fetchRestResponse('/api/ver.0/chat/' + chatId + '/message/create', params)
      .then(dispatch(createChatMessageSuccess()))
      .catch(error => {
        console.log(error);
        dispatch(createChatMessageFailure(error))
      })
    });
  };
};

export const createChatMessageBegin = () => ({
  type: CREATE_CHAT_MESSAGE_BEGIN,
  payload: { creatingChatMessage: true }
});

export const createChatMessageSuccess = () => ({
  type: CREATE_CHAT_MESSAGE_SUCCESS,
  payload: {
    creatingChatMessage: false, text: null, kick: getNewKick(), chatMessageWasCreated: true,
    kickRefreshCreateMsgForm: getNewKick()
  }
});

export const createChatMessageFailure = error => ({
  type: CREATE_CHAT_MESSAGE_FAILURE,
  payload: { errorMessage: error.message, creatingChatMessage: false, kick: getNewKick() }
});
