import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import postReducer from './reducers/postSlice';
import searchReducer from './reducers/searchSlice';
import userReducer from './reducers/userSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        search: searchReducer,
        posts: postReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
