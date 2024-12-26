// redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const commonSlice = createSlice({
    name: 'common',
    initialState: {
        messageModal: { show: false, type: null, message: "" }
    },
    reducers: {
        setMessageModalShow(state, action) {
            state.messageModal = action.payload
        },
        setResetMessageModal(state, action) {
            state.messageModal = { show: false, type: null, message: "" }
        }
    },
});

export default commonSlice.reducer;

export const {
    setMessageModalShow, setResetMessageModal
} = commonSlice.actions;
