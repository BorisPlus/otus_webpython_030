import React from "react";
import {connect} from 'react-redux';
import key from "weak-key";
import ReactChatMessage from "./ChatMessage";
import ReactChatMessageForm from "./ChatMessageForm";

import {
    SetCurrentChatId
} from "../../../src/actions/index";

//import {
//  getNewKick
//} from "../../../src/functions/index";

import {
  LoadChatMessages
} from "../../../src/actions/index";

import {
  CONSOLE_LOG_COMPONENTS,
  SEC_AUTO_UPDATE,
} from "../../../src/settings";

const mapStateToProps = (state) => ({
  wasChatMessagesOnceLoaded: state.msgReducer.wasChatMessagesOnceLoaded,
  loadingChatMessages: state.msgReducer.loadingChatMessages,
  chatMessages: state.msgReducer.chatMessages,
  kick: state.msgReducer.kick,
  errorMessage: state.msgReducer.errorMessage,
  currentChatId: state.chtReducer.currentChatId,
  hideChatMessages: state.msgReducer.hideChatMessages,
  isAuthorize: state.authReducer.isAuthorize,
});

const mapDispatchToProps = dispatch => {
  return {
    LoadChatMessages: (chatId, hideChatMessages) => dispatch(LoadChatMessages(chatId, hideChatMessages)),
    SetCurrentChatId: (chatId) => dispatch(SetCurrentChatId(chatId))
  };
};

class ReactChatMessageList extends React.Component {

  constructor() {
    super();
    this.state = {
        timerId: setInterval(this.reloadChatMessages, SEC_AUTO_UPDATE),
    }
  }

  updateByKick(nextProps){

    if (CONSOLE_LOG_COMPONENTS.includes(this.constructor.name) ||
        CONSOLE_LOG_COMPONENTS.includes(this.constructor.name + '.updateByKick()') ) {
      console.group('COMPONENT# ' + this.constructor.name + '.updateByKick()');
      console.log('this.props = ' + JSON.stringify(this.props));
      console.log('this.state = ' + JSON.stringify(this.state));
      console.log('nextProps = ' + JSON.stringify(nextProps));
      console.groupEnd();
    }

    if (this.props.kick !== nextProps.kick){
        nextProps.LoadChatMessages(
            nextProps.currentChatId,  (nextProps.currentChatId === this.props.currentChatId ? null  : true)
        );
    }
  }

  setCurrentChatId = (chatId) => {
    this.props.SetCurrentChatId(chatId);
  };

  componentWillReceiveProps(nextProps) {
    console.group('componentWillReceiveProps');
    console.log('this.props.isAuthorize ' + this.props.isAuthorize);
    console.log('this.props.currentChatId ' + this.props.currentChatId);
    console.log('this.props.match.params.chat_pk ' + this.props.match.params.chat_pk);
    console.log('nextProps.match.params.chat_pk ' + nextProps.match.params.chat_pk);
    console.log('this.props.currentChatId === null && nextProps.match.params.chat_pk ' + (this.props.currentChatId === null && nextProps.match.params.chat_pk));
    console.log('this.props.currentChatId !== nextProps.match.params.chat_pk ' + (this.props.currentChatId !== nextProps.match.params.chat_pk));
    console.groupEnd();
    if (  this.props.isAuthorize &&
        (( (this.props.currentChatId === null) && nextProps.match.params.chat_pk ) ||
        ( this.props.currentChatId !== nextProps.match.params.chat_pk )) ) {
//        alert(nextProps.match.params.chat_pk);
        this.props.SetCurrentChatId(nextProps.match.params.chat_pk);
    }
//    this.props.SetCurrentChatId(nextProps.match.params.chat_pk);
    this.updateByKick(nextProps)
  }
  componentWillMount() {
    if (  this.props.isAuthorize &&
        (( (this.props.currentChatId === null) && this.props.match.params.chat_pk ) ||
        ( this.props.currentChatId !== this.props.match.params.chat_pk )) ) {
        this.props.SetCurrentChatId(this.props.match.params.chat_pk);
    }
//    this.props.SetCurrentChatId(nextProps.match.params.chat_pk);
  }

  reloadChatMessages = () => {
    const { isAuthorize, currentChatId, hideChatMessages } = this.props;
    if ( isAuthorize  && currentChatId && !hideChatMessages ) {
      this.props.LoadChatMessages(currentChatId, null)
    }
  };

  render() {

    if (CONSOLE_LOG_COMPONENTS.includes(this.constructor.name) ||
        CONSOLE_LOG_COMPONENTS.includes(this.constructor.name + '.render()')) {
        console.group('COMPONENT# ' + this.constructor.name + '.render()');
        console.log('this.props = ' + JSON.stringify(this.props));
        console.log('this.state = ' + JSON.stringify(this.state));
        console.groupEnd();
    }

    const {
        loadingChatMessages,
        chatMessages,
        currentChatId,
        wasChatMessagesOnceLoaded,
        hideChatMessages,
        errorMessage
    } = this.props;

    const messages_obj = chatMessages ? chatMessages.map((message) =>
      <div key={key(message)}>
        <ReactChatMessage
            owner={message.owner}
            owner_id={message.owner_id}
            text={message.text}
            created_at={message.created_at} />
      </div>
    ) : [] ;

    let content_data = (!hideChatMessages && currentChatId && chatMessages.length) ?
        <div className="messages"> { messages_obj } </div> :
        (!hideChatMessages && currentChatId) ?
            <div className="center"> Chat is empty </div> :
            (!currentChatId) ?
              <div className="superCenter"> Choose Chat </div> :
              null;
    let content_loading = (!wasChatMessagesOnceLoaded && loadingChatMessages) ?
        <div className="notice"> Loading chat messages... </div> :
        (wasChatMessagesOnceLoaded && loadingChatMessages) ?
            <div className="notice"> Reloading chat messages...</div> :
             null;
    // <p>currentChatId: { !currentChatId ? 'Nill' : currentChatId }</p>
    // <p>hideChatMessages: { hideChatMessages? 'YES' : 'NO' }</p>
    // <p>username: { localStorage.getItem('username') }</p>
    // <p>user_id: { localStorage.getItem('user_id') }</p>
    // <p>restApiToken: { localStorage.getItem('restApiToken') }</p>
    // alert(errorMessage);

    return (
      <>
        { !hideChatMessages && currentChatId ? <ReactChatMessageForm />: null }
        { content_loading }
        { errorMessage ? <div className="errorMessage">{ errorMessage }</div> : null}
        <div className="messages">
          { content_data }
        </div>
      </>
    );

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactChatMessageList);