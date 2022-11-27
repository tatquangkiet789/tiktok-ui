import React from 'react';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
    return (
        <React.Fragment>
            <AppRoutes />
            <ToastContainer
                position='top-right'
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick={true}
            />
        </React.Fragment>
    );
};

export default App;
