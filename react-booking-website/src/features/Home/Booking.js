import React from 'react'
import PropTypes from 'prop-types'
import ListStocks from './components/ListStocks'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import DateTime from './components/DateTime'

Booking.propTypes = {
  onSubmit: PropTypes.func
}

const initialValues = {
  AtHome: false,
  MemberID: 0,
  RootIdS: '',
  BookDate: '',
  Desc: '',
  StockID: '',
  FullName: '',
  Phone: ''
}

const BookingSchema = Yup.object().shape({
  StockID: Yup.string().required('Vui lòng chọn cơ sở.'),
  BookDate: Yup.string().required('Chọn ngày đặt lịch.').nullable()
})

function Booking({ onSubmit }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
      validationSchema={BookingSchema}
    >
      {formikProps => {
        // errors, touched, handleChange, handleBlur
        {
          /* const { values, errors, setFieldValue, handleChange, handleBlur } =
          formikProps */
        }
        return (
          <Form className="d-flex flex-column h-100">
            <div className="border-bottom p-15px text-uppercase fw-700 font-size-lg bg-white text-center">
              Đặt lịch dịch vụ
            </div>
            <div className="flex-grow-1">
              <ListStocks formikProps={formikProps} />
              <DateTime formikProps={formikProps} />
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-primary w-100 rounded-0 text-uppercase h-42px"
              >
                Chọn dịch vụ
              </button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default Booking
