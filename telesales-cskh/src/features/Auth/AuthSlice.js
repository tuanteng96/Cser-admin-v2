import { createSlice } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import { DevHelpers } from 'src/helpers/DevHelpers'

if (DevHelpers.isDevelopment()) {
  window.Info = {
    User: {
      UserName: 'admin',
      ID: 1
    },
    Stocks: [
      {
        ID: 778,
        Title: 'Quản lý cơ sở'
      },
      {
        ID: 8975,
        Title: 'Cser Hà Nội'
      },
      {
        ID: 10053,
        Title: 'Cser Hồ Chí Minh'
      }
    ],
    CrStockID: '',
    rightsSum: {
      tele: true,
      teleAdv: true
    }
  }
  window.token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBdXRoMlR5cGUiOiJVc2VyRW50IiwiSUQiOiIxIiwiVG9rZW5JZCI6IjM3NzQzODAwMzc3NDM4MDMiLCJuYmYiOjE2NjM3MzgyODEsImV4cCI6MTY2NDM0MzA4MSwiaWF0IjoxNjYzNzM4MjgxfQ.UmTcYIgFwB3r_TqeMlPQp-oVR8nd6lxAnUPgYmMXb38'
}

const Auth = createSlice({
  name: 'auth',
  initialState: {
    Info: null,
    Token: null
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

const persistConfig = {
  key: 'auth',
  storage: storage
  //blacklist: ['user']
}

const { reducer, actions } = Auth
export const { setProfile } = actions
export default persistReducer(persistConfig, reducer)
