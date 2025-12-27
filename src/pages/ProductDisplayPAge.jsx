import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SymmaryApi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRef } from "react";
import { IoIosTimer } from "react-icons/io";
import Divider from "../component/Devider";
import { FaArrowRightLong } from "react-icons/fa6";
import aashirvadLOgo from "/src/assets/images/aashirvaad-logo.png";
import { DisplayPriceRupees } from "../utils/DisplayPriceRupees";
import fastDeliveryLogo from "/src/assets/images/FastDelivery2.png";
import bestofferLogo from "/src/assets/images/bestOffer.webp";
import trustedQuality from "/src/assets/images/Quality.png";
import priceWithDiscount from "../utils/PriceWithDiscount";
import AddToCartButton from "../component/AddToCartButton";

const ProductDisplayPage = () => {
  const [product, setProduct] = useState({
    name: "",
    image: [],
    description: "",
    price: 0,
  });
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(0);
  const params = useParams();

  const imageContainer = useRef();

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100;
  };

  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const productId = params?.product?.split("-")?.pop();
      if (!productId) {
        throw new Error("Invalid product ID");
      }

      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId,
        },
      });

      if (response?.data?.success) {
        setProduct(response.data.data);
      } else {
        throw new Error(
          response?.data?.message || "Failed to fetch product details"
        );
      }
    } catch (error) {
      AxiosToastError(error);
      setProduct({
        name: "",
        image: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <section className="container mx-auto grid lg:grid-cols-2 p-4 gap-4 item-center justify-center w-full">
      {/* Left: Image section */}
      <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow items-center w-full ">
          
        <div className=" min-h-[320px] bg-white md:min-h-[50vh] lg:min-h-[65vh] w-full overflow-hidden flex items-center justify-center">
          <img
            src={product.image[mainImage]}
            alt={product.name || "Product image"}
            className="w-full h-auto max-h-[340px] object-contain md:max-h-[50vh] lg:max-h-[70vh] p-4"
          />
        </div>

        <div className="flex items-center justify-center gap-3 my-2">
          {product.image.map((img, index) => {
            return (
              <div
                key={img + "point" + index}
                className={`bg-slate-200 w-3 lg:w-5 lg:h-5 h-3  rounded-full ${
                  index === mainImage ? "bg-slate-400" : "bg-slate-200"
                }`}
              ></div>
            );
          })}
        </div>


        <div className="grid relative max-w-2xl mx-auto">
          <div
            ref={imageContainer}
            className="flex relative max-w-xl mx-auto z-10 gap-3 w-full overflow-x-auto scrollbar-none"
          >
            {product.image.map((img, index) => {
              return (
                <div
                  key={img + index}
                  onClick={() => setMainImage(index)}
                  className="w-16 h-16 min-h-20 min-w-20 shadow"
                >
                  <img
                    src={img}
                    className="w-full h-full object-scale-down"
                    alt="min-product"
                  />
                </div>
              );
            })}
          </div>
          <div className=" absolute flex -ml-3 justify-between w-full  h-full items-center pl-2">
            <button
              onClick={handleScrollLeft}
              className="z-50 relative lg:right-8 bg-white p-1 rounded-full shadow-lg "
            >
              <FaAngleLeft size={25} />
            </button>
            <button
              onClick={handleScrollRight}
              className="z-50 relative lg:left-12 bg-white p-1 rounded-full shadow-lg "
            >
              <FaAngleRight size={25} />
            </button>
          </div>
        </div>

      </div>

      {/* Right: Product Details */}

      <div className="bg-white rounded-lg shadow px-12 py-2">
        <h2 className="text-2xl font-bold mb-2">
          {product.name || "Product Name"}
        </h2>
        <div className="flex border w-fit items-center px-1 rounded bg-slate-100 text-xs font-semibold gap-1 my-3">
          <IoIosTimer />
          <p className="">12 MINS</p>
        </div>

        <Divider />

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="border w-12 h-12 rounded-2xl overflow-hidden">
              <img className="w-full h-full" src={aashirvadLOgo} alt="" />
            </div>
            <div className="text-sm">
              <h1 className="font-semibold">Aashirvaad</h1>
              <p className="text-green-600 cursor-pointer">
                Explore all product
              </p>
            </div>
          </div>
          <div className="hover:text-gray-400 cursor-pointer">
            <FaArrowRightLong />
          </div>
        </div>

        <Divider />

        <div className="space-y-2 flex justify-between ">
          <div>
            {/* Unit */}
            <p className="text-gray-500 text-base font-semibold">
              {product.unit || "1 kg pack"}
            </p>

            {/* Price section */}
            {!product.stock == 0 && (
              <div className="flex items-center gap-3">
                {/* Main Price */}
                <p className="text-lg font-bold text-gray-800">
                  {DisplayPriceRupees(
                    priceWithDiscount(product.price, product.discount)
                  )}
                </p>

                <div className="text-sm text-gray-500 flex">
                  MRP:
                  <span className="line-through ml-1">
                    {DisplayPriceRupees(product.price)}
                  </span>
                </div>

                {/* Discount badge */}
                <span className="text-white text-xs font-semibold bg-blue-500 px-2 py-0.5 rounded">
                  {product.discount}% OFF
                </span>
              </div>
            )}

            {/* MRP with strike */}
            <div className="leading-3 text-xs text-gray-600">
              {product.stock === 0
                ? "out of stock"
                : "(Inclusive of all taxes)"}
            </div>
          </div>
          {!product.stock == 0 && (
            <div className="flex items-center justify-center cursor-pointer px-5 py-3  rounded-md">
              {/* <button className="text-lg font-bold"> Add to cart</button> */}
              <AddToCartButton data={product}/>
            </div>
          )}
        </div>
        <div className="mt-10 space-y-4 max-w-xl">
          <h2 className="text-xl font-bold text-gray-800">
            Why Shop From Vfs Store
          </h2>

          {/* Card 1: Fast Delivery */}
          <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow hover:shadow-md transition">
            <div className="flex-shrink-0 border rounded-full overflow-hidden w-20 h-20 flex items-center justify-center bg-gray-50">
              <img
                className="w-full h-full object-contain"
                src={fastDeliveryLogo}
                alt="Fast Delivery"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                Lightning-Fast Delivery
              </p>
              <p className="text-gray-600 text-sm">
                Get your groceries delivered within minutes from stores near
                you.
              </p>
            </div>
          </div>

          {/* Card 2: Unbeatable Prices */}
          <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow hover:shadow-md transition">
            <div className="flex-shrink-0 border rounded-full overflow-hidden w-20 h-20 flex items-center justify-center bg-gray-50">
              <img
                className="w-full h-full object-contain"
                src={bestofferLogo}
                alt="Best Offers"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Unbeatable Prices</p>
              <p className="text-gray-600 text-sm">
                Everyday low prices with exclusive deals and discounts.
              </p>
            </div>
          </div>

          {/* Card 3: Vast Selection */}
          <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow hover:shadow-md transition">
            <div className="flex-shrink-0 border rounded-full overflow-hidden w-20 h-20 flex items-center justify-center bg-gray-50">
              {/* Add your image for vast selection */}
              <img
                className="w-full h-full object-contain"
                src={trustedQuality}
                alt="Vast Selection"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Trusted Quality</p>
              <p className="text-gray-600 text-sm">
                Only genuine, fresh products, carefully packed and handled with
                the highest hygiene standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-4 lg:grid gap-3 hidden ">
        <div className="">
          <p className="font-semibold">Discription</p>
          <p className="text-base">{product.description}</p>
        </div>
        <div>
          <p className="font-semibold">Unit</p>
          <p className="text-base">{product.unit}</p>
        </div>
        {product?.more_details &&
          Object.keys(product?.more_details).map((element, index) => {
            return (
              <div>
                <p className="font-semibold">{element}</p>
                <p className="text-base">{product?.more_details[element]}</p>
              </div>
            );
          })}
      </div>
      
    </section>
  );
};

export default ProductDisplayPage;
