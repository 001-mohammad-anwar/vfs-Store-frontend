import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
// import SummaryApi from '../common/SymmaryApi'
import { updateUserAvatar } from "../store/userSlice";
import { IoClose } from "react-icons/io5";
import AxiosToastError from "../utils/AxiosToastError";

const UserProfileAvatarEdit = ({close}) => {
  const user = useSelector((state) => state.user);
 
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("avatar", file); // ✅ Matches multer `upload.single("avatar")`

    try {
      const response = await Axios.put("/api/user/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
        withCredentials: true, // ✅ Ensures cookies or tokens are sent
      });
      dispatch(updateUserAvatar(response.data.imageUrl));
    
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-65 flex justify-center items-center z-50">

      <div className="bg-white shadow-lg max-w-sm w-full rounded p-4 flex justify-center items-center flex-col">


      <button onClick={close}  className="w-fit block ml-auto">
        <IoClose  size={25} />
      </button>

        <div
          className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden bg-red-400
                    drop-shadow-md  "
        >
          {user.avatar ? (
            <img className="w-full h-full" src={user.avatar} alt={user.name} />
          ) : (
            <FaRegUserCircle size={60} />
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile">
            <div className="border border-yellow-400 hover:bg-yellow-400 px-4 py-1 rounded text-sm my-3 cursor-pointer">
              {loading ? "loading..." : "Upload"}
            </div>
          </label>
          <input
            onChange={handleUploadAvatarImage}
            type="file"
            id="uploadProfile"
            className="hidden"

          />
        </form>

      </div>

    </section>
  );
};

export default UserProfileAvatarEdit;
