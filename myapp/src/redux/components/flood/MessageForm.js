import React, { Component } from "react";
import T from "prop-types";
import fetchRestJson from "../../api/api";

export default class MessageForm extends Component {

  static propTypes = {
    endpoint: T.string.isRequired
  };

  state = {
    text: "",
    valid: false,
    sending: false,
    last_response_status_ok: true,
    last_response_status_text: null,
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillUpdate(nextProps, nextState) {
    nextState.valid = true && nextState.text;
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ sending: true });
    const { text } = this.state;
    const data = {
        owner: localStorage.getItem('user_id'),
        text: text
    };
    console.log('Send data ' + JSON.stringify(data));
    const params = {
      method: "post",
      body: JSON.stringify(data),
      headers: new Headers({ "Content-Type": "application/json" })
    };
    console.log('... to endpoint ' + this.props.endpoint);

    fetchRestJson(this.props.endpoint, params)
    .then( json => {
      // console.log('... response.status ' + response.status);
      console.log('... response json ' + json);
      this.setState({
        sending: false,
        last_response_status_ok: true,
        last_response_status_text: null,
        text: ''
      });
    })
    .catch(error => {
      this.setState({
        text: this.state.text
      });
      setTimeout(() => {
        this.setState({
          last_response_status_ok: false,
          last_response_status_text: ''+error,
          sending: false
        });
      }, 1000);
    });
  };
  render() {
    const { text } = this.state;
    return (
      <div className="newline">
      <div className="form">
        {this.state.last_response_status_ok  ? null : <div className="error"> <b>Send error:</b> {this.state.last_response_status_text} </div> }
        <form onSubmit={this.handleSubmit}>
          <input
            className="input"
            type="text"
            name="text"
            placeholder="Enter text..."
            onChange={this.handleChange}
            value={text}
            required
            autoFocus
          />
          <input
            disabled={!this.state.valid || this.state.sending}
            data-is_sending={this.state.sending?"yes":"no"}
            className="submit"
            type="submit"
            name="submit"
            value={this.state.sending ? "Sending..." : "Send"}
          />
        </form>
      </div>
      </div>
    );
  }
}