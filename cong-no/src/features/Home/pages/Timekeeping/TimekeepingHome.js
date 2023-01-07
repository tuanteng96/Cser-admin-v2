import React from 'react'
import Navbar from '../../components/Navbar'
import { NumericFormat } from 'react-number-format'
import { NavLink } from 'react-router-dom'

import moment from 'moment'
import 'moment/locale/vi'
moment.locale('vi')

function TimekeepingHome(props) {
  return (
    <div className="card h-100 timekeeping">
      <div className="card-header">
        <h3 className="text-uppercase">
          <div>
            Chấm công
            <span className="text-muted text-capitalize fw-500 font-size-sm pl-5px">
              Ngày
              <span className="font-number pl-3px">
                {moment().format('DD-MM-YYYY')}
              </span>
            </span>
          </div>
        </h3>
        <div className="d-flex align-items-center justify-content-center">
          <Navbar />
        </div>
      </div>
      <div className="card-body overflow-auto p-0">
        {Array(10)
          .fill()
          .map((o, index) => (
            <div className="timekeeping-item" key={index}>
              <div className="timekeeping-col col-name">
                <NavLink
                  to={`/cham-cong/${index}`}
                  className="fw-700 text-truncate text-name text-decoration-none text-black font-size-15px"
                >
                  Nguyễn Tuấn {index + 1}
                </NavLink>
              </div>
              <div className="timekeeping-col col-checkinout">
                <div className="event-main">
                  <div className="event-main__label bg-success">08:00</div>
                  <div className="event-main__line">
                    <i className="fa-regular fa-arrow-right-long"></i>
                  </div>
                  <div className="event-main__label bg-danger">12:00</div>
                </div>
                <div className="event-main">
                  <div className="event-main__label bg-success">08:00</div>
                  <div className="event-main__line">
                    <i className="fa-regular fa-arrow-right-long"></i>
                  </div>
                  <div className="event-main__label bg-danger">12:00</div>
                </div>
              </div>
              <div className="timekeeping-col col-input">
                <label className="name-control">Công</label>
                <NumericFormat
                  className="form-control form-control-solid"
                  type="text"
                  placeholder="Nhập số công"
                />
              </div>
              <div className="timekeeping-col col-input">
                <label className="name-control">Tăng ca</label>
                <NumericFormat
                  className="form-control form-control-solid"
                  type="text"
                  placeholder="Thời gian tăng ca"
                />
              </div>
              <div className="timekeeping-col col-input">
                <label className="name-control">Thiếu giờ</label>
                <NumericFormat
                  className="form-control form-control-solid"
                  type="text"
                  placeholder="Thời gian thiếu"
                />
              </div>
              <div className="timekeeping-col">
                <label className="name-control">Ghi chú thêm</label>
                <input
                  className="form-control form-control-solid"
                  type="text"
                  placeholder="Ghi chú"
                />
              </div>
            </div>
          ))}
      </div>
      <div className="card-footer d-flex justify-content-end align-items-center">
        <button className="btn btn-success fw-500" type="button">
          Lưu thay đổi
        </button>
      </div>
    </div>
  )
}

export default TimekeepingHome
