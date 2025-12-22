import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import SearchPage from '../pages/SearchPage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import OtpVerification from '../pages/OtpVerification'
import ResetPassword from '../pages/ResetPassword'
import MobileUserManue from '../pages/MobileUserManue'
import Profile from '../pages/Profile'
import Dashbord from '../layouts/Dashbord'
import MyOrders from '../pages/MyOrders'
import Address from '../pages/Address'
import Category from '../pages/Category'
import SubCategory from '../pages/SubCategory'
import Product from '../pages/Product'
import AdminPermision from '../layouts/AdminPermision'
import UploadProduct from '../pages/UploadProduct'
import ProductListPage from '../pages/ProductListPage'
import ProductDisplayPAge from '../pages/ProductDisplayPAge'
import CartMobilePage from '../pages/CartMobilePage'
import CheckoutPage from '../pages/CheckoutPage'
import SuccessOrder from '../component/SuccessOrder'
import CancelOrder from '../component/CancelOrder'
import OrderDetails from '../component/OrderDetails'



const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children:[
            {
                path : "",
                element : <Home/>
            },

            {
                path : "searchPage",
                element : <SearchPage/>
            },

            {
                path : "login",
                element : <Login/>
            }
            ,
            {
                path : "register",
                element : <Register/>

            },

            {
                path : "forgotPassword",
                element : <ForgotPassword/>
            },

            {
                path : "otpVerification",
                element : <OtpVerification/>
            }
            ,

            {
                path : "reset-password",
                element : <ResetPassword/>
            }
            ,

            {
                path : "user",
                element : <MobileUserManue/>
            },
            {
                path : "dashboard",
                element : <Dashbord/>,
                children : [
                    {
                        path : "profile",
                        element : <Profile/>
                    },
                    {
                        path : "myOrders",
                        element : <MyOrders/>
                    },
                    {
                        path : "address",
                        element : <Address/>
                    },
                    {
                        path : "category",
                        element : <AdminPermision><Category/></AdminPermision>
                    },
                    {
                        path : "subCategory",
                        element : <AdminPermision><SubCategory/></AdminPermision>
                    },
                    {
                        path : "uploadProduct",
                        element : <AdminPermision><UploadProduct/></AdminPermision>
                    },
                    {
                        path : "address",
                        element : <Address/>
                    },
                    {
                        path : "product",
                        element : <AdminPermision><Product/></AdminPermision>
                    },
                    {
                        path : "order-Details",
                        element : <OrderDetails/>
                    },
                ],
            },
            {
                path : ":category",
                children : [
                    {
                        path : ":subCategory",
                         element : <ProductListPage/>
                    }
                ]
            },
            {
                path : "product/:product",
                element : <ProductDisplayPAge/>
            },
            {
                path : 'cart',
                element : <CartMobilePage/>
            },
            {
                path : 'checkout',
                element : <CheckoutPage/>
            },
            {
                path : "success",
                element : <SuccessOrder/>

            },
            {
                path : "cancel",
                element : <CancelOrder/>

            }

          
        ]
    }
])

export default router