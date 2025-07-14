import React from "react";
import Sidebar from "./Sidebar";
import TopNavBar from "./TopNavBar";
import { Outlet } from "react-router-dom"; // Import this for nested route rendering

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-y-auto">
        <TopNavBar />

        <main className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {/* Render nested routes here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
