import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import configApi from 'src/api/config.api'
import SelectProductService from 'src/components/Selects/SelectProductService'
import DatePicker, { registerLocale } from 'react-datepicker'
import SelectStaffs from 'src/components/Selects/SelectStaffs'
import { NumericFormat } from 'react-number-format'

import vi from 'date-fns/locale/vi' // the locale you want
import clsx from 'clsx'

registerLocale('vi', vi) // register it with the name you want

Sidebar.propTypes = {
  filters: PropTypes.object,
  onSubmit: PropTypes.func
}

function Sidebar({ filters, onSubmit, loading }) {
  const [ListType, setListType] = useState([])
  const [loadingType, setLoadingType] = useState(false)

  useEffect(() => {
    getTypeConfig()
  }, [])

  const getTypeConfig = async () => {
    setLoadingType(true)
    try {
      const { data } = await configApi.getConfigName('tagkh')
      if (data && data.data && data?.data.length > 0) {
        const result = JSON.parse(data.data[0].Value)
        setListType(result)
      }
      setLoadingType(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="telesales-list__sidebar bg-white">
      <Formik
        initialValues={filters}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {formikProps => {
          // errors, touched, handleChange, handleBlur
          const { values, setFieldValue, handleChange, handleBlur } =
            formikProps

          return (
            <Form className="d-flex flex-column h-100">
              <div className="border-bottom p-15px text-uppercase fw-600 font-size-lg">
                Bộ lọc khách hàng
              </div>
              <div className="flex-grow-1 p-15px overflow-auto">
                <div className="mb-15px form-group">
                  <label className="font-label text-muted">Từ khóa</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập từ khóa"
                    name="filter.key"
                    value={values.filter.key}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {ListType &&
                  ListType.map((type, index) => (
                    <div className="mb-15px form-group" key={index}>
                      <label className="font-label text-muted">
                        {type.Title}
                      </label>
                      <div className="checkbox-list mt-8px">
                        {type.Children &&
                          type.Children.map((x, idx) => (
                            <label
                              className="checkbox d-flex cursor-pointer"
                              key={idx}
                            >
                              <input
                                type="checkbox"
                                name="filter.tele_process"
                                value={x.Title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <span className="checkbox-icon"></span>
                              <span className="fw-500 font-label">
                                {x.Title}
                              </span>
                            </label>
                          ))}
                      </div>
                    </div>
                  ))}
                <div className="mb-15px form-group">
                  <label className="font-label text-muted mb-5px">
                    Tìm theo SP, DV khách quan tâm
                  </label>
                  <SelectProductService
                    isMulti
                    menuPosition="fixed"
                    menuPlacement="top"
                    name="filter.wishlist"
                    onChange={otp => {
                      setFieldValue('filter.wishlist', otp, false)
                    }}
                    value={values.filter.wishlist}
                    isClearable={true}
                  />
                </div>
                <div className="mb-15px form-group">
                  <label className="font-label text-muted mb-5px">
                    Khách hàng sinh nhật
                  </label>
                  <div className="d-flex">
                    <div className="flex-fill">
                      <DatePicker
                        onChange={date => {
                          setFieldValue('filter.birthDateFrom', date, false)
                        }}
                        selected={values.filter.birthDateFrom}
                        placeholderText="Từ ngày"
                        className="form-control"
                        dateFormat="dd/MM"
                      />
                    </div>
                    <div className="w-35px d-flex align-items-center justify-content-center">
                      <i className="fa-regular fa-arrow-right-long text-muted"></i>
                    </div>
                    <div className="flex-fill">
                      <DatePicker
                        onChange={date => {
                          setFieldValue('filter.birthDateTo', date, false)
                        }}
                        selected={values.filter.birthDateTo}
                        placeholderText="Đến ngày"
                        className="form-control"
                        dateFormat="dd/MM"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-15px form-group">
                  <label className="font-label text-muted mb-5px">
                    Khách có đặt lịch
                  </label>
                  <div className="d-flex">
                    <div className="flex-fill">
                      <DatePicker
                        onChange={date => {
                          setFieldValue('filter.bookDateFrom', date, false)
                        }}
                        selected={values.filter.bookDateFrom}
                        placeholderText="Từ ngày"
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                    <div className="w-35px d-flex align-items-center justify-content-center">
                      <i className="fa-regular fa-arrow-right-long text-muted"></i>
                    </div>
                    <div className="flex-fill">
                      <DatePicker
                        onChange={date => {
                          setFieldValue('filter.bookDateTo', date, false)
                        }}
                        selected={values.filter.bookDateTo}
                        placeholderText="Đến ngày"
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-15px form-group">
                  <label className="font-label text-muted">
                    Ngày dùng cuối
                  </label>
                  <NumericFormat
                    allowNegative={false}
                    name="filter.last_used"
                    placeholder="Nhập số ngày"
                    className={`form-control`}
                    //isNumericString={true}
                    //thousandSeparator={true}
                    value={values.filter.last_used}
                    onValueChange={val => {
                      setFieldValue(
                        'filter.last_used',
                        val.floatValue ? val.floatValue : val.value
                      )
                    }}
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                </div>
                <div className="mb-15px form-group">
                  <label className="font-label text-muted">
                    Số buổi còn lại
                  </label>
                  <NumericFormat
                    allowNegative={false}
                    name="filter.remains"
                    placeholder="Nhập số ngày"
                    className={`form-control`}
                    //isNumericString={true}
                    //thousandSeparator={true}
                    value={values.filter.remains}
                    onValueChange={val => {
                      setFieldValue(
                        'filter.remains',
                        val.floatValue ? val.floatValue : val.value
                      )
                    }}
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <label className="font-label text-muted mb-5px">
                    Chọn theo nhân viên
                  </label>
                  <SelectStaffs
                    className="select-control"
                    menuPosition="fixed"
                    menuPlacement="top"
                    name="filter.tele_user_id"
                    onChange={otp => {
                      setFieldValue('filter.tele_user_id', otp, false)
                    }}
                    value={values.filter.tele_user_id}
                    isClearable={true}
                  />
                </div>
              </div>
              <div className="border-top p-15px">
                <button
                  type="submit"
                  className={clsx(
                    'btn btn-primary w-100 text-uppercase fw-500 h-42px font-size-base',
                    loading && 'spinner spinner-white spinner-right mr-3'
                  )}
                  disabled={loading}
                >
                  Tìm kiếm khách hàng
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default Sidebar