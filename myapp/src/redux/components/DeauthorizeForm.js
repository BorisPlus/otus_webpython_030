import React from 'react';
import { connect } from "react-redux";
import { Deauthorize } from "../actions/index";

const mapStateToProps = (state) => {
  return { username: state.username };
};

const mapDispatchToProps = dispatch => {
  return {
    Deauthorize: () => dispatch(Deauthorize())
  };
};

class ReactDeauthorizeForm extends React.Component {
  render() {
    const { username } = this.props;
    return (
      <>
        <a href="./logout"> ВЫЙТИ ({username}) </a>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactDeauthorizeForm);
