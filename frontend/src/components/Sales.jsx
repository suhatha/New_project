import React, { useState, useEffect } from 'react';
import { FaSearch, FaFileInvoiceDollar, FaPlus, FaFilter, FaSync, FaDownload, FaPrint, FaEdit, FaTrash, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import axios from 'axios';

const Sales = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [salesEntries, setSalesEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState({
    totalEntries: 0,
    totalRevenue: 0,
    averageSale: 0,
    dateRange: { from: null, to: null }
  });
  
  // Filter states
  const [filters, setFilters] = useState({
    status: '',
    payment_method: '',
    date_from: '',
    date_to: ''
  });

  // API base URL
  const API_BASE_URL = 'http://127.0.0.1:8000/api';

  // Fetch sales data from backend
  const fetchSalesData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (searchTerm) params.append('search', searchTerm);
      if (filters.status) params.append('status', filters.status);
      if (filters.payment_method) params.append('payment_method', filters.payment_method);
      if (filters.date_from) params.append('date_from', filters.date_from);
      if (filters.date_to) params.append('date_to', filters.date_to);
      
      const response = await axios.get(`${API_BASE_URL}/sales?${params}`);
      
      // Transform backend data to match frontend format
      const transformedData = response.data.map(sale => ({
        id: sale.id,
        type: sale.type,
        billNumber: sale.bill_number,
        customer: sale.customer,
        date: new Date(sale.created_at).toLocaleString(),
        total: parseFloat(sale.total),
        payment: sale.payment_method,
        status: sale.status,
        notes: sale.notes
      }));
      
      setSalesEntries(transformedData);
    } catch (error) {
      console.error('Error fetching sales data:', error);
      alert('Failed to fetch sales data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch sales statistics
  const fetchStatistics = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.date_from) params.append('date_from', filters.date_from);
      if (filters.date_to) params.append('date_to', filters.date_to);
      
      const response = await axios.get(`${API_BASE_URL}/sales-statistics?${params}`);
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  // Fetch data on component mount and when filters change
  useEffect(() => {
    fetchSalesData();
    fetchStatistics();
  }, [searchTerm, filters]);

  // Dynamic KPI calculations from statistics
  const totalEntries = statistics.totalEntries;
  const totalRevenue = statistics.totalRevenue;
  const averageSale = statistics.averageSale;

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
    fetchSalesData();
    fetchStatistics();
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
    // In a real implementation, this would generate and print the invoice
    const entry = salesEntries.find(e => e.id === entryId);
    if (entry) {
      alert(`Printing invoice for ${entry.billNumber}\nCustomer: ${entry.customer}\nTotal: LKR ${entry.total.toFixed(2)}`);
      // Here you would integrate with a printing service or generate PDF
    }
  };

  const handleEdit = (entryId) => {
    // Navigate to edit form or open edit modal
    navigate(`/sales/edit/${entryId}`);
  };

  const handleDelete = async (entryId) => {
    if (window.confirm('Are you sure you want to delete this sales entry?')) {
      try {
        await axios.delete(`${API_BASE_URL}/sales/${entryId}`);
        alert('Sales entry deleted successfully!');
        // Refresh the data
        fetchSalesData();
        fetchStatistics();
      } catch (error) {
        console.error('Error deleting sales entry:', error);
        alert('Failed to delete sales entry. Please try again.');
      }
    }
  };

  const handleViewDetails = (entryId) => {
    // Navigate to details view or open details modal
    navigate(`/sales/details/${entryId}`);
  };

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
                <input
                  type="date"
                  value={filters.date_from}
                  onChange={(e) => handleFilterChange('date_from', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
                <input
                  type="date"
                  value={filters.date_to}
                  onChange={(e) => handleFilterChange('date_to', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  value={filters.payment_method}
                  onChange={(e) => handleFilterChange('payment_method', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All</option>
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cheque">Cheque</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
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
              {loading ? (
                <div className="animate-pulse h-8 bg-gray-200 rounded w-16"></div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">{totalEntries}</p>
              )}
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
              {loading ? (
                <div className="animate-pulse h-8 bg-gray-200 rounded w-24"></div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">LKR {totalRevenue.toFixed(2)}</p>
              )}
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
              {loading ? (
                <div className="animate-pulse h-8 bg-gray-200 rounded w-20"></div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">LKR {averageSale.toFixed(2)}</p>
              )}
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
              {loading ? (
                <div className="animate-pulse h-8 bg-gray-200 rounded w-32"></div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {statistics.dateRange?.from && statistics.dateRange?.to 
                    ? `${new Date(statistics.dateRange.from).toLocaleDateString()} - ${new Date(statistics.dateRange.to).toLocaleDateString()}`
                    : 'All Time'
                  }
                </p>
              )}
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
              {loading ? (
                // Loading skeleton rows
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={`loading-${index}`} className="animate-pulse">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded w-28"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="h-6 w-6 bg-gray-200 rounded"></div>
                        <div className="h-6 w-6 bg-gray-200 rounded"></div>
                        <div className="h-6 w-6 bg-gray-200 rounded"></div>
                        <div className="h-6 w-6 bg-gray-200 rounded"></div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                salesEntries.map((entry) => (
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
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        entry.payment === 'cash' ? 'bg-green-100 text-green-800' :
                        entry.payment === 'card' ? 'bg-blue-100 text-blue-800' :
                        entry.payment === 'bank_transfer' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {entry.payment}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        entry.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        entry.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        entry.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {salesEntries.length === 0 && !loading && (
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