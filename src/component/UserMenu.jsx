import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Links, useNavigate } from 'react-router-dom'
import Divider from './Devider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SymmaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import isAdmin from '../utils/isAdmin'


const UserMenu = ({close}) => {
   const user = useSelector((state) => state.user) 
   const dispatch = useDispatch()
   
   const navigate = useNavigate();
   const handleClose = () => {
     if(close){
      close()
     }
   }

   const handleLogout = async() => {
     try {
        const response  = await Axios({
             ...SummaryApi.logout
        })

        if (response.data.success){
            dispatch(logout())
            localStorage.clear()
            toast.success(response.data.message)
            // window.history.back();
            navigate('/')
        } 
     } catch (error) {
        AxiosToastError(error)
     }
   }

  return (
    <div className=''>
         <div className='px-2'>
             <h3 className='font-semibold '>My Account</h3>
         </div>
         <div className='text-neutral-700 px-2 flex items-center gap-2'>
           <span className='max-w-52 text-ellipsis line-clamp-1'> {user.username || user.mobile} <span className='font-medium text-red-600'>{user.role === "Admin" ? "(Admin)" : ""}</span> </span>
           <Link onClick={handleClose} className='hover:text-yellow-400' to={"/dashboard/profile"}>
                <LiaExternalLinkAltSolid size={15} />
           </Link>
         </div>
        <Divider/>
         <div className='text-sm grid text-neutral-700 gap-4 '>
              
              
              {
                isAdmin(user.role) && ( 
                  <Link onClick={handleClose} to={"/dashboard/category"} className='hover:bg-orange-200 py-1  px-2 rounded'>category</Link>
                )
              }
              {
                isAdmin(user.role) && ( 
                  <Link onClick={handleClose} to={"/dashboard/subCategory"} className='hover:bg-orange-200 py-1  px-2 rounded'>sub category</Link>                
                )
              }
              {
                isAdmin(user.role) && ( 
                  <Link onClick={handleClose} to={"/dashboard/uploadProduct"} className='hover:bg-orange-200 py-1  px-2 rounded'>upload product</Link>

                )
              } 
              {
                isAdmin(user.role) && ( 
                  <Link onClick={handleClose} to={"/dashboard/product"} className='hover:bg-orange-200 py-1  px-2 rounded'>product</Link>

                )
              }
            
             <Link onClick={handleClose} to={"/dashboard/myOrders"} className='hover:bg-orange-200 py-1  px-2 rounded'>My Orders</Link>
             <Link onClick={handleClose} to={"/dashboard/address"} className='hover:bg-orange-200 py-1 px-2 rounded'>Save Address</Link>
             <button onClick={handleLogout} className='text-left hover:bg-orange-200 py-1 px-2 rounded' >Log Out</button>
         </div>
    </div>
  )
}

export default UserMenu
