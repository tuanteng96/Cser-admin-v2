import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Home from 'src/features/Home'
import AuthInit from 'src/features/Auth/AuthInit'
import Worksheet from 'src/features/Home/pages/Worksheet'
import SalaryApproval from 'src/features/Home/pages/SalaryApproval'
import Timekeeping from 'src/features/Home/pages/Timekeeping'
import TimekeepingHome from 'src/features/Home/pages/Timekeeping/TimekeepingHome'
import TimekeepingMember from 'src/features/Home/pages/Timekeeping/TimekeepingMember'

function App({ store }) {
  return (
    <Provider store={store}>
      <AuthInit>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Worksheet />} />
            <Route path="cham-cong" element={<Timekeeping />}>
              <Route index element={<TimekeepingHome />} />
              <Route path=":id" element={<TimekeepingMember />}></Route>
            </Route>
            <Route path="duyet-luong" element={<SalaryApproval />}></Route>
          </Route>
        </Routes>
      </AuthInit>
    </Provider>
  )
}

export default App
