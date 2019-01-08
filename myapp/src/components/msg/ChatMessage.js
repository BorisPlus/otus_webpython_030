import React from "react";
import {connect} from 'react-redux';
import Moment from 'moment';
const mapStateToProps = (state) => ({
  currentUserId: state.authReducer.userId,
});
class ReactChatMessage extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  render() {
    const { owner, owner_id, currentUserId, text, created_at } = this.props;
    const className = (owner_id === parseInt(currentUserId)) ? "message your": "message other";
    return (
      <div className={className}>
        <div className="owner">{ owner }:&nbsp;</div><div className="text">{ text }</div>
        <div className="createAt">{ Moment(created_at).format('DD.MM.YYYY HH:mm') }</div>
      </div>
    );
  }
};

export default connect(mapStateToProps)(ReactChatMessage);