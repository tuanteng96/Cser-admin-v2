import { Provider } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import AuthInit from 'src/features/Auth/AuthInit'
import ScrollToTop from 'src/layout/_core/ScrollToTop'
import Telesales from 'src/features/Telesales'
import TelesalesList from 'src/features/Telesales/pages/TelesalesList'
import TelesalesDetail from 'src/features/Telesales/pages/TelesalesDetail'

function App({ store, persistor }) {
  return (
    <Provider store={store}>
      <PersistGate loading={'Đang tải ...'} persistor={persistor}>
        <AuthInit>
          <ScrollToTop>
            <Routes>
              <Route path="/">
                <Route index element={<Navigate to="/danh-sach" replace />} />
              </Route>
              <Route path="/danh-sach" element={<Telesales />}>
                <Route index element={<TelesalesList />} />
                <Route path=":MemberID" element={<TelesalesDetail />} />
              </Route>
            </Routes>
          </ScrollToTop>
        </AuthInit>
      </PersistGate>
    </Provider>
  )
}

export default App
