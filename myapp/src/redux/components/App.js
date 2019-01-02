import React from 'react';
import {connect} from 'react-redux';
//import appDescription from '../constants/gui/variables';
//import PageContent from './PageContent';
import AuthorizeForm from './auth/AuthorizeForm';
import ChatList from './cht/side_nav/ChatList';
import ChatMessageList from './msg/ChatMessageList';
import { LoadChats, OpenSideNav, CloseSideNav } from "../actions/index";

import {
  CONSOLE_LOG_COMPONENTS,
} from "../../../src/settings";

const mapStateToProps = (state) => ({
  styleWidth: state.sideNavReducer.styleWidth,
  authError: state.authReducer.error,
  isAuthorize: state.authReducer.isAuthorize,


});

const mapDispatchToProps = dispatch => {
  return {
    LoadChats: () => dispatch(LoadChats()),
    OpenSideNav: () => dispatch(OpenSideNav()),
    CloseSideNav: () => dispatch(CloseSideNav()),
  };
};

class ReactApp extends React.Component {

  constructor() {
    super();
    this.state = {}
  }

  openSideNav = () => {
    this.props.LoadChats();
    this.props.OpenSideNav();
  };

  closeSideNav = () => {
    this.props.CloseSideNav()
  };

  render() {

    if (CONSOLE_LOG_COMPONENTS.includes(this.constructor.name)) {
        console.group('COMPONENT# ' + this.constructor.name + '.render()');
        console.log('this.props = ' + JSON.stringify(this.props));
        console.log('this.state = ' + JSON.stringify(this.state));
        console.groupEnd();
    }

    const { authError, isAuthorize } = this.props;
    if (authError) {
        console.log('authError = ' + authError);
    }
    console.groupEnd();

//    const isAuthorize = (localStorage.getItem('user_id') !== null);
    return (
      <div className="App">
        { isAuthorize ?
        <div className="root">
          <ChatList />
          <div className="sideNavSpan">
            <span className="sideNavSpanSticky" onClick={this.openSideNav}>&laquo;</span>
          </div>
          <div id="main">
            <ChatMessageList />
          </div>
        </div> :
        <div className="root">
          <div className="superCenter">
            < AuthorizeForm />
            { localStorage.getItem('user_id') }
            { localStorage.getItem('restApiToken') }
          </div>
        </div> }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactApp);
