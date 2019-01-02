import React from "react";
import {connect} from 'react-redux';
import key from "weak-key";
import ChatMessage from "./ChatMessage";
import ReactChatMessageForm from "./ChatMessageForm";
import { LoadChatMessages } from "../../actions/index";
import {
  CONSOLE_LOG_COMPONENTS,
} from "../../constants/settings/index";

import {
    SEC_AUTO_UPDATE,
} from "../../constants/settings/index";

const mapStateToProps = (state) => ({
  wasChatMessagesOnceLoaded: state.msgReducer.wasChatMessagesOnceLoaded || false,
  loadingChatMessages: state.msgReducer.loadingChatMessages || false,
  chatMessages: state.msgReducer.chatMessages || [],
  kick: state.msgReducer.kick || null,
  errorMessage: state.msgReducer.errorMessage || null,
  currentChatId: state.msgReducer.currentChatId || null,
  hideChatMessages: state.msgReducer.hideChatMessages || false,
});

const mapDispatchToProps = dispatch => {
  return {
    LoadChatMessages: (chatId, hideChatMessages) => dispatch(LoadChatMessages(chatId, hideChatMessages))
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

    if (CONSOLE_LOG_COMPONENTS.includes(this.constructor.name)) {
      console.group('COMPONENT# ' + this.constructor.name + '.updateByKick()');
      console.log('this.props = ' + JSON.stringify(this.props));
      console.log('this.state = ' + JSON.stringify(this.state));
      console.log('nextProps = ' + JSON.stringify(nextProps));
      console.groupEnd();
    }

    if (this.props.kick !== nextProps.kick){
//        alert(
//            this.props.currentChatId + ' == ' +
//            nextProps.currentChatId + ' -> ' +
//            (nextProps.currentChatId === this.props.currentChatId) + ' => ' +
//            (nextProps.currentChatId === this.props.currentChatId ? null  : true)
//        );

        nextProps.LoadChatMessages(
            nextProps.currentChatId,  (nextProps.currentChatId === this.props.currentChatId ? null  : true)
        );
    }
  }

  componentWillReceiveProps(nextProps) {
    this.updateByKick(nextProps)
  }

  reloadChatMessages = () => {
    const { currentChatId, hideChatMessages } = this.props;
    if ( currentChatId && !hideChatMessages ) {
      this.props.LoadChatMessages(currentChatId, null)
    }
  };

  render() {

    if (CONSOLE_LOG_COMPONENTS.includes(this.constructor.name)) {
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
        hideChatMessages
    } = this.props;

    const messages_obj = chatMessages ? chatMessages.map((message) =>
      <div key={key(message)}>
        <ChatMessage owner={message.owner} text={message.text} created_at={message.created_at} />
      </div>
    ) : [] ;

    let content_data = (!hideChatMessages && currentChatId && chatMessages.length) ?
        <div className="messages"> { messages_obj } </div> :
        (!hideChatMessages && currentChatId) ?
            <div className="superCenter"> Chat is empty </div> :
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
    return (
      <>
        { !hideChatMessages && currentChatId ? <ReactChatMessageForm />: null }
        { content_loading }
        { content_data }
      </>
    );

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactChatMessageList);