import {
  CREATE_CHAT_BEGIN,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAILURE,
  LOAD_CHATS_BEGIN,
  LOAD_CHATS_SUCCESS,
  LOAD_CHATS_FAILURE,
} from "../../constants/actions/index";

const initialState = {
  name: undefined,
  errorMessage: null,
  creating: false,
};

export default function msgReducer(state = initialState, action) {

  console.group('MsgReducer');
  console.log('action.type: ' + action.type);
  console.log('action: ' + JSON.stringify(action));
  console.log('state: ' + JSON.stringify(state));
  console.groupEnd();

  switch (action.type) {
    case CREATE_CHAT_BEGIN:
      return {
        ...state,
        creating: action.payload.creating,
        errorMessage: action.payload.errorMessage
      };

    case CREATE_CHAT_SUCCESS:
      return {
        ...state,
        creating: action.payload.creating,
        errorMessage: action.payload.errorMessage,
        name: action.payload.text,
        kick: action.payload.kick
      };

    case CREATE_CHAT_FAILURE:
      return {
        ...state,
        creating: action.payload.sending,
        errorMessage: action.payload.errorMessage,
        name: action.payload.name,
        kick: action.payload.kick
      };

    case LOAD_CHATS_BEGIN:
      return {
        ...state,
        loading: action.payload.loading,
        errorMessage: action.payload.errorMessage
      };

    case LOAD_CHATS_SUCCESS:
      return {
        ...state,
        loading: action.payload.loading,
        wasOnceLoaded: action.payload.wasOnceLoaded,
        errorMessage: action.payload.errorMessage,
        chats: action.payload.chats,
      };

    case LOAD_CHATS_FAILURE:
      return {
        ...state,
        loading: action.payload.sending,
        errorMessage: action.payload.errorMessage,
      };

    default:
      return state;
  }
};
