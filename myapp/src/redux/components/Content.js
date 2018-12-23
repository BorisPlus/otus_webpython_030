import React, { Component } from 'react';
import ContentMain from './ContentMain';
import ContentAdditional from './ContentAdditional';


export default class Content extends Component {
  render() {
    return (
        <div class="content">
             <ContentAdditional />
             <ContentMain />
        </div>
    );
  }
}
