import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../App/modules/Auth/_redux/authSlice";
import bookingReducer from "../App/modules/Booking/_redux/bookingSlice";
import checkinReducer from "../App/modules/Checkin/_redux/CheckinSlice"

export default configureStore({
    reducer: {
        Auth: authReducer,
        Booking: bookingReducer,
        CheckIn: checkinReducer
    },
})