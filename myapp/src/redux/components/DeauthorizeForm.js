import React from 'react';
import { connect } from "react-redux";
import { Deauthorize } from "../actions/index";

const mapStateToProps = (state) => {
  return { username: state.authReducer.username };
};

const mapDispatchToProps = dispatch => {
  return {
    Deauthorize: () => dispatch(Deauthorize())
  };
};

class ReactDeauthorizeForm extends React.Component {
  render() {
    console.group('ReactDeauthorizeForm rendering...');
    console.log('this.props = ' + JSON.stringify(this.props));
    console.log('this.state = ' + JSON.stringify(this.state));
    console.groupEnd();
    const { username } = this.props;
    return (
      <>
        <a href="./logout"> ВЫЙТИ ({username}) </a>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactDeauthorizeForm);
