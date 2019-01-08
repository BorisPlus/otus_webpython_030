import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CONSOLE_LOG_COMPONENTS,
} from "../../../src/settings";
import {
  CreateChatMessage
} from "../../../src/actions/index";

const mapStateToProps = state => ({
  creatingChatMessage: state.msgReducer.creatingChatMessage,
  currentChatId: state.msgReducer.currentChatId,
  currentUserId: state.authReducer.userId,
  kickRefreshCreateMsgForm: state.msgReducer.kickRefreshCreateMsgForm,
});

const mapDispatchToProps = dispatch => {
  return {
    CreateChatMessage: (chat, owner, text) => dispatch(CreateChatMessage(chat, owner, text)),
  };
};

class ReactChatMessageForm extends Component {
  constructor() {
    super();
    this.state = {
      text: null,
      isValid: false,
      creatingChatMessage: false,
      errorMessage: null
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillUpdate(nextProps, nextState) {
    nextState.isValid = nextState.text ? true : false;
    if (nextProps.kickRefreshCreateMsgForm !== this.props.kickRefreshCreateMsgForm) {
      this.setState({text: null});
    }
  }

  handleSubmit = (e, data) => {

    console.group('ReactChatMessageForm.handleSubmit()');
    console.log('this.props = ' + JSON.stringify(this.props));
    console.log('this.state = ' + JSON.stringify(this.state));
    console.groupEnd();

    e.preventDefault();
    const { text } = this.state;
    const { currentChatId, currentUserId } = this.props;
        this.props.CreateChatMessage(currentChatId, currentUserId, text);
  }

  render() {

    if (CONSOLE_LOG_COMPONENTS.includes(this.constructor.name)) {
      console.group('COMPONENT# ' + this.constructor.name + '.render()');
      console.log('this.props = ' + JSON.stringify(this.props));
      console.log('this.state = ' + JSON.stringify(this.state));
      console.groupEnd();
    }

    const { isValid, text } = this.state;
    const { errorMessage, creatingChatMessage } = this.props;

    return (
      <div className="newline">
      <div className="form">
        { errorMessage  ? <div className="error"> <b>Error:</b> {errorMessage} </div> : null }
        <form onSubmit={this.handleSubmit}>
          <input
            className="double"
            type="text"
            name="text"
            placeholder="Enter text..."
            onChange={this.handleChange}
            // value={(mappedText === '') ? '' : text || ''}
            value={text || ''}
            disabled={ creatingChatMessage }
            required
            autoFocus
          />
          <input
            disabled={ !isValid || creatingChatMessage }
            data-is_requested={ creatingChatMessage ? "yes" : "no" }
            className="submit"
            type="submit"
            name="submit"
            value={ creatingChatMessage ? "Sending..." : "Send" }
          />
        </form>
      </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactChatMessageForm);