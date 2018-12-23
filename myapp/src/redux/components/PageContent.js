import React from 'react';
import { connect } from "react-redux";
import NavigationMenu from './nav/NavigationMenu';
//import MessageList from "./msg/MessageList";
import ChatList from "./cht/ChatList";

const mapStateToProps = (state) => ({
    kickMe: state.authReducer.kick,
    // pushMeAndJustTouchMeSoICanGetMySatisfaction: state.authReducer.pushMeAndJustTouchMeSoICanGetMySatisfaction
});

class ReactPageContent extends React.Component {
  render() {

    console.group('PageContent.render()');
    console.log('this.props = ' + JSON.stringify(this.props));
    console.log('this.state = ' + JSON.stringify(this.state));
    // console.log('this.props.state = ' + JSON.stringify(this.props.state));
    console.groupEnd();

    // const {pushMeAndJustTouchMeSoICanGetMySatisfaction} = this.props;
    const isAuthorize = (localStorage.getItem('user_id') !== null);
    const username = localStorage.getItem('username');
    const {kickMe} = this.props; // need for global render auth kick :)
    if (kickMe);
    // I need for global render auth kick and wanna ignore:
    // Compiled with warnings.
    // ./src/redux/components/***
    // 'kickMe' is assigned a value but never used  no-unused-vars

    return (
      <div id="content">
        <div className='center'>
          { isAuthorize ? "Well coming, my dear \"" + username + "\"." : 'Authorize for the fl.oOo.d :)' }
          <NavigationMenu/>
        </div>
        <div className='center'>
          <ChatList />
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps)(ReactPageContent);
