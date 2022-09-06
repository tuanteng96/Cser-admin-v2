import React, { useEffect, useState } from 'react'
import { Wheel } from 'react-custom-roulette'

export default function Home() {
  const data = [
    { option: '0', style: { backgroundColor: 'green', textColor: 'black' } },
    { option: '1', style: { backgroundColor: 'white', textColor: 'green' } },
    { option: '2' }
  ]

  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length)
    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
  }

  return (
    <div>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        innerRadius={20}
        onStopSpinning={(values) => {
          console.log(data[prizeNumber])
          setMustSpin(false)
        }}
        outerBorderColor={['#f2f2f2']}
        outerBorderWidth={[25]}
        innerBorderColor={['#f2f2f2']}
        radiusLineColor={['#dedede']}
        radiusLineWidth={[10]}
        textColors={['#ffffff']}
        fontSize={[50]}
        perpendicularText={[true]}
        backgroundColors={[
          '#F22B35',
          '#F99533',
          '#24CA69',
          '#514E50',
          '#46AEFF',
          '#9145B7'
        ]}
      />
      <button onClick={handleSpinClick}>SPIN</button>
    </div>
  )
}
