import toast from "react-hot-toast";

const AxiosToastError = (error) => {
    const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.msg ||
        error?.response?.data?.error ||
        error?.response?.data?.detail ||
        "An unexpected error occurred.";

    toast.error(errorMessage);
};

export default AxiosToastError;
