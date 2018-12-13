import React, { Component } from "react";

class WhatIsTheTimeNow extends Component {
   constructor() {
      super();
      this.state = {
        curTime : null
      }
    }
    componentDidMount() {
      setInterval( () => {
        this.setState({
          curTime : new Date().toLocaleString()
        })
      },1000)
    }
   render() {
        return(
          <div>
            <h2>{this.state.curTime}</h2>
          </div>
        );
      }
};
export default WhatIsTheTimeNow;