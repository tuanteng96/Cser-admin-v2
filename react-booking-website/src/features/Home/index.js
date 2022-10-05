import React, { useState } from 'react'
import { Tab } from 'react-bootstrap'
import Booking from './Booking'
import '../../_assets/sass/pages/_home.scss'
import Confirm from './Confirm'

export default function Home() {
  const [key, setKey] = useState('booking')
  const [valuesBooking, setValuesBooking] = useState(null)

  const onSubmitBooking = values => {
    setValuesBooking(values)
    nextStep()
  }

  const onSubmitSelected = values => {
    setValuesBooking(prevState => ({
      ...prevState,
      RootIdS: values.RootIdS
    }))
  }

  const nextStep = () => {
    setKey('confirm')
  }

  const prevStep = () => {
    setKey('booking')
  }

  return (
    <div className="h-100 overflow-hidden position-relative tab-book">
      <Tab.Container className="h-100" activeKey={key}>
        <Tab.Pane
          className="h-100 tab-book__content tab-booking"
          eventKey="booking"
        >
          <Booking onSubmit={onSubmitBooking} />
        </Tab.Pane>
        <Tab.Pane
          className="h-100 tab-book__content tab-confirm"
          eventKey="confirm"
        >
          <Confirm
            prevStep={prevStep}
            valuesBooking={valuesBooking}
            onSubmitSelected={onSubmitSelected}
          />
        </Tab.Pane>
      </Tab.Container>
    </div>
  )
}
