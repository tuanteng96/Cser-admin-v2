import React, { useState } from 'react'
import { AssetsHelpers } from 'src/helpers/AssetsHelpers'
import ModalGift from './ModalGift'

function HomeGoogleSheet(props) {
  const [onPending, setOnPending] = useState(false)
  const [onFinish, setOnFinish] = useState(false)
  const [finalDeg, setFinalDeg] = useState(0)
  const [gift, setGift] = useState(null)
  const [isGift, setIsGift] = useState(false)

  const data = [
    {
      option: 'Vàng ngẫu nghiên',
      style: { backgroundColor: '#D9AB34', color: '#fff' }
    },
    {
      option: '50 Triệu vàng',
      style: { backgroundColor: '#E96642', color: '#fff' }
    },
    {
      option: '100 Triệu vàng',
      style: { backgroundColor: '#EFA1B6', color: '#fff' }
    },
    {
      option: '200 Triệu vàng',
      style: { backgroundColor: '#BFE4D7', color: '#fff' }
    },
    {
      option: '300 Triệu vàng',
      style: { backgroundColor: '#46AEFF', color: '#fff' }
    },
    {
      option: '500 triệu vàng',
      style: { backgroundColor: '#E96642', color: '#fff' }
    },
    {
      option: 'Vàng bí ẩn',
      style: { backgroundColor: '#E96642', color: '#fff' }
    },
    {
      option: 'X99 thỏi vàng',
      style: { backgroundColor: '#E96642', color: '#fff' }
    }
  ]

  // const data = [
  //   {
  //     option: '1000 Xu'
  //   },
  //   {
  //     option: '2 Gói'
  //   },
  //   {
  //     option: '100 Xu'
  //   },
  //   {
  //     option: '500 Xu'
  //   },
  //   {
  //     option: '2000 Xu'
  //   },
  //   {
  //     option: '3 Gói'
  //   }
  // ]
  const clickMp3 = new Audio(AssetsHelpers.toAbsoluteUrl('/mp3/tick.mp3'))
  const filmingMp3 = new Audio(AssetsHelpers.toAbsoluteUrl('/mp3/dangquay.mp3')) // Nhạc quay
  const clapMp3 = new Audio(AssetsHelpers.toAbsoluteUrl('/mp3/votay.mp3')) // Nhạc Vỗ tay

  const onClickSpin = () => {
    if (onPending) return
    clickMp3.play()
    filmingMp3.play()
    setOnFinish(false)
    setOnPending(true)
    const slicesCount = data.length
    const sliceDeg = 360 / slicesCount
    const min = finalDeg + 500
    const max = finalDeg + 1500
    const resultDeg = Math.floor(Math.random() * (max - min + 1)) + min

    let index = Math.floor(((360 - resultDeg + 30) % 360) / sliceDeg)
    index = (slicesCount + index) % slicesCount
    setFinalDeg(resultDeg)
    setTimeout(() => {
      clapMp3.play()
      setOnFinish(true)
      setOnPending(false)
      setGift(data[index])
      setIsGift(true)
    }, 5000)
  }

  const onHide = () => {
    setIsGift(false)
  }

  return (
    <div className="wheel">
      {onFinish && (
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      )}

      <div className="wheel-container">
        <div className="title text-center">
          <img
            src="https://devforum.info/DEMO/vong-quay-li-xi/img/vqmm-title.png"
            alt=""
          />
        </div>
        <div className="wheel-rotate">
          <img
            className="w-100"
            src="https://shopviminh.com/upload-usr/images/xIWXUGg7aX_1609667393.png"
            alt=""
            style={{
              transform: `rotate(${finalDeg}deg)`,
              transition: 'transform 6s ease 0s'
            }}
          />
          {/* <img
            className="w-100"
            src="https://raw.githubusercontent.com/tranngochung0510/lucky-wheel/2f9495cc107e032c27ff72133a081bd56a6af64f/src/images/rou_under_high.png"
            alt=""
            style={{
              transform: `rotate(${finalDeg}deg)`,
              transition: 'transform 6s ease 0s'
            }}
          /> */}
          <button onClick={onClickSpin}>
            <img
              className="w-100"
              src="https://shopviminh.com/assets/frontend/vongquay/image/IMG_3478.png?fbclid=IwAR3Nr7uWavPogMHXovHcslq3kvgEyhWOdbzg49yLtzAUwFWM3iDcKqOoPMk"
              alt=""
            />
          </button>
        </div>
      </div>

      <ModalGift show={isGift} gift={gift} onHide={onHide}/>
    </div>
  )
}

export default HomeGoogleSheet
