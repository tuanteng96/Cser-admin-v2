import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Button, Modal } from 'react-bootstrap'
import { TimePicker } from 'antd'
import { NumericFormat } from 'react-number-format'
import locale from 'antd/es/date-picker/locale/de_DE'
import { clsx } from 'clsx'

import moment from 'moment'
import 'moment/locale/vi'

moment.locale('vi')

ModalTimeKeeping.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func
}

const initialValue = {
  UserID: '',
  Date: '',
  Hours: [],
  Desc: '',
  WorkQty: '',
  WorkQty1: '',
  WorkQty2: ''
}

const CreateSchema = Yup.object().shape({})

const getHourList = HourList => {
  let newHourList = []
  if (!HourList || HourList.length === 0) {
    newHourList = [['', '']]
  } else {
    newHourList = HourList.map(item => [
      item.From ? moment(item.From, 'HH:mm:ss') : '',
      item.To ? moment(item.To, 'HH:mm:ss') : ''
    ])
  }
  return newHourList
}

function ModalTimeKeeping({ show, initialModal, onHide, onSubmit, loading }) {
  const [initialValues, setInitialValues] = useState(initialValue)

  useEffect(() => {
    if (show) {
      setInitialValues(prevState => ({
        ...prevState,
        Date: initialModal?.Date,
        UserID: initialModal?.Member?.ID,
        Hours: getHourList(initialModal?.HourList),
        Desc:
          initialModal?.UserWorks && initialModal?.UserWorks.length > 0
            ? initialModal?.UserWorks[0].Desc
            : '',
        WorkQty:
          initialModal?.UserWorks && initialModal?.UserWorks.length > 0
            ? initialModal?.UserWorks[0].WorkQty
            : '',
        WorkQty1:
          initialModal?.UserWorks && initialModal?.UserWorks.length > 0
            ? initialModal?.UserWorks[0].WorkQty1
            : '',
        WorkQty2:
          initialModal?.UserWorks && initialModal?.UserWorks.length > 0
            ? initialModal?.UserWorks[0].WorkQty2
            : ''
      }))
    } else {
      setInitialValues(initialValue)
    }
  }, [initialModal, show])

  if (!initialModal) return null
  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="modal-content-right max-w-350px"
      scrollable={true}
      enforceFocus={false}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={CreateSchema}
      >
        {formikProps => {
          // errors, touched, handleChange, handleBlur
          const { values, setFieldValue, handleChange, handleBlur } =
            formikProps
          return (
            <Form className="d-flex flex-column h-100">
              <Modal.Header closeButton>
                <Modal.Title className="font-title text-uppercase">
                  <div className="text-capitalize">
                    {initialModal?.Member?.FullName}
                  </div>
                  <div className="font-size-sm text-capitalize font-base text-muted">
                    <span className="text-capitalize">
                      {moment(initialModal?.Date).format('dddd')}
                    </span>
                    , Ngày
                    <span className="pl-3px">
                      {moment(initialModal?.Date).format('DD/MM/YYYY')}
                    </span>
                  </div>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="p-0">
                <div className="border-bottom py-15px">
                  <FieldArray
                    name="Hours"
                    render={arrayHelpers => (
                      <Fragment>
                        {values.Hours &&
                          values.Hours.map((hour, index) => (
                            <div
                              className="form-group px-20px py-3px"
                              key={index}
                            >
                              <div className="d-flex TimePicker-button">
                                <div className="flex-1">
                                  <TimePicker.RangePicker
                                    locale={{
                                      ...locale,
                                      lang: {
                                        ...locale.lang,
                                        ok: 'Lưu giờ'
                                      }
                                    }}
                                    placeholder={['Bắt đầu', 'Kết thúc']}
                                    onChange={(value, dateString) => {
                                      setFieldValue(`Hours[${index}]`, value)
                                    }}
                                    value={hour}
                                  />
                                </div>
                                {values.Hours.length - 1 === index && (
                                  <button
                                    type="button"
                                    className="btn w-35px"
                                    onClick={() =>
                                      arrayHelpers.push(index, ['', ''])
                                    }
                                  >
                                    <i className="fa-regular fa-plus text-success"></i>
                                  </button>
                                )}
                                {values.Hours.length > 1 &&
                                  values.Hours.length - 1 !== index && (
                                    <button
                                      type="button"
                                      className="btn w-35px"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <i className="fa-regular fa-xmark text-danger"></i>
                                    </button>
                                  )}
                              </div>
                            </div>
                          ))}
                      </Fragment>
                    )}
                  />
                </div>
                <div className="form-group mb-20px px-20px mt-20px">
                  <label className="font-label text-muted mb-5px">Công</label>
                  <NumericFormat
                    className="form-control form-control-solid"
                    type="text"
                    placeholder="Nhập số công"
                    name="WorkQty"
                    value={values.WorkQty}
                    onValueChange={val =>
                      setFieldValue(
                        'WorkQty',
                        val.floatValue ? val.floatValue : val.value
                      )
                    }
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                </div>
                <div className="form-group mb-20px px-20px">
                  <label className="font-label text-muted mb-5px">
                    Tăng ca
                  </label>
                  <NumericFormat
                    className="form-control form-control-solid"
                    type="text"
                    placeholder="Thời gian tăng ca"
                    name="WorkQty1"
                    value={values.WorkQty1}
                    onValueChange={val =>
                      setFieldValue(
                        'WorkQty1',
                        val.floatValue ? val.floatValue : val.value
                      )
                    }
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                </div>
                <div className="form-group mb-20px px-20px">
                  <label className="font-label text-muted mb-5px">
                    Thiếu giờ
                  </label>
                  <NumericFormat
                    className="form-control form-control-solid"
                    type="text"
                    placeholder="Thời gian thiếu"
                    name="WorkQty2"
                    value={values.WorkQty2}
                    onValueChange={val =>
                      setFieldValue(
                        'WorkQty2',
                        val.floatValue ? val.floatValue : val.value
                      )
                    }
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                </div>
                <div className="form-group mb-20px px-20px">
                  <label className="font-label text-muted mb-5px">
                    Ghi chú
                  </label>
                  <textarea
                    className="form-control form-control-solid"
                    placeholder="Nhập ghi chú"
                    rows={4}
                    name="Desc"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Desc}
                  ></textarea>
                </div>
              </Modal.Body>
              <Modal.Footer className="justify-content-between">
                <Button type="button" variant="secondary" onClick={onHide}>
                  Đóng
                </Button>
                <Button
                  type="submit"
                  className={clsx(
                    'ml-8px',
                    loading && 'spinner spinner-white spinner-right'
                  )}
                  variant="primary"
                  disabled={loading}
                >
                  Cập nhập
                </Button>
              </Modal.Footer>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}

export default ModalTimeKeeping
