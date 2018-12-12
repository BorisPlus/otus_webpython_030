import NavigationMenu from './NavigationMenu';
import { connect } from "react-redux"
import React from 'react';


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
    return (
      <div id="content">
        <div className='center'>
          <NavigationMenu/>
        </div>
        <div className='center'>
          { restApiToken } <br/>
          { username } <br/>
          { restApiToken ? "Well coming, dear "+ username : 'Some public content o component should be here :)' }
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps)(ReactPageContent);
