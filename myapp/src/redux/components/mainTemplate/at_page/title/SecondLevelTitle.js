import React, { Component } from 'react';


export default class SecondLevelTitle extends Component {
  render() {
    return (
        <h2>{this.props.content}</h2>
    );
  }
};