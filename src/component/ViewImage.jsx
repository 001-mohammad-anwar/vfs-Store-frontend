import React from 'react'
import { IoClose } from 'react-icons/io5'

const ViewImage = ({url , close}) => {
  return (
    <div className='flex justify-center items-center p-4 fixed top-0 bottom-0 right-0 left-0 bg-neutral-800 bg-opacity-70'>
         <div className='w-full max-w-md max-h-[80vh] p-4 bg-white'>
              <button onClick={close} className='w-fit block ml-auto'><IoClose size={25}/></button>
              <img
                src={url}
                alt="product Image "
                className='w-full h-full object-scale-down'
                />
         </div>
    </div>
  )
}

export default ViewImage
