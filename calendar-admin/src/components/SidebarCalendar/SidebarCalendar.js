import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import Select from "react-select";
// import DatePicker from "react-datepicker";
import { Field, Form, Formik, useFormikContext } from "formik";
import CalendarCrud from "../../App/modules/Calendar/_redux/CalendarCrud";
import { toUrlServer } from "../../helpers/AssetsHelpers";
import { useSelector } from "react-redux";
import { useWindowSize } from "../../hooks/useWindowSize";

SidebarCalendar.propTypes = {
  onOpenModal: PropTypes.func,
  onSubmit: PropTypes.func,
  filters: PropTypes.object,
  loading: PropTypes.bool,
};
SidebarCalendar.defaultProps = {
  onOpenModal: null,
  onSubmit: null,
  filters: null,
  loading: false,
};

const StatusArr = [
  {
    value: "XAC_NHAN",
    label: "Đã xác nhận",
    color: "#3699FF",
  },
  {
    value: "XAC_NHAN_TU_DONG",
    label: "Đã xác nhận (Tự động)",
    color: "rgb(0 122 247)",
  },
  {
    value: "CHUA_XAC_NHAN",
    label: "Chưa xác nhận",
    color: "#FFA800",
  },
  {
    value: "KHACH_KHONG_DEN",
    label: "Đặt nhưng không đến",
    color: "#F64E60",
  },
  {
    value: "KHACH_DEN",
    label: "Hoàn thành",
    color: "#1bc5bd",
  },
  {
    value: "DANG_THUC_HIEN",
    label: "Đang thực hiện",
    color: "#8950FC",
  },
  {
    value: "THUC_HIEN_XONG",
    label: "Thực hiện xong",
    color: "#92929e",
  },
];

const StatusMembers = [
  {
    value: "KHACH_CU",
    label: "Khách cũ",
  },
  {
    value: "KHACH_VANG_LAI_CO_TK",
    label: "Khách vãng lai ( Có tài khoản )",
  },
  {
    value: "KHACH_MOI",
    label: "Khách vãng lai ( Khách mới )",
  },
];

const StatusBooks = [
  {
    value: "DA_CHON",
    label: "Đã chọn nhân viên",
  },
  {
    value: "CHUA_CHON",
    label: "Chưa chọn nhân viên",
  },
];

const StatusAtHome = [
  {
    value: "TAI_NHA",
    label: "Tại nhà",
  },
  {
    value: "TAI_SPA",
    label: "Tại Spa",
  },
];

const CustomOptionStaff = ({ children, ...props }) => {
  const { Thumbnail, label } = props.data;
  return (
    <components.Option {...props}>
      <div className="d-flex align-items-center">
        <div className="w-20px h-20px mr-2 rounded-circle overflow-hidden d-flex align-items-center justify-content-center">
          <img className="w-100" src={Thumbnail} alt={label} />
        </div>
        {children}
      </div>
    </components.Option>
  );
};

const Control = ({ children, ...props }) => {
  // @ts-ignore
  const { classIcon } = props.selectProps;

  return (
    <components.Control {...props}>
      <i
        className={classIcon}
        style={{ fontSize: "15px", color: "#5f6368", padding: "0 0 0 10px" }}
      ></i>
      {children}
    </components.Control>
  );
};

// const CustomOption = ({ children, ...props }) => {
//   const { color } = props.data;
//   return (
//     <components.Option {...props}>
//       <div className="d-flex align-items-center">
//         <div
//           className="w-20px h-15px rounded-2px mr-2"
//           style={{ background: color }}
//         ></div>
//         {children}
//       </div>
//     </components.Option>
//   );
// };

const ValueChangeListener = () => {
  const { submitForm, values } = useFormikContext();

  useEffect(() => {
    submitForm();
  }, [values, submitForm]);

  return null;
};

