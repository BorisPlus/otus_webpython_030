import React from 'react';
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';
//import SignupForm from './SignupForm';

const mapStateToProps = (state) => {
  return { restApiToken: state.restApiToken };
};

class ReactNavigationMenu extends React.Component {
  render() {
    const { restApiToken } = this.props;
    return (
      <>
      {restApiToken ? <LogoutForm /> : <LoginForm />}
      </>
    );
  }
};

const ReduxNavigationMenu = connect(mapStateToProps)(ReactNavigationMenu);
export default ReduxNavigationMenu;