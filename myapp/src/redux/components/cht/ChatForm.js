import React, { Component } from "react";
import { connect } from "react-redux";

import { CreateChat, LoadChats } from "../../actions/index";

const mapStateToProps = state => ({
  name: state.chtReducer.name,
  creating: state.chtReducer.creating
});

const mapDispatchToProps = dispatch => {
  return {
    CreateChat: (name) => dispatch(CreateChat(name)),
    LoadChats: () => dispatch(LoadChats())
  };
};

class ReactChatForm extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      isValid: false,
      creating: false,
      errorMessage: null
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillUpdate(nextProps, nextState) {
    nextState.isValid = nextState.name ? true : false;
  }

  handleSubmit = (e, data) => {

    console.group('ReactChatForm.handleSubmit()');
    console.log('this.props = ' + JSON.stringify(this.props));
    console.log('this.state = ' + JSON.stringify(this.state));
    console.groupEnd();

    e.preventDefault();
    const { name } = this.state;
    this.props.CreateChat(name);
    this.props.LoadChats();
  }

  render() {

    console.group('ReactChatForm.render()');
    console.log('this.props = ' + JSON.stringify(this.props));
    console.log('this.state = ' + JSON.stringify(this.state));
    console.groupEnd();

    const { isValid, name } = this.state;
    const { errorMessage, creating } = this.props;

    return (
      <div className="newline">
      <div className="form">
        { errorMessage  ? <div className="error"> <b>Error:</b> {errorMessage} </div> : null }
        <form onSubmit={this.handleSubmit}>
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Enter name..."
            onChange={this.handleChange}
            value={name || ''}
            disabled={ creating }
            required
            autoFocus
          />
          <input
            disabled={ !isValid || creating }
            data-is_requested={ creating ? "yes" : "no" }
            className="submit"
            type="submit"
            name="submit"
            value={ creating ? "Creating..." : "Create" }
          />
        </form>
      </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactChatForm);