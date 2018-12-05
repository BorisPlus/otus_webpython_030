import React, { Component } from "react";
import PropTypes from "prop-types";
import Message from "./Message";
import key from "weak-key";
export default class MessageList extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired
  };
  state = {
      data: [],
      loaded: false,
      placeholder: "Loading..."
  };
  loadDataFromServer(component) {
    fetch(component.props.endpoint)
    .then(response => {
      if (response.status !== 200) {
        return component.setState({ placeholder: response.status });
      }
      return response.json();
    })
    .then(messages => component.setState({ messages: messages, loaded: true }));
  }

  componentDidMount() {
    this.loadDataFromServer(this);
    setInterval(this.loadDataFromServer.bind(null, this), 5000);
  }
  render() {
    const { messages, loaded, placeholder } = this.state;
    if (!loaded) {
      return <p>{placeholder}</p>;
    }
    if (loaded && messages.length === 0) {
      return <p>chat is empty</p>;
    }
    const messages_obj = messages.map((message) =>
      <div key={key(message)}>
        <Message name={message.name} message={message.message} created_at={message.created_at} />
      </div>
    );
    return (
      <div className="messages">
        {messages_obj}
      </div>
    );
  }
}