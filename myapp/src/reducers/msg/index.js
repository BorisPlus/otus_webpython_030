import {
  CREATE_CHAT_MESSAGE_BEGIN,
  CREATE_CHAT_MESSAGE_SUCCESS,
  CREATE_CHAT_MESSAGE_FAILURE,
  LOAD_CHAT_MESSAGES_BEGIN,
  LOAD_CHAT_MESSAGES_SUCCESS,
  LOAD_CHAT_MESSAGES_FAILURE,
  SET_CURRENT_CHAT,
  DE_AUTH_SUCCESS,
  SELECT_CHAT_SUCCESS
} from "../../../src/constants/actions/index";

import {
  CONSOLE_LOG_REDUCERS,
} from "../../../src/settings";

import {
  getNewKick
} from "../../../src/functions/index";

const initialState = {
//  text: undefined,
  errorMessage: null,
  creatingChatMessage: false,
  currentChatId: null,
  loadingChatMessages: false,
  hideChatMessages: false,
  chatMessages: [],
  kickRefreshCreateMsgForm: null
};


export const myNameIs = 'MessageReducer';

export function reducer(state = initialState, action) {

  let newState = {};
  switch (action.type) {
    case CREATE_CHAT_MESSAGE_BEGIN:
      newState = {
        ...state,
        creatingChatMessage: action.payload.creatingChatMessage,
//        errorMessage: action.payload.errorMessage
      };
      break;

    case CREATE_CHAT_MESSAGE_SUCCESS:
      // TODO: интересно
      //        text: action.payload.text,
      //        text: '',
      //        text: "",
      //        text: null,
      //        text: undefined,
      // Warning: A component is changing an uncontrolled input of type text to be controlled.
      // Input elements should not switch from uncontrolled to controlled (or vice versa).
      // Decide between using a controlled or uncontrolled input element for the lifetime of the component.
      // More info: https://fb.me/react-controlled-components
      newState = {
        ...state,
        creatingChatMessage: action.payload.creatingChatMessage,
        errorMessage: action.payload.errorMessage,
        text: action.payload.text,
        kick: action.payload.kick,
        kickRefreshCreateMsgForm: action.payload.kickRefreshCreateMsgForm
      };
      break;

    case CREATE_CHAT_MESSAGE_FAILURE:
      newState = {
        ...state,
        creatingChatMessage: action.payload.creatingChatMessage,
        errorMessage: action.payload.errorMessage,
        text: action.payload.text,
        kick: action.payload.kick
      };
      break;

    case LOAD_CHAT_MESSAGES_BEGIN:
      newState = {
        ...state,
        loadingChatMessages: action.payload.loadingChatMessages
      };
      if (typeof action.payload.hideChatMessages !== 'undefined') {
        newState = {
          ...newState,
          hideChatMessages: action.payload.hideChatMessages
        };
      }
      break;

    case LOAD_CHAT_MESSAGES_SUCCESS:
      newState = {
        ...state,
        loadingChatMessages: action.payload.loadingChatMessages,
        wasChatMessagesOnceLoaded: action.payload.wasChatMessagesOnceLoaded,
        errorMessage: action.payload.errorMessage,
        chatMessages: action.payload.chatMessages,
      };
      if (typeof action.payload.hideChatMessages !== 'undefined') {
        newState = {
          ...newState,
          hideChatMessages: action.payload.hideChatMessages
        };
      }
      break;

    case LOAD_CHAT_MESSAGES_FAILURE:
//      alert('LOAD_CHAT_MESSAGES_FAILURE ' + action.payload.errorMessage);
      newState = {
        ...state,
        loadingChatMessages: action.payload.loadingChatMessages,
        errorMessage: action.payload.errorMessage,
      };
      break;

//    case SET_CURRENT_CHAT_ID:
//      alert('msg ' + SET_CURRENT_CHAT_ID);
//      newState = {
//        ...state,
//        loadingChatMessages: action.payload.loadingChatMessages,
//        errorMessage: action.payload.errorMessage,
//        currentChatId: action.payload.currentChatId,
//        chatMessages: [],
//        hideChatMessages: true,
//        kick: getNewKick()
//      };
//      break;

    case SET_CURRENT_CHAT:
      newState = {
        ...state,
        kick: getNewKick()
      };
      break;

    case SELECT_CHAT_SUCCESS:
      newState = {
        ...state,
        kick: getNewKick()
      };
      break;

    case DE_AUTH_SUCCESS:
      return {
        ...state,
        currentChatId: null,
        chatMessages: [],
        errorMessage: null
      };

    default:
      newState = state;
      break;
  }

  if (CONSOLE_LOG_REDUCERS.includes(myNameIs)) {
      console.group('REDUCER# ' + myNameIs);
      console.log('action.type: ' + action.type);
      console.log('action: ' + JSON.stringify(action));
      console.log('state: ' + JSON.stringify(state));
      console.log('newState: ' + JSON.stringify(newState));
      console.groupEnd();
  }

  return newState;
};
