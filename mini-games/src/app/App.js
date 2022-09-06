import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Login from 'src/features/Auth/Login/Login'
import Home from 'src/features/Home/Home'
import AuthenticateGuard from 'src/guards/AuthenticateGuard'
import UnauthenticateGuard from 'src/guards/UnauthenticateGuard'
import { PersistGate } from 'redux-persist/integration/react'
import AuthInit from 'src/features/Auth/AuthInit'

function App({ store, persistor }) {
  return (
    <Provider store={store}>
      <PersistGate loading={'Đang tải ...'} persistor={persistor}>
        <AuthInit>
          <Routes>
            <Route
              path="/"
              element={
                <AuthenticateGuard>
                  <Home />
                </AuthenticateGuard>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <UnauthenticateGuard>
                  <Login />
                </UnauthenticateGuard>
              }
            />
          </Routes>
        </AuthInit>
      </PersistGate>
    </Provider>
  )
}

export default App
