import React from 'react'
import PropTypes from 'prop-types'
import ListStocks from './components/ListStocks'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import DateTime from './components/DateTime'
import PerfectScrollbar from 'react-perfect-scrollbar'

Booking.propTypes = {
  onSubmit: PropTypes.func
}

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
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
        // {
        //   const { values, errors, setFieldValue, handleChange, handleBlur } =
        //   formikProps
        // }
        return (
          <Form className="d-flex flex-column h-100">
            <div className="border-bottom p-15px text-uppercase fw-700 font-size-md bg-white text-center">
              Đặt lịch dịch vụ
            </div>
            <PerfectScrollbar
              options={perfectScrollbarOptions}
              className="flex-grow-1 scroll"
            >
              <ListStocks formikProps={formikProps} />
              <DateTime formikProps={formikProps} />
            </PerfectScrollbar>
            <div>
              <button
                type="submit"
                className="btn btn-ezs w-100 rounded-0 text-uppercase h-42px fw-500"
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
