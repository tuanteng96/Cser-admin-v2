import { createSlice } from '@reduxjs/toolkit'

const Auth = createSlice({
  name: 'auth',
  initialState: {
    Info: null
  },
  reducers: {
    setProfile: (state, { payload }) => {
      return {
        ...state,
        Token: payload.token,
        Info: payload.Info
      }
    }
  }
})

const { reducer, actions } = Auth
export const { setProfile } = actions
export default reducer
