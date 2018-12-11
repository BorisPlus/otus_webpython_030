import React from 'react';
import { connect } from "react-redux";
import { Authorize } from "../actions/index";


const mapStateToProps = state => ({
    username: state.username,
    password: state.password,
    authorizing: state.authorizing,
    isValid: state.isValid
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

  handleSubmit = (e, data) => {
    e.preventDefault();
    const { username, password } = this.state;
    console.log('ReactAuthForm: handleSubmit');
    this.props.Authorize(username, password);
  }

  componentDidMount() {
    console.log('componentDidMount ' + this.props.username);
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.isValid = (nextState.username && nextState.password) ? true : false;
  }

  render() {
    console.log('ReactAuthForm rendering...');
    const { username, password, isValid, authorizing } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={this.handleChange}
          disabled={authorizing}
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
          value={ authorizing ? "Authorizing..." : "Let's Authorize" }
          disabled={!isValid || authorizing} />
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactAuthForm);
