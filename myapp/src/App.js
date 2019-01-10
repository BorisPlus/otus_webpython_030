import React from 'react';
import {connect} from 'react-redux';
import AuthorizeForm from './components/auth/AuthorizeForm';
//import ChatList from './components/cht/side_nav/ChatList';
import SideNav from './components/side_nav/SideNav';
import ChatMessageList from './components/msg/ChatMessageList';
import { Home } from './components/pages/home';
import { Contacts } from './components/pages/contacts';
import { LoadChats, OpenSideNav, CloseSideNav } from "./actions/index";

import { Switch, Route } from 'react-router-dom';
//import key from "weak-key";


import {
  CONSOLE_LOG_COMPONENTS,
} from "./settings";

const mapStateToProps = (state) => ({
  styleWidth: state.sideNavReducer.styleWidth,
  authError: state.authReducer.errorMessage,
  isAuthorize: state.authReducer.isAuthorize,
  currentUserId: state.authReducer.userId,
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
    const { isAuthorize } = this.props;
    if (isAuthorize) {
      this.props.LoadChats();
    }
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

    const { authError } = this.props;
    if (authError) {
        console.log('authError = ' + authError);
    }
    console.groupEnd();

    //<p style={{wordWrap: 'break-word'}}>token: { localStorage.getItem('restApiToken') }</p>
    //<p style={{wordWrap: 'break-word'}}>userId: { localStorage.getItem('userId') }</p>
    //<p style={{wordWrap: 'break-word'}}>username: { localStorage.getItem('username') }</p>
    return (
      <div className="App">
        <div className="root">
          { authError ? <div className="errorMessage"> { authError } </div> : null}

          <SideNav />

          <div className="sideNavSpan">
            <span className="sideNavSpanSticky" onClick={this.openSideNav}>&laquo;</span>
          </div>

          <div id="main">
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/home' component={Home}/>
              <Route exact path='/contacts' component={Contacts}/>
              <Route exact path='/authorize' component={AuthorizeForm}/>
              <Route exact path='/chat/:chat_pk' component={ChatMessageList}/>
            </Switch>
          </div>
        </div>
      </div>
    );
//    return (
//      <div className="App">
//        { isAuthorize ?
//        <div className="root">
//          <SideNav />
//          <div className="sideNavSpan">
//            <span className="sideNavSpanSticky" onClick={this.openSideNav}>&laquo;</span>
//          </div>
//          <div id="main">
//            <ChatMessageList />
//          </div>
//        </div> :
//        <div className="root">
//          { authError ? <div className="errorMessage"> { authError } </div> : null}
//          <div className="superCenter">
//            < AuthorizeForm />
//          </div>
//        </div> }
//      </div>
//    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactApp);
