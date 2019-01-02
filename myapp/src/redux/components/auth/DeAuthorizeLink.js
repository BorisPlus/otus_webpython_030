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
          <div className="a" data-is_requested={ deAuthorizing ? "yes" : "no" }>
            { 'EXIT ('+ username +')' }
          </div> :
          <a href='./'
            onClick={this.handleClick}
            data-is_requested={ deAuthorizing ? "yes" : "no" }
            disabled={ deAuthorizing }> { 'EXIT ('+ username +')' } </a>
        }
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactDeAuthorizeLink);
