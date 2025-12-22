import React, { useState, useEffect } from "react";
import UploadCategory from "../component/UploadCategory";
import Loading from "../component/Loading";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SymmaryApi";
import NoData from "../component/NoData";
import EditCategory from "../component/EditCategory";
import ConfirmBox from "../component/ConfirmBox";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Category = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [OpenDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({
    _id: "",
  });
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });
  const toggleUploadCategory = () => {
    setOpenUploadCategory((prev) => !prev);
  };

  const allCategory = useSelector(state => state.product.allCategory);



  useEffect(() => {
    setCategories(allCategory);
  }, [allCategory]);




  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({ ...SummaryApi.getCategories });
      const { data: responseData } = response;

      if (responseData) {
        setCategories(responseData.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      // console.log("Deleting category with ID:", deleteData._id); // 🔍 Debug Log
      const response = await Axios({
        method: "delete",
        url: SummaryApi.deleteCategory.url,
        data: { _id: deleteData._id }, // ✅ Ensure _id is inside an object
        headers: { "Content-Type": "application/json" },
      });

      const { data: responseData } = response;
      
      if (responseData.success) {
        toast.success(responseData.message);
        fetchCategory();
        setOpenDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
};

  

  return (
    <section className="p-4 w-full">
      {/* Header */}
      <div className="p-2 font-semibold bg-white shadow-md flex items-center justify-between rounded-md">
        <h2 className="text-lg sm:text-xl">Category</h2>
        <button
          onClick={toggleUploadCategory}
          className="text-sm border border-yellow-300 bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded transition-all"
        >
          {openUploadCategory ? "Close" : "Add Category"}
        </button>
      </div>
    
      {/* No Data Message */}
      {!categories.length && !loading && <NoData />}

      {/* Category Grid */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {categories.map((category, index) => (
          <div
            key={category._id}
            className=" shadow-md   rounded-lg overflow-hidden flex flex-col items-center justify-between p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="w-32  flex items-center justify-center  rounded-md">
              <img
                className="w-full object-scale-down"
                src={category.image}
                alt={category.name}
              />
            </div>
            <p className="font-semibold text-gray-700 text-center mt-2">
              {category.name}
            </p>

            <div className="flex item-center h-9 w-full gap-2">
              <button
                onClick={() => {
                  setOpenEdit(true);
                  setEditData(category);
                }}
                className="flex-1 bg-green-100 text-green-600 font-medium py-1 rounded hover:bg-green-200"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setOpenDelete(true);
                  setDeleteData({ _id: category._id });
                }}
                className="flex-1 bg-red-100  text-red-600 font-medium py-1 rounded hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Loading State */}
      {loading && <Loading />}

      {/* Upload Category Modal */}
      {openUploadCategory && (
        <UploadCategory
          fetchCategory={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}

      {openEdit && (
        <EditCategory
          data={editData}
          fetchCategory={fetchCategory}
          close={() => setOpenEdit(false)}
        />
      )}

      {OpenDelete && (
        <ConfirmBox
        
          confirm={handleDeleteCategory}
          fetchCategory={fetchCategory}
          close={() => setOpenDelete(false)}
          cancel={() => setOpenDelete(false)} // ✅ Correct spelling
        />
      )}
    </section>
  );
};

export default Category;
