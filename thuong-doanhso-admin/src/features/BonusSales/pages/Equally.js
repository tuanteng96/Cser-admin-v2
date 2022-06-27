import React, { Fragment, useState } from "react";
import { Table } from "react-bootstrap";
import Select from "react-select";
import NumberFormat from "react-number-format";
import { Formik, FieldArray, Form } from "formik";
import PropTypes from "prop-types";

function Equally({ OrderInfo, onSubmit, loading }) {
  const [initialValues, setInitialValues] = useState({ equally: [] });

  const onToAdd = (values, { resetForm }) => {
    const { ToAdd } = values;
    if (ToAdd.length > 0) {
      const newArr =
        OrderInfo && OrderInfo.oiItems && OrderInfo.oiItems.length > 0
          ? OrderInfo.oiItems.map((item) => ({
              Product: item,
              Hoa_Hong: ToAdd.map((user) => ({
                Product: item,
                Staff: user,
                Value:
                  item.gia_tri_thanh_toan > 0
                    ? Math.round((user.Value * item.gia_tri_thanh_toan) / 100)
                    : null,
              })).filter((item) => item.Value),
              Doanh_So: ToAdd.map((user) => ({
                Product: item,
                Staff: user,
                Value:
                  item.gia_tri_doanh_so > 0
                    ? Math.round((user.Value * item.gia_tri_doanh_so) / 100)
                    : null,
              })).filter((item) => item.Value),
            }))
          : [];
      setInitialValues({ equally: newArr });
      resetForm();
    }
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-6">
          <div className="border rounded mb-3 px-4 py-4">
            <Formik
              enableReinitialize
              initialValues={{ ToAdd: [] }}
              onSubmit={onToAdd}
            >
              {(formikProps) => {
                const { values, setFieldValue, handleBlur } = formikProps;
                return (
                  <Form>
                    <div className="d-flex">
                      <Select
                        isMulti
                        classNamePrefix="select"
                        className={`select-control flex-1`}
                        name={`ToAdd`}
                        options={OrderInfo.nhan_vien}
                        value={values.ToAdd}
                        placeholder="Chọn Nhân viên"
                        noOptionsMessage={() => "Không có lựa chọn"}
                        onChange={(option) => {
                          const newOption =
                            option && option.length > 0
                              ? option.map((item) => ({
                                  ...item,
                                  Value: Math.round(100 / option.length),
                                }))
                              : [];
                          setFieldValue(`ToAdd`, newOption, false);
                        }}
                        isSearchable
                        isClearable
                        menuPosition="fixed"
                      />
                    </div>
                    <div>
                      {values.ToAdd &&
                        values.ToAdd.map((item, index) => (
                          <div
                            className="d-flex align-items-center mt-3"
                            key={index}
                          >
                            <div className="w-200px font-weight-bold">
                              {item.Fn}
                            </div>
                            <div className="flex-1 position-relative">
                              <NumberFormat
                                isAllowed={(values) => {
                                  const { formattedValue, floatValue } = values;
                                  return (
                                    formattedValue === "" || floatValue <= 100
                                  );
                                }}
                                allowNegative={false}
                                name={`ToAdd[${index}].Value`}
                                placeholder={"Nhập giá trị"}
                                className={`form-control`}
                                isNumericString={true}
                                //thousandSeparator={true}
                                value={item.Value}
                                onValueChange={(val) => {
                                  setFieldValue(
                                    `ToAdd[${index}].Value`,
                                    val.floatValue ? val.floatValue : val.value,
                                    false
                                  );
                                }}
                                onBlur={handleBlur}
                              />
                              <div className="position-absolute top-0 right-0 h-100 w-45px d-flex align-items-center justify-content-center">
                                %
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    {values.ToAdd && values.ToAdd.length > 0 && (
                      <div className="text-end mt-3">
                        <button type="submit" className="btn btn-primary">
                          Tạo mới
                        </button>
                      </div>
                    )}
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
      {initialValues &&
        initialValues.equally &&
        initialValues.equally.length > 0 && (
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {(formikProps) => {
              const { values, handleBlur, setFieldValue } = formikProps;
              return (
                <Form>
                  <Table bordered responsive>
                    <thead>
                      <tr>
                        <th className="min-w-250px w-20">Sản phẩm</th>
                        <th className="text-center min-w-250px w-40">
                          Hoa hồng
                        </th>
                        <th className="text-center min-w-250px w-40">
                          Doanh số
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {values.equally.map((item, index) => (
                        <tr key={index}>
                          <td className="vertical-align-middle font-weight-boldest">
                            {item.Product.ProdTitle}
                          </td>
                          <td>
                            <FieldArray
                              name={`equally[${index}].Hoa_Hong`}
                              render={(arrayHelpers) =>
                                item.Hoa_Hong.map((sub, idx) => (
                                  <div
                                    className="d-flex align-items-center my-2"
                                    key={idx}
                                  >
                                    <label className="font-weight-boldest mb-1 w-140px text-truncate pe-3">
                                      {sub.Staff.Fn}
                                    </label>
                                    <NumberFormat
                                      allowNegative={false}
                                      name={`equally[${index}].Hoa_Hong[${idx}].Value`}
                                      placeholder={"Nhập giá trị"}
                                      className={`form-control flex-1`}
                                      isNumericString={true}
                                      thousandSeparator={true}
                                      value={sub.Value}
                                      onValueChange={(val) => {
                                        setFieldValue(
                                          `equally[${index}].Hoa_Hong[${idx}].Value`,
                                          val.floatValue
                                            ? val.floatValue
                                            : val.value,
                                          false
                                        );
                                      }}
                                      onBlur={handleBlur}
                                    />
                                  </div>
                                ))
                              }
                            />
                          </td>
                          <td>
                            <FieldArray
                              name={`equally[${index}].Doanh_So`}
                              render={(arrayHelpers) =>
                                item.Doanh_So.map((sub, idx) => (
                                  <div
                                    className="d-flex align-items-center my-2"
                                    key={idx}
                                  >
                                    <label className="font-weight-boldest mb-1 w-140px text-truncate pe-3">
                                      {sub.Staff.Fn}
                                    </label>
                                    <NumberFormat
                                      allowNegative={false}
                                      name={`equally[${index}].Doanh_So[${idx}].Value`}
                                      placeholder={"Nhập giá trị"}
                                      className={`form-control flex-1`}
                                      isNumericString={true}
                                      thousandSeparator={true}
                                      value={sub.Value}
                                      onValueChange={(val) => {
                                        setFieldValue(
                                          `equally[${index}].Doanh_So[${idx}].Value`,
                                          val.floatValue
                                            ? val.floatValue
                                            : val.value,
                                          false
                                        );
                                      }}
                                      onBlur={handleBlur}
                                    />
                                  </div>
                                ))
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div>
                    <button
                      className={`btn btn-success ${
                        loading.equally
                          ? "spinner spinner-white spinner-right"
                          : ""
                      }`}
                      type="submit"
                      disabled={loading.equally}
                    >
                      Cập nhập
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        )}
    </Fragment>
  );
}

Equally.propTypes = {
  OrderInfo: PropTypes.object,
};

export default Equally;
