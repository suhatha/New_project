import React, { useState, useMemo } from 'react';
import { FaSearch, FaPlus, FaFilter, FaSync, FaDownload, FaEye, FaEdit, FaTrash, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

const Purchasing = () => {
  const navigate = useNavigate();
  const initialPurchaseEntries = [
    {
      id: 1,
      billNumber: 'PO-2025-001',
      date: '7/29/2025 10:30 AM',
      supplier: 'Auto Parts Plus',
      store: 'Main Store',
      items: 5,
      total: 1250.00,
      status: 'Completed'
    },
    {
      id: 2,
      billNumber: 'PO-2025-002',
      date: '7/28/2025 2:15 PM',
      supplier: 'Motor Solutions Ltd',
      store: 'Branch A',
      items: 3,
      total: 890.50,
      status: 'Pending'
    }
  ];
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [purchaseEntries, setPurchaseEntries] = useState(initialPurchaseEntries);

  // Calculate summary totals
  const summaryData = useMemo(() => {
    const itemSubtotal = purchaseEntries.reduce((sum, entry) => sum + entry.total, 0);
    const totalItemDiscount = itemSubtotal * 0.05; // 5% discount
    const invoiceDiscount = itemSubtotal * 0.02; // 2% invoice discount
    const totalTax = (itemSubtotal - totalItemDiscount - invoiceDiscount) * 0.15; // 15% tax
    const grandTotal = itemSubtotal - totalItemDiscount - invoiceDiscount + totalTax;

    return {
      itemSubtotal,
      totalItemDiscount,
      invoiceDiscount,
      totalTax,
      grandTotal
    };
  }, [purchaseEntries]);

  const handleSearch = () => {
    try {
      console.log('Searching for:', searchTerm);
    } catch (error) {
      console.error('Error in search:', error);
    }
  };

  const handleCreatePurchaseOrder = () => {
    navigate('/purchase-order');
  };

  const handleCreatePurchaseEntry = () => {
    navigate('/purchase-entry');
  };

  const handleShowFilters = () => {
    try {
      setShowFilters(!showFilters);
    } catch (error) {
      console.error('Error toggling filters:', error);
    }
  };

  const handleRefresh = () => {
    setPurchaseEntries(initialPurchaseEntries);
  };

  const handleExport = () => {
    const dataToExport = purchaseEntries.map(({ id, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Purchases');
    XLSX.writeFile(workbook, 'purchasing_data.xlsx');
  };

  const handleViewDetails = (entryId) => {
    try {
      alert(`Viewing details for purchase entry ${entryId}`);
    } catch (error) {
      console.error('Error viewing details:', error);
    }
  };

  const handleEdit = (entryId) => {
    try {
      alert(`Editing purchase entry ${entryId}`);
    } catch (error) {
      console.error('Error editing entry:', error);
    }
  };

  const handleDelete = (entryId) => {
    try {
      if (window.confirm('Are you sure you want to delete this purchase entry?')) {
        setPurchaseEntries(prev => prev.filter(entry => entry.id !== entryId));
        alert('Purchase entry deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const filteredEntries = useMemo(() => {
    try {
      return purchaseEntries.filter(entry => {
        const searchLower = searchTerm.toLowerCase();
        return entry.billNumber.toLowerCase().includes(searchLower) ||
               entry.supplier.toLowerCase().includes(searchLower) ||
               entry.store.toLowerCase().includes(searchLower);
      });
    } catch (error) {
      console.error('Error filtering entries:', error);
      return [];
    }
  }, [purchaseEntries, searchTerm]);

  try {
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
                  placeholder="Search bill number, invoice number, supplier, store, or item"
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleCreatePurchaseEntry}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <FaPlus size={14} />
                Create Purchase Entry
              </button>
              <button
                onClick={handleCreatePurchaseOrder}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <FaPlus size={14} />
                Create Purchase Order
              </button>
              <button
                onClick={handleShowFilters}
                className="bg-white text-gray-700 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2"
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

          {/* Filter Panel (Conditional Render) */}
          {showFilters && (
            <div className="mt-6 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>Custom Range</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Suppliers</option>
                  <option>Auto Parts Plus</option>
                  <option>Motor Solutions Ltd</option>
                  <option>Car Care Pro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Store</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Stores</option>
                  <option>Main Store</option>
                  <option>Branch A</option>
                  <option>Branch B</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Status</option>
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Purchase Summary Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Purchase Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm font-medium text-gray-600">Item Subtotal</p>
              <p className="text-lg font-bold text-gray-900">LKR {summaryData.itemSubtotal.toFixed(2)}</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <p className="text-sm font-medium text-gray-600">Total Item Discount</p>
              <p className="text-lg font-bold text-gray-900">LKR {summaryData.totalItemDiscount.toFixed(2)}</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <p className="text-sm font-medium text-gray-600">Invoice Discount</p>
              <p className="text-lg font-bold text-gray-900">LKR {summaryData.invoiceDiscount.toFixed(2)}</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <p className="text-sm font-medium text-gray-600">Total Tax</p>
              <p className="text-lg font-bold text-gray-900">LKR {summaryData.totalTax.toFixed(2)}</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm font-medium text-gray-600">Grand Total</p>
              <p className="text-lg font-bold text-gray-900">LKR {summaryData.grandTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Purchase Entries Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.NO</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BILL NUMBER</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SUPPLIER</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STORE</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ITEMS</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEntries.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                      No purchase entries found.
                    </td>
                  </tr>
                ) : (
                  filteredEntries.map((entry, index) => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 cursor-pointer" onClick={() => handleViewDetails(entry.id)}>
                        {entry.billNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.supplier}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.store}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.items}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">LKR {entry.total.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          entry.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          entry.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {entry.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button onClick={() => handleViewDetails(entry.id)} className="text-blue-600 hover:text-blue-800 p-1" title="View Details">
                            <FaEye size={16} />
                          </button>
                          <button onClick={() => handleEdit(entry.id)} className="text-green-600 hover:text-green-800 p-1" title="Edit Entry">
                            <FaEdit size={16} />
                          </button>
                          <button onClick={() => handleDelete(entry.id)} className="text-red-600 hover:text-red-800 p-1" title="Delete Entry">
                            <FaTrash size={16} />
                          </button>
                          <button onClick={() => handleViewDetails(entry.id)} className="text-gray-500 hover:text-gray-700 p-1" title="More Options">
                            <FaChevronDown size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering Purchasing:', error);
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Purchasing</h1>
        <p className="text-red-600">Error loading purchasing page. Please refresh the page.</p>
      </div>
    );
  }
};

export default Purchasing; 