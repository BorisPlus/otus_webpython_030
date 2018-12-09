import React, { Component } from "react";
import PropTypes from "prop-types";
class DataProvider extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
  };
  state = {
      data: [],
      loaded: false,
      placeholder: "Loading..."
    };
    loadDataFromServer(component) {
        fetch(component.props.endpoint)
        .then(response => {
            if (response.status !== 200 && response.status !== 201) {
              return component.setState({ placeholder: "Something went wrong" });
            }
            return response.json();
        })
      .then(data => component.setState({ data: data, loaded: true }));
    }
    componentDidMount() {
        this.loadDataFromServer(this);
        setInterval(this.loadDataFromServer.bind(null, this), 5000);
    }
  componentDidMountOLD() {
    fetch(this.props.endpoint)
      .then(response => {
        if (response.status !== 200 && response.status !== 201) {
          return this.setState({ placeholder: "Something went wrong" });
        }
        return response.json();
      })
      .then(data => this.setState({ data: data, loaded: true }));
  }
  render() {
    const { data, loaded, placeholder } = this.state;
    return loaded ? this.props.render(data) : <p>{placeholder}</p>;
  }
}
export default DataProvider;