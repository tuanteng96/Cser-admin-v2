import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { AssetsHelpers } from 'src/helpers/AssetsHelpers'

function Canvas(props) {
  const canvasRef = useRef(null)

  const data = [
    {
      option: 'Tắm trắng',
      chance: 0.25,
      values: 'ADFG'
    },
    {
      option: 'Rất tiếc',
      chance: 0.25,
      values: ''
    },
    {
      option: 'Giảm béo',
      chance: 0,
      values: 'ADFG'
    },
    {
      option: 'Rất tiếc',
      chance: 0,
      values: ''
    },
    {
      option: 'Tắm trắng',
      chance: 0.25,
      values: 'ADFG'
    },
    {
      option: 'Rất tiếc',
      chance: 0.25,
      values: ''
    },
    {
      option: 'Giảm béo',
      chance: 0,
      values: 'ADFG'
    },
    {
      option: 'Rất tiếc',
      chance: 0,
      values: ''
    }
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    //Our first draw
    let img = new Image()
    img.src = AssetsHelpers.toAbsoluteUrl('/images/wheel/xoay-5.png')
    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    context.drawImage(img, 0, 0)
    context.canvas.width = 500
    context.canvas.height = 500

    var ToaDoTrungTamX = context.canvas.width / 2
    var ToaDoTrungTamY = context.canvas.height / 2
    var DoXoayCoBan = (Math.PI * 2) / parseInt(8)

    img.onload = function () {
      context.drawImage(img, 0, 0, context.canvas.width, context.canvas.height)
      for (let i = 0; i <= parseInt(8); i++) {
        var DoXoay = DoXoayCoBan * parseInt(i)
        var ToaDoX =
          ToaDoTrungTamX *
          (1 + Math.cos(Math.PI / 2 - (3 * DoXoayCoBan) / 4 - DoXoay) * 0.15)
        var ToaDoY =
          ToaDoTrungTamY *
          (1 - Math.sin(Math.PI / 2 - (3 * DoXoayCoBan) / 4 - DoXoay) * 0.15)

        DrawText(
          ToaDoX,
          ToaDoY,
          context,
          'Barlow',
          '30px',
          data[i].option,
          Math.PI / 2 - DoXoayCoBan / 2 - DoXoay,
          'bold',
          'black'
        )
      }
    }
  }, [])

  const DrawText = (
    toadox,
    toadoy,
    ctx,
    font = 'Times New Roman',
    size = '13px',
    text = 'Hello World!',
    rotate = '0',
    kieuchu = 'bold',
    mau = 'black'
  ) => {
    ctx.save()
    ctx.translate(toadox, toadoy)

    //ctx.shadowOffsetX = 10;
    //ctx.shadowOffsetY = 10;
    //ctx.shadowBlur = 4;
    //ctx.shadowColor="grey";

    ctx.font = kieuchu + ' ' + size + ' ' + font
    //ctx.rotate(Math.PI * 2 / (i * 6));
    ctx.rotate(-rotate)
    //ctx.translate(x, y);
    ctx.fillStyle = mau
    //ctx.fillText(text, toadox, toadoy);
    ctx.fillText(text, toadox * 0.15, 0)

    ctx.restore()
    //console.log("ok")
  }

  return (
    <div>
      <canvas ref={canvasRef} {...props} />
    </div>
  )
}

Canvas.propTypes = {}

export default Canvas
