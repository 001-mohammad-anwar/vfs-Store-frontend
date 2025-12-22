import { useState } from 'react'
import ConfirmBox from './ConfirmBox'

const DeleteProductAdmin = ({data , fetchProductData}) => {
  const [openConfirmBox , setOpenConfirmBox] = useState(true)
  return (
    <section>
       {
        openConfirmBox && (
          <ConfirmBox/>
        )
       }
    </section>
  )
}

export default DeleteProductAdmin
