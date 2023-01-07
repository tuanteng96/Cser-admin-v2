import React from 'react'
import { Dropdown } from 'react-bootstrap'
import CalendarFull from '../../components/CalendarFull'
import DatePicker from 'react-datepicker'
import Navbar from '../../components/Navbar'
import ModalHolidaySchedule from '../../components/Modal/ModalHolidaySchedule'

function Worksheet(props) {
  return (
    <div className="card h-100 card-timesheets">
      <div className="card-header">
        <Dropdown className="d-inline mx-2">
          <Dropdown.Toggle className="btn-none">
            <h3 className="text-uppercase">
              CSER HÀ NỘI <i className="fa-regular fa-chevron-down"></i>
            </h3>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#" active>
              Cser Hà Nội
            </Dropdown.Item>
            <Dropdown.Item href="#">Cser Hồ Chính Minh</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className="d-flex align-items-center justify-content-center">
          <Navbar />
        </div>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <div className="mr-8px position-relative">
              <DatePicker
                selected={new Date()}
                onChange={date => console.log(date)}
                className="form-control"
                dateFormat={'dd/MM/yyyy'}
              />
              <i className="fa-regular fa-calendar-range position-absolute w-25px h-100 top-0 right-0 d-flex align-items-center pointer-events-none font-size-md text-muted"></i>
            </div>
            <button className="btn btn-light w-35px">
              <i className="fa-regular fa-angle-left text-muted"></i>
            </button>
            <button className="btn btn-light ml-5px w-35px">
              <i className="fa-regular fa-angle-right text-muted"></i>
            </button>
          </div>
          <div className="d-flex">
            <button className="btn btn-light-danger fw-600 mr-8px">
              Tạo ngày nghỉ
            </button>
            <div className="position-relative">
              <input
                className="form-control w-300px"
                type="text"
                placeholder="Nhập tên nhân viên"
              />
              <i className="fa-regular fa-magnifying-glass position-absolute w-30px h-100 top-0 right-0 d-flex align-items-center pointer-events-none font-size-md text-muted"></i>
            </div>
          </div>
        </div>
        <CalendarFull />
      </div>
      <ModalHolidaySchedule show={false} />
    </div>
  )
}

export default Worksheet
