import React, { useState } from 'react'
import { Tab } from 'react-bootstrap'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Booking from './Booking'
import Confirm from './Confirm'
import '../../_assets/sass/pages/_home.scss'
import bookingApi from 'src/api/booking.api'

import moment from 'moment'
import 'moment/locale/vi'
moment.locale('vi')

const initialValue = {
  AtHome: false,
  MemberID: window.top?.Member?.ID || 0,
  RootIdS: '',
  BookDate: '',
  Desc: '',
  StockID: window.top?.MemberSelectStockID || '',
  FullName: window.top?.Member?.FullName || '',
  Phone: window.top?.Member?.MobilePhone || '',
  UserServiceIDs: ''
}

const BookingSchema = Yup.object().shape({
  StockID: Yup.string().required('Vui lòng chọn cơ sở.'),
  BookDate: Yup.string().required('Chọn ngày đặt lịch.'),
  Phone: Yup.string().required('Nhập số điện thoại.'),
  FullName: Yup.string().required('Nhập họ tên.'),
  RootIdS: Yup.array().required('Chọn dịch vụ.')
})

export default function Home() {
  const [key, setKey] = useState('booking')
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [initialValues] = useState(initialValue)

  const onSubmit = (values, { resetForm }) => {
    setLoadingBtn(true)
    const newValues = {
      booking: [
        {
          ...values,
          BookDate: values.BookDate
            ? moment(values.BookDate).format('YYYY-MM-DD HH:mm')
            : '',
          RootIdS: values.RootIdS ? values.RootIdS.join(',') : '',
          UserServiceIDs: values.UserServiceIDs
            ? values.UserServiceIDs.value
            : ''
        }
      ]
    }
    bookingApi
      .postBooking(newValues)
      .then(response => {
        setLoadingBtn(false)
        resetForm()
        window.top?.Swal &&
          window.top?.Swal?.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Đặt lịch thành công !',
            showConfirmButton: false,
            timer: 1500
          })
        window.top?.onHideBooking && window.top.onHideBooking()
      })
      .catch(error => console.log(error))
  }

  const nextStep = setErrors => {
    setKey('confirm')
    setErrors && setErrors({})
  }

  const prevStep = () => {
    setKey('booking')
  }

  return (
    <div className="h-100 overflow-hidden position-relative tab-book">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={BookingSchema}
      >
        {formikProps => {
          // errors, touched, handleChange, handleBlur
          /* const { values, errors, setFieldValue, handleChange, handleBlur } =
            formikProps */
          window.top.handleReset = () => {
            setKey('booking')
            formikProps.resetForm()
          }

          window.top.setFieldValue = ServiceID => {
            formikProps.setFieldValue('RootIdS', [ServiceID])
          }

          return (
            <Form className="h-100">
              <Tab.Container className="h-100" activeKey={key}>
                <Tab.Pane
                  className="h-100 tab-book__content tab-booking"
                  eventKey="booking"
                >
                  <Booking formikProps={formikProps} nextStep={nextStep} />
                </Tab.Pane>
                <Tab.Pane
                  className="h-100 tab-book__content tab-confirm"
                  eventKey="confirm"
                >
                  <Confirm
                    formikProps={formikProps}
                    prevStep={prevStep}
                    onSubmit={onSubmit}
                    loadingBtn={loadingBtn}
                  />
                </Tab.Pane>
              </Tab.Container>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
