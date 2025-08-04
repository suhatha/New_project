import React, { useState } from 'react';
import { FaSearch, FaFileInvoiceDollar, FaPlus, FaFilter, FaSync, FaDownload, FaPrint, FaEdit, FaTrash, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

const Sales = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const initialSalesEntries = [
    {
      id: 1,
      type: 'Sale',
      billNumber: '#U2/SHA/0001',
      customer: 'Cash Customer',
      date: '7/25/2025 07:47 PM',
      total: 160.00,
      payment: 'cash',
      status: 'Paid'
    }
  ];
  const [salesEntries, setSalesEntries] = useState(initialSalesEntries);

  // Mock data for KPI calculations
  const totalEntries = salesEntries.length;
  const totalRevenue = salesEntries.reduce((sum, entry) => sum + entry.total, 0);
  const averageSale = totalEntries > 0 ? totalRevenue / totalEntries : 0;

  const handleSearch = () => {
    // Search functionality
    console.log('Searching for:', searchTerm);
  };

  const handleCreateQuotation = () => {
    navigate('/quotation');
  };

  const handleCreateSalesEntry = () => {
    // If you have a sales entry page, navigate to it. Otherwise, show a modal.
    // For now, we'll navigate to /sales-entry if it exists.
    navigate('/sales-entry');
  };

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleRefresh = () => {
    setSalesEntries(initialSalesEntries);
  };

  const handleExport = () => {
    // Export salesEntries to XLSX
    const dataToExport = salesEntries.map(({ id, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales');
    XLSX.writeFile(workbook, 'sales_data.xlsx');
  };

  const handlePrint = (entryId) => {
    alert(`Printing invoice for entry ${entryId}`);
    // In a real app, this would open a print dialog
  };

  const handleEdit = (entryId) => {
    alert(`Editing sales entry ${entryId}`);
    // In a real app, this would open an edit form
  };

  const handleDelete = (entryId) => {
    if (window.confirm('Are you sure you want to delete this sales entry?')) {
      setSalesEntries(prev => prev.filter(entry => entry.id !== entryId));
      alert('Sales entry deleted successfully!');
    }
  };

  const handleViewDetails = (entryId) => {
    alert(`Viewing details for entry ${entryId}`);
    // In a real app, this would show a detailed view
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Top Control Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Section */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by bill/invoice number, customer..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleCreateQuotation}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <FaFileInvoiceDollar size={14} />
              Create Quotation
            </button>
            
            <div className="relative">
              <button
                onClick={handleCreateSalesEntry}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <FaPlus size={14} />
                Create Sales Entry
                <FaChevronDown size={12} />
              </button>
            </div>
            
            <button
              onClick={handleShowFilters}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <FaFilter size={14} />
              Show Filters
            </button>
            
            <button
              onClick={handleRefresh}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaSync size={14} />
              Refresh
            </button>
            
            <button
              onClick={handleExport}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <FaDownload size={14} />
              Export
            </button>
          </div>
        </div>

        {/* Filters Section (Hidden by default) */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Last 30 days</option>
                  <option>Last 7 days</option>
                  <option>Last 3 months</option>
                  <option>Custom range</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All</option>
                  <option>Cash</option>
                  <option>Card</option>
                  <option>Bank Transfer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All</option>
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Entries</p>
              <p className="text-2xl font-bold text-gray-900">{totalEntries}</p>
            </div>
            <div className="text-blue-500">
              <FaFileInvoiceDollar size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">LKR {totalRevenue.toFixed(2)}</p>
            </div>
            <div className="text-green-500">
              <FaFileInvoiceDollar size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Sale</p>
              <p className="text-2xl font-bold text-gray-900">LKR {averageSale.toFixed(2)}</p>
            </div>
            <div className="text-yellow-500">
              <FaFileInvoiceDollar size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Date Range</p>
              <p className="text-2xl font-bold text-gray-900">6/29/2025 - 7/29/2025</p>
            </div>
            <div className="text-purple-500">
              <FaFileInvoiceDollar size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Sales Entry Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TYPE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BILL/INV #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CUSTOMER</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAYMENT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewDetails(entry.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {entry.billNumber}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-900">{entry.customer}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">LKR {entry.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {entry.payment}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePrint(entry.id)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Print"
                      >
                        <FaPrint size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(entry.id)}
                        className="text-green-600 hover:text-green-800 p-1"
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        <FaTrash size={16} />
                      </button>
                      <button
                        onClick={() => handleViewDetails(entry.id)}
                        className="text-gray-600 hover:text-gray-800 p-1"
                        title="More Options"
                      >
                        <FaChevronDown size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {salesEntries.length === 0 && (
        <div className="text-center py-12">
          <FaFileInvoiceDollar className="mx-auto text-gray-400 text-4xl mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No sales entries found</h3>
          <p className="text-gray-500">Get started by creating your first sales entry.</p>
          <button
            onClick={handleCreateSalesEntry}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <FaPlus size={14} />
            Create Sales Entry
          </button>
        </div>
      )}
    </div>
  );
};

export default Sales; 