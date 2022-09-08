import React, { Fragment, useContext, useEffect } from 'react'
import { AssetsHelpers } from 'src/helpers/AssetsHelpers'
import { TypeScreenContext } from 'src/layout/_core/SplashScreen'
import HomeGoogleSheet from './components/HomeGoogleSheet'
export default function Home() {
  const { type: Type } = useContext(TypeScreenContext)

  useEffect(() => {
    var c = document.getElementById('myCanvas')
    var ctx = c.getContext('2d')
    let img = new Image()
    img.src = AssetsHelpers.toAbsoluteUrl('/images/wheel/xoay-3.png')
    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.drawImage(img, 0, 0)

    // scale canvas to image
    ctx.canvas.width = 400
    ctx.canvas.height = 400

    //set basic
    ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height)
  }, [Type])

  return (
    <Fragment>
      {!Type && <HomeGoogleSheet />}
      {Type === 'admin' && 'admin'}
      {Type === 'member' && 'member'}
      <div>
        <canvas id="myCanvas" width="200" height="100">
          Your browser does not support the HTML canvas tag.
        </canvas>
      </div>
    </Fragment>
  )
}
