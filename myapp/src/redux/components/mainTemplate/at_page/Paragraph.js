import React, { Component } from 'react';

export default class Paragraph extends Component {
  render() {
    return (
      <p>
        { this.props.content.indexOf('</') !== -1
            ? (
                <div dangerouslySetInnerHTML={{__html: this.props.content.replace(/(<? *script)/gi, 'illegalscript')}} >
                </div>
              )
            : this.props.content
          }
      </p>
    );
  }
}
