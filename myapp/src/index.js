import React from "react";
import {Provider} from 'react-redux';
import store from "./redux/store/index";
import ReduxApp from "./redux/components/App";
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './static/css/style.css';
import './static/css/sidenav.css';
import './static/css/forms.css';

ReactDOM.render(
    <Provider store={store}>
        <ReduxApp />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
