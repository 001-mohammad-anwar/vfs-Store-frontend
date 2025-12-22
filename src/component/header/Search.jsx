import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile] = useMobile();
  const [isSearchPage, setIsSearchPage] = useState(false);

  useEffect(() => {
    setIsSearchPage(location.pathname === "/searchPage");
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/searchPage");
  };

  const handleOnchange = (e)=>{
      const value = e.target.value
      const url = `/searchPage?q=${value}`
     navigate(url)
  }

  const params = useLocation()
  const searchText = params.search.slice(3)


  return (
    <div className=" mx-auto container lg:min-w-[500px] flex items-center gap-3 h-14 lg:h-12 text-neutral-700 bg-gray-100 px-4 rounded-lg shadow-sm border border-gray-300 transition focus-within:ring-2 focus-within:ring-green-500">
      {/* Back Button (Mobile Only) */}
      {(isSearchPage && isMobile) && (
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center text-gray-500 p-2 rounded-full bg-white shadow-md"
        >
          <FaArrowLeft size={18} />
        </button>
      )}

      {/* Search Icon */}
      <button className="text-gray-500">
        <IoSearchSharp size={26} />
      </button>

      {/* Search Input Field or Animation */}
      {!isSearchPage ? (
        <div
          onClick={redirectToSearchPage}
          className="h-full w-full flex items-center cursor-pointer text-gray-600 text-md"
        >
          <TypeAnimation
            sequence={[
              "Search 'milk'...",
              1200,
              "Search 'bread'...",
              1200,
              "Search 'sugar'...",
              1200,
              "Search 'butter'...",
              1200,
              "Search 'paneer'...",
              1200,
              "Search 'curd'...",
              1200,
              "Search 'rice'...",
              1200,
              "Search 'chocolate'...",
              1200,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-gray-400"
          />
        </div>
      ) : (
        <input
          className="h-full w-full outline-none bg-transparent px-2 text-md text-gray-700"
          type="text"
          placeholder="Search for Aata, Dal, and more..."
          autoFocus
          defaultValue={searchText}
          onChange={handleOnchange}
        />
      )}
    </div>
  );
};

export default Search;
