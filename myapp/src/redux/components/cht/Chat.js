import React from "react";
import Moment from 'moment';
export default class Chat extends React.Component {
  render() {
    return (
      <div className="chat">
        <b>{this.props.owner}</b> (
          {Moment(this.props.created_at).format('DD.MM.YYYY HH:mm')}
        ): {this.props.name}
      </div>
    );
  }
}