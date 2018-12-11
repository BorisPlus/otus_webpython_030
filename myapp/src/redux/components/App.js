import React from 'react';
import NavigationMenu from './NavigationMenu';

class App extends React.Component {
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