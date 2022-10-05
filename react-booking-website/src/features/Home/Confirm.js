import React from 'react'
import PropTypes from 'prop-types'

Confirm.propTypes = {
  prevStep: PropTypes.func
}

function Confirm({ prevStep }) {
  return (
    <div className="d-flex flex-column h-100">
      <div className="border-bottom p-15px text-uppercase fw-700 font-size-lg bg-white text-center position-relative">
        <div
          className="position-absolute w-50px h-100 left-0 top-0 d-flex align-items-center justify-content-center cursor-pointer"
          onClick={prevStep}
        >
          <i className="fa-regular fa-chevron-left"></i>
        </div>
        Chọn dịch vụ
      </div>
    </div>
  )
}

export default Confirm
