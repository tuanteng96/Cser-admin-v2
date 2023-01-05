import React from 'react'
import 'src/_assets/sass/pages/_home.scss'
import CalendarFull from './components/CalendarFull'

export default function Home() {
  return (
    <div className="h-100 p-15px">
      <div className="card h-100 card-timesheets">
        <div className="card-header">
          <h3>CSER HÀ NỘI</h3>
        </div>
        <div className="card-body">
          <CalendarFull />
        </div>
      </div>
    </div>
  )
}
