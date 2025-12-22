import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from '../store/authSlice';

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // First, clear storage
    localStorage.removeItem('jwtToken');

    // Dispatch the logout action
    dispatch(logout());

    // Ensure navigation happens after state updates
    setTimeout(() => {
      navigate('/');
    }, 0);

  }, []);

  return null;
};
