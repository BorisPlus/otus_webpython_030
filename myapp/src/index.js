import React from "react";
import {Provider, connect} from 'react-redux';
import store from "./redux/store/index";
import App from "./redux/components/App";
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import './static/frontend/min.css';

//...state
const ReduxApp = connect( state => ({}), dispatch => ({}))(App);
//const ReduxApp = connect()(App);

ReactDOM.render(
    <Provider store={store}>
        <ReduxApp />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
