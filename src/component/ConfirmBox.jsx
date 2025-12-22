import React from 'react'
import { IoClose } from "react-icons/io5";

const ConfirmBox = ({cancle , close , confirm}) => {
  return (
    <section className='flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-neutral-800 bg-opacity-70 p-4'>
        <div className='bg-white max-w-sm w-full p-4 rounded'>
           <div className='flex justify-between'>
              <h1 className='font-semibold'>Permanent Deleted</h1>
              <button onClick={close}><IoClose size={25} /></button>
           </div>
           <p className='my-4 '>Are you sure you want to permanently delete this?</p>
           <div className='w-fit ml-auto flex gap-2 items-center'>
              <button onClick={confirm} className='px-3 py-1 border rounded border-green-500 hover:bg-green-500 text-green-500 hover:text-white font-medium'>Confirm</button>
              <button onClick={cancle} className='px-3 py-1 border rounded border-red-500 hover:bg-red-500 text-red-500 hover:text-white font-medium'>Cancel</button>
           </div>
        </div>
      
    </section>
  )
}

export default ConfirmBox
