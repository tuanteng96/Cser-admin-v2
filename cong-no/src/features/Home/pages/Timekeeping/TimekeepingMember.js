import React from 'react'
import Navbar from '../../components/Navbar'
import { NumericFormat } from 'react-number-format'
import { useNavigate } from 'react-router-dom'

import moment from 'moment'
import 'moment/locale/vi'
moment.locale('vi')

function TimekeepingMember(props) {
  const navigate = useNavigate()
  return (
    <div className="card h-100 timekeeping">
      <div className="card-header">
        <h3 className="text-uppercase">
          <div className="d-flex align-items-baseline">
            <div className="d-flex cursor-pointer" onClick={() => navigate(-1)}>
              <div className="w-20px">
                <i className="fa-regular fa-chevron-left ml-0 vertical-align-middle text-muted"></i>
              </div>
              Nguyễn Tài Tuấn
            </div>
            <span className="text-muted text-capitalize fw-500 font-size-sm pl-5px">
              Cser Hà Nội
            </span>
          </div>
        </h3>
        <div className="d-flex align-items-center justify-content-center">
          <Navbar />
        </div>
      </div>
      <div className="card-body overflow-auto p-0">
        {Array(30)
          .fill()
          .map((o, index) => (
            <div className="timekeeping-item" key={index}>
              <div className="timekeeping-col col-name">
                <div className="fw-700 text-truncate">
                  Ngày
                  <span className="pl-5px">
                    {moment()
                      .startOf('month')
                      .add(index, 'days')
                      .format('DD-MM-YYYY')}
                  </span>
                </div>
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

export default TimekeepingMember
