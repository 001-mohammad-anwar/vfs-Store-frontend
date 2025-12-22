import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/uploadImage";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SymmaryApi.js";
import AxiosToastError from "../utils/AxiosToastError.js";
import toast from "react-hot-toast";
const UploadSubCategoryModel = ({ close , fetchData }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: [],
  });

  const allCategory = useSelector((state) => state.product.allCategory);
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadSubCategoryImage = async(e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const response = await uploadImage(file);

      if (response?.data) {
        setSubCategoryData((prev) => ({
          ...prev,
          image: response.data.data.url,
        }));
      }
    } catch (error) {
      AxiosToastError(error);
      console.error("Image upload failed:", error);
    }
  };

  const HandleRemoveCategorySelected = (categoryId) => {
    setSubCategoryData((prev) => ({
      ...prev,
      category: prev.category.filter((el) => el._id !== categoryId), // ✅ Removes the selected category
    }));
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();
  
    // Optional: Validate basic fields before request
    const { name, image, category } = subCategoryData;
    if (!name || !image || category.length === 0) {
      toast.error("Please fill all fields before submitting.");
      return;
    }
  
    try {
      const response = await Axios({
        ...SummaryApi.createSubCategory,
        data: subCategoryData,
      });
  
      const { data: responseData } = response;
  
      if (responseData?.success) {
        toast.success(responseData.message || "Subcategory created successfully!");
  
        // Optionally reset the form
        setSubCategoryData({
          name: "",
          image: "",
          category: [],
        });
  
        // Refresh parent data if function provided
        if (fetchData) {
          fetchData();
        }
  
        // Close modal if provided
        if (typeof close === "function") {
          close();
        }
      } else {
        toast.error(responseData?.message || "Something went wrong.");
      }
  
    } catch (error) {
      AxiosToastError(error);
      console.error("Error creating sub category:", error);
    }
  };
  


  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white p-4 rounded">
        <div className="flex justify-between items-center gap-3">
          <h1 className="text-lg font-semibold">Add Subcategory</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>

        <form className="my-3 grid gap-3" onSubmit={handleSubmitSubCategory}>
          <div className="grid gap-1">
            <label htmlFor="subcategoryName">Subcategory Name:</label>
            <input
              className="p-2 bg-blue-50 border outline-none focus-within:border-yellow-500 rounded"
              type="text"
              value={subCategoryData.name || ""}
              onChange={handleChange}
              id="subcategoryName"
              name="name"
              required
            />
          </div>

          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="border h-36 w-full sm:w-36 bg-blue-50 flex justify-center items-center">
                {!subCategoryData.image ? (
                  <p className="text-sm text-neutral-400">No Image</p>
                ) : (
                  <img
                    src={subCategoryData.image}
                    alt="subCategory"
                    className="w-full h-full object-scale-down"
                  />
                )}
              </div>

              <label htmlFor="UploadImage">
                <div className="px-4 text-yellow-500 py-1 border border-yellow-300 rounded hover:bg-yellow-400 hover:text-white font-medium">
                  Upload Image
                </div>
                <input
                  id="UploadImage"
                  type="file"
                  className="hidden"
                  onChange={handleUploadSubCategoryImage}
                />
              </label>
            </div> 
          </div>

          <div className="grid gap-3">
            <label htmlFor="categorySelect" className="font-semibold">
               Select Category
            </label>

            <div className="border rounded p-2">
              {/* Display selected categories */}
              <div className="flex flex-wrap gap-2 mb-3">
                {subCategoryData.category.map((cat) => (
                  <div
                    key={cat._id+"selectedValue"}
                    className="bg-yellow-100 text-yellow-700 rounded-full px-3 py-1 flex items-center gap-2"
                  >
                    <span>{cat.name}</span>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => HandleRemoveCategorySelected(cat._id)}
                    >
                      <IoClose size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Category Select Dropdown */}
              <select
                id="categorySelect"
                className="w-full p-2 bg-transparent border-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryDetails = allCategory.find(
                    (el) => el._id === value
                  );
                    
                  if (
                    categoryDetails &&
                    !subCategoryData.category.some((cat) => cat._id === value)
                  ) {
                    setSubCategoryData((prev) => ({
                      ...prev,
                      category: [...prev.category, categoryDetails],
                    }));
                  }
                }}
              >
                <option value={""}>Select Category</option>
                {allCategory.map((category, index) => {
                  return(
                    <option key={category._id} value={category._id}>
                      {category?.name}
                    </option>
                  ) 
                })}
              </select>
            </div>

            <button
              type="submit"
              className={`w-full py-2 mt-4 ${subCategoryData?.name && subCategoryData?.image && subCategoryData?.category[0] ? "bg-yellow-500 text-white" : "bg-gray-200 text-black"}  rounded transition duration-300`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel;
