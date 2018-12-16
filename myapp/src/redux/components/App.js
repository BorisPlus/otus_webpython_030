import React from 'react';
import {connect} from 'react-redux';
import PageContent from './PageContent';


const mapStateToProps = (state) => ({
    state: state
});

class App extends React.Component {
  render() {
    console.group('App rendering...');
    console.log('this.props = ' + JSON.stringify(this.props));
    console.log('this.state = ' + JSON.stringify(this.state));
    console.log('this.props.state = ' + JSON.stringify(this.props.state));
    const appError = this.props.state.authReducer.error ? this.props.state.authReducer.error : null;
    if (appError) {
        console.log('appError = ' + appError);
    }
    console.groupEnd();
    return (
      <div className="App">
        { appError ? <div className={`error center`}>{appError}</div> : '' }
        <div className='center'>
          <PageContent/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);