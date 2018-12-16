import React from 'react';
import { connect } from "react-redux";
import { Deauthorize } from "../actions/index";

const mapStateToProps = () => {
  return ( { } );
};

const mapDispatchToProps = dispatch => {
  return {
    Deauthorize: () => dispatch(Deauthorize())
  };
};

class ReactDeauthorizeForm extends React.Component {

  handleClick = (e) => {
    e.preventDefault();
    this.props.Deauthorize();
  }

  render() {
    console.group('ReactDeauthorizeForm rendering...');
    console.log('this.props = ' + JSON.stringify(this.props));
    console.log('this.state = ' + JSON.stringify(this.state));
    console.groupEnd();
    const { deauthorizing } = this.props;
    return (
      <>
        <input
            onClick={this.handleClick}
            type='submit' href="#"
            className="attention"
            disabled={ deauthorizing }
            value={'Exit account ('+ localStorage.getItem('username') +')'} />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactDeauthorizeForm);
