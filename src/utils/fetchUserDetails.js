import Axios from "./Axios";
import SummaryApi from "../common/SymmaryApi";

const fetchUserDetails = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    const response = await Axios({
      ...SummaryApi.UserDetails,
    });

    return response;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      return null;
    }
    throw error;
  }
};

export default fetchUserDetails;
