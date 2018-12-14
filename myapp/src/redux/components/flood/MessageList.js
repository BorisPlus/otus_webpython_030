import React, { Component } from "react";
import T from "prop-types";
import Message from "./Message";
import fetchRestJson from "../../api/api";
import key from "weak-key";
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    state: state,
    restApiToken: state.authReducer.restApiToken,
    username: state.authReducer.username
});

class MessageList extends Component {
  static propTypes = {
    endpoint: T.string.isRequired,
  };
  state = {
    data: [],
    loaded: false,
    placeholder: "Loading...",
    restApiToken: null,
    username: null
  };

  loadDataFromServer(component) {
    fetchRestJson(component.props.endpoint)
    .then(messages => component.setState({ messages: messages, loaded: true }))
    .catch(error => component.setState({ error: error }))
  };

//  REFACTORED
//  loadDataFromServerVersion(component) {
//    const restApiToken = component.props.restApiToken;
//    const rest_url = 'http://localhost:8000/api/ver.0/message/list';
//    fetch(rest_url, {
//        headers: {
//            Authorization: `JWT ${localStorage.getItem('restApiToken')}`
//        }
//      })
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
//    setInterval(this.loadDataFromServer.bind(null, this), 5000);
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
        <Message owner={message.owner} text={message.text} created_at={message.created_at} />
      </div>
    );
    return (
      <div className="messages">
        {messages_obj}
      </div>
    );
  }
};

export default connect(mapStateToProps)(MessageList);