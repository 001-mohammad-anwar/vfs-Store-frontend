import React, { useEffect, useState } from "react";
import SummaryApi from "../common/SymmaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../component/Loading";
import ProductCartAdmin from "../component/ProductCartAdmin";
import { IoIosSearch } from "react-icons/io";

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct, // Ensure method & url are set properly here
        data: {
          page: page,
          limit: 20,
          search: search
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        setProductData(responseData.data);
        setTotalPageCount(responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced fetch
  useEffect(() => {
    let flag = true
    const delayDebounce = setTimeout(() => {

      if(flag){
        fetchProductData();
        flag = false
      }

    }, 500); // 500ms debounce delay

    return () => clearTimeout(delayDebounce);
  }, [search, page]);

  const handleNext = () => {
    if (page < totalPageCount) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleOnchange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <section className="w-full">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-2 mb-6 flex items-center justify-between gap-3 ">
        <h2 className="text-2xl font-bold text-gray-800">Product</h2>
        <div className="flex py-2 min-w-24 rounded-md bg-blue-50 px-3 items-center border focus-within:border-yellow-300 gap-1">
          <IoIosSearch size={20} />
          <input
            type="text"
            onChange={handleOnchange}
            value={search}
            placeholder="Search for Product here...."
            className="h-full w-full outline-none bg-transparent ml-auto max-w-56"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center my-12">
          <Loading />
        </div>
      )}

      {/* Product Grid */}
      <div className="p-4 bg-blue-50">
        {!loading && (
          <>
            {productData.length > 0 ? (
              <div className="min-h-[62vh] lg:min-h-[71.5vh]">
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
                  {productData.map((p , index) => (
                    <ProductCartAdmin
                     fetchProductData = {fetchProductData}
                      key={p._id || p.id || Math.random()} // use _id or fallback
                      data={p}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            )}

            {/* Pagination */}
            {totalPageCount > 1 && (
              <div className="flex justify-center mt-4">
                <nav className="inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={handlePrevious}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                      page === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700">
                    Page {page} of {totalPageCount}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={page === totalPageCount}
                    className={`px-4 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                      page === totalPageCount
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Product;
