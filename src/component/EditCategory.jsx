import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/uploadImage.js";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SymmaryApi.js";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError.js";

const EditCategory = ({ close, fetchCategory, data: CategoryData }) => {
  const [data, setData] = useState({
    _id: CategoryData._id, // ✅ Fix: Use _id instead of id
    name: CategoryData.name,
    image: CategoryData.image,
  });

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name.trim()) return; // ✅ Fix: Prevent empty name submission

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateCetegory, // ✅ Fix: Corrected API key
        data: data,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        close();
        fetchCategory();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const response = await uploadImage(file);
      const { data: ImageResponse } = response;
      setLoading(false);
      setData((prev) => ({
        ...prev,
        image: ImageResponse.data.url,
      }));
      
    } catch (error) {
      toast.error("Image upload failed. Please try again.");
    }
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-neutral-800 bg-opacity-60 p-4 z-50">
      <div className="bg-white max-w-4xl w-full p-4 rounded shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Update Category</h1>
          <button className="w-fit block" onClick={close}>
            <IoClose size={25} />
          </button>
        </div>

        {/* Form */}
        <form className="my-3 grid gap-3" onSubmit={handleSubmit}>
          {/* Category Name */}
          <div className="grid">
            <label htmlFor="categoryName" className="font-medium">
              Name
            </label>
            <input
              className="outline-none border bg-blue-50 p-2 border-blue-100 focus:border-yellow-400 rounded"
              type="text"
              id="categoryName"
              placeholder="Enter category name"
              name="name"
              value={data.name}
              onChange={handleOnChange}
            />
          </div>

          {/* Image Upload */}
          <div className="grid gap-2">
            <p className="font-medium">Image</p>
            <div className="flex gap-3 flex-col sm:flex-row items-center">
              {/* Image Preview */}
              <div className="h-36 w-36 border bg-blue-50 flex items-center justify-center rounded overflow-hidden">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="Preview"
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">No Image</p>
                )}
              </div>

              {/* Upload Button */}
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`px-4 py-2 rounded cursor-pointer border font-medium ${
                    !data.name.trim()
                      ? "bg-gray-300 cursor-not-allowed opacity-50"
                      : "border-yellow-200 hover:bg-yellow-400"
                  }`}
                >
                  {
                     loading ? "Loading..." : "Upload Image"
                  }

                </div>
                <input
                  disabled={!data.name.trim()}
                  onChange={handleUploadCategoryImage}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full mt-3 py-2 font-semibold rounded ${
              !data.name.trim() || !data.image
                ? "bg-gray-400 cursor-not-allowed opacity-50"
                : "bg-yellow-400 hover:bg-yellow-500"
            }`}
            disabled={!data.name.trim() || !data.image}
          >
            {loading ? "Updating..." : "Update Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditCategory;
