import React from 'react'
import cars from '../data/carsData'
import Card from './Card'

export default function Product() {

  return (
    <>
        {/* product render */}
        <div className='w-full max-w-[1184px] mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
          {
            cars.map(item => {
              return <Card key={item.id} car={item}/>
            })
          }
        </div>
        </div>
    </>
  )
}