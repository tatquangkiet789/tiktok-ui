import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';

import store from './redux/store';
import './libs/i18n';
import GlobalStyles from './components/GlobalStyles/GlobalStyles';

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
