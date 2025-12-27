import React from "react";
import UserMenu from "../component/UserMenu";
import { IoClose } from "react-icons/io5";

const MobileUserMenu = () => {
  return (
    <section className="bg-white h-full w-full">
      {/* Close Button */}
      <button
        onClick={() => window.history.back()}
        className="text-neutral-800 block w-fit ml-auto px-6"
      >
        <IoClose size={36} className="hover:text-red-600 transition duration-300" />
      </button>

      {/* User Menu Container */}
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Menu</h2>
        <UserMenu />
      </div>
    </section>
  );
};

export default MobileUserMenu;
