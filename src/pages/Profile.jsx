import React, { useState, useEffect } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import UserProfileAvatarEdit from '../component/UserProfileAvatarEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SymmaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';

const Profile = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [ProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
    const [userData, setUserData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        mobile: user?.mobile || '',
    });
   
    useEffect(() => {
        setUserData({
            username: user?.username || '',
            email: user?.email || '',
            mobile: user?.mobile || '',
        });
    }, [user]);

    const [loading, setLoading] = useState(false);

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
     
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.updateUserDetails,
                data: userData
            });

            const { data: responseData } = response;

                if (responseData.success) {
                    toast.success(responseData.message);
                    const DataValue = await fetchUserDetails();
                    dispatch(setUserDetails(DataValue.data.data));
         }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className='p-4 w-full'>
            {/* Profile upload and display image */}
            <div className='w-20 h-20 flex items-center justify-center rounded-full overflow-hidden bg-red-400 drop-shadow-md'>
                {user?.avatar ? (
                    <img className='w-full h-full' src={user.avatar} alt={user.username} />
                ) : (
                    <FaRegUserCircle size={60} />
                )}
            </div>

            <button onClick={() => setProfileAvatarEdit(true)} className='min-w-20 text-sm border border-yellow-300 hover:border-yellow-400 hover:bg-yellow-300 px-3 py-1 rounded-full mt-3'>
                Edit
            </button>

            {ProfileAvatarEdit && <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />}

            {/* Name, mobile, email */}
            <form className='my-4 grid gap-4' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label htmlFor="name">Name</label>
                    <input
                        placeholder='Enter your name'
                        id='name'
                        type="text"
                        name='username'
                        className='p-2 bg-blue-50 outline-none border focus-within:border-yellow-300 rounded'
                        value={userData.username}
                        onChange={handleOnchange}
                        required
                    />
                </div>
                <div className='grid'>
                    <label htmlFor="email">Email</label>
                    <input
                        placeholder='Enter your email'
                        id='email'
                        type="email"
                        name='email'
                        className='p-2 bg-blue-50 outline-none border focus-within:border-yellow-300 rounded'
                        value={userData.email}
                        onChange={handleOnchange}
                        required
                    />
                </div>
                <div className='grid'>
                    <label htmlFor="phone">Mobile</label>
                    <input
                        placeholder='Enter your phone number'
                        id='phone'
                        type="text"
                        name='mobile'  // Fix: Name matches state key
                        className='p-2 bg-blue-50 outline-none border focus-within:border-yellow-300 rounded'
                        value={userData.mobile}  // Fix: Matches correct state key
                        onChange={handleOnchange}
                        required
                    />
                </div>

                <button className='border px-4 py-2 font-semibold hover:bg-yellow-400 border-yellow-400 text-yellow-400 hover:text-neutral-800 rounded'>
                    {loading ? "Loading..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default Profile;
