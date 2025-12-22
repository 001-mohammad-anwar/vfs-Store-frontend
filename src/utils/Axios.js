import axios from "axios";
import SummaryApi from "../common/SymmaryApi";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 👈 ONLY HERE
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

/* ===================== REQUEST ===================== */

Axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }


    if (config.data instanceof FormData)
       {
      delete config.headers["Content-Type"];
    } else {
       config.headers = {
        ...config.headers,
        "Content-Type": "application/json",
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ===================== RESPONSE ===================== */

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        clearAuth();
        return Promise.reject(error);
      }

      try {
        const newAccessToken = await refreshAccessToken(refreshToken);

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return Axios(originalRequest);
      } catch (err) {
        clearAuth();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

/* ===================== REFRESH TOKEN ===================== */

const refreshAccessToken = async (refreshToken) => {
  const response = await axios({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    ...SummaryApi.refreshToken,
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
    withCredentials: true,
  });

  const accessToken = response.data.accessToken;
  localStorage.setItem("accessToken", accessToken);

  return accessToken;
};
/* ===================== CLEAR AUTH ===================== */

const clearAuth = () => {
  localStorage.clear();
  window.location.href = "/login";
};

export default Axios;
