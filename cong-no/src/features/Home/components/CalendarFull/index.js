import React, { Fragment, useEffect, useState } from 'react'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync'
import { NavLink } from 'react-router-dom'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { TimePicker } from 'antd'

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

const DayGridRender = ({ item, member }) => {
  const [HourList, setHourList] = useState([])

  useEffect(() => {
    if (item.UserWorks && item.UserWorks.length > 0) {
      if (
        item.UserWorks[0].HourList &&
        item.UserWorks[0].HourList.HourList === 1
      ) {
        setHourList([
          ...item.UserWorks.HourList,
          {
            From: '',
            To: ''
          }
        ])
      }
      if (
        item.UserWorks[0].HourList &&
        item.UserWorks[0].HourList.length === 2
      ) {
        setHourList(item.UserWorks[0].HourList)
      }
      if (
        item.UserWorks[0].HourList &&
        item.UserWorks[0].HourList.length === 0
      ) {
        setHourList([
          {
            From: '',
            To: ''
          },
          {
            From: '',
            To: ''
          }
        ])
      }
    } else {
      setHourList([
        {
          From: '',
          To: ''
        },
        {
          From: '',
          To: ''
        }
      ])
    }
  }, [item])

  return (
    <div className="daygrid-day">
      {HourList &&
        HourList.map((hour, index) => (
          <Fragment key={index}>
            <OverlayTrigger
              //rootClose
              trigger="click"
              key="top"
              placement="top"
              overlay={
                <Popover id={`popover-positioned-top`}>
                  <Popover.Header className="fw-600 d-flex justify-content-between py-2 text-uppercase font-title">
                    <div>Giờ chấm công</div>
                    <div>Ngày {moment(item.Date).format('DD-MM-YYYY')}</div>
                  </Popover.Header>
                  <Popover.Body>
                    <div>
                      <TimePicker.RangePicker
                        getPopupContainer={node =>
                          document.getElementById('#popover-positioned-top')
                        }
                        placeholder={['Bắt đầu', 'Kết thúc']}
                      />
                    </div>
                  </Popover.Body>
                  <div className="font-weight-bold d-flex justify-content-between py-10px px-3 border-top">
                    <button type="submit" className="btn btn-success">
                      Cập nhập
                    </button>
                  </div>
                </Popover>
              }
            >
              <div className="event-main">
                <div className="event-main__label bg-success">
                  {hour.From || '--'}
                </div>
                <div className="event-main__line">
                  <i className="fa-regular fa-arrow-right-long"></i>
                </div>
                <div className="event-main__label bg-danger">
                  {hour.To || '--'}
                </div>
              </div>
            </OverlayTrigger>
          </Fragment>
        ))}
    </div>
  )
}

function CalendarFull({ data, loading, CrDate }) {
  return (
    <ScrollSync onSync={() => document.body.click()}>
      <div className="d-flex cld-timesheets overlay">
        <div className="d-flex flex-column cld-timesheets__sidebar">
          <div className="cld-timesheets__sidebar-title">
            Danh sách nhân viên
          </div>
          <ScrollSyncPane>
            <div className="cld-timesheets__sidebar-list overflow-auto flex-grow-1">
              {data &&
                data.map((member, index) => (
                  <div className="cld-row" key={index}>
                    <NavLink
                      to={`/cham-cong/${member.UserID}`}
                      className="fw-700 text-truncate text-name text-decoration-none text-black name text-capitalize"
                    >
                      {member.FullName}
                    </NavLink>
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
                        {moment(CrDate).clone().weekday(index).format('dddd')}
                      </span>
                      , Ngày
                      <span className="pl-3px">
                        {moment(CrDate).clone().weekday(index).format('DD/MM')}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </ScrollSyncPane>
          <ScrollSyncPane>
            <div className="overflow-auto flex-grow-1">
              {data &&
                data.map((member, idx) => (
                  <div className="cld-row" key={idx}>
                    {member.Dates &&
                      member.Dates.map((item, index) => (
                        <div className="cls-col" key={index}>
                          <DayGridRender item={item} member={member} />
                          <HolidaycheduleLine idx={idx} index={index} />
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          </ScrollSyncPane>
        </div>
        <div
          className={`overlay-layer bg-dark-o-10 top-20px zindex-1001 ${
            loading ? 'overlay-block' : ''
          }`}
        >
          <div className="spinner spinner-primary"></div>
        </div>
      </div>
    </ScrollSync>
  )
}

export default CalendarFull
