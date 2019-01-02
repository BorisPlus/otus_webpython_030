import React from "react";
import {connect} from 'react-redux';
import key from "weak-key";
import Message from "./Message";
import { Load } from "../../actions/index";

const mapStateToProps = (state) => ({
  wasOnceLoaded: state.msgReducer.wasOnceLoaded,
  loading: state.msgReducer.loading,
  messages: state.msgReducer.messages,
  errorMessage: state.msgReducer.errorMessage
});

const mapDispatchToProps = dispatch => {
  return {
    Load: () => dispatch(Load())
  };
};

class ReactMessageList extends React.Component {

  constructor() {
    super();
    this.state = {}
  }

  loadMessages = () => {
    this.props.Load()
  };

  componentDidMount() {
    this.loadMessages();
    setInterval(this.loadMessages, 20000);
    // I don't like THIS approach
    // On demand needed, like kicked
    // So I add at form send link to [re]Load
    // This my result of investigation fo global rerendering by kicking
    // This is the MAGIC, just trust me ))) Pif-paf-ou-ou-ou... Bang-bang-yo-yo-yo...
    // == > Kick is dummy? to be continued...
  }


  render() {

    console.group('ReactMessageList.render()');
    console.log('this.props = wasOnceLoaded => ' + this.props.wasOnceLoaded);
    console.log('this.props = loading => ' + this.props.loading);
    if (this.props.messages) {
        console.log('this.props = messages.length => ' + this.props.messages.length);
    }
    console.groupEnd();

    const { loading, messages, wasOnceLoaded } = this.props;

    if (!wasOnceLoaded) {
      return <div className="notice">Loading...</div>;
    }
    if (wasOnceLoaded && messages.length === 0) {
      return <p>Flood is empty :(</p>;
    }
    const messages_obj = messages ? messages.map((message) =>
      <div key={key(message)}>
        <Message owner={message.owner} text={message.text} created_at={message.created_at} />
      </div>
    ) : [] ;
    return (
      <>
        {loading && wasOnceLoaded ? <div className="notice">Reloading...</div> : null}
        <div className="messages">
          {messages_obj}
        </div>
      </>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactMessageList);