import React, { Component } from "react";
import { connect } from "react-redux";

import { Send, Load } from "../../actions/index";

const mapStateToProps = state => ({
  text: state.msgReducer.text,
  sending: state.msgReducer.sending
});

const mapDispatchToProps = dispatch => {
  return {
    Send: (text) => dispatch(Send(text)),
    Load: () => dispatch(Load())
  };
};

class ReactMessageForm extends Component {
  constructor() {
    super();
    this.state = {
      text: null,
      isValid: false,
      sending: false,
      errorMessage: null
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillUpdate(nextProps, nextState) {
    nextState.isValid = nextState.text ? true : false;
  }

  handleSubmit = (e, data) => {

    console.group('ReactMessageForm.handleSubmit()');
    console.log('this.props = ' + JSON.stringify(this.props));
    console.log('this.state = ' + JSON.stringify(this.state));
    console.groupEnd();

    e.preventDefault();
    const { text } = this.state;
    this.props.Send(text);
    // setTimeout(() => {}, 2000);
    this.props.Load();
  }

  render() {

    console.group('ReactMessageForm.render()');
    console.log('this.props = ' + JSON.stringify(this.props));
    console.log('this.state = ' + JSON.stringify(this.state));
    console.groupEnd();

    const { isValid, text } = this.state;
    const { errorMessage, sending } = this.props;

    return (
      <div className="newline">
      <div className="form">
        { errorMessage  ? <div className="error"> <b>Error:</b> {errorMessage} </div> : null }
        <form onSubmit={this.handleSubmit}>
          <input
            className="input"
            type="text"
            name="text"
            placeholder="Enter text..."
            onChange={this.handleChange}
            // value={(mappedText === '') ? '' : text || ''}
            value={text || ''}
            disabled={ sending }
            required
            autoFocus
          />
          <input
            disabled={ !isValid || sending }
            data-is_requested={ sending ? "yes" : "no" }
            className="submit"
            type="submit"
            name="submit"
            value={ sending ? "Sending..." : "Send" }
          />
        </form>
      </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactMessageForm);