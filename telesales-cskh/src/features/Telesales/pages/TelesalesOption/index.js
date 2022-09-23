import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function TelesalesOption(props) {
  return (
    <div className="h-100 d-flex flex-column">
      <div className="d-flex h-40px bg-border">
        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? 'text-primary bg-white' : ''
            } px-20px fw-600 d-flex align-items-center text-decoration-none text-uppercase font-size-sm`
          }
          to="dich-vu"
        >
          Dịch vụ
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? 'text-primary bg-white' : ''
            } px-20px fw-600 d-flex align-items-center text-decoration-none text-uppercase font-size-sm`
          }
          to="san-pham"
        >
          Sản phẩm
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? 'text-primary bg-white' : ''
            } px-20px fw-600 d-flex align-items-center text-decoration-none text-uppercase font-size-sm`
          }
          to="lich-su-mua-hang"
        >
          Lịch sử mua hàng
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? 'text-primary bg-white' : ''
            } px-20px fw-600 d-flex align-items-center text-decoration-none text-uppercase font-size-sm`
          }
          to="lich-su-du-dung-dv"
        >
          Lịch sử SD DV
        </NavLink>
      </div>
      <div className="flex-grow-1">
        <Outlet />
      </div>
    </div>
  )
}

export default TelesalesOption
