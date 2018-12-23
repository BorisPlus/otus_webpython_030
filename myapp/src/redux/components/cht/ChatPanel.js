import React from "react";
import ChatForm from "./ChatForm";
import ChatList from "./ChatList";

class ReactChatPanel extends React.Component {

  render() {
    return (
      <>
          <ChatForm />
          <ChatList />
      </>
    );
  }
};

export default ReactChatPanel;