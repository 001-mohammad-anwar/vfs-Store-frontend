
import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoClose, IoAdd } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import uploadImage from "../utils/uploadImage";
import Loading from "../component/Loading";
import ViewImage from "../component/ViewImage";
import MoreFieldComponent from "../component/MoreFieldComponent";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SymmaryApi";
// import SuccessOne from "../utils/SuccessOne";
// import ErrorOne from "../utils/ErrorOne.jsx";
// import axios from "axios";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError.js";

const EditProductAdmin = ({close , data : propsData , fetchProductData}) => {

  const navigate = useNavigate();
  const [data, setData] = useState({
    _id : propsData._id,
    name: propsData.name,
    image: propsData.image,
    category: propsData.category,
    subCategory: propsData.subCategory,
    unit: propsData.unit,
    stock: propsData.stock,
    price: propsData.price,
    discount: propsData.discount,
    description: propsData.description,
    more_details: propsData.more_details || {},
  });

  const [loading, setLoading] = useState({
    image: false,
    form: false,
  });
  const [viewImageUrl, setViewImageUrl] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [openAddField, setOpenAddField] = useState(false); 
  const [fieldName, setFieldName] = useState("");

  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  useEffect(() => {
    // Clear errors when user starts typing
    const timer = setTimeout(() => {
      if (Object.keys(errors).length > 0) {
        setErrors({});
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Basic validation for numeric fields
    if (["stock", "price", "discount"].includes(name)) {
      if (value < 0) return; // Prevent negative numbers
    }

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!data.name.trim()) newErrors.name = "Product name is required";
    if (!data.description.trim())
      newErrors.description = "Description is required";
    if (data.image.length === 0)
      newErrors.image = "At least one image is required";
    if (data.category.length === 0)
      newErrors.category = "At least one category is required";
    if (!data.stock) newErrors.stock = "Stock is required";
    if (!data.unit) newErrors.unit = "Unit is required";
    if (!data.price) newErrors.price = "Price is required";
    if (data.discount === "") newErrors.discount = "Discount is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate image size and type
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, image: "Image size should be less than 5MB" });
      return;
    }

    if (!file.type.match("image.*")) {
      setErrors({ ...errors, image: "Only image files are allowed" });
      return;
    }

    setLoading({ ...loading, image: true });
    try {
      const response = await uploadImage(file);
      const imageUrl = response.data?.data?.url;

      if (imageUrl) {
        setData((prev) => ({
          ...prev,
          image: [...prev.image, imageUrl],
        }));
        setErrors({ ...errors, image: "" });
      }
    } catch (error) {
      setErrors({ ...errors, image: "Failed to upload image" });
    } finally {
      setLoading({ ...loading, image: false });
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...data.image];

    updatedImages.splice(index, 1);
    setData((prev) => ({
      ...prev,
      image: updatedImages,
    }));
  };

  const handleCategorySelect = (e) => {
    const value = e.target.value;
    if (!value) return;

    const selectedCat = allCategory.find((c) => c._id === value);
    if (!selectedCat || data.category.find((c) => c._id === value)) {
      setErrors({ ...errors, category: "Category already added or invalid" });
      return;
    }

    setData((prev) => ({
      ...prev,
      category: [...prev.category, selectedCat],
    }));
    setSelectCategory("");
    setErrors({ ...errors, category: "" });
  };

  const handleSubCategorySelect = (e) => {
    const value = e.target.value;
    if (!value) return;

    const selectedSub = allSubCategory.find((c) => c._id === value);
    if (!selectedSub || data.subCategory.find((c) => c._id === value)) {
      setErrors({
        ...errors,
        subCategory: "Subcategory already added or invalid",
      });
      return;
    }

    setData((prev) => ({
      ...prev,
      subCategory: [...prev.subCategory, selectedSub],
    }));
    setSelectSubCategory("");
    setErrors({ ...errors, subCategory: "" });
  };

  const handleRemoveCategory = (id) => {
    setData((prev) => ({
      ...prev,
      category: prev.category.filter((c) => c._id !== id),
    }));
  };

  const handleRemoveSubCategory = (id) => {
    setData((prev) => ({
      ...prev,
      subCategory: prev.subCategory.filter((c) => c._id !== id),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(prev => ({ ...prev, form: true }));

    try {
        const response = await Axios({
            ...SummaryApi.updateProductData,
            data: data,
        });

        const { data: responseData } = response;
        console.log(responseData);

        if (responseData.success) {
            toast.success(responseData.message);

            // If using modal, close it after successful update
            if (close) {
                close();
            } else {
                // If you want to reset form for new entry:
                setData({
                    name: "",
                    image: [],
                    category: [],
                    subCategory: [],
                    unit: "",
                    stock: "",
                    price: "",
                    discount: "",
                    description: "",
                    more_details: {},
                });

                setSelectCategory("");
                setSelectSubCategory("");
                setFieldName("");
                setOpenAddField(false);
                setErrors({});
            }

            fetchProductData()
        }
    } catch (error) {
        AxiosToastError(error);
    } finally {
        setLoading(prev => ({ ...prev, form: false }));
    }
};


  const handleAddField = () => {
    if (!fieldName.trim()) {
      setErrors({ ...errors, customField: "Field name cannot be empty" });
      return;
    }

    if (data.more_details[fieldName] !== undefined) {
      setErrors({ ...errors, customField: "Field already exists" });
      return;
    }

    setData((preve) => ({
      ...preve,
      more_details: { ...preve.more_details, [fieldName]: "" },
    }));
    setFieldName("");
    setOpenAddField(false);
    setErrors({ ...errors, customField: "" });
  };

  const handleRemoveField = (fieldName) => {
    const newDetails = { ...data.more_details };
    delete newDetails[fieldName];
    setData((prev) => ({
      ...prev,
      more_details: newDetails,
    }));
  };
  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 bg-black z-50 bg-opacity-70 p-4">
      <div className="bg-white w-full p-4 max-w-2xl mx-auto overflow-y-auto h-full max-h-[96vh] rounded">
        <section className="w-full p-4 max-w-6xl mx-auto">
          <div className="p-4 bg-white shadow rounded-lg mb-6 flex justify-between">
            <h2 className="text-xl font-bold text-gray-800">Upload Product</h2>
            <button onClick= {close}>
                <IoClose size={25}/>
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <form className="grid gap-6" onSubmit={handleSubmit}>
              {/* Basic Information Section */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Basic Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="font-medium text-gray-700" htmlFor="name">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter product name"
                      value={data.name}
                      onChange={handleChange}
                      className={`bg-gray-50 p-2 outline-none border rounded ${
                        errors.name
                          ? "border-red-500"
                          : "focus:border-yellow-400"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <label className="font-medium text-gray-700" htmlFor="unit">
                      Unit <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="unit"
                      type="text"
                      name="unit"
                      placeholder="e.g., kg, piece, liter"
                      value={data.unit}
                      onChange={handleChange}
                      className={`bg-gray-50 p-2 outline-none border rounded ${
                        errors.unit
                          ? "border-red-500"
                          : "focus:border-yellow-400"
                      }`}
                    />
                    {errors.unit && (
                      <p className="text-red-500 text-sm">{errors.unit}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid gap-2">
                  <label
                    className="font-medium text-gray-700"
                    htmlFor="description"
                  >
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Enter detailed product description"
                    value={data.description}
                    onChange={handleChange}
                    rows={4}
                    className={`bg-gray-50 p-2 outline-none border rounded ${
                      errors.description
                        ? "border-red-500"
                        : "focus:border-yellow-400"
                    }`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}
                </div>
              </div>

              {/* Images Section */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Images
                </h3>
                <div className="grid gap-4">
                  <div>
                    <label className="font-medium text-gray-700">
                      Product Images <span className="text-red-500">*</span>
                    </label>
                    <label
                      htmlFor="productImage"
                      className={`block mt-2 bg-gray-50 h-32  justify-center items-center cursor-pointer border-2 border-dashed rounded-lg ${
                        errors.image
                          ? "border-red-500"
                          : "border-gray-300 hover:border-yellow-400"
                      }`}
                    >
                      <div className="flex items-center justify-center flex-col text-gray-500">
                        {loading.image ? (
                          <Loading />
                        ) : (
                          <>
                            <FaCloudUploadAlt size={28} className="mb-2" />
                            <p>Click to upload images</p>
                            <p className="text-xs mt-1">Max 5MB per image</p>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        id="productImage"
                        className="hidden"
                        accept="image/*"
                        onChange={handleUploadImage}
                      />
                    </label>
                    {errors.image && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.image}
                      </p>
                    )}
                    {data.image.length > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        {data.image.length} image(s) uploaded
                      </p>
                    )}
                  </div>

                  {data.image.length > 0 && (
                    <div className="flex flex-wrap gap-4">
                      {data.image.map((img, index) => (
                        <div
                          key={img + index}
                          className="relative w-24 h-24 border rounded overflow-hidden shadow-sm group"
                        >
                          <img
                            src={img}
                            alt={`product-${index}`}
                            className="object-cover w-full h-full cursor-pointer"
                            onClick={() => setViewImageUrl(img)}
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-red-500 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleDeleteImage(index)}
                          >
                            <RiDeleteBin6Line size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Categories Section */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Categories
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <label className="font-medium text-gray-700">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={selectCategory}
                        onChange={handleCategorySelect}
                        className={`bg-gray-50 border w-full p-2 rounded ${
                          errors.category
                            ? "border-red-500"
                            : "focus:border-yellow-400"
                        }`}
                      >
                        <option value="">Select Category</option>
                        {allCategory.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.category && (
                      <p className="text-red-500 text-sm">{errors.category}</p>
                    )}

                    {data.category.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {data.category.map((c) => (
                          <div
                            key={c._id}
                            className="flex items-center border p-2 rounded bg-gray-100"
                          >
                            <p className="mr-2 text-sm">{c.name}</p>
                            <div
                              className="hover:text-red-500 cursor-pointer"
                              onClick={() => handleRemoveCategory(c._id)}
                            >
                              <IoClose size={18} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <label className="font-medium text-gray-700">
                      Subcategory
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={selectSubCategory}
                        onChange={handleSubCategorySelect}
                        className={`bg-gray-50 border w-full p-2 rounded ${
                          errors.subCategory
                            ? "border-red-500"
                            : "focus:border-yellow-400"
                        }`}
                      >
                        <option value="">Select Subcategory</option>
                        {allSubCategory.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.subCategory && (
                      <p className="text-red-500 text-sm">
                        {errors.subCategory}
                      </p>
                    )}

                    {data.subCategory.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {data.subCategory.map((sub) => (
                          <div
                            key={sub._id}
                            className="flex items-center border p-2 rounded bg-gray-100"
                          >
                            <p className="mr-2 text-sm">{sub.name}</p>
                            <div
                              className="hover:text-red-500 cursor-pointer"
                              onClick={() => handleRemoveSubCategory(sub._id)}
                            >
                              <IoClose size={18} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Pricing & Stock Section */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Pricing & Stock
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <label
                      className="font-medium text-gray-700"
                      htmlFor="price"
                    >
                      Price ($) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">$</span>
                      <input
                        id="price"
                        type="number"
                        name="price"
                        placeholder="0.00"
                        value={data.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className={`bg-gray-50 p-2 pl-8 outline-none border rounded w-full ${
                          errors.price
                            ? "border-red-500"
                            : "focus:border-yellow-400"
                        }`}
                      />
                    </div>
                    {errors.price && (
                      <p className="text-red-500 text-sm">{errors.price}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <label
                      className="font-medium text-gray-700"
                      htmlFor="discount"
                    >
                      Discount (%) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute right-3 top-2.5">%</span>
                      <input
                        id="discount"
                        type="number"
                        name="discount"
                        placeholder="0"
                        value={data.discount}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className={`bg-gray-50 p-2 pr-8 outline-none border rounded w-full ${
                          errors.discount
                            ? "border-red-500"
                            : "focus:border-yellow-400"
                        }`}
                      />
                    </div>
                    {errors.discount && (
                      <p className="text-red-500 text-sm">{errors.discount}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <label
                      className="font-medium text-gray-700"
                      htmlFor="stock"
                    >
                      Stock <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="stock"
                      type="number"
                      name="stock"
                      placeholder="Available quantity"
                      value={data.stock}
                      onChange={handleChange}
                      min="0"
                      className={`bg-gray-50 p-2 outline-none border rounded ${
                        errors.stock
                          ? "border-red-500"
                          : "focus:border-yellow-400"
                      }`}
                    />
                    {errors.stock && (
                      <p className="text-red-500 text-sm">{errors.stock}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Fields Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Additional Information
                  </h3>
                  <button
                    type="button"
                    onClick={() => setOpenAddField(true)}
                    className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded shadow-md cursor-pointer transition-colors"
                  >
                    <IoAdd size={18} />
                    Add Field
                  </button>
                </div>

                <div className="grid gap-4">
                  {Object.keys(data.more_details || {}).map((fieldName) => (
                    <div key={fieldName} className="grid gap-2 relative">
                      <label className="font-medium text-gray-700 capitalize">
                        {fieldName}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={data.more_details[fieldName]}
                          onChange={(e) => {
                            const value = e.target.value;
                            setData((preve) => ({
                              ...preve,
                              more_details: {
                                ...preve.more_details,
                                [fieldName]: value,
                              },
                            }));
                          }}
                          className="bg-gray-50 p-2 outline-none border focus:border-yellow-400 rounded flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveField(fieldName)}
                          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                        >
                          <IoClose size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading.form}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading.form ? (
                    <>
                      <Loading size={20} />
                      Processing...
                    </>
                  ) : (
                    "Update Product"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Modals */}
          {viewImageUrl && (
            <ViewImage url={viewImageUrl} close={() => setViewImageUrl("")} />
          )}

          {openAddField && (
            <MoreFieldComponent
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              error={errors.customField}
              submit={handleAddField}
              close={() => {
                setOpenAddField(false);
                setErrors({ ...errors, customField: "" });
              }}
            />
          )}
        </section>
      </div>
    </section>
  );
};

export default EditProductAdmin;
