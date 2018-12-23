import React, { Component } from 'react';
import ChatsPanel from './ChatsPanel';
import ChatMessages from './ChatMessages';


export default class Frame extends Component {
  render() {
    return (
        <div class="chats_frame">
             <ChatsPanel />
             <ChatMessages />
        </div>
    );
  }
}
