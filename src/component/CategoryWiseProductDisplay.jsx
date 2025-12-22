import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SymmaryApi";
import CartLoading from "./CartLoading";
import CardProduct from "./CardProduct";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { validURLConvert } from "../utils/ValidUrlConvert";

const CategoryWiseProductDisplay = ({ id, name }) => {
  const containerRef = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: { id },
      });
      setData(response?.data?.data || []);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWiseProduct();
  }, [id]);

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300, // Scrolls right
        behavior: "smooth",
      });
    }
  };

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300, // Scrolls left
        behavior: "smooth",
      });
    }
  };

  const SubcategoryData = useSelector((state) => state.product.allSubCategory);

  const generateProductListUrl = (id, name) => {
    const subCategory = SubcategoryData.find((sub) =>
      sub.category.some((c) => c._id === id)
    );

    if (!subCategory) return "/"; // fallback in case of missing subcategory

    return `/${validURLConvert(name)}-${id}/${validURLConvert(
      subCategory.name
    )}-${subCategory._id}`;
  };

  return (
    <div className="relative">
      <div className="container mx-auto p-4 flex items-center justify-between gap-4">
        <h3 className="font-bold text-lg md:text-xl">{name}</h3>
        <Link
          to={generateProductListUrl(id, name)}
          className="text-green-600 hover:text-green-400"
        >
          See All
        </Link>
      </div>

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="container mx-auto flex items-center gap-4 md:gap-6 lg:gap-8 px-4 overflow-x-auto scroll-smooth scrollbar-none"
        style={{ scrollBehavior: "smooth" }}
      >
        {loading
          ? Array(6)
              .fill(null)
              .map((_, index) => (
                <CartLoading key={`CategoryShimmer-${index}`} />
              ))
          : data.map((product) => (
              <CardProduct
                data={product}
                key={`${product._id}-CategoryProduct`}
              />
            ))}
      </div>

      {/* Scroll Buttons (Only show if data exists) */}

      {data.length > 0 && (
        <div className="">
          <button
            onClick={handleScrollLeft}
            className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hover:bg-gray-50 z-10"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleScrollRight}
            className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hover:bg-gray-50 z-10"
          >
            <FaAngleRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryWiseProductDisplay;
