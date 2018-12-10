import React from 'react';
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
//import uuidv1 from "uuid";
import { doLogin } from "../actions/index";
//import { justForTest } from "../actions/index";


const mapStateToProps = (state) => {
//  return { username: state.username };
  return { data: state.data };
};

const mapDispatchToProps = dispatch => {
  return {
//    justForTest: () => dispatch(justForTest()),
//    doLogin: (username, password) => dispatch(doLogin(username, password))
    doLogin: (data) => dispatch(doLogin(data))
  };
};


//const mergeProps = (stateProps, dispatchProps) => {
//    const { username, password } = stateProps;
//    const { dispatch } = dispatchProps;
//    const toggle = (username, password) => {
//        dispatch(doLogin(username, password));
//    };
//
//    return {
//        username: username,
//        password: password,
////        justForTest: () => dispatch(justForTest()),
//        doLogin: () => {
//            toggle(username, password);
//        }
//    };
//};

class ReactLoginForm extends React.Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      isValid: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e, data) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { restApiToken1 } = this.props;
    alert('restApiToken(1): '+restApiToken1);
//    this.props.justForTest();
    this.props.doLogin(data);
    const { restApiToken2 } = this.props;
    alert('restApiToken(2): '+restApiToken2);
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.isValid = (nextState.username && nextState.password) ? true : false;
  }

  render() {
    const { username, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.handleChange}
        />
        <input
          type="submit"
          value="Let's Log In"
          disabled={!this.state.isValid} />
      </form>
    );
  }
}

//const ReduxLoginForm = connect(mapStateToProps, null, mergeProps)(ReactLoginForm);
//const ReduxLoginForm = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ReactLoginForm);
//const ReduxLoginForm = connect(mapStateToProps, null, mergeProps)(ReactLoginForm);
//const ReduxLoginForm = connect(mapStateToProps, null, null)(ReactLoginForm);
const ReduxLoginForm = connect(mapStateToProps, mapDispatchToProps, null)(ReactLoginForm);
export default ReduxLoginForm;