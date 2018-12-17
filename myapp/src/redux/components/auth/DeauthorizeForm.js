import React from 'react';
import { connect } from "react-redux";
import { Deauthorize } from "../../../redux/actions/index";

const mapStateToProps = (state) => {
  return ({
    deauthorizing: state.authReducer.deauthorizing
  });
};

const mapDispatchToProps = dispatch => {
  return {
    Deauthorize: () => dispatch(Deauthorize())
  };
};

class ReactDeauthorizeForm extends React.Component {

  constructor() {
    super();
    this.state = {
      deauthorizing: false
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.Deauthorize();
  }

  render() {

    console.group('ReactDeauthorizeForm.render()');
    console.log('this.props = ' + JSON.stringify(this.props));
    console.log('this.state = ' + JSON.stringify(this.state));
    console.groupEnd();

    const { deauthorizing } = this.props;
    return (
      <>
        <input
          onClick={this.handleClick}
          type='submit'
          data-is_requested={ deauthorizing ? "yes" : "no" }
          className="attention"
          disabled={ deauthorizing }
          value={ 'Exit account ('+ localStorage.getItem('username') +')' } />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactDeauthorizeForm);
