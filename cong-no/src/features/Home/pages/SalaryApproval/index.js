import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar'
import { NumericFormat } from 'react-number-format'
import DatePicker, { registerLocale } from 'react-datepicker'
import vi from 'date-fns/locale/vi'
import { useSelector } from 'react-redux'
import Select from 'react-select'

registerLocale('vi', vi)

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
  const { Stocks, CrStockID, rightsSum } = useSelector(({ auth }) => ({
    Stocks: auth?.Info?.Stocks || [],
    CrStockID: auth?.Info?.CrStockID,
    rightsSum: auth?.Info?.rightsSum?.cong_ca
  }))
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
    let newStocks = Stocks.filter(stock => stock.ParentID !== 0).map(stock => ({
      ...stock,
      value: stock.ID,
      label: stock.Title
    }))
    if (rightsSum?.hasRight) {
      if (rightsSum?.IsAllStock) {
        newStocks = [{ value: '', label: 'Tất cả cơ sở' }, ...newStocks]
      } else {
        newStocks = newStocks.filter(
          o => rightsSum.stocks && rightsSum.stocks.some(x => x.ID === o.ID)
        )
      }
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
    }
    setStocksList(newStocks)
  }, [Stocks, CrStockID, rightsSum])

  return (
    <div className="card h-100">
      <div className="card-header">
        <h3 className="text-uppercase">Duyệt lương</h3>
        <div className="d-flex align-items-center justify-content-center">
          <div className="position-relative">
            <input
              className="form-control form-control-solid w-250px"
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
          <div className="w-250px mx-15px">
            <Select
              options={StocksList}
              className="select-control select-control-solid"
              classNamePrefix="select"
              placeholder="Chọn cơ sở"
              value={filters.StockID}
              onChange={otp =>
                setFilters(prevState => ({
                  ...prevState,
                  StockID: otp
                }))
              }
            />
          </div>
          <div className="mr-8px position-relative">
            <DatePicker
              locale="vi"
              className="form-control form-control-solid fw-500"
              dateFormat={'MM/yyyy'}
              showMonthYearPicker
              selected={CrDate}
              onChange={date => setCrDate(date)}
            />
            <i className="fa-regular fa-calendar-range position-absolute w-25px h-100 top-0 right-0 d-flex align-items-center pointer-events-none font-size-md text-muted"></i>
          </div>
          <div className="h-40px w-1px border-right mx-15px"></div>
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
