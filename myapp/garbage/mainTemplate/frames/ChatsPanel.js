import React, { Component } from 'react';
import ChatPanel from '../../cht/ChatPanel';


export default class Frame extends Component {
    render() {
        return (
            <div class="chats_panel_frame">
                <ChatPanel />
            </div>
        );
    }
}
