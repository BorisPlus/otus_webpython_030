import React from 'react';
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { doLogout } from "../actions/index";

const mapStateToProps = (state) => {
  return { username: state.username };
};

const mapDispatchToProps = dispatch => {
  return {
    doLogout: () => dispatch(doLogout())
  };
};

class ReactLogoutForm extends React.Component {

  render() {
    const { username } = this.props;
    return (
      <>
        <a href="./logout" name="doLogout"> ВЫЙТИ ({username}) </a>
      </>
    );
  }
}

const ReduxLogoutForm = connect(mapStateToProps, mapDispatchToProps)(ReactLogoutForm);
export default ReduxLogoutForm;