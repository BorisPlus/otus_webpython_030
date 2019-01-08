import React from 'react';
import { connect } from "react-redux";
import {
  Authorize
} from "../../../src/actions/index";
import {
  CONSOLE_LOG_COMPONENTS,
} from "../../../src/settings";

const mapStateToProps = state => ({
  username: state.authReducer.username,
  password: state.authReducer.password,
  authorizing: state.authReducer.authorizing
});

const mapDispatchToProps = dispatch => {
  return {
    Authorize: (username, password) => dispatch(Authorize(username, password))
  };
};

class ReactAuthForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      isValid: false,
      authorizing: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.isValid = (nextState.username && nextState.password) ? true : false;
  }

  handleSubmit = (e, data) => {
    console.group('ReactAuthForm.handleSubmit()');
    console.log('this.props = ' + JSON.stringify(this.props));
    console.log('this.state = ' + JSON.stringify(this.state));
    console.groupEnd();

    e.preventDefault();
    const { username, password } = this.state;
    this.props.Authorize(username, password);
  }

  render() {

    if (CONSOLE_LOG_COMPONENTS.includes(this.constructor.name)) {
        console.group('COMPONENT# ' + this.constructor.name + '.render()');
        console.log('this.props = ' + JSON.stringify(this.props));
        console.log('this.state = ' + JSON.stringify(this.state));
        console.groupEnd();
    }

    const { username, password, isValid } = this.state;
    const { authorizing } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={this.handleChange}
          disabled={authorizing}
          autoFocus
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.handleChange}
          disabled={authorizing}
        />
        <input
          type="submit"
          data-is_requested={ authorizing ? "yes" : "no" }
          value={ authorizing ? "Authorizing..." : "Let's Authorize" }
          disabled={ !isValid || authorizing } />
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactAuthForm);
