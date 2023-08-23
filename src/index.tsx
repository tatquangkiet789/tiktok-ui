import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';

import store from './redux/store';
import GlobalStyles from 'common/GlobalStyles/GlobalStyles';
// import './libs/i18n';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
