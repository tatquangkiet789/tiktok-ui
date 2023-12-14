import { FC, Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import AppRoutes from 'routes/AppRoutes';

const App: FC = () => {
    return (
        <Fragment>
            <AppRoutes />
            <ToastContainer
                position='bottom-right'
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick={true}
            />
        </Fragment>
    );
};

export default App;
