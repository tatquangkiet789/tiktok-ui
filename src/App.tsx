import { FC, Fragment } from 'react';
import AppRoutes from 'routes/AppRoutes';
import { ToastContainer } from 'react-toastify';

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
