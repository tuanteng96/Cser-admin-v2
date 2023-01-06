import React, { useEffect, useState } from 'react'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync'

import moment from 'moment'
import 'moment/locale/vi'
moment.locale('vi')

const HolidaycheduleLine = ({ index, idx }) => {
  const [option, setOption] = useState(null)

  useEffect(() => {
    if (
      (idx === 2 || idx === 5 || idx === 18) &&
      index % 2 === 0 &&
      idx % 2 === 0
    ) {
      setOption({
        width: 100
      })
    }
  }, [index, idx])

  if (!option) return null
  return (
    <div
      className="bg-stripes position-absolute top-0 left-0 h-100 zindex--1"
      style={{ width: option.width + '%' }}
    ></div>
  )
}

function CalendarFull(props) {
  return (
    <ScrollSync>
      <div className="d-flex cld-timesheets">
        <div className="d-flex flex-column cld-timesheets__sidebar">
          <div className="cld-timesheets__sidebar-title">
            Danh sách nhân viên
          </div>
          <ScrollSyncPane>
            <div className="overflow-auto flex-grow-1">
              {Array(100)
                .fill()
                .map((o, index) => (
                  <div className="cld-row" key={index}>
                    <div className="name">Nguyễn Tuấn {index + 1}</div>
                  </div>
                ))}
            </div>
          </ScrollSyncPane>
        </div>
        <div className="flex-1 h-100 overflow-auto d-flex flex-column cld-timesheets__body">
          <ScrollSyncPane>
            <div className="d-flex cld-timesheets__body-title">
              {Array(7)
                .fill()
                .map((o, index) => (
                  <div key={index} className="cls-col">
                    <div className="date">
                      <span className="text-capitalize">
                        {moment().clone().weekday(index).format('dddd')}
                      </span>
                      , Ngày
                      <span className="pl-3px">
                        {moment().clone().weekday(index).format('DD/MM')}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </ScrollSyncPane>
          <ScrollSyncPane>
            <div className="overflow-auto flex-grow-1">
              {Array(100)
                .fill()
                .map((o, idx) => (
                  <div className="cld-row" key={idx}>
                    {Array(7)
                      .fill()
                      .map((o, index) => (
                        <div className="cls-col" key={index}>
                          <div className="daygrid-day">
                            <div className="event-main">
                              <div className="event-main__label bg-success">
                                08:00
                              </div>
                              <div className="event-main__line">
                                <i className="fa-regular fa-arrow-right-long"></i>
                              </div>
                              <div className="event-main__label bg-danger">
                                12:00
                              </div>
                            </div>
                            <div className="event-main">
                              <div className="event-main__label bg-success">
                                13:00
                              </div>
                              <div className="event-main__line">
                                <i className="fa-regular fa-arrow-right-long"></i>
                              </div>
                              <div className="event-main__label bg-danger">
                                18:00
                              </div>
                            </div>
                          </div>
                          <HolidaycheduleLine idx={idx} index={index} />
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          </ScrollSyncPane>
        </div>
      </div>
    </ScrollSync>
  )
}

export default CalendarFull
