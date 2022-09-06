import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'

export default function Home() {
  const data = [
    {
      option: 'Iphone 0',
      style: { backgroundColor: '#D9AB34', color: '#fff' }
    },
    {
      option: 'Iphone 1',
      style: { backgroundColor: '#E96642', color: '#fff' }
    },
    {
      option: 'Iphone 2',
      style: { backgroundColor: '#EFA1B6', color: '#fff' }
    },
    {
      option: 'Iphone 3',
      style: { backgroundColor: '#BFE4D7', color: '#fff' }
    },
    {
      option: 'Iphone 4',
      style: { backgroundColor: '#46AEFF', color: '#fff' }
    },
    {
      option: 'Iphone 5',
      style: { backgroundColor: '#E96642', color: '#fff' }
    }
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
        innerRadius={10}
        onStopSpinning={values => {
          console.log(data[prizeNumber])
          setMustSpin(false)
        }}
        outerBorderColor={['#fff']}
        outerBorderWidth={[5]}
        innerBorderColor={['#f2f2f2']}
        radiusLineColor={['#dedede']}
        radiusLineWidth={[0]}
        textColors={['#ffffff']}
        fontSize={[15]}
        perpendicularText={[true]}
        // backgroundColors={[
        //   '#F22B35',
        //   '#F99533',
        //   '#24CA69',
        //   '#514E50',
        //   '#46AEFF',
        //   '#9145B7'
        // ]}
      />
      <button onClick={handleSpinClick}>SPIN</button>
    </div>
  )
}
