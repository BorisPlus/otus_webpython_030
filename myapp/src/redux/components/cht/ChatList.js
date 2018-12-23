import React from "react";
import {connect} from 'react-redux';
import key from "weak-key";
import Chat from "./Chat";
import { LoadChats } from "../../actions/index";

const mapStateToProps = (state) => ({
  wasOnceLoaded: state.chtReducer.wasOnceLoaded,
  loading: state.chtReducer.loading,
  chats: state.chtReducer.chats,
  errorMessage: state.chtReducer.errorMessage
});

const mapDispatchToProps = dispatch => {
  return {
    LoadChats: () => dispatch(LoadChats())
  };
};

class ReactChatList extends React.Component {

  constructor() {
    super();
    this.state = {}
  }

  loadChats = () => {
    this.props.LoadChats()
  };

  componentDidMount() {
    this.loadChats();
    setInterval(this.loadChats, 20000);
  }

  render() {

    console.group('ReactChatList.render()');
    console.log('this.props = wasOnceLoaded => ' + this.props.wasOnceLoaded);
    console.log('this.props = loading => ' + this.props.loading);
    if (this.props.chats) {
        console.log('this.props = messages.length => ' + this.props.chats.length);
    }
    console.groupEnd();

    const { loading, chats, wasOnceLoaded } = this.props;

    if (!wasOnceLoaded) {
      return <div className="notice">Loading...</div>;
    }
    if (wasOnceLoaded && chats.length === 0) {
      return <p>Chat list is empty :(</p>;
    }
    const chats_obj = chats ? chats.map((chat) =>
      <div key={key(chat)}>
        <Chat owner={chat.owner} name={chat.name} created_at={chat.created_at} />
      </div>
    ) : [] ;
    return (
      <>
        {loading && wasOnceLoaded ? <div className="notice">Reloading...</div> : null}
        <div className="chats">
          {chats_obj}
        </div>
      </>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactChatList);