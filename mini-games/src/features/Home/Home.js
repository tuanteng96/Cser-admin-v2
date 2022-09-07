import React, { Fragment, useContext } from 'react'
import { TypeScreenContext } from 'src/layout/_core/SplashScreen'
import HomeGoogleSheet from './components/HomeGoogleSheet'

export default function Home() {
  const { type: Type } = useContext(TypeScreenContext)
  return (
    <Fragment>
      {!Type && <HomeGoogleSheet />}
      {Type === 'admin' && 'admin'}
      {Type === 'member' && 'member'}
    </Fragment>
  )
}
