import React from 'react'
import NoDataImage from '../assets/images/NoData1.webp'

const NoData = () => {
  return (
    <div className='flex flex-col items-center justify-center p-4 gap-2'>
        <img 
        className='w-36 ' 
        src={NoDataImage}
         alt="no data" />
         <p className='text-neutral-500 '>No Data</p>
    </div>
  )
}

export default NoData
