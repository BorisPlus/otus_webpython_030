import React from 'react';
import { connect } from "react-redux";
import AuthorizeForm from '../auth/AuthorizeForm';
import DeauthorizeForm from '../auth/DeauthorizeForm';
import ChatForm from "../cht/ChatForm";

const mapStateToProps = (state) => ({
    kickMe: state.authReducer.kick
});

class ReactNavigationMenu extends React.Component {
  render() {

    console.group('ReactNavigationMenu.render()');
    console.log('this.props = ' + JSON.stringify(this.props));
    console.log('this.state = ' + JSON.stringify(this.state));
    console.groupEnd();

    const {kickMe} = this.props; // need for global render auth kick :)
    if (kickMe);
    // I need for global render auth kick and wanna ignore:
    // Compiled with warnings.
    // ./src/redux/components/***
    // 'kickMe' is assigned a value but never used  no-unused-vars

    const isAuthorize = (localStorage.getItem('user_id') !== null);
    return (
      <>
      { isAuthorize ?
        (
          <>
            <DeauthorizeForm />
            <ChatForm />
          </>
        ) :
        < AuthorizeForm /> }
      </>
    );
  }
};

export default connect(mapStateToProps)(ReactNavigationMenu);
