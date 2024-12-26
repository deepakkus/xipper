
import { createSlice } from '@reduxjs/toolkit';

const servicesSlice = createSlice({
    name: 'services',
    initialState: {
        restaurantCart: [],
        roomServiceCart: {},
        fAndBCartId: "",
        laundryCartId: "",
        laundryCart: {}
    },
    reducers: {
        setRestaurantCart(state, action) {
            state.restaurantCart = action.payload
        },
        setRoomServiceCart(state, action) {
            state.roomServiceCart = action.payload
        },
        setFAndBCartId(state, action) {
            state.fAndBCartId = action.payload
        },
        setLaundryCartId(state, action) {
            state.laundryCartId = action.payload
        },
        setLaundryCart(state, action) {
            state.laundryCart = action.payload
        }
    },
});

export const { setRestaurantCart, setRoomServiceCart, setFAndBCartId, setLaundryCartId, setLaundryCart } = servicesSlice.actions;

export default servicesSlice.reducer;
