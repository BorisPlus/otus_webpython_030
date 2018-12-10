import React from "react";
import { render } from "react-dom";
import {Provider, connect} from 'react-redux';
import store from "./redux/store/index";
import App from "./redux/components/App";
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';


const ReduxApp = connect( state => ({counter: state.counter}), dispatch => ({}))(App);

ReactDOM.render(
    <Provider store={store}>
        <ReduxApp />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
