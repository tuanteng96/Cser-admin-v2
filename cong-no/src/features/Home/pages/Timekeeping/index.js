import React from 'react'
import Navbar from '../../components/Navbar'

function Timekeeping(props) {
  return (
    <div className="card h-100">
      <div className="card-header">
        <h3 className="text-uppercase">Chấm công</h3>
        <div className="d-flex align-items-center justify-content-center">
          <Navbar />
        </div>
      </div>
      <div className="card-body">Danh sách</div>
    </div>
  )
}

export default Timekeeping
