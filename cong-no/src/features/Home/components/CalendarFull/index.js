import React from 'react'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync'

function CalendarFull(props) {
  return (
    <ScrollSync>
      <div className="h-100 d-flex cld-timesheets">
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
              {Array(20)
                .fill()
                .map((o, index) => (
                  <div key={index} className="cls-col">
                    Thứ 2, Ngày {index + 1}/3
                  </div>
                ))}
            </div>
          </ScrollSyncPane>
          <ScrollSyncPane>
            <div className="overflow-auto flex-grow-1 d-flex">
              {Array(20)
                .fill()
                .map((o, index) => (
                  <div className="cls-col" key={index}>
                    {Array(100)
                      .fill()
                      .map((o, idx) => (
                        <div className="cld-row" key={idx}>
                          {index + 1}
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
