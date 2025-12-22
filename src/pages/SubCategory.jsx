import React, { useEffect, useState, useMemo } from "react";
import UploadSubCategoryModel from "../component/UploadSubCategoryModel";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SymmaryApi";
import DisplayTable from "../component/DisplayTable";
import { createColumnHelper } from "@tanstack/react-table";
import ViewImage from "../component/ViewImage";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditSubCategory from "../component/EditSubCategory";
import DeleteSubCategory from "../component/DeleteSubCategory";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";

const SubCategory = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [ImageUrl , setImageUrl]= useState("")
  const [loading, setLoading] = useState(false);
  const columnHelper = createColumnHelper();
  const [openEdit,  setOpenEdit] = useState(false)
  const [editData , setEditData] = useState({
    _id : ""
  })

 const [deleteSubCategory, setDeleteSubCategory] = useState({
  _id : ""
 })
 const [openDeleteConfirmBox , setOpenDeleteConfirmBox] = useState(false)

  // Fetch subcategories from API
  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;
   
      if (responseData.success) {
        setData(responseData.data.
          subcategories
          );
      }


      
    } catch (error) {
      AxiosToastError(error);
      console.error("Error fetching subcategories:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch subcategory data when component mounts
  useEffect(() => {
    fetchSubCategory();
  }, []);
  

  const handleDeleteSubCategory = async () => {
    try {
      // const token = localStorage.getItem("accessToken");
  
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategory,
        // withCredentials: true,
        // headers: {
        //   Authorization: `Bearer ${token}`, // <-- Send token here
        // },
      });
  
      const { data: responseData } = response;
  
      if (responseData.success) {
        toast.success(responseData.message);
        fetchSubCategory();
        setOpenDeleteConfirmBox(false);
        setDeleteSubCategory({ _id: "" });
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };
  
  
  // Column definitions for the table, memoized to prevent unnecessary re-renders
  const columns = useMemo(() => [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        const image = row.original.image;
        return (
          <div className="flex justify-center items-center cursor-pointer">
            {image ? (
              <img
                src={image}
                onClick={()=>{
                  setImageUrl(row.original.image)
                }}
                alt={row.original.name}
                className="w-12 h-12 object-cover rounded "
                onError={(e) => e.target.src = "path/to/default-image.jpg"} // Fallback image
              />
            ) : (
              <img
                src="path/to/default-image.jpg"
                alt="Default"
                className="w-12 h-12 object-cover rounded"
              />
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return(
          <>
          {
            row.original.category.map((c, index) => {
              return (
                <p key={c._id + "table"} className="shadow-md px-1 inline-block">
                  {c.name}
                </p>
              );
            })
             
          }
    
          </>
        )
      },
    }),
    columnHelper.accessor("_id", {
       header:"Action",
       cell: ({row})=>{
       
        return(
          <div className="flex items-center justify-center gap-3">
            <button
            onClick={()=>{
              setOpenEdit(true)
              setEditData(row.original)
            }}
             className="p-2  bg-green-50 hover:text-green-600 rounded-full">
               <FaPencilAlt  size={20}/>
            </button>
            <button className="p-2 bg-red-50 rounded-full hover:text-red-600"
              onClick={()=>{
                setOpenDeleteConfirmBox(true)
                setDeleteSubCategory(row.original)
              }}  
             >
               <MdDelete size={20}/>
            </button>
          </div>
        )
       }
    })

  ], [columnHelper]);

  return (
    <section className="w-full">
      {/* Header */}
      <div className="p-2 font-semibold bg-white shadow-md flex items-center justify-between rounded-md">
        <h2 className="font-semibold">Sub Category</h2>
        <button
          onClick={() => setOpenAddSubCategory(true)}
          className="text-sm border border-yellow-300 hover:bg-yellow-500 px-4 py-2 rounded transition-all"
        >
          Add Sub Category
        </button>
      </div>

      {/* Loading indicator */}
      {loading ? (
        <div className="flex justify-center items-center py-4">
          <span>Loading...</span>
        </div>
      ) : (
        <div className="overflow-auto w-full max-w-[95vw]">
           <DisplayTable data={data} column={columns} />
        </div>
      )}

      {/* Modal for adding subcategory */}
      {openAddSubCategory && (
        <UploadSubCategoryModel close={() => setOpenAddSubCategory(false)}  fetchData = {fetchSubCategory}/>
      )}

      {
        ImageUrl && 
           <ViewImage url = {ImageUrl} close = {()=>setImageUrl("")}/>
      }
               
               
      {
        openEdit && 
         <EditSubCategory fetchData = {fetchSubCategory} data = {editData}  close = {()=>setOpenEdit(false)}/>
      }

      {
        openDeleteConfirmBox &&
        <DeleteSubCategory confirm={handleDeleteSubCategory} cancle={()=>setOpenDeleteConfirmBox(false)} close = {()=>setOpenDeleteConfirmBox(false)}/>
      }
    </section>
  );
};

export default SubCategory;
