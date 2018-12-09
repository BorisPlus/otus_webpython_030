import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./universal/DataProvider";
import Table from "./universal/Table";
import MessageForm from "./forms/MessageForm";
import MessageList from "./special/MessageList";
import WhatIsTheTimeNow from "./features/WhatIsTheTimeNow";
const App = () => (
  <React.Fragment>
    <div className="center">
      <MessageForm endpoint="api/v0/messages/" />
    </div>
    <div className="center">
      <MessageList endpoint="api/v0/messages/" />
    </div>
  </React.Fragment>
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;