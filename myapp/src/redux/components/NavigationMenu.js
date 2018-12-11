import React from 'react';
import { connect } from "react-redux";
import AuthorizeForm from './AuthorizeForm';
import DeauthorizeForm from './DeauthorizeForm';

const mapStateToProps = (state) => {
  return { restApiToken: state.restApiToken };
};

class ReactNavigationMenu extends React.Component {
  render() {
    const { restApiToken } = this.props;
    return (
      <>
      {restApiToken ? <DeauthorizeForm /> : <AuthorizeForm />}
      </>
    );
  }
};

export default connect(mapStateToProps)(ReactNavigationMenu);
