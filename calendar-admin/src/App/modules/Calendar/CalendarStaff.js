import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./../../../_assets/sass/pages/_calendar-staff.scss";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";

import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

CalendarStaff.propTypes = {
  height: PropTypes.number,
};

var minWidthCell = 300;
var now = moment();
var timeStart = now.startOf("day").toString();
var timeEnd = now.endOf("day").toString();

const lineTimeArray = () => {
  const newArr = [
    {
      Time: timeStart,
      TimeEvent: [
        { Time: timeStart },
        {
          Time: moment(timeStart)
            .add(30, "minutes")
            .toDate(),
        },
      ],
    },
  ];
  while (
    moment(newArr[newArr.length - 1].Time).diff(timeEnd, "minutes") < -60
  ) {
    let newTime = moment(newArr[newArr.length - 1].Time)
      .add(60, "minutes")
      .toDate();
    newArr.push({
      Time: newTime,
      TimeEvent: [
        { Time: newTime },
        {
          Time: moment(newTime)
            .add(30, "minutes")
            .toDate(),
        },
      ],
    });
  }
  return newArr;
};

function getScrollbarWidth() {
  // Creating invisible container
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll"; // forcing scrollbar to appear
  outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement("div");
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
}

function CalendarStaff({ height, resources, events, dateClick, eventClick }) {
  const [lineTime] = useState(lineTimeArray());
  const [newResources, setNewResources] = useState(resources);

  useEffect(() => {
    setNewResources((prevState) =>
      prevState.map((item) => ({
        ...item,
        Services: events.filter(
          (event) =>
            (event.staffs && event.staffs.some((o) => o.ID === item.id)) ||
            (event.UserServices &&
              event.UserServices.some((o) => o.ID === item.id))
        ),
      }))
    );
  }, [events]);

  const getStyleEvent = (service) => {
    const { serviceStart, serviceEnd } = {
      serviceStart: service.start,
      serviceEnd: service.end,
    };
    const { timeStartDay } = {
      timeStartDay: timeStart,
      timeEndDay: timeEnd,
    };
    var TotalSeconds = 24 * 60 * 60;
    const TotalTimeStart = moment(serviceStart).diff(
      moment(timeStartDay),
      "seconds"
    ); // Số phút từ 00 => Thời gian bắt đầu dịch vụ
    const TotalTimeService = moment(serviceEnd).diff(
      moment(serviceStart),
      "seconds"
    );

    const styles = {
      top: `${(TotalTimeStart / TotalSeconds) * 100}%`,
      height: `${(TotalTimeService / TotalSeconds) * 100}%`,
    };
    return styles;
  };

  const getStatusClss = (Status, item) => {
    const isAuto =
      item?.Desc && item.Desc.toUpperCase().indexOf("TỰ ĐỘNG ĐẶT LỊCH");
    if (Status === "XAC_NHAN") {
      if (isAuto !== "" && isAuto > -1) return "primary1";
      return "primary";
    }
    if (Status === "CHUA_XAC_NHAN") {
      return "warning";
    }
    if (Status === "KHACH_KHONG_DEN") {
      return "danger";
    }
    if (Status === "KHACH_DEN") {
      return "success";
    }
    if (Status === "doing") {
      return "info";
    }
    if (Status === "done") {
      return "secondary";
    }
  };

  return (
    <ScrollSync>
      <div
        style={{ height: `${height}px` }}
        className="flex-grow-1 calendar-staff d-flex"
      >
        <div className="calendar-staff-time">
          <div className="time-header border-bottom">
            <span>GMT+07</span>
          </div>
          <ScrollSyncPane>
            <div
              className="time-body"
              style={{ paddingBottom: `${getScrollbarWidth()}px` }}
            >
              {lineTime &&
                lineTime.map((item, index) => (
                  <div className="line-body" key={index}>
                    <span className="font-size-min gird-time font-number">
                      {moment(item.Time).format("HH:mm A")}
                    </span>
                    {item.TimeEvent.map((o, i) => (
                      <div className="line-item" key={i}></div>
                    ))}
                  </div>
                ))}
            </div>
          </ScrollSyncPane>
        </div>
        <div className="calendar-staff-content">
          <ScrollSyncPane>
            <div
              className="staff-header border-bottom"
              style={{ paddingRight: `${getScrollbarWidth()}px` }}
            >
              {resources &&
                resources.map((item, index) => (
                  <div className="staff-resources" key={index}>
                    <div className="name">{item.title}</div>
                  </div>
                ))}
            </div>
          </ScrollSyncPane>
          <ScrollSyncPane>
            <div className="staff-body">
              <div
                className="d-flex"
                style={{ minWidth: `${newResources.length * minWidthCell}px` }}
              >
                {newResources &&
                  newResources.map((staff, index) => (
                    <div className="staff-slot" key={index}>
                      {lineTime &&
                        lineTime.map((item, idx) => (
                          <div className={`staff-label ${lineTime.length - 1 === idx && "border-bottom-0"}`} key={idx}>
                            {item.TimeEvent.map((o, i) => (
                              <div
                                className="staff-line"
                                onClick={() => {
                                  dateClick({
                                    BookDate: o.Time,
                                    UserServiceIDs: [
                                      {
                                        label: staff.title,
                                        value: staff.id,
                                      },
                                    ],
                                  });
                                }}
                                key={i}
                              ></div>
                            ))}
                          </div>
                        ))}
                      {staff.Services &&
                        staff.Services.map((service, x) => (
                          <div
                            className={`fc-event`}
                            style={getStyleEvent(service)}
                            key={x}
                            onClick={() => eventClick(service)}
                          >
                            <div
                              className={`fc-bg bg-${getStatusClss(
                                service?.Status || service?.os?.Status,
                                service
                              )}`}
                            >
                              <div>
                                <span className="fullname">
                                  {service.AtHome
                                    ? `<i className="fas fa-home text-white font-size-xs"></i>`
                                    : ""}{" "}
                                  {service.Star ? `(${service.Star})` : ""}
                                  {service.MemberCurrent.FullName}
                                </span>
                                <span className="d-none d-md-inline">
                                  {" "}
                                  - {service.MemberCurrent?.MobilePhone}
                                </span>
                              </div>
                              <div className="d-flex">
                                <div className="w-45px">
                                  {moment(service.BookDate).format("HH:mm")}{" "}
                                </div>
                                <div className="flex-1 text-truncate">
                                  - {service.RootTitles}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            </div>
          </ScrollSyncPane>
        </div>
      </div>
    </ScrollSync>
  );
}

export default CalendarStaff;