const CheckBox = (props) => (
  <Field name={props.name}>
    {({ field, form }) => (
      <label className={`checkbox ${!props.isMargin && "mt-2"}`}>
        <input
          {...field}
          value={props.value}
          type="checkbox"
          checked={field.value && field.value.includes(props.value)}
          onChange={() => {
            const set = new Set(field.value);
            if (set.has(props.value)) {
              set.delete(props.value);
            } else {
              set.add(props.value);
            }
            form.setFieldValue(field.name, Array.from(set));
            form.setFieldTouched(field.name, true);
          }}
        />
        <span style={{ background: props.color }}></span>
        {/* <div
          className="w-30px h-18px rounded-2px mr-2 ml-2"
          style={{ background: props.color }}
        /> */}
        <div className="font-weight-bold font-size-smm ml-2">{props.label}</div>
      </label>
    )}
  </Field>
);

const initialDefault = {
  MemberID: null,
  StockID: 0,
  From: new Date(), //yyyy-MM-dd
  To: null, //yyyy-MM-dd,
  Status: null,
  UserServiceIDs: null,
};

function SidebarCalendar({
  onOpenModal,
  onSubmit,
  filters,
  initialView,
  loading,
  onOpenFilter,
  onHideFilter,
  isFilter,
}) {
  const [initialValues, setInitialValues] = useState(initialDefault);
  const { CrStockID } = useSelector((state) => state.Auth);
  const { width } = useWindowSize();

  useEffect(() => {
    if (filters) {
      setInitialValues(filters);
    }
  }, [filters]);

  const loadOptionsStaff = (inputValue, callback) => {
    const filters = {
      key: inputValue,
      StockID: CrStockID,
    };
    setTimeout(async () => {
      const { data } = await CalendarCrud.getStaffs(filters);
      const dataResult = data.data.map((item) => ({
        value: item.id,
        label: item.text,
        Thumbnail: toUrlServer("/images/user.png"),
      }));
      callback(dataResult);
    }, 300);
  };

  const loadOptionsCustomer = (inputValue, callback) => {
    setTimeout(async () => {
      const { data } = await CalendarCrud.getMembers(inputValue);
      const dataResult = data.data.map((item) => ({
        value: item.id,
        label: item.text,
        Thumbnail: toUrlServer("/images/user.png"),
      }));
      callback(dataResult);
    }, 300);
  };

  return (
    <div className="ezs-calendar__sidebar">
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary btn-sm h-42px mb-3 mb-md-24px"
          onClick={onOpenModal}
        >
          Tạo đặt lịch mới
        </button>
        <button
          className="btn btn-info btn-sm h-42px mb-3 mb-md-24px ml-2 d-lg-none"
          onClick={onOpenFilter}
        >
          Bộ lọc
        </button>
      </div>
      <div
        className={`sidebar-bg ${isFilter ? "show" : ""}`}
        onClick={onHideFilter}
      ></div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formikProps) => {
          const { values, setFieldValue } = formikProps;
          return (
            <Form className={isFilter ? "show" : ""}>
              {/* <div className={`datepicker-inline ${initialView !== "timeGridDay" ? "disabled" : ""} mb-2`}>
                <DatePicker
                  selected={values.From && new Date(values.From)}
                  onChange={(date) => {
                    if (initialView === "timeGridDay") {
                      setFieldValue("From", date, false);
                    } else {
                      setFieldValue("From", date[0], false);
                      setFieldValue("To", date[1], false);
                    }
                  }}
                  inline
                  selectsRange={initialView !== "timeGridDay"}
                  startDate={values.From && new Date(values.From)}
                  endDate={values.To && new Date(values.To)}
                  disabled={true}
                />
              </div> */}
              <div className="form-group form-group-ezs mb-0 mt-12px">
                {/* <label className="mb-1">Khách hàng</label> */}
                <div className="px-10px">
                  <AsyncSelect
                    classIcon="far fa-user-alt"
                    menuPlacement="top"
                    isMulti
                    className="select-control mb-8px"
                    classNamePrefix="select"
                    isLoading={false}
                    isClearable
                    isSearchable
                    //menuIsOpen={true}
                    name="MemberID"
                    value={values.MemberID}
                    onChange={(option) =>
                      setFieldValue("MemberID", option, false)
                    }
                    placeholder="Chọn khách hàng"
                    components={{
                      Option: CustomOptionStaff,
                      Control,
                    }}
                    cacheOptions
                    loadOptions={loadOptionsCustomer}
                    defaultOptions
                    noOptionsMessage={({ inputValue }) =>
                      !inputValue
                        ? "Không có khách hàng"
                        : "Không tìm thấy khách hàng"
                    }
                  />
                  <AsyncSelect
                    classIcon="far fa-user-cog"
                    menuPlacement="top"
                    key={CrStockID}
                    isMulti
                    className="select-control mb-8px"
                    classNamePrefix="select"
                    isLoading={false}
                    isClearable
                    isSearchable
                    //menuIsOpen={true}
                    name="UserServiceIDs"
                    value={values.UserServiceIDs}
                    onChange={(option) =>
                      setFieldValue("UserServiceIDs", option, false)
                    }
                    placeholder="Chọn nhân viên"
                    components={{
                      Option: CustomOptionStaff,
                      Control,
                    }}
                    cacheOptions
                    loadOptions={loadOptionsStaff}
                    defaultOptions
                    noOptionsMessage={({ inputValue }) =>
                      !inputValue
                        ? "Không có nhân viên"
                        : "Không tìm thấy nhân viên"
                    }
                  />
                </div>
              </div>
              <div className="form-group form-group-ezs mb-0">
                <label className="form-group-action mb-0">
                  Nâng cao <i className="far fa-angle-down"></i>
                </label>
                <div className="px-10px py-8px">
                  <Select
                    className="select-control mb-8px"
                    classNamePrefix="select"
                    isLoading={false}
                    isClearable
                    isSearchable
                    //menuIsOpen={true}
                    name="StatusMember"
                    placeholder="Chọn loại khách hàng"
                    options={StatusMembers}
                    value={values.StatusMember}
                    onChange={(option) =>
                      setFieldValue("StatusMember", option, false)
                    }
                  />
                  <Select
                    className="select-control mb-8px"
                    classNamePrefix="select"
                    isLoading={false}
                    isClearable
                    isSearchable
                    //menuIsOpen={true}
                    name="StatusBook"
                    placeholder="Chọn loại"
                    options={StatusBooks}
                    value={values.StatusBook}
                    onChange={(option) =>
                      setFieldValue("StatusBook", option, false)
                    }
                  />
                  <Select
                    className="select-control"
                    classNamePrefix="select"
                    isLoading={false}
                    isClearable
                    isSearchable
                    //menuIsOpen={true}
                    name="StatusAtHome"
                    placeholder="Chọn loại thực hiện"
                    options={StatusAtHome}
                    value={values.StatusAtHome}
                    onChange={(option) =>
                      setFieldValue("StatusAtHome", option, false)
                    }
                  />
                </div>
              </div>
              <div className="form-group form-group-ezs mb-0">
                <label className="form-group-action mb-0">
                  Trạng thái đặt lịch <i className="far fa-angle-down"></i>
                </label>
                <div className="px-10px py-8px">
                  {StatusArr &&
                    StatusArr.map((item, index) => (
                      <CheckBox
                        isMargin={index === 0}
                        name="Status"
                        label={item.label}
                        value={item.value}
                        color={item.color}
                        key={index}
                      />
                    ))}
                </div>
              </div>
              {/* 
              <div className="form-group form-group-ezs">
                <label className="mb-1">Nâng cao</label>
                <Select
                  className="select-control"
                  classNamePrefix="select"
                  isLoading={false}
                  isClearable
                  isSearchable
                  //menuIsOpen={true}
                  name="color"
                  placeholder="Chọn"
                  options={AdvancedArr}
                />
              </div> */}
              {width > 991 ? (
                <ValueChangeListener />
              ) : (
                <div className="d-flex justify-content-between">
                  <button
                    type="submit"
                    className={`btn btn-primary btn-sm d-block ${
                      loading ? "spinner spinner-white spinner-right" : ""
                    } w-auto my-0 mr-0 h-auto`}
                    disabled={loading}
                  >
                    Lọc ngay
                  </button>
                  <button
                    type="submit"
                    className={`btn btn-secondary w-auto my-0 mr-0 h-auto`}
                  >
                    Đóng
                  </button>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default SidebarCalendar;
