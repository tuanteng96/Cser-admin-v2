import {
    createAsyncThunk,
    createSlice,
    current
} from '@reduxjs/toolkit'
import { ConvertViToEn } from '../../../../helpers/TextHelpers';

export const CheckIn = createAsyncThunk('/login', async (data, thunkAPI) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        //const response = await authApi.login(data)
        const response = [{
                FullName: "Nguyễn Tài Tuấn",
                Phone: "0971021196",
                Checkin: "2022-06-03T14:11:39",
                IsOrder: true
            },
            {
                FullName: "Lê Bảo Ngọc",
                Phone: "0971021196",
                Checkin: "2022-06-03T14:11:39",
                IsOrder: false
            },
            {
                FullName: "Nguyễn Tiến Hùng",
                Phone: "0971021196",
                Checkin: "2022-06-03T14:11:39",
                IsOrder: false
            },
            {
                FullName: "Trương Văn Hướng",
                Phone: "0971021196",
                Checkin: "2022-06-03T14:11:39",
                IsOrder: true
            }
        ]
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState = {
    ListCheckIn: [],
    ListFilters: null,
    loading: false,
}

export const CheckinSlice = createSlice({
    name: 'CheckIn',
    initialState,
    reducers: {
        filterBy: (state, {
            payload
        }) => {
            const {Key, Type} = payload;
            let newListFilters = []
            if(Type) {

            }
            newListFilters = state.ListCheckIn.filter((item => ConvertViToEn(item.FullName).includes(ConvertViToEn(Key))))
            return {
                ...state,
                ListFilters: Key ? newListFilters : null
            }
        }
    },
    extraReducers: {
        [CheckIn.pending]: (state) => {
            //
            state.loading = true;
        },
        [CheckIn.fulfilled]: (state, {
            payload
        }) => {
            //console.log(current(state))
            return {
                ...state,
                ListCheckIn: payload,
                loading: false
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    filterBy
} = CheckinSlice.actions

export default CheckinSlice.reducer;