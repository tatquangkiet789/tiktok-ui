import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReceiveNotification } from 'modules/notification/models/notificationModel';

interface INotificationState {
    notificationList: IReceiveNotification[];
    totalNotifications: number;
}

const initialState: INotificationState = {
    notificationList: [],
    totalNotifications: 0,
};

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        receiveNewNotification: (state, action: PayloadAction<IReceiveNotification>) => {
            state.notificationList = [{ ...action.payload }, ...state.notificationList];
            state.totalNotifications = state.totalNotifications + 1;
        },
        resetTotalNotification: (state) => {
            state.totalNotifications = 0;
        },
    },
});

export const { receiveNewNotification, resetTotalNotification } =
    notificationSlice.actions;

export default notificationSlice.reducer;
