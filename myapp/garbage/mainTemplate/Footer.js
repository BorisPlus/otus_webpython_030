import React, { Component } from 'react';


export default class Footer extends Component {
  render() {
    const {project} = this.props;
    return (
        <div class="footer">
            {project.footer}
        </div>
    );
  }
}
