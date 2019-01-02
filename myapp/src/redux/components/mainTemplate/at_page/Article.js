import React, { Component } from 'react';
import SecondLevelTitle from './title/SecondLevelTitle';
import Paragraph from './Paragraph';

export default class Article extends Component {
  render() {
      const title = <SecondLevelTitle content={this.props.title}/> ;
      const paragraphs = this.props.paragraphs.map((paragraph) =>
         <Paragraph content={paragraph} />
      );
      return (
        <>
            {title}
            {paragraphs}
        </>
      );
  }
};