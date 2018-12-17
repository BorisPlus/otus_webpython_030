import {
  SEND_BEGIN,
  SEND_SUCCESS,
  SEND_FAILURE,
  LOAD_BEGIN,
  LOAD_SUCCESS,
  LOAD_FAILURE,
} from "../../constants/actions/index";

const initialState = {
  text: undefined,
  errorMessage: null,
  sending: false,
};

export default function msgReducer(state = initialState, action) {

  console.group('MsgReducer');
  console.log('action.type: ' + action.type);
  console.log('action: ' + JSON.stringify(action));
  console.log('state: ' + JSON.stringify(state));
  console.groupEnd();

  switch (action.type) {
    case SEND_BEGIN:
      return {
        ...state,
        sending: action.payload.sending,
        errorMessage: action.payload.errorMessage
      };

    case SEND_SUCCESS:
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
      return {
        ...state,
        sending: action.payload.sending,
        errorMessage: action.payload.errorMessage,
        text: action.payload.text,
        kick: action.payload.kick
      };

    case SEND_FAILURE:
      return {
        ...state,
        sending: action.payload.sending,
        errorMessage: action.payload.errorMessage,
        text: action.payload.text,
        kick: action.payload.kick
      };

    case LOAD_BEGIN:
      return {
        ...state,
        loading: action.payload.loading,
        errorMessage: action.payload.errorMessage
      };

    case LOAD_SUCCESS:
      return {
        ...state,
        loading: action.payload.loading,
        wasOnceLoaded: action.payload.wasOnceLoaded,
        errorMessage: action.payload.errorMessage,
        messages: action.payload.messages,
        // kick: action.payload.kick
      };

    case LOAD_FAILURE:
      return {
        ...state,
        loading: action.payload.sending,
        errorMessage: action.payload.errorMessage,
      };

    default:
      return state;
  }
};
