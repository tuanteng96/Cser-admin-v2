import React, { useEffect, useRef, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import CalendarFull from '../../components/CalendarFull'
import DatePicker from 'react-datepicker'
import Navbar from '../../components/Navbar'
import ModalHolidaySchedule from '../../components/Modal/ModalHolidaySchedule'
import { useSelector } from 'react-redux'

import moment from 'moment'
import 'moment/locale/vi'
import worksheetApi from 'src/api/worksheet.api'

moment.locale('vi')

function Worksheet(props) {
  const { Stocks, CrStockID } = useSelector(({ auth }) => ({
    Stocks: auth?.Info?.Stocks || [],
    CrStockID: auth?.Info?.CrStockID
  }))
  const [List, setList] = useState([])
  const [StocksList, setStocksList] = useState([])
  const [CrDate, setCrDate] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    From: '',
    To: '',
    StockID: '',
    key: ''
  })

  const typingTimeoutRef = useRef(null)

  useEffect(() => {
    const newStocks = Stocks.filter(stock => stock.ParentID !== 0)
    if (newStocks.length > 0) {
      if (!CrStockID) {
        setFilters(prevState => ({
          ...prevState,
          StockID: newStocks[0]
        }))
      } else {
        setFilters(prevState => ({
          ...prevState,
          StockID: newStocks.filter(o => o.ID === CrStockID)[0]
        }))
      }
    }
    setStocksList(newStocks)
  }, [Stocks, CrStockID])

  useEffect(() => {
    setFilters(prevState => ({
      ...prevState,
      From: CrDate
        ? moment(CrDate).clone().weekday(0).format('DD/MM/YYYY')
        : '',
      To: CrDate ? moment(CrDate).clone().weekday(6).format('DD/MM/YYYY') : ''
    }))
  }, [CrDate])

  useEffect(() => {
    getListWorkSheet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const getListWorkSheet = () => {
    if (!filters.StockID || !filters.From || !filters.To) return
    !loading && setLoading(true)
    const newObj = {
      ...filters,
      From: moment(CrDate).clone().weekday(0).format('DD/MM/YYYY'),
      To: moment(CrDate).clone().weekday(6).format('DD/MM/YYYY'),
      StockID: filters.StockID ? filters.StockID.ID : ''
    }
    worksheetApi
      .getAllWorkSheet(newObj)
      .then(({ data }) => {
        setList(data.list)
        setLoading(false)
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="card h-100 card-timesheets">
      <div className="card-header">
        <Dropdown className="d-inline mx-2">
          <Dropdown.Toggle className="btn-none">
            <h3 className="text-uppercase">
              {filters.StockID?.Title}
              <i className="fa-regular fa-chevron-down pl-3px"></i>
            </h3>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {StocksList &&
              StocksList.map((o, index) => (
                <Dropdown.Item
                  href="#"
                  key={index}
                  active={o.ID === filters.StockID.ID}
                  onClick={() =>
                    setFilters(prevState => ({
                      ...prevState,
                      StockID: o
                    }))
                  }
                >
                  {o.Title}
                </Dropdown.Item>
              ))}
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
                selected={CrDate}
                onChange={date => setCrDate(date)}
                className="form-control"
                dateFormat={'dd/MM/yyyy'}
              />
              <i className="fa-regular fa-calendar-range position-absolute w-25px h-100 top-0 right-0 d-flex align-items-center pointer-events-none font-size-md text-muted"></i>
            </div>
            <button
              className="btn btn-light w-35px"
              onClick={() =>
                setCrDate(moment(CrDate).subtract(1, 'weeks').toDate())
              }
              disabled={loading}
            >
              <i className="fa-regular fa-angle-left text-muted"></i>
            </button>
            <button
              className="btn btn-light ml-5px w-35px"
              onClick={() => setCrDate(moment(CrDate).add(1, 'weeks').toDate())}
              disabled={loading}
            >
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
                onChange={evt => {
                  setLoading(true)
                  if (typingTimeoutRef.current) {
                    clearTimeout(typingTimeoutRef.current)
                  }
                  typingTimeoutRef.current = setTimeout(() => {
                    setFilters(prevState => ({
                      ...prevState,
                      Key: evt.target.value
                    }))
                  }, 800)
                }}
              />
              <i className="fa-regular fa-magnifying-glass position-absolute w-30px h-100 top-0 right-0 d-flex align-items-center pointer-events-none font-size-md text-muted"></i>
            </div>
          </div>
        </div>
        <CalendarFull data={List} loading={loading} CrDate={CrDate} />
      </div>
      <ModalHolidaySchedule show={false} />
    </div>
  )
}

export default Worksheet
