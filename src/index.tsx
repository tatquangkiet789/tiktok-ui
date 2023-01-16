import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import store from './redux/store';
import './libs/i18n';
import GlobalStyles from './components/GlobalStyles/GlobalStyles';

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <GlobalStyles>
                    <App />
                </GlobalStyles>
            </Provider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
