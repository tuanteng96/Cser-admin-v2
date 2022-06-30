import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckIn, filterBy } from "./_redux/CheckinSlice";
import PerfectScrollbar from 'react-perfect-scrollbar'
import CheckInFilter from "./CheckInFilter";

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
}

function CheckInPage(props) {

  const { ListCheckIn, loading } = useSelector(({ CheckIn }) => ({
    ListCheckIn: CheckIn.ListFilters ?? CheckIn.ListCheckIn,
    loading: CheckIn.loading
  }));
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(CheckIn())
  }, [dispatch])

  const onFilter = (values) => {
    dispatch(filterBy(values))
  }

  // console.log(ListCheckIn)
  // console.log(loading)

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
          <CheckInFilter onSubmit={(values) => onFilter(values)} />
        </div>
      </div>
      <PerfectScrollbar
        options={perfectScrollbarOptions}
        className="scroll flex-grow-1"
        style={{ position: "relative" }}
      >
        {
          loading && "Đang tải"
        }
        {
          !loading && (
            <>
              {
                ListCheckIn && ListCheckIn.map((item, index) => (
                  <div className="p-15px border-bottom" key={index}>
                    <div>{item.FullName}</div>
                    <div>{item.Phone}</div>
                  </div>
                ))
              }
            </>
          )
        }
      </PerfectScrollbar>
    </div>
  );
}

export default CheckInPage;
