import React from "react";
import {connect} from 'react-redux';
import key from "weak-key";
import { Link } from 'react-router-dom';
//import Chat from "./Chat";
import DeAuthorizeLink from "../../../src/components/auth/DeAuthorizeLink";
//import AuthorizeForm from "../../../src/components/auth/AuthorizeForm";
import {
  LoadChats, CloseSideNav, SetCurrentChat
} from "../../../src/actions/index";

import {
  CONSOLE_LOG_COMPONENTS,
} from "../../../src/settings";

const mapStateToProps = (state) => ({
  wasOnceLoaded: state.chtReducer.wasOnceLoaded,
  loading: state.chtReducer.loading,
  chats: state.chtReducer.chats,
  errorMessage: state.chtReducer.errorMessage,
  styleWidth: state.sideNavReducer.styleWidth,
  isAuthorize: state.authReducer.isAuthorize,
});

const mapDispatchToProps = dispatch => {
  return {
    LoadChats: () => dispatch(LoadChats()),
    CloseSideNav: () => dispatch(CloseSideNav()),
    SetCurrentChat: (chatId, chatName) => dispatch(SetCurrentChat(chatId, chatName)),
  };
};

class ReactChatList extends React.Component {

  constructor() {
    super();
    this.state = {}
  }

  loadChats = () => {
    this.props.LoadChats()
  };

  closeSideNav = () => {
    this.props.CloseSideNav()
  };

  componentDidMount() {
    const { isAuthorize } = this.props;
    if (isAuthorize) {
      this.loadChats();
    }
  }

//  setCurrentChat = (chatId, chatName) => {
//    this.props.SetCurrentChat(chatId, chatName);
//  };

  selectChat = (chatId, chatName) => {
    this.props.SetCurrentChat(chatId, chatName);
    this.closeSideNav();
  }

  render() {

    if (CONSOLE_LOG_COMPONENTS.includes(this.constructor.name)) {
        console.group('COMPONENT# ' + this.constructor.name + '.render()');
        console.log('this.props = ' + JSON.stringify(this.props));
        console.log('this.state = ' + JSON.stringify(this.state));
        console.groupEnd();
    }

    const { loading, chats, wasOnceLoaded, styleWidth, isAuthorize, errorMessage } = this.props;
    const divStyle = {
      width: styleWidth,
    };

    const chats_obj = chats ? chats.map((chat) =>
      <Link className="sideNavItem"  onClick={() => this.selectChat(chat.id, chat.name)} key={key(chat)} to={'/chat/' + chat.id}>
        {chat.name}
      </Link>
    ) : [] ;

    return (
      <>
        <div id="mySideNav" className="sideNav" style={divStyle}>
          <div className="sideNavSpan"><span className="closeBtn" onClick={this.closeSideNav}>&raquo;</span></div>

          {
            loading && wasOnceLoaded ?
              <span className="notice">Reloading chat list...</span> :
              loading && !wasOnceLoaded ?
                <span className="notice">Loading chat list...</span> :
                null
          }

          {
            isAuthorize  && chats && chats.length === 0 ?
            <span className="sideNavItemDisabled">Chat list is empty :(</span> :
            chats_obj
          }

          {
            isAuthorize  && !chats && !loading?
            <span className="sideNavItemError">Please, reauthorize :(</span> :
            null
          }

          <div className="sideNavItemDisabled">
            <img alt='----' width='15' src="/favicon.818181.ico" />
          </div>

          <Link className="sideNavItem" onClick={this.closeSideNav} to='/'>HOME</Link>
          <Link className="sideNavItem" onClick={this.closeSideNav} to='/contacts'>CONTACTS</Link>

          <div className="sideNavItemDisabled">
            <img alt='----' width='15' src="/favicon.818181.ico" />
          </div>

          {
            isAuthorize ?
            <DeAuthorizeLink /> :
            <Link className="sideNavItem" onClick={this.closeSideNav} to='/authorize'>AUTHORIZE</Link>
          }
          { errorMessage ? <span className="sideNavItemError"> { errorMessage } </span> : null }
        </div>
      </>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactChatList);