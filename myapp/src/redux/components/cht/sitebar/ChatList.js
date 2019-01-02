import React from "react";
import {connect} from 'react-redux';
import key from "weak-key";
import Chat from "./Chat";
import DeAuthorizeLink from "../../auth/DeAuthorizeLink";
import { LoadChats, CloseSideBar } from "../../../actions/index";

import {
  CONSOLE_LOG_COMPONENTS,
} from "../../../constants/settings/index";

const mapStateToProps = (state) => ({
  wasOnceLoaded: state.chtReducer.wasOnceLoaded,
  loading: state.chtReducer.loading,
  chats: state.chtReducer.chats,
  errorMessage: state.chtReducer.errorMessage,
  styleWidth: state.sidebarReducer.styleWidth,
  isAuthorize: state.authReducer.isAuthorize,
});

const mapDispatchToProps = dispatch => {
  return {
    LoadChats: () => dispatch(LoadChats()),
    CloseSideBar: () => dispatch(CloseSideBar()),
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

  closeSideBar = () => {
    this.props.CloseSideBar()
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

    const { loading, chats, wasOnceLoaded, styleWidth, isAuthorize } = this.props;
    const divStyle = {
      width: styleWidth,
    };
    if (wasOnceLoaded && chats.length === 0) {
      return <p className="center">Chat list is empty :(</p>;
    }
    const chats_obj = chats ? chats.map((chat) =>
      <div key={key(chat)}>
        <Chat owner={chat.owner} name={chat.name} created_at={chat.created_at} id={chat.id} />
      </div>
    ) : [] ;

    return (
      <>
        <div id="mySideNav" className="sideNav" style={divStyle}>
          <div className="sideNavSpan"><span className="closeBtn" onClick={this.closeSideBar}>&raquo;</span></div>
          {loading && !wasOnceLoaded ? <div className="a"><i>Loading chat list...</i></div> : null}
          {chats_obj}
          {loading && wasOnceLoaded ? <div className="a"><i>Reloading chat list...</i></div> : <div className="a">&nbsp;</div>}
          <a href='./#'>HOME</a>
          {isAuthorize ? <DeAuthorizeLink /> : null}
        </div>
      </>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactChatList);