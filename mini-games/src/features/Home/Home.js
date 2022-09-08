import React, { Fragment, useContext, useEffect } from 'react'
import { TypeScreenContext } from 'src/layout/_core/SplashScreen'
import Canvas from './Canvas'
import HomeGoogleSheet from './components/HomeGoogleSheet'
export default function Home() {
  const { type: Type } = useContext(TypeScreenContext)
  return (
    <Fragment>
      {!Type && <HomeGoogleSheet />}
      {Type === 'admin' && 'admin'}
      {Type === 'member' && 'member'}
      {Type === 'canvas' && <Canvas />}
    </Fragment>
  )
}
