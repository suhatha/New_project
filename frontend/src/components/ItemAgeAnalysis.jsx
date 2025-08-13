import React, { useState, useMemo, useEffect } from 'react';
import { FaBox, FaShoppingBag, FaChartLine, FaCalendar, FaSearch, FaFileAlt } from 'react-icons/fa';
import axios from 'axios';

const ItemAgeAnalysis = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAge, setFilterAge] = useState('All Items');
  const [loading, setLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  
  // Dynamic data from backend
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [summary, setSummary] = useState({ totalItems: 0, totalValue: 0 });

  // API base URL - adjust this to match your Laravel backend URL
  const API_BASE_URL = 'http://127.0.0.1:8000/api';

  // Fetch age analysis data from backend
  const fetchAgeAnalysisData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/item-age-analysis`);
      
      if (response.data.error) {
        throw new Error(response.data.message);
      }
      
      setPieData(response.data.pieData || []);
      setBarData(response.data.barData || []);
      setTableData(response.data.tableData || []);
      setSummary(response.data.summary || { totalItems: 0, totalValue: 0 });
    } catch (error) {
      console.error('Error fetching age analysis data:', error);
      alert('Failed to fetch age analysis data. Please try again.');
      // Set fallback empty data
      setPieData([]);
      setBarData([]);
      setTableData([]);
      setSummary({ totalItems: 0, totalValue: 0 });
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchAgeAnalysisData();
  }, []);

  // Generate report function
  const handleGenerateReport = async () => {
    try {
      setReportLoading(true);
      const response = await axios.post(`${API_BASE_URL}/item-age-analysis/generate-report`);
      
      if (response.data.error) {
        throw new Error(response.data.message);
      }
      
      // Show success message with report details
      const reportData = response.data;
      alert(`Report generated successfully!\n\nReport ID: ${reportData.reportId}\nGenerated: ${reportData.generatedAt}\nTotal Items: ${reportData.summary?.totalItems || 0}\nTotal Value: ${reportData.summary?.totalValue || 0}`);
      
      // Optionally refresh the data after report generation
      await fetchAgeAnalysisData();
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setReportLoading(false);
    }
  };



  // Use useMemo to prevent infinite re-renders
  const filteredData = useMemo(() => {
    try {
      return tableData.filter(item => {
        const matchesSearch = item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             item.batch.includes(searchTerm);
        
        if (filterAge === 'All Items') return matchesSearch;
        if (filterAge === '0-30 days') return matchesSearch && item.age <= 30;
        if (filterAge === '31-60 days') return matchesSearch && item.age > 30 && item.age <= 60;
        if (filterAge === '61-90 days') return matchesSearch && item.age > 60 && item.age <= 90;
        if (filterAge === '90+ days') return matchesSearch && item.age > 90;
        
        return matchesSearch;
      });
    } catch (error) {
      console.error('Error filtering data:', error);
      return [];
    }
  }, [tableData, searchTerm, filterAge]);

  // Simple chart components without recharts dependency
  const SimplePieChart = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-sm text-gray-600">Loading chart data...</p>
          </div>
        </div>
      );
    }

    if (pieData.length === 0) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-gray-500">No data available</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          {pieData.map((item, index) => (
            <div key={index} className="mb-2">
              <div 
                className="w-32 h-32 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2"
                style={{ backgroundColor: item.color }}
              >
                {Math.round((item.value / summary.totalItems) * 100)}%
              </div>
              <p className="text-sm text-gray-600">
                {item.name}: {item.value} ({Math.round((item.value / summary.totalItems) * 100)}%)
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SimpleBarChart = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-sm text-gray-600">Loading chart data...</p>
          </div>
        </div>
      );
    }

    if (barData.length === 0) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-gray-500">No data available</p>
          </div>
        </div>
      );
    }

    const maxValue = Math.max(...barData.map(item => item.value));
    
    return (
      <div className="h-64 flex items-end justify-center space-x-4">
        {barData.map((item, index) => {
          const height = maxValue > 0 ? (item.value / maxValue) * 200 : 10;
          const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
          
          return (
            <div key={index} className="flex flex-col items-center">
              <div className="text-xs mb-1 font-semibold">
                ${item.value.toLocaleString()}
              </div>
              <div 
                className="w-16 rounded-t" 
                style={{ 
                  height: `${Math.max(height, 10)}px`,
                  backgroundColor: colors[index % colors.length]
                }}
              ></div>
              <span className="text-xs mt-2">{item.age}</span>
            </div>
          );
        })}
      </div>
    );
  };

  try {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Item Age Analysis</h1>
            <p className="text-gray-600">Track inventory aging and identify slow-moving items</p>
          </div>
          <button
            onClick={handleGenerateReport}
            disabled={reportLoading || loading}
            className={`px-6 py-2 rounded-md transition-colors flex items-center gap-2 ${
              reportLoading || loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {reportLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Generating...
              </>
            ) : (
              <>
                <FaFileAlt size={14} />
                Generate Report
              </>
            )}
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? (
                    <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                  ) : (
                    summary.totalItems || 0
                  )}
                </p>
              </div>
              <FaBox className="text-3xl text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Stock</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? (
                    <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
                  ) : (
                    tableData.reduce((sum, item) => sum + (item.stock || 0), 0).toLocaleString()
                  )}
                </p>
              </div>
              <FaShoppingBag className="text-3xl text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? (
                    <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
                  ) : (
                    `$${(summary.totalValue || 0).toLocaleString()}`
                  )}
                </p>
              </div>
              <FaChartLine className="text-3xl text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Age</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? (
                    <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                  ) : (
                    tableData.length > 0 
                      ? `${Math.round(tableData.reduce((sum, item) => sum + (item.age || 0), 0) / tableData.length)} days`
                      : '0 days'
                  )}
                </p>
              </div>
              <FaCalendar className="text-3xl text-orange-600" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Inventory Age Distribution</h3>
            <SimplePieChart />
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Inventory Value by Age</h3>
            <SimpleBarChart />
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by product, batch, or category"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Age Category</label>
              <select
                value={filterAge}
                onChange={(e) => setFilterAge(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All Items">All Items</option>
                <option value="0-30 days">0-30 days</option>
                <option value="31-60 days">31-60 days</option>
                <option value="61-90 days">61-90 days</option>
                <option value="90+ days">90+ days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRODUCT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BATCH/VARIANT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CREATED</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AGE (DAYS)↓</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PURCHASED</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SOLD</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STOCK</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VALUE</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? 'bg-green-50' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.product}</div>
                        <div className="text-sm text-gray-500">{item.category}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.batch}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.created}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {item.age}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.purchased}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.sold}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">LKR {item.value.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering ItemAgeAnalysis:', error);
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Item Age Analysis</h1>
        <p className="text-red-600">Error loading item age analysis page. Please refresh the page.</p>
      </div>
    );
  }
};

export default ItemAgeAnalysis; 