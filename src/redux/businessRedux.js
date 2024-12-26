
import { createSlice } from '@reduxjs/toolkit';

const businessSlice = createSlice({
    name: 'business',
    initialState: {
        employeesList: {
        },
        hotelCheckInList: [],
        checkOutList: [],
        bookingDetails: {},
        userServices: {},
        hotelServiceRequestList: [],
    },
    reducers: {
        setEmployeesListData(state, action) {
            state.employeesList = action.payload
        },
        setHotelCheckInList(state, action) {
            state.hotelCheckInList = action.payload
        },
        setCheckOutList(state, action) {
            state.checkOutList = action.payload
        },
        setBookingDetails(state, action) {
            state.bookingDetails = action.payload
        },
        sethotelServiceRequest(state, action) {
            state.hotelServiceRequestList = action.payload
        },
        setUserServicesData(state, action) {
            state.userServices = action.payload
        }
    },
});

export const { setEmployeesListData, setHotelCheckInList, setBookingDetails, sethotelServiceRequest, setUserServicesData, setCheckOutList } = businessSlice.actions;

export default businessSlice.reducer;
