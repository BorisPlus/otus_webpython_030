import React from 'react';
import { connect } from "react-redux";
import { DeAuthorize } from "../../../redux/actions/index";

const mapStateToProps = (state) => {
  return ({
    deAuthorizing: state.authReducer.deAuthorizing,
    username: state.authReducer.username
  });
};

const mapDispatchToProps = dispatch => {
  return {
    DeAuthorize: () => dispatch(DeAuthorize())
  };
};

class ReactDeAuthorizeLink extends React.Component {

  constructor() {
    super();
    this.state = {
      deAuthorizing: false
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.DeAuthorize();
  }

  render() {

    console.group('ReactDeAuthorizeLink.render()');
    console.log('this.props = ' + JSON.stringify(this.props));
    console.log('this.state = ' + JSON.stringify(this.state));
    console.groupEnd();

    const { deAuthorizing, username } = this.props;
    return (
      <>
        {
          deAuthorizing ?
          <span className="sideNavItemDisabled" data-is_requested={ deAuthorizing ? "yes" : "no" }>
            { 'EXITing ('+ username +')' }
          </span> :
          <span className="sideNavItem"
            onClick={this.handleClick}
            data-is_requested={ deAuthorizing ? "yes" : "no" }
            disabled={ deAuthorizing }> { 'EXIT ('+ username +')' } </span>
        }
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactDeAuthorizeLink);
