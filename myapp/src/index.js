import React from "react";
import {Provider, connect} from 'react-redux';
import store from "./redux/store/index";
import App from "./redux/components/App";
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import './static/frontend/min.css';

const mapStateToProps = state => ({
    state: state
});

const ReduxApp = connect(mapStateToProps)(App);

ReactDOM.render(
    <Provider store={store}>
        <ReduxApp />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
