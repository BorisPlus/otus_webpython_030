import React from "react";
import {Provider} from 'react-redux';
import store from "./redux/store/index";
import ReduxApp from "./redux/components/App";
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import './static/frontend/min.css';

ReactDOM.render(
    <Provider store={store}>
        <ReduxApp />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
