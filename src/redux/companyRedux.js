
import { createSlice } from '@reduxjs/toolkit';

const companySlice = createSlice({
    name: 'company',
    initialState: {
        pendingRegistrations: [],
        resumeRegistrattionCompany: {}
    },
    reducers: {
        setPendingRegistrationList(state, action) {
            state.pendingRegistrations = action.payload
        },
        setResumeRegistrationCompany(state, action) {
            state.resumeRegistrattionCompany = action.payload
        },
    },
});

export const { setPendingRegistrationList, setResumeRegistrationCompany } = companySlice.actions;

export default companySlice.reducer;
