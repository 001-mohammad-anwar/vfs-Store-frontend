import Axios from "./Axios"
import SummaryApi from "../common/SymmaryApi"
import AxiosToastError from "./AxiosToastError"
const fetchUserDetails = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const response = await Axios({
      ...SummaryApi.UserDetails
    });

    return response.data.success ? response.data.data : null;
  } catch (error) {
    AxiosToastError(error);
    return null;
  }
};

export default fetchUserDetails

