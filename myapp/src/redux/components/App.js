import React from 'react';
//import PropTypes from 'prop-types';
import NavigationMenu from './NavigationMenu';
//import SignupForm from './SignupForm';
import '../../static/frontend/min.css';

class App extends React.Component {
//  constructor(props) {
//    super(props);
//    this.state = {
//      displayed_form: '',
//      logged_in: localStorage.getItem('token') ? true : false,
//      username: '',
//      errorMessage: ''
//    };
//  }
//
//  componentDidMount() {
//    const { restApiToken } = this.state;
//    if (restApiToken) {
//      fetch('http://localhost:8000/core_app/current_user/', {
//        headers: {
//          Authorization: `JWT ${localStorage.getItem('token')}`
//        }
//      })
//        .then(res => res.json())
//        .then(json => {
//          this.setState({ username: json.username, errorMessage: '' });
//        });
//    }
//  }

  render() {
    const {errorMessage} = this.props;
    return (
      <div className="App">
        {errorMessage ? <div className={`error center`}>{errorMessage}</div> : ''}
        <div className='center'>
          <NavigationMenu/>
        </div>
      </div>
    );
  }
}

export default App;