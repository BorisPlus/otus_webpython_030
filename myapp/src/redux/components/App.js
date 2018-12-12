import React from 'react';
import PageContent from './PageContent';

class App extends React.Component {
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
    return (
      <div className="App">
        { error ? <div className={`error center`}>{error}</div> : '' }
        <div className='center'>
          <PageContent/>
        </div>
      </div>
    );
  }
}

export default App;