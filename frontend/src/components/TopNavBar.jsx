import React from "react";
import { FaBell, FaUserCircle, FaCog, FaSearch } from "react-icons/fa";
import { usePageContext } from "../context/PageContext";

const TopNavBar = () => {
  const { currentPage } = usePageContext();

  return (
    <nav className="flex items-center justify-between bg-blue-600 shadow px-6 py-3 sticky top-0 z-50">
      {/* Left: Current Page Name */}
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-white">{currentPage}</h1>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-6 text-white">
        <button
          aria-label="Search"
          className="relative group hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded"
        >
          <FaSearch size={20} />
          <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
            Search
          </span>
        </button>

        <button
          aria-label="Notifications"
          className="relative group hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded"
        >
          <FaBell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5 leading-none">
            3
          </span>
          <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
            Notifications
          </span>
        </button>

        <button
          aria-label="Settings"
          className="relative group hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded"
        >
          <FaCog size={20} />
          <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
            Settings
          </span>
        </button>

        <button
          aria-label="User Profile"
          className="relative group hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded"
        >
          <FaUserCircle size={26} />
          <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
            Profile
          </span>
        </button>
      </div>
    </nav>
  );
};

export default TopNavBar;
