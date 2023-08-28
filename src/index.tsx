import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';

import store from './redux/store';
import './global.scss';
// import './libs/i18n';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
            {/* <GlobalStyles>
                <App />
            </GlobalStyles> */}
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
