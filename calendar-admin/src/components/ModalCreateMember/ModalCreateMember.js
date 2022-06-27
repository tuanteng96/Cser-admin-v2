import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from "react-bootstrap";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from 'react';

const MemberSchema = Yup.object().shape({
    FullName: Yup.string().required("Vui lòng nhập họ tên khách hàng."),
    Phone: Yup.string().required("Vui lòng nhập số điện thoại khách hàng.")
});

function ModalCreateMember({ show, onHide, onSubmit, initialDefault }) {
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        setInitialValues(initialDefault)
    }, [initialDefault])

    return (
        <Modal
            size="md"
            dialogClassName="modal-max-sm modal-content-right"
            show={show}
            onHide={onHide}
            scrollable={true}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={MemberSchema}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {(formikProps) => {
                    const {
                        errors,
                        touched,
                        values,
                        handleChange,
                        handleBlur,
                        setFieldValue,
                    } = formikProps;
                    return (
                        <Form className="h-100 d-flex flex-column">
                            <Modal.Header className="open-close" closeButton>
                                <Modal.Title className="text-uppercase">
                                    Tạo mới khách hàng
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="p-0">
                                <div className="form-group form-group-ezs px-6 pt-3 mb-3">
                                    <label className="mb-1 d-none d-md-block">
                                        Tên khách hàng
                                    </label>
                                    <input
                                        className={`form-control ${errors.FullName && touched.FullName
                                            ? "is-invalid solid-invalid"
                                            : ""
                                            }`}
                                        name="FullName"
                                        value={values.FullName}
                                        placeholder="Nhập họ tên"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        autoComplete="off"
                                    ></input>
                                </div>
                                <div className="form-group form-group-ezs px-6 pt-3 mb-3">
                                    <label className="mb-1 d-none d-md-block">
                                        Số điện thoại
                                    </label>
                                    <input
                                        className={`form-control ${errors.Phone && touched.Phone
                                            ? "is-invalid solid-invalid"
                                            : ""
                                            }`}
                                        name="Phone"
                                        value={values.Phone}
                                        placeholder="Nhập số điện thoại"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        autoComplete="off"
                                    ></input>
                                    <div className="d-flex align-items-center justify-content-between mt-4">
                                        <label className="mr-3">Đặt lịch cho khách vãng lai</label>
                                        <span className="switch switch-sm switch-icon">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="PassersBy"
                                                    onChange={(evt) =>
                                                        setFieldValue("PassersBy", evt.target.checked)
                                                    }
                                                    onBlur={handleBlur}
                                                    checked={values.PassersBy}
                                                />
                                                <span />
                                            </label>
                                        </span>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer className="justify-content-between">
                                <div>
                                    <button
                                        type="submit"
                                        className={`btn btn-sm btn-primary mr-2 ${2 === 3
                                            ? "spinner spinner-white spinner-right"
                                            : ""
                                            } w-auto my-0 mr-0 h-auto`}
                                        disabled={false}
                                    >
                                        Tạo mới
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-secondary"
                                        onClick={onHide}
                                    >
                                        Đóng
                                    </button>
                                </div>
                                <div></div>
                            </Modal.Footer>
                        </Form>
                    );
                }}
            </Formik>
        </Modal>
    )
}

ModalCreateMember.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    onSubmit: PropTypes.func,
};
ModalCreateMember.defaultProps = {
    show: false,
    onHide: null,
    onSubmit: null,
};

export default ModalCreateMember
