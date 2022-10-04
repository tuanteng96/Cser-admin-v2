import { Provider } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthInit from 'src/features/Auth/AuthInit'
import Home from 'src/features/Home'

function App({ store }) {
  return (
    <Provider store={store}>
      <AuthInit>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/app23/index.html"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </AuthInit>
    </Provider>
  )
}

export default App
