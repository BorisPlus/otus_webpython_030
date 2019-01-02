import React, { Component } from 'react';

export default class Link extends Component {
  render() {
    return (
        <>
            <a class='link' target={this.props.target || 'parent'} href={this.props.href}>
                {this.props.content}
            </a>
            {this.props.description}
        </>
    );
  }
};
