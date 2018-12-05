import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from 'moment';
export default class Message extends Component {
  render() {
    return (
      <div className="message">
        <b>{this.props.name}</b> (
          {Moment(this.props.created_at).format('DD.MM.YYYY HH:mm')}
        ): {this.props.message}
      </div>
    );
  }
}