import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import { BiUserCircle } from "react-icons/bi";
import useMobile from "../hooks/useMobile";
import image from "../../assets/images/vfs.png"; // Ensure the path is correct
import { BsCart2 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc";
import UserMenu from "../UserMenu";
import { DisplayPriceRupees } from "../../utils/DisplayPriceRupees";
import { useGlobalContext } from "../../provider/GlobalProvider";
import DisplayCartItem from "../DisplayCartItem";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/searchPage";
  const user = useSelector((state) => state.user);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const {totalQty,totalPrice} = useGlobalContext()
  const [openCartSection , setOpenCartSection] = useState(false)

  // const [totalPrice, setTotalPrice] = useState(0);
  // const [totalQty, setTotalQty] = useState(0);

  const toggleUserMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMobileUser = () => {
    if (!user?._id) {
      navigate("/login");
      return;
    }
    navigate("/user");
  };

  // useEffect(() => {
  //   const qty = cartItem.reduce((prev, curr) => {
  //     return prev + curr.quantity;
  //   }, 0);
  //   setTotalQty(qty);

  //   const tPrice = cartItem.reduce((prev, curr) => {
  //     if (curr?.productId?.price) {
  //       return prev + curr.productId.price * curr.quantity;
  //     } else {
  //       return prev;
  //     }
  //   }, 0);
  //   setTotalPrice(tPrice);
  // }, [cartItem]);

  return (
    <header className="h-42 lg:h-24 w-full bg-white shadow-sm sticky top-0 z-50">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex justify-between items-center h-full px-2">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              className="rounded-lg"
              src={image}
              alt="BFS Store"
              width={120}
            />
          </Link>

          {/* Search */}
          <div className="hidden lg:block flex-grow max-w-2xl mx-8">
            <Search />
          </div>

          {/* Account & Cart */}
          <div className="flex items-center gap-4 lg:gap-8">
            {/* User Icon (Mobile) */}
            <button
              onClick={handleMobileUser}
              className="text-gray-700 hover:text-gray-900 lg:hidden"
            >
              <BiUserCircle size={32} />
            </button>

            {/* Account (Desktop) */}
            <div className="hidden lg:flex">
              {user?._id ? (
                <div className="relative">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={toggleUserMenu}
                  >
                    <p className="text-2xl">Account</p>
                    {isMenuOpen ? (
                      <VscTriangleUp className="text-gray-700" />
                    ) : (
                      <VscTriangleDown className="text-gray-700" />
                    )}
                  </div>
                  {isMenuOpen && (
                    <div className="absolute right-0 top-14">
                      <div className="bg-white lg:shadow-lg rounded-md min-w-64 py-6 px-4">
                        <UserMenu close={() => setIsMenuOpen(false)} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="text-lg px-2">
                  Login
                </Link>
              )}
            </div>

            {/* Cart */}
            <button onClick={()=>setOpenCartSection(true)} className=" gap-3 items-center bg-green-700 hover:bg-green-800 font-semibold text-white px-6 py-3 rounded-lg transition-all duration-300 hidden lg:flex">
              <div className="animate-bounce">
                <BsCart2 size={26} />
              </div>
              <div className="hidden lg:block font-semibold text-sm">
                {cartItem.length > 0 ? (
                  <div>
                    <p>{totalQty} Items</p>
                    <p>{DisplayPriceRupees(totalPrice)}</p>
                  </div>
                ) : (
                  <p className="text-sm">My Cart</p>
                )}
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Search Bar */}
      <div className="lg:hidden w-full px-4 py-2 bg-white shadow-sm">
        <Search />
      </div>

      {
        openCartSection && (
           <DisplayCartItem close = {()=>setOpenCartSection(false)}/>
        )
      }
    </header>
  );
};

export default Navbar;
