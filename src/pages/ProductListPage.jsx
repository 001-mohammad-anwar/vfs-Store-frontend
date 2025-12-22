import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SymmaryApi";
import Loading from "../component/Loading";
import CardProduct from "../component/CardProduct";
import CardProductListPage from "../component/CardProductListPage";
import { useSelector } from "react-redux";
import { validURLConvert } from "../utils/ValidUrlConvert";

const ProductListPage = () => {
  const params = useParams();

  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const subCategoryName = params.subCategory.slice(0, 4).replace("-", " ");

  const categoryId = params.category.split("-").slice(-1)[0];
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 25,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData([...data, ...responseData.data]);
        }
        setTotalPage(responseData.totalcount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const AllsubCategory = useSelector((state) => state.product.allSubCategory);
  const [displaySubCategory, setDisplaySubCategory] = useState([]);

  useEffect(() => {
    fetchProductData();
  }, [params]);

  useEffect(() => {
    const sub = AllsubCategory.filter((s) => {
      const filterData = s.category.some((el) => {
        return el._id === categoryId;
      });

      return filterData ? filterData : false;
    });

    setDisplaySubCategory(sub);
  }, [params, AllsubCategory]);

  return (
    <section className="sticky top-24 lg:top-20">
       {/* header */}
      <div className="sticky top-0 z-50 bg-gray-50 shadow-lg border-y-1 p-2 w-full container mx-auto my-[1px] rounded">
        <h3 className="font-bold px-4">Buy {subCategoryName} Online</h3>
      </div>
      <div className="container sticky top-24 mx-auto grid grid-cols-[90px,1fr] lg:grid-cols-[150px,1fr] ">
        {/* sub category */}
        <div  className=" min-h-[81vh] grid gap-1 shadow-md text-center  max-h-[80vh] overflow-y-scroll">
          {displaySubCategory.map((s, index) => {
           const link  = `/${validURLConvert(s?.category[0]?.name)}-${s.category[0]?._id}/${validURLConvert(s.name)}-${s._id}`
            return (
              <Link to={link}
                key={s._id}
                className={`w-full p-2 rounded-md cursor-pointer transition-all duration-150  ${
                  subCategoryId === s._id
                    ? "bg-gray-200 border border-green-100"
                    : "bg-white"
                } hover:bg-gray-100`}
              >
                <div className="w-fit mx-auto">
                  <img
                    className={`w-14 h-full object-scale-down`} 
                    src={s.image}
                    alt={s.name}
                  />
                </div>

                <p className="text-xs  -mt-5 text-gray-40 ">{s.name}</p>
              </Link>
            );
          })}
        </div>

        {/* product */}
           
        <div className="sticky top-20 bg-gray-50 shadow-sm rounded-lg overflow-hidden">
        <div className="min-h-[81vh] max-h-[80vh] overflow-y-auto border border-gray-200 rounded-lg">
          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 p-4">
            {data.map((p, index) => (
              <CardProductListPage
                key={`${p._id}-product-${index}`}
                data={p}
                className="hover:scale-[1.02] transition-transform duration-200"
              />
            ))}
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
              <Loading className="w-12 h-12 text-primary-500" />
            </div>
          )}
        </div>
      </div>
      </div>
    </section>
  );
};

export default ProductListPage;
