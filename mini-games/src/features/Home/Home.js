import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { TypeScreenContext } from 'src/layout/_core/SplashScreen'
import Canvas from './Canvas'
import HomeGoogleSheet from './components/HomeGoogleSheet'

const initialValues = [
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

export default function Home() {
  const { type: Type } = useContext(TypeScreenContext)
  const [data, setData] = useState(initialValues)

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      dataWheel: []
    }
  })
  const { fields, append } = useFieldArray({
    control,
    name: 'dataWheel'
  })
  const second = useWatch({
    control,
    name: 'dataWheel'
  })

  useEffect(() => {
    setValue('dataWheel', data, { shouldValidate: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setData(second)
  }, [second])

  return (
    <Fragment>
      {!Type && <HomeGoogleSheet />}
      {Type === 'admin' && 'admin'}
      {Type === 'member' && 'member'}
      {Type === 'canvas' && (
        <div className="container mt-50px">
          <div className="row">
            <div className="col-md-6">
              <div>
                <form onSubmit={handleSubmit(data => console.log(data))}>
                  {fields.map((item, index) => (
                    <div key={index}>
                      <div className="form-group mb-15px">
                        <Controller
                          render={({ field }) => (
                            <input {...field} className="form-control" />
                          )}
                          name={`dataWheel.${index}.option`}
                          control={control}
                        />
                      </div>
                    </div>
                  ))}
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <Canvas data={data} />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}
