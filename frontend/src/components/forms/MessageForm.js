import React, { Component } from "react";
import PropTypes from "prop-types";
export default class MessageForm extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired
  };
  state = {
    name: "",
    message: "",
    valid: false,
    sending: false,
    last_response_status_ok: true,
    last_response_status_text: null,
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentWillUpdate(nextProps, nextState) {
    nextState.valid = nextState.name && nextState.message;
  }
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ sending: true });
    const { name, message } = this.state;
    const flood = { name, message };
    const conf = {
      method: "post",
      body: JSON.stringify(flood),
      headers: new Headers({ "Content-Type": "application/json" })
    };
    fetch(this.props.endpoint, conf)
    .then(
      response => {
        if (response.status) {
            this.setState({
                sending: false,
                last_response_status_ok: response.ok,
                last_response_status_text: response.statusText
            });
            if (response.ok) {
                this.setState({ name: this.state.name, message: "" });
            }
        }
      },
      error => {
        this.setState({
            name: this.state.name,
            message: this.state.message
        });
        setTimeout(() => {
            this.setState({
                last_response_status_ok: false,
                last_response_status_text: ''+error,
                sending: false
            });
        }, 1000);
      }
    )
  };
  render() {
    const { name, message } = this.state;
    return (
      <div className="newline">
      <div className="form">
        {this.state.last_response_status_ok  ? null : <div className="error"> <b>Send error:</b> {this.state.last_response_status_text} </div> }
        <form onSubmit={this.handleSubmit}>
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Enter your nickname"
            onChange={this.handleChange}
            value={name}
            required
          />
          <input
            className="input"
            type="text"
            name="message"
            placeholder="Enter new message here"
            onChange={this.handleChange}
            value={message}
            required
          />
          <input
            disabled={!this.state.valid || this.state.sending}
            data-is_sending={this.state.sending?"yes":"no"}
            className="submit"
            type="submit"
            name="submit"
            value={this.state.sending ? "Sending..." : "To send"}
          />
        </form>
      </div>
      </div>
    );
  }
}