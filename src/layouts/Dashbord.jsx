import React from "react";
import UserMenu from "../component/UserMenu";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  return (
    <section className="w-full min-h-[calc(100vh-96px)] bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr]">

        {/* Sidebar */}
        <aside className="hidden lg:block sticky top-24 h-[calc(100vh-96px)] border-r bg-white">
          <UserMenu />
        </aside>

        {/* Main Content */}
        <main className="p-4 md:p-6 bg-white min-h-[calc(100vh-96px)]">
          <Outlet />
        </main>

      </div>
    </section>
  );
};

export default Dashboard;
