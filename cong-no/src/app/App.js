import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Home from 'src/features/Home/Home'
import AuthInit from 'src/features/Auth/AuthInit'

function App({ store }) {
  return (
    <Provider store={store}>
      <AuthInit>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </AuthInit>
    </Provider>
  )
}

export default App
