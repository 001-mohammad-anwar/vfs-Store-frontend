import React from "react";
import UserMenu from "../component/UserMenu";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  return (
    <section className="bg-white ">
      <div className="container mx-auto p-3  grid lg:grid-cols-[200px,1fr] ">        
        {/* Left Sidebar - User Menu */}
        <aside className="py-4 sticky overflow-y-auto max-h-[calc(100vh-96px)] top-24 hidden lg:block border-r"> 
          <UserMenu />
        </aside>

        {/* Right Content Area */}
        <main className="bg-white min-h-[75vh] flex justify-center">
            <Outlet/>
        </main>

      </div>
    </section>
  );
};

export default Dashboard;
