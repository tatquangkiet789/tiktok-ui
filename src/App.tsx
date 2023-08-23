import { FC, Fragment } from 'react';
import AppRoutes from 'routes/AppRoutes';
import { ToastContainer } from 'react-toastify';

const App: FC = () => {
    // const dispatch = useAppDispatch();

    // const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    // useEffect(() => {
    //     if (!accessToken) return;

    //     dispatch(findCurrentUserByAccessToken(accessToken));
    // }, [dispatch, accessToken]);

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
