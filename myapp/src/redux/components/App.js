import React from 'react';
import PageContent from './PageContent';
import WhatIsTheTimeNow from "./features/WhatIsTheTimeNow";
import {connect} from 'react-redux';


const mapStateToProps = (state) => ({
    state: state,
//    restApiToken: state.authReducer.restApiToken,
//    username: state.authReducer.username
});

class App extends React.Component {
  state = {
    restApiToken: null,
    username: null
  };
  componentDidMount() {
    const { restApiToken } = this.props;
    if (restApiToken) {
      fetch('http://localhost:8000/core_app/current_user/', {
        headers: {
            Authorization: `JWT ${restApiToken}`
        }
      })
      .then(res => res.json())
      .then(json => {this.setState({ username: json.username })});
    }
  }
  render() {
    console.group('App rendering...');
    console.log('this.props = ' + JSON.stringify(this.props));
    console.log('this.state = ' + JSON.stringify(this.state));
    console.log('this.props.state = ' + JSON.stringify(this.props.state));
    const error = this.props.state.authReducer.error ? this.props.state.authReducer.error : null;
    if (error) {
        console.log('error = ' + error);
    }
    console.groupEnd();
//    const { restApiToken, username } = this.props;
    return (
      <div className="App">
        { error ? <div className={`error center`}>{error}</div> : '' }
        <div className='center'>
          <WhatIsTheTimeNow/>
        </div>
        <div className='center'>
          <PageContent/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);