import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './static/frontend/min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      errorMessage: ''
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/core_app/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username, errorMessage: '' });
        });
    }
  }

  handle_login = (e, data) => {
   e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(
      responce => {
        try {
          const json = responce.json();
          return json;
        } catch (e) {
          throw e;
        }
      }
    )
    .then(json => {
      if(json.token) {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username
        });
      } else {
        this.setState({
            errorMessage: 'Incorrect username or password.',
        });
      }
    })
    .catch( e => {
      alert('' + e);
      this.setState({
        errorMessage: ''+e,
      });
    });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/core_app/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      if (json.token) {
          localStorage.setItem('token', json.token);
          this.setState({
            logged_in: true,
            displayed_form: '',
            username: json.username,
            errorMessage: ''
          });
      } else {
          localStorage.setItem('token', json.token);
          this.setState({
            logged_in: false,
            displayed_form: '',
            username: '',
            errorMessage: json.username
          });
      }

    });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '',
          errorMessage: null });
  };

  display_form = form => {
    this.setState({
      displayed_form: form,
      errorMessage: null
    });
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }
    return (
      <div className="App">
        {this.state.errorMessage ? <div className={`error center`}>{this.state.errorMessage}</div> : ''}
        <div className='center'>
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        </div>
        {form}
        <h3 className='center'>
          {this.state.logged_in
            ? `Hello, ${this.state.username}`
            : 'You are not authorize'}
        </h3>
      </div>
    );
  }
}

export default App;