import React, { Component } from 'react';
import ThirdLevelTitle from './title/ThirdLevelTitle';

export default class List extends Component {
  render() {
      const listName = <ThirdLevelTitle content={this.props.name} />;
      const listItems = this.props.items.map((item) =>
         <li className="note">
                {item}
         </li>
      );
      return (
        <>
            {listName}
            <ul className="notes">
                {listItems}
            </ul>
        </>
      );
  }
};
