import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// export const CheckIn = createAsyncThunk('/login', async(data, thunkAPI) => {
//     try {
//         //const response = await authApi.login(data)
//         const response = "1234"
//         return response
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error)
//     }
// })

const initialState = {
    ListCheckIn: [],
    ListFilters: null,
    Test: "1234"
}

export const CheckinSlice = createSlice({
    name: 'CheckIn',
    initialState,
    reducers: {
        //increment: (state) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        //state.value += 1
        //}
    },
    // extraReducers: {
    //     [CheckIn.fulfilled]: (state, { payload }) => {
    //         return {
    //             state,
    //         }
    //     }
    // }
})

// Action creators are generated for each case reducer function
//export const { increment } = authSlice.actions

export default CheckinSlice.reducer;