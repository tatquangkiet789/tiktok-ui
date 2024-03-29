import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
    IFriendDTO,
    IFriendModel,
} from 'layouts/HeaderOnlyLayout/pages/MessagePage/models/friendDTO';
import { findAllFriendsService } from 'layouts/HeaderOnlyLayout/pages/MessagePage/services/friendService';
import { toast } from 'react-toastify';

interface IFriendState {
    friendList: IFriendModel[];
    filterList: IFriendModel[];
    receiverInfo: IFriendModel;
    loading: boolean;
    error: string;
    selectedId: number;
    userReceivedNewMessageId: number;
}

const initialState: IFriendState = {
    friendList: [],
    filterList: [],
    loading: false,
    error: '',
    receiverInfo: null as any,
    selectedId: 0,
    userReceivedNewMessageId: 0,
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
        setLastestMessageToFriendList: (state, action) => {
            state.filterList = [...state.filterList].map((user) => {
                if (user.id === action.payload.senderDetail.id) {
                    state.userReceivedNewMessageId = user.id;
                    return { ...user, lastestMessage: action.payload.content };
                }
                return user;
            });
        },
        resetUserReceiveNewMessage: (state) => {
            state.userReceivedNewMessageId = 0;
        },
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
            state.selectedId = action.payload;
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

export const {
    findFriendsByKeyword,
    resetFriendList,
    setReceiverInfo,
    setLastestMessageToFriendList,
    resetUserReceiveNewMessage,
} = friendSlice.actions;

export default friendSlice.reducer;
