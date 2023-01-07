import React from 'react'
import Navbar from '../../components/Navbar'
import { NumericFormat } from 'react-number-format'
import DatePicker from 'react-datepicker'

const InputFiles = () => {
  return (
    <div className="input-file-custom">
      <div className="choose">Chọn File</div>
      <div className="name text-truncate">Chưa có File</div>
      <input type="file" title="" />
    </div>
  )
}

function SalaryApproval(props) {
  return (
    <div className="card h-100">
      <div className="card-header">
        <h3 className="text-uppercase">Duyệt lương</h3>
        <div className="d-flex align-items-center justify-content-center">
          <div className="mr-8px position-relative">
            <DatePicker
              selected={new Date()}
              onChange={date => console.log(date)}
              className="form-control form-control-solid fw-500"
              dateFormat={'MM/yyyy'}
            />
            <i className="fa-regular fa-calendar-range position-absolute w-25px h-100 top-0 right-0 d-flex align-items-center pointer-events-none font-size-md text-muted"></i>
          </div>
          <Navbar />
        </div>
      </div>
      <div className="card-body overflow-auto p-0">
        {Array(10)
          .fill()
          .map((o, index) => (
            <div className="timekeeping-item" key={index}>
              <div className="timekeeping-col col-name">
                <div className="fw-700 text-truncate">
                  Nguyễn Tuấn {index + 1}
                </div>
              </div>
              <div className="timekeeping-col col-input">
                <label className="name-control">Tổng công</label>
                <NumericFormat
                  className="form-control form-control-solid fw-500"
                  type="text"
                  placeholder="Nhập số công"
                  thousandSeparator={true}
                />
              </div>
              <div className="timekeeping-col col-input">
                <label className="name-control">Lương theo công</label>
                <NumericFormat
                  className="form-control form-control-solid fw-500"
                  type="text"
                  placeholder="Nhập số tiền"
                />
              </div>
              <div className="timekeeping-col col-input">
                <label className="name-control">Tổng tiền</label>
                <NumericFormat
                  className="form-control form-control-solid fw-500"
                  type="text"
                  placeholder="Tổng số tiền"
                />
              </div>
              <div className="timekeeping-col col-input">
                <label className="name-control">File đính kèm</label>
                <InputFiles />
              </div>
              <div className="timekeeping-col">
                <label className="name-control">Ghi chú thêm</label>
                <input
                  className="form-control form-control-solid fw-500"
                  type="text"
                  placeholder="Nhập ghi chú"
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

export default SalaryApproval
