import React from 'react';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
  state = {
    username: '',
    password: '',
    valid: false
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { prevstate };
      newState[name] = value;
      return newState;
    });
  };

  componentWillUpdate(nextProps, nextState) {
    nextState.valid = nextState.username && nextState.password;
  }

  render() {
    return (
      <form onSubmit={e => this.props.handle_login(e, this.state)}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={this.state.username}
          onChange={this.handle_change}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handle_change}
        />
        <input
          type="submit"
          value="Let's Log In"
          disabled={!this.state.valid} />
      </form>
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};