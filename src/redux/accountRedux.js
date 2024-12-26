// redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        userData: {
        },
        profiles: [],
        selectedProfile: {},
        profileData: {
        },
        personalInfo: {
        },
        governmentIdInfo: {},
        selectedProperty: {},
    },
    reducers: {
        setUserData(state, action) {
            state.userData = {
                ...state.userData,
                ...action.payload,
            };
        },
        setProfileData(state, action) {
            state.profileData = {
                ...state.profileData,
                ...action.payload,
            };
        },
        setPersonalInfo(state, action) {
            const { key, value } = action.payload;
            state.personalInfo[key] = value;
        },
        setGovernmentIdInfo(state, action) {
            state.governmentIdInfo = action.payload
        },
        setAvailableProfiles(state, action) {
            state.profiles = action.payload
        },
        setSelectedProfile(state, action) {
            state.selectedProfile = action.payload
        },
        setSelectedProperty(state, action) {
            state.selectedProperty = action.payload
        }
    },
});

// Export actions

// Export the reducer
export default accountSlice.reducer;
export const {
    setUserData, setProfileData, setPersonalInfo,
    setGovernmentIdInfo, setAvailableProfiles,
    setSelectedProfile, setSelectedProperty } = accountSlice.actions;
