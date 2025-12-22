import React, { useEffect, useState } from "react";
import CartLoading from "../component/CartLoading";
import { div } from "framer-motion/client";
import SummaryApi from "../common/SymmaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import CardProduct from "../component/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import noData from "../assets/images/no-product-found4.png";

const SearchPage = () => {
  const [data, setData] = useState([]);
  const loadingArrayCard = new Array(10).fill(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const params = useLocation();
  const searchText = params.search.slice(3);
  // console.log("params:", params.search.slice(3));



  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText,
          page: page,
        },
      });

      const { data: responseData } = response;
     

      if (responseData.success) {
        if (responseData.page === 1) {
          setData(responseData.data);
        } else {
          setData((prev) => [...prev, ...responseData.data]);
        }

        setTotalPage(responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchText]);

  const handleFetchmore = () => {
    if (totalPage > page) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className="bg-white h-[88vh]">
      <div className="container mx-auto p-4">
        <p className="font-semibold">Search Results :{data.length}</p>
         

                 {/* // no data */}
        {!data[0] && !loading && (

          <div className="flex mx-auto flex-col py-5">
             <div className="flex justify-center my-10 "> <img src={noData} className="w-full h-full max-w-2xl min-w-6xl object-contain" alt="data not found" /> </div>
             {/* <div className="flex justify-center"><p className="text-4xl font-bold text-gray-400">Nothing here yet</p></div> */}
          </div>
        
        )}

        <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          next={handleFetchmore}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 my-4 gap-5 ">
            {/* search data */}
            {data.map((p, index) => {
              return (
                <CardProduct data={p} key={p?._id + "SearchProduct" + index} />
              );
            })}

            {/**** loading data */}
            {loading &&
              loadingArrayCard.map((_, index) => {
                return (
                  <div key={"loadingsearchpage" + index} className="">
                    <CartLoading key={"loadingsearchpage" + index} />
                  </div>
                );
              })}
          </div>
        </InfiniteScroll>


      </div>
    </section>
  );
};

export default SearchPage;
