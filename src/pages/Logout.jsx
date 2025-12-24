import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SymmaryApi";
import { logout } from "../store/userSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // 🔥 Backend cookie clear
        await Axios({
          ...SummaryApi.logout,
        });
      } catch (error) {
        console.log("Logout error:", error);
      } finally {
        // 🔥 Frontend state clear
        dispatch(logout());
        navigate("/", { replace: true });
      }
    };

    handleLogout();
  }, []);

  return null;
};

export default Logout;
