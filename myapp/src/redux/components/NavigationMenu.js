import React from 'react';
import { connect } from "react-redux";
import AuthorizeForm from './AuthorizeForm';
import DeauthorizeForm from './DeauthorizeForm';
import MessageForm from "./flood/MessageForm";


const mapStateToProps = (state) => ({
    restApiToken: state.authReducer.restApiToken
});

class ReactNavigationMenu extends React.Component {
  render() {
    console.group('NavigationMenu rendering...');
    console.log('this.props = ' + JSON.stringify(this.props));
    console.log('this.state = ' + JSON.stringify(this.state));
    console.groupEnd();
    const { restApiToken } = this.props;
    return (
      <>
      { restApiToken ?
        (  <>
            <DeauthorizeForm />
            <MessageForm endpoint="/api/ver.0/message/create" />
        </> ) :
        < AuthorizeForm /> }
      </>
    );
  }
};

export default connect(mapStateToProps)(ReactNavigationMenu);
