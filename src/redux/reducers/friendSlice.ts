import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IFriendDTO } from 'layouts/HeaderOnlyLayout/pages/MessagePage/models/friendDTO';
import { findAllFriendsService } from 'layouts/HeaderOnlyLayout/pages/MessagePage/services/friendService';
import { IUser } from 'models/user';
import { toast } from 'react-toastify';

interface IFriendState {
    friendList: IUser[];
    filterList: IUser[];
    receiverInfo: IUser;
    loading: boolean;
    error: string;
}

const initialState: IFriendState = {
    friendList: [],
    filterList: [],
    loading: false,
    error: '',
    receiverInfo: null as any,
};

// [GET] /api/v1/users/friends
export const findAllFriends = createAsyncThunk(
    'findAllFriends',
    async (params: IFriendDTO, { rejectWithValue }) => {
        try {
            const data = await findAllFriendsService(params);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

const friendSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        findFriendsByKeyword: (state, action) => {
            state.filterList = [...state.friendList].filter(
                (user) =>
                    user.firstName.toLowerCase().trim().includes(action.payload) ||
                    user.lastName.toLowerCase().trim().includes(action.payload),
            );
        },
        resetFriendList: (state) => {
            state.filterList = [...state.friendList];
        },
        setReceiverInfo: (state, action) => {
            state.receiverInfo = state.friendList.filter(
                (user) => user.id === action.payload,
            )[0];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(findAllFriends.pending, (state) => {
                state.loading = true;
                state.friendList = [];
                state.error = '';
            })
            .addCase(findAllFriends.fulfilled, (state, action) => {
                state.loading = false;
                state.friendList = action.payload.content;
                state.filterList = action.payload.content;
                state.receiverInfo = action.payload.content[0];
            })
            .addCase(findAllFriends.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.error);
            });
    },
});

export const { findFriendsByKeyword, resetFriendList, setReceiverInfo } =
    friendSlice.actions;

export default friendSlice.reducer;
