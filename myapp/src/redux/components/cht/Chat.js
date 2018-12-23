import React from "react";
//import Moment from 'moment';
export default class Chat extends React.Component {
  render() {
    return (
      <div className="chat">
        {this.props.name}
      </div>
    );
  }
}