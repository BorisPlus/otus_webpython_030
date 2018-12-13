import React, { Component } from "react";
import T from "prop-types";
import Message from "./Message";
import fetch_rest from "../../api/data_fetcher";
import key from "weak-key";
export default class MessageList extends Component {
  static propTypes = {
    endpoint: T.string.isRequired,
    token: T.string.isRequired,
  };
  state = {
    data: [],
    loaded: false,
    placeholder: "Loading..."
  };

  loadDataFromServer(component) {
    fetch_rest(component.props.endpoint, component.props.token)
    .then(messages => component.setState({ messages: messages, loaded: true }))
    .catch(error => component.setState({ placeholder: '' + error.message }))
    ;
  }

//  loadDataFromServer(component) {
//    fetch('http://localhost:8000/api/ver.0/message/list')
//    .then(response => {
//      if (response.status !== 200) {
//        console.log('response.status ' + response.status);
//        return component.setState({ placeholder: response.status });
//      }
//      return response.json();
//    })
//    .then(messages => component.setState({ messages: messages, loaded: true }));
//  }

  componentDidMount() {
    this.loadDataFromServer(this);
    setInterval(this.loadDataFromServer.bind(null, this), 5000);
  }
  render() {
    const { messages, loaded, placeholder } = this.state;
    if (!loaded) {
      return <p>{placeholder}</p>;
    }
    if (loaded && typeof messages === 'undefined') {
      return <p>{placeholder}</p>;
    }
    if (loaded && messages.length === 0) {
      return <p>Flood is empty :(</p>;
    }
    const messages_obj = messages.map((message) =>
      <div key={key(message)}>
        <Message name={message.owner} message={message.text} created_at={message.created_at} />
      </div>
    );
    return (
      <div className="messages">
        {messages_obj}
      </div>
    );
  }
}