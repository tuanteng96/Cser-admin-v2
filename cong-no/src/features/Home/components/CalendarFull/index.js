import React, { Fragment, useEffect, useState } from 'react'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import moment from 'moment'
import 'moment/locale/vi'

moment.locale('vi')

const HolidaycheduleLine = ({ member, item, onOpenModalHoliday }) => {
  const { TimeOpen, TimeClose } = useSelector(({ auth }) => ({
    TimeOpen: auth?.GlobalConfig?.APP?.Working?.TimeOpen || '00:00:00',
    TimeClose: auth?.GlobalConfig?.APP?.Working?.TimeClose || '23:59:00'
  }))
  const [option, setOption] = useState(null)

  useEffect(() => {
    if (item.WorkOffs && item.WorkOffs.length > 0) {
      const { Date } = item
      const newWorkOff = item.WorkOffs.map(({ GroupInfo, ...work }) => {
        const { From, To } = GroupInfo

        const isTimeOpen = moment(TimeOpen, 'HH:mm:ss').isAfter(
          moment(moment(From).format('HH:mm:ss'), 'HH:mm:ss')
        )
        const isTimeClose = moment(TimeClose, 'HH:mm:ss').isBefore(
          moment(moment(To).format('HH:mm:ss'), 'HH:mm:ss')
        )

        const FromTime = moment(Date).isAfter(moment(From), 'day')
          ? TimeOpen
          : isTimeOpen
          ? TimeOpen
          : moment(From).format('HH:mm:ss')
        const ToTime = moment(Date).isBefore(moment(To), 'day')
          ? TimeClose
          : isTimeClose
          ? TimeClose
          : moment(To).format('HH:mm:ss')

        //========================

        const TotalTime = moment(TimeClose, 'HH:mm:ss').diff(
          moment(TimeOpen, 'HH:mm:ss'),
          'seconds'
        )

        const TotalFrom = moment(FromTime, 'HH:mm:ss').diff(
          moment(TimeOpen, 'HH:mm:ss'),
          'seconds'
        )
        const TotalFromTo = moment(ToTime, 'HH:mm:ss').diff(
          moment(FromTime, 'HH:mm:ss'),
          'seconds'
        )
        const width = (TotalFromTo / TotalTime) * 100 + '%'
        const left = (TotalFrom / TotalTime) * 100 + '%'

        return {
          ...work,
          GroupInfo: {
            ...GroupInfo
          },
          style: {
            width,
            left,
            top: 0
          }
        }
      })
      setOption(newWorkOff)
    }
  }, [item, TimeOpen, TimeClose])

  if (!option) return null
  return (
    <Fragment>
      {option &&
        option.map((otp, index) => (
          <div
            className="bg-stripes position-absolute top-0 left-0 h-100"
            style={{ ...otp.style }}
            key={index}
            onClick={() =>
              onOpenModalHoliday({
                ...otp,
                Member: member
              })
            }
          ></div>
        ))}
    </Fragment>
  )
}

const DayGridRender = ({ item, member, onOpenModalKeep }) => {
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
          <div
            className="event-main"
            key={index}
            onClick={() =>
              onOpenModalKeep({
                HourList: HourList,
                ...item,
                Member: {
                  ID: member.UserID,
                  FullName: member.FullName
                }
              })
            }
          >
            <div className="event-main__label bg-success">
              {hour.From || '--'}
            </div>
            <div className="event-main__line">
              <i className="fa-regular fa-arrow-right-long"></i>
            </div>
            <div className="event-main__label bg-danger">{hour.To || '--'}</div>
          </div>
        ))}
    </div>
  )
}

function CalendarFull({
  data,
  loading,
  CrDate,
  onOpenModalKeep,
  onOpenModalHoliday
}) {
  return (
    <ScrollSync>
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
                          <DayGridRender
                            item={item}
                            member={member}
                            onOpenModalKeep={onOpenModalKeep}
                          />
                          <HolidaycheduleLine
                            item={item}
                            member={member}
                            onOpenModalHoliday={onOpenModalHoliday}
                          />
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
