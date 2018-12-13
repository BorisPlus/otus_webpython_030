import NavigationMenu from './NavigationMenu';
import { connect } from "react-redux"
import React from 'react';
import MessageList from "./flood/MessageList";

const mapStateToProps = (state) => ({
    restApiToken: state.authReducer.restApiToken,
    username: state.authReducer.username
});

class ReactPageContent extends React.Component {
  render() {
    console.group('PageContent rendering...');
    console.log('this.props = ' + JSON.stringify(this.props));
    console.log('this.state = ' + JSON.stringify(this.state));
    console.log('this.props.state = ' + JSON.stringify(this.props.state));
//    const error = this.props.state.authReducer.error ? this.props.state.authReducer.error : null;
//    if (error) {
//        console.log('error = ' + error);
//    }
    console.groupEnd();
    const {restApiToken, username} = this.props;
//    console.log('username+ = ', username);
    return (
      <div id="content">
        <div className='center'>
          { restApiToken ? "Well coming, my dear \"" + username + "\"." : 'Login for the flooooooooooood :)' }
          <NavigationMenu/>
        </div>
        <div className='center'>
          <MessageList endpoint="/api/ver.0/message/list" />
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps)(ReactPageContent);
