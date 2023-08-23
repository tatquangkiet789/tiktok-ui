import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/authSlice';
// import commentReducer from './reducers/commentSlice';
// import friendReducer from './reducers/friendSlice';
// import messageReducer from './reducers/messageSlice';
// import notificationReducer from './reducers/notificationSlice';
// import postReducer from './reducers/postSlice';
// import userReducer from './reducers/userSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        // users: userReducer,
        // posts: postReducer,
        // comments: commentReducer,
        // notifications: notificationReducer,
        // friends: friendReducer,
        // messages: messageReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
