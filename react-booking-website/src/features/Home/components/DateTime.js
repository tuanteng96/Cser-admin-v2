import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/vi'
import { Nav, Tab } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import Carousel from 'nuka-carousel'
import { clsx } from 'clsx'

moment.locale('vi')

DateTime.propTypes = {
  formikProps: PropTypes.object
}

const GroupByCount = (List, Count) => {
  return List.reduce((acc, x, i) => {
    const idx = Math.floor(i / Count)
    acc[idx] = [...(acc[idx] || []), x]
    return acc
  }, [])
}

function DateTime({ formikProps }) {
  const [key, setKey] = useState('tab-0')
  const [ListChoose, setListChoose] = useState([])
  const [DateChoose, setDateChoose] = useState()
  const { values, touched, errors, setFieldValue, setErrors } = formikProps

  useEffect(() => {
    getListChoose(DateChoose)
  }, [DateChoose])

  useEffect(() => {
    if (DateChoose) {
      setFieldValue('BookDate', '', false)
      setErrors({})
      setKey('tab-2')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DateChoose])

  const getListChoose = DateChoose => {
    const { TimeOpen, TimeClose, TimeNext } = window?.GlobalConfig?.APP?.Booking
    const newListChoose = []

    for (let index = 0; index < 3; index++) {
      let day = moment().add(index, 'days').toDate()
      if (DateChoose && index === 2) {
        day = DateChoose
      }
      let startDate = moment(day).set(TimeOpen)
      let closeDate = moment(day).set(TimeClose)
      var duration = moment.duration(closeDate.diff(startDate))
      var MinutesTotal = duration.asMinutes()
      let newListTime = []
      for (let minute = 0; minute <= MinutesTotal; minute += TimeNext) {
        const datetime = moment(startDate).add(minute, 'minute').toDate()
        newListTime.push({
          Time: datetime,
          Disable: moment().diff(datetime, 'minutes') > 0
        })
      }

      const TotalDisable = newListTime.filter(o => o.Disable)
      const slideIndex =
        TotalDisable.length > 0 ? Math.floor((TotalDisable.length - 1) / 4) : 0

      let newObj = {
        day: day,
        children: newListTime,
        childrenGroup: GroupByCount(newListTime, 4),
        slideIndex: slideIndex
      }
      newListChoose.push(newObj)
    }
    setListChoose(newListChoose)
  }

  const settings = {
    wrapAround: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    slideIndex: 0,
    cellSpacing: 10,
    renderBottomCenterControls: () => false,
    renderCenterLeftControls: null,
    renderCenterRightControls: null
    // afterChange: current => {},
    // beforeChange: (current, next) => {}
  }

  return (
    <div className="bg-white mt-1px pt-15px pl-15px pr-15px pb-10px date-time">
      <div className="fw-700 text-uppercase mb-10px">2. Chọn thời gian</div>
      <Tab.Container activeKey={key}>
        <div className="border-bottom pb-15px mb-15px">
          <div className="container-fluid p-0">
            <Nav
              as="ul"
              className="row mx--6px"
              onSelect={_key => {
                setFieldValue('BookDate', '', false)
                setErrors({})
                setDateChoose('')
                setKey(_key)
              }}
            >
              {ListChoose &&
                ListChoose.map((item, index) => (
                  <Nav.Item className="col-4 px-6px" as="li" key={index}>
                    {index === ListChoose.length - 1 ? (
                      <div className="position-relative">
                        <DatePicker
                          onChange={date => {
                            setFieldValue('BookDate', '', false)
                            setErrors({})
                            setDateChoose(date)
                          }}
                          selected={DateChoose}
                          placeholderText="Chọn ngày khác"
                          className={clsx(
                            'form-control min-h-38px min-h-md-auto',
                            DateChoose && 'border-ezs text-ezs'
                          )}
                          dateFormat="dd/MM/yyyy"
                          //isClearable={DateChoose}
                        />
                      </div>
                    ) : (
                      <Nav.Link
                        className="text-center py-9px fw-500 date-time-navlink"
                        eventKey={`tab-${index}`}
                      >
                        {moment(item.day).calendar({
                          sameDay: now =>
                            `[Hôm nay] ${moment(item.day).format('DD/MM')}`,
                          nextDay: now =>
                            `[Ngày mai] ${moment(item.day).format('DD/MM')}`
                        })}
                      </Nav.Link>
                    )}
                  </Nav.Item>
                ))}
            </Nav>
          </div>
        </div>
        {window.GlobalConfig?.APP?.Booking?.hideNoteTime && (
          <div className="d-flex justify-content-between mb-15px">
            <div className="d-flex align-items-center">
              <div className="box w-45px h-25px bg-gray-300 rounded-sm border"></div>
              <span className="fw-500 pl-8px note-text">Hết chỗ</span>
            </div>
            <div className="d-flex align-items-center">
              <div className="box w-45px h-25px bg-white rounded-sm border"></div>
              <span className="fw-500 pl-8px note-text">Còn chỗ</span>
            </div>
            <div className="d-flex align-items-center">
              <div className="box w-45px h-25px bg-ezs rounded-sm border-ezs border"></div>
              <span className="fw-500 pl-8px note-text">Đang chọn</span>
            </div>
          </div>
        )}
        <Tab.Content>
          {ListChoose &&
            ListChoose.map((item, index) => (
              <Tab.Pane eventKey={`tab-${index}`} key={index}>
                <div className="mx--5px">
                  <Carousel {...{ ...settings, slideIndex: item.slideIndex }}>
                    {item.childrenGroup &&
                      item.childrenGroup.map((group, groupIndex) => (
                        <div key={groupIndex}>
                          {group &&
                            group.map((time, timeIndex) => (
                              <div
                                className="font-number mb-10px date-time-radio position-relative"
                                key={timeIndex}
                              >
                                {/* {console.log(values.BookDate)}
                                <input
                                  type="radio"
                                  name="BookDate"
                                  value={time.Time}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  disabled={time.Disable}
                                  // checked={
                                  //   values.BookDate
                                  //     ? moment(values.BookDate).format(
                                  //         'HH:mm'
                                  //       ) === moment(time.Time).format('HH:mm')
                                  //     : false
                                  // }
                                /> */}
                                <div
                                  className={clsx(
                                    'h-40px border rounded-sm d-flex align-items-center justify-content-center fw-600 time',
                                    time.Disable && 'disabled',
                                    moment(values.BookDate).diff(
                                      time.Time,
                                      'minutes'
                                    ) === 0 && 'active',
                                    !time.Disable &&
                                      errors.BookDate &&
                                      touched.BookDate &&
                                      'border-danger'
                                  )}
                                  onClick={() =>
                                    !time.Disable &&
                                    setFieldValue('BookDate', time.Time)
                                  }
                                >
                                  {moment(time.Time).format('HH:mm A')}
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                  </Carousel>
                </div>
              </Tab.Pane>
            ))}
        </Tab.Content>
      </Tab.Container>
      {!window.GlobalConfig?.APP?.Booking?.hideNoteWarning && (
        <div className="text-danger font-size-sm mt-8px">
          (*) Nếu khung giờ bạn chọn đã kín lịch, chúng tôi sẽ liên hệ trực tiếp
          để thông báo
        </div>
      )}
    </div>
  )
}

export default DateTime
