import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'
import SelectStaffs from 'src/components/Selects/SelectStaffs'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import DatePicker from 'react-datepicker'

ModalHolidaySchedule.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func
}

const initialValues = {
  StaffID: '',
  From: '',
  To: '',
  Desc: ''
}

const CreateSchema = Yup.object().shape({
  StaffID: Yup.object().required('Chọn nhân viên.')
})

function ModalHolidaySchedule({ show, onHide, onSubmit }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="modal-content-right max-w-400px"
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
          const { values, touched, errors, setFieldValue, handleBlur } =
            formikProps

          return (
            <Form className="d-flex flex-column h-100">
              <Modal.Header closeButton>
                <Modal.Title className="font-title text-uppercase">
                  Tạo ngày nghỉ
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="form-group mb-20px">
                  <label className="font-label text-muted mb-5px">
                    Nhân viên
                  </label>
                  <SelectStaffs
                    className={`select-control ${
                      errors.StaffID && touched.StaffID
                        ? 'is-invalid solid-invalid'
                        : ''
                    }`}
                    menuPosition="fixed"
                    name="StaffID"
                    onChange={otp => {
                      setFieldValue('StaffID', otp, false)
                    }}
                    value={values.StaffID}
                    isClearable={true}
                    adv={true}
                  />
                </div>
                <div className="form-group mb-20px">
                  <label className="font-label text-muted mb-5px">
                    Thời gian bắt đầu
                  </label>
                  <DatePicker
                    name="From"
                    selected={values.From ? new Date(values.From) : ''}
                    onChange={date => setFieldValue('From', date)}
                    onBlur={handleBlur}
                    className={`form-control ${
                      errors.From && touched.From
                        ? 'is-invalid solid-invalid'
                        : ''
                    }`}
                    shouldCloseOnSelect={false}
                    dateFormat="dd/MM/yyyy HH:mm"
                    placeholderText="Chọn thời gian"
                    timeInputLabel="Thời gian"
                    showTimeSelect
                    timeFormat="HH:mm"
                  />
                </div>
                <div className="form-group mb-20px">
                  <label className="font-label text-muted mb-5px">
                    Thời gian kết thúc
                  </label>
                  <DatePicker
                    name="To"
                    selected={values.To ? new Date(values.To) : ''}
                    onChange={date => setFieldValue('To', date)}
                    onBlur={handleBlur}
                    className={`form-control ${
                      errors.To && touched.To ? 'is-invalid solid-invalid' : ''
                    }`}
                    shouldCloseOnSelect={false}
                    dateFormat="dd/MM/yyyy HH:mm"
                    placeholderText="Chọn thời gian"
                    timeInputLabel="Thời gian"
                    showTimeSelect
                    timeFormat="HH:mm"
                  />
                </div>
                <div className="form-group mb-0">
                  <label className="font-label text-muted mb-5px">
                    Ghi chú
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Nhập ghi chú"
                    rows={4}
                  ></textarea>
                </div>
              </Modal.Body>
              <Modal.Footer className="justify-content-between">
                <div>
                  <Button variant="danger" onClick={onHide}>
                    Xóa lịch
                  </Button>
                </div>
                <div>
                  <Button variant="secondary" onClick={onHide}>
                    Đóng
                  </Button>
                  <Button className="ml-8px" variant="primary" onClick={onHide}>
                    Thêm mới
                  </Button>
                </div>
              </Modal.Footer>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}

export default ModalHolidaySchedule
