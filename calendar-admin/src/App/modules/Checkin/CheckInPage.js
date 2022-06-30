import React from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

function CheckInPage(props) {
  const a = useSelector((state) => state.CheckIn.Test);
  return (
    <div className="w-450px h-100vh shadow d-flex flex-column">
      <div className="shadow">
        <div className="d-flex justify-content-between align-items-center border-bottom py-10px px-15px">
          <div className="text-uppercase font-weight-bold pt-3px">
            Khách đang Check In
          </div>
          <div className="cursor-pointer w-30px text-center">
            <i className="ki ki-close icon-xs text-muted font-size-md"></i>
          </div>
        </div>
        <div className="py-12px px-15px">
          <div className="d-flex">
            <div className="flex-grow-1 position-relative">
              <input
                type="text"
                className="form-control font-size-sm rounded-4px pl-35px"
                placeholder="Tìm kiếm khách hàng"
              />
              <i className="far fa-search font-size-sm position-absolute top-12px left-12px"></i>
            </div>
            <div className="w-180px pl-12px">
              <Select
                className="select-control"
                classNamePrefix="select"
                isLoading={false}
                isClearable
                isSearchable
                //menuIsOpen={true}
                name="color"
                placeholder="Chọn"
                options={[
                  {
                    label: "Tất cả",
                    value: "-1",
                  },
                  {
                    label: "Phát sinh đơn hàng",
                    value: "0",
                  },
                  {
                    label: "Không phát sinh",
                    value: "1",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow-1">{a}</div>
    </div>
  );
}

export default CheckInPage;
