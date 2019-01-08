import React from "react";
import {connect} from 'react-redux';
import key from "weak-key";
import Chat from "./Chat";
import DeAuthorizeLink from "../../../../src/components/auth/DeAuthorizeLink";
import {
  LoadChats, CloseSideNav
} from "../../../../src/actions/index";

import {
  CONSOLE_LOG_COMPONENTS,
} from "../../../../src/settings";

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
    this.loadChats();
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
      <div key={key(chat)}>
        <Chat owner={chat.owner} name={chat.name} created_at={chat.created_at} id={chat.id} />
      </div>
    ) : [] ;

    return (
      <>
        <div id="mySideNav" className="sideNav" style={divStyle}>
          <div className="sideNavSpan"><span className="closeBtn" onClick={this.closeSideNav}>&raquo;</span></div>
          {
            chats && chats.length === 0 ?
            <span className="sideNavItemDisabled">Chat list is empty :(</span> :
            chats_obj
          }
          {
            loading && wasOnceLoaded ?
              <span className="notice">Reloading chat list...</span> :
              loading && !wasOnceLoaded ?
                <span className="notice">Loading chat list...</span> :
                null
          }
          <img alt='delimiter' width='15' className="sideNavItem" src="favicon.818181.ico" />
          <span className="sideNavItem">HOME</span>
          <span className="sideNavItemDisabled">DISABLED</span>
          {isAuthorize ? <DeAuthorizeLink /> : null}
          { errorMessage ? <span className="sideNavItemError"> { errorMessage } </span> : null }
        </div>
      </>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactChatList);