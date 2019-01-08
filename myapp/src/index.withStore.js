import React from "react";
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import store from "../src/store/index";
import ReduxApp from "../src/App";
import * as serviceWorker from '../src/serviceWorker';
import '../src/static/css/style.css';
import '../src/static/css/side_nav.css';
import '../src/static/css/forms.css';
import '../src/static/css/msg.css';

ReactDOM.render(
    <Provider store={store}>
        <ReduxApp />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
