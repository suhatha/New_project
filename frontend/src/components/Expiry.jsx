import React, { useState } from 'react';
import { FaCalendarAlt, FaPrint } from 'react-icons/fa';

const Expiry = () => {
  const [referenceDate, setReferenceDate] = useState('2025-07-28');
  const [filterExpiry, setFilterExpiry] = useState('Show All');
  const [items] = useState([]); // Empty array for "No items found" state

  const filterOptions = [
    'Show All',
    'Expired',
    'Expiring Today',
    'Expiring This Week',
    'Expiring This Month',
    'Expiring Next Month'
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Item Inventory Expiries</h1>
      </div>

      {/* Filter and Action Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Reference Date */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Reference Date:</label>
            <div className="relative">
              <input
                type="date"
                value={referenceDate}
                onChange={(e) => setReferenceDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Filter Expiry */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Filter Expiry Relative to Reference Date:</label>
            <select
              value={filterExpiry}
              onChange={(e) => setFilterExpiry(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {filterOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaPrint size={14} />
            Print
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-800 text-white">
          <div className="grid grid-cols-6 gap-4 p-4 font-bold text-sm">
            <div>ITEM NAME</div>
            <div>BATCH NUMBER</div>
            <div>CATEGORY</div>
            <div>QUANTITY</div>
            <div>EXPIRY DATE</div>
            <div>CURRENT STATUS</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="p-8">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">
              No items found.
            </div>
          ) : (
            <div className="space-y-2">
              {/* Sample items would go here */}
              <div className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-50">
                <div>Sample Item</div>
                <div>BATCH001</div>
                <div>Category A</div>
                <div>100</div>
                <div>2025-08-15</div>
                <div>Active</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Expiry; 