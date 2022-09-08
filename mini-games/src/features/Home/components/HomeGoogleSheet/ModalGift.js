import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import { AssetsHelpers } from 'src/helpers/AssetsHelpers'

function ModalGift({ show, onHide, gift }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      centered
      dialogClassName="max-w-350px"
      contentClassName="mt-50px animate__animated animate__flipInY"
    >
      <div className="position-absolute top--120px position-left-center">
        <img
          className="w-500px"
          src={AssetsHelpers.toAbsoluteUrl('/images/gift/gift-finish.png')}
          alt=""
        />
      </div>
      <div className="pt-145px pb-20px">
        <div className="text-center">
          <div className="fw-500 font-size-mdd text-capitalize">Phần quà</div>
          <div className="text-danger fw-700 text-uppercase font-size-h2 my-6px">
            {gift?.option}
          </div>
          <div className="font-size-md text-capitalize">Chúc mừng bạn !</div>
        </div>
        <div className="px-20px mt-20px">
          <div className="mb-12px">
            <input
              type="text"
              className="form-control form-control-solid text-center h-45px form-control-pill"
              placeholder="Họ và tên"
            />
          </div>
          <div className="mb-12px">
            <input
              type="text"
              className="form-control form-control-solid text-center h-45px form-control-pill"
              placeholder="Số điện thoại"
            />
          </div>
          <button className="btn btn-danger w-100 text-uppercase fw-500 h-45px btn-pill">
            Nhận quà
          </button>
        </div>
        <div className="mt-15px text-uppercase fw-600 font-size-xs text-center text-gray-500 text-underline cursor-pointer" onClick={onHide}>Cảm ơn, Đóng</div>
      </div>
    </Modal>
  )
}

ModalGift.propTypes = {
  show: PropTypes.bool
}

export default ModalGift
