import React from "react";
import {connect} from 'react-redux';
import {
    SetCurrentChatId,
    CloseSideBar,
} from "../../../actions/index";

const mapStateToProps = (state) => ({
  currentChatId: state.chtReducer.currentChatId
});

const mapDispatchToProps = dispatch => {
  return {
    CloseSideBar: () => dispatch(CloseSideBar()),
    SetCurrentChatId: (chatId) => dispatch(SetCurrentChatId(chatId)),
  };
};

class ReactChat extends React.Component {

  closeSideBar = () => {
    this.props.CloseSideBar()
  };


  setCurrentChatId = (chatId) => {
    this.props.SetCurrentChatId(chatId);
    this.closeSideBar();
  };

  render() {
    const { id, name, currentChatId } = this.props;
    const isCurrentChat = (currentChatId === id) ? 'currentChat' : null;
    return (
      <a href='./#' onClick={() => this.setCurrentChatId(id)} className={ isCurrentChat }>
        { name }
      </a>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactChat);