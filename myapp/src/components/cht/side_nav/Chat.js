import React from "react";
import {connect} from 'react-redux';
import {
    SetCurrentChatId,
    CloseSideNav,
} from "../../../../src/actions/index";

const mapStateToProps = (state) => ({
  currentChatId: state.chtReducer.currentChatId
});

const mapDispatchToProps = dispatch => {
  return {
    CloseSideNav: () => dispatch(CloseSideNav()),
    SetCurrentChatId: (chatId) => dispatch(SetCurrentChatId(chatId)),
  };
};

class ReactChat extends React.Component {

  closeSideNav = () => {
    this.props.CloseSideNav()
  };


  setCurrentChatId = (chatId) => {
    this.props.SetCurrentChatId(chatId);
    this.closeSideNav();
  };

  render() {
    const { id, name, currentChatId } = this.props;
    const isCurrentChat = (currentChatId === id) ? 'sideNavItem currentChat' : "sideNavItem";
    return (
      <span onClick={() => this.setCurrentChatId(id)} className={ isCurrentChat }>
        { name }
      </span>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactChat);