import React from 'react';
import {connect} from 'react-redux';
import appDescription from '../constants/gui/variables';
//import PageContent from './PageContent';
import Header from './mainTemplate/Header';
import Content from './mainTemplate/frames/Chats';
import Navigation from './mainTemplate/Navigation';
import Footer from './mainTemplate/Footer';

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
        <div className="root">
          <Header project={appDescription.project} />
          <Navigation />
          <Content />
          <Footer project={appDescription.project} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ReactApp);

//        { authError ? <div className={`error center`}>{authError}</div> : '' }
//        <div className='center'>
//          <PageContent/>
//        </div>