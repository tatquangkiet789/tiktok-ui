import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IMessageDTO } from 'layouts/HeaderOnlyLayout/pages/MessagePage/models/messageDTO';
import { findAllMessagesByUserIdService } from 'layouts/HeaderOnlyLayout/pages/MessagePage/services/messageService';
import { IMessage } from 'models/message';
import { toast } from 'react-toastify';

interface IMessageState {
    messageList: IMessage[];
    loading: boolean;
    error: string;
}

const initialState: IMessageState = {
    messageList: [],
    loading: false,
    error: '',
};

// [GET] /api/v1/messages/:userId
export const findAllMessagesByUserId = createAsyncThunk(
    'findAllMessagesByUserId',
    async (params: IMessageDTO, { rejectWithValue }) => {
        try {
            const data = await findAllMessagesByUserIdService(params);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(findAllMessagesByUserId.pending, (state) => {
                state.loading = true;
                state.messageList = [];
                state.error = '';
            })
            .addCase(findAllMessagesByUserId.fulfilled, (state, action) => {
                state.loading = false;
                state.messageList = action.payload.content;
            })
            .addCase(findAllMessagesByUserId.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.error);
            });
    },
});

export default messageSlice.reducer;
