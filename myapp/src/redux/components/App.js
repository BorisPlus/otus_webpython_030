import React from 'react';
import {connect} from 'react-redux';
import PageContent from './PageContent';

const mapStateToProps = (state) => ({
  authError: state.authReducer.error
});

class ReactApp extends React.Component {
  render() {

    console.group('ReactApp.render()');
    console.log('this.props = ' + JSON.stringify(this.props));
    console.log('this.state = ' + JSON.stringify(this.state));
    console.log('this.props.state = ' + JSON.stringify(this.props.state));
//    const appError = this.props.state.authReducer.error ? this.props.state.authReducer.error : null;
    const { authError } = this.props;
    if (authError) {
        console.log('authError = ' + authError);
    }
    console.groupEnd();

    return (
      <div className="App">
        { authError ? <div className={`error center`}>{authError}</div> : '' }
        <div className='center'>
          <PageContent/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ReactApp);