import React, { useState, useMemo } from 'react';
import { FaBox, FaShoppingBag, FaChartLine, FaCalendar, FaSearch, FaFileAlt } from 'react-icons/fa';

const ItemAgeAnalysis = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAge, setFilterAge] = useState('All Items');

  // Mock data for charts
  const pieData = [
    { name: '0-30 days', value: 1027, color: '#10B981' }
  ];

  const barData = [
    { age: '0-30 days', value: 3430531.49 },
    { age: '31-60 days', value: 0 },
    { age: '61-90 days', value: 0 },
    { age: '90+ days', value: 0 }
  ];

  // Mock table data with automotive parts
  const [tableData] = useState([
    {
      id: 1,
      product: 'Engine Oil Filter',
      category: 'Engine Parts',
      batch: '1',
      created: 'Jul 25, 2025',
      age: 2,
      purchased: 70.99,
      sold: 1,
      stock: 69.99,
      value: 9798.60
    },
    {
      id: 2,
      product: 'Brake Pads Set',
      category: 'Brake System',
      batch: '2',
      created: 'Jul 25, 2025',
      age: 2,
      purchased: 33,
      sold: 0,
      stock: 33,
      value: 3300
    },
    {
      id: 3,
      product: 'Air Filter',
      category: 'Engine Parts',
      batch: '3',
      created: 'Jul 25, 2025',
      age: 2,
      purchased: 25,
      sold: 0,
      stock: 25,
      value: 4375
    },
    {
      id: 4,
      product: 'Spark Plugs',
      category: 'Electrical',
      batch: '4',
      created: 'Jul 25, 2025',
      age: 2,
      purchased: 5,
      sold: 0,
      stock: 5,
      value: 2250
    },
    {
      id: 5,
      product: 'Timing Belt',
      category: 'Engine Parts',
      batch: '5',
      created: 'Jul 25, 2025',
      age: 2,
      purchased: 11,
      sold: 0,
      stock: 11,
      value: 6930
    }
  ]);

  const handleGenerateReport = () => {
    try {
      alert('Report generated successfully!');
    } catch (error) {
      console.error('Error generating report:', error);
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
  const SimplePieChart = () => (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="w-32 h-32 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">
          100%
        </div>
        <p className="mt-4 text-sm text-gray-600">0-30 days: 1027 (100%)</p>
      </div>
    </div>
  );

  const SimpleBarChart = () => (
    <div className="h-64 flex items-end justify-center space-x-4">
      <div className="flex flex-col items-center">
        <div className="w-16 bg-blue-500 rounded-t" style={{ height: '200px' }}></div>
        <span className="text-xs mt-2">0-30 days</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-16 bg-gray-300 rounded-t" style={{ height: '10px' }}></div>
        <span className="text-xs mt-2">31-60 days</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-16 bg-gray-300 rounded-t" style={{ height: '10px' }}></div>
        <span className="text-xs mt-2">61-90 days</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-16 bg-gray-300 rounded-t" style={{ height: '10px' }}></div>
        <span className="text-xs mt-2">90+ days</span>
      </div>
    </div>
  );

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
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaFileAlt size={14} />
            Generate Report
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Variants</p>
                <p className="text-2xl font-bold text-gray-900">1027</p>
              </div>
              <FaBox className="text-3xl text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Stock</p>
                <p className="text-2xl font-bold text-gray-900">12530.76</p>
              </div>
              <FaShoppingBag className="text-3xl text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">LKR 3,430,531.49</p>
              </div>
              <FaChartLine className="text-3xl text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Age</p>
                <p className="text-2xl font-bold text-gray-900">2 days</p>
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