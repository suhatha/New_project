import React, { useState } from 'react';
import { FaChartLine, FaUsers, FaMoneyBillWave, FaBuilding, FaCar, FaTools, FaCalendar, FaDownload, FaPrint, FaEye, FaChartBar, FaGlobe, FaTachometerAlt } from 'react-icons/fa';

const OwnerDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedBranch, setSelectedBranch] = useState('all');

  const branches = [
    { id: 'all', name: 'All Branches' },
    { id: 'BR001', name: 'Main Branch - Colombo' },
    { id: 'BR002', name: 'Kandy Branch' },
    { id: 'BR003', name: 'Galle Branch' },
    { id: 'BR004', name: 'Jaffna Branch' }
  ];

  const periods = [
    { id: 'today', name: 'Today' },
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'quarter', name: 'This Quarter' },
    { id: 'year', name: 'This Year' }
  ];

  // Mock data for dashboard
  const dashboardData = {
    totalRevenue: 8500000,
    totalCustomers: 1250,
    totalVehicles: 320,
    totalStaff: 70,
    activeBranches: 4,
    averageRevenue: 2125000,
    topPerformingBranch: 'Main Branch - Colombo',
    revenueGrowth: 15.5,
    customerGrowth: 8.2,
    vehicleGrowth: 12.1
  };

  const branchPerformance = [
    {
      branchId: 'BR001',
      branchName: 'Main Branch - Colombo',
      revenue: 2500000,
      customers: 450,
      vehicles: 120,
      staff: 25,
      growth: 18.5
    },
    {
      branchId: 'BR002',
      branchName: 'Kandy Branch',
      revenue: 1800000,
      customers: 320,
      vehicles: 85,
      staff: 18,
      growth: 12.3
    },
    {
      branchId: 'BR003',
      branchName: 'Galle Branch',
      revenue: 1200000,
      customers: 280,
      vehicles: 65,
      staff: 15,
      growth: 8.7
    },
    {
      branchId: 'BR004',
      branchName: 'Jaffna Branch',
      revenue: 800000,
      customers: 200,
      vehicles: 50,
      staff: 12,
      growth: 5.2
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'Revenue',
      branch: 'Main Branch - Colombo',
      amount: 250000,
      date: '2025-07-29',
      status: 'completed'
    },
    {
      id: 2,
      type: 'New Customer',
      branch: 'Kandy Branch',
      customer: 'Ahmed Khan',
      date: '2025-07-29',
      status: 'completed'
    },
    {
      id: 3,
      type: 'Vehicle Service',
      branch: 'Galle Branch',
      vehicle: 'Toyota Corolla ABC-1234',
      date: '2025-07-29',
      status: 'in-progress'
    },
    {
      id: 4,
      type: 'Staff Addition',
      branch: 'Jaffna Branch',
      staff: 'New Technician',
      date: '2025-07-28',
      status: 'completed'
    }
  ];

  const getGrowthColor = (growth) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (growth) => {
    return growth >= 0 ? '↗' : '↘';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Central Owner Dashboard</h1>
          <p className="text-gray-600">Comprehensive overview of all business operations</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {branches.map(branch => (
              <option key={branch.id} value={branch.id}>{branch.name}</option>
            ))}
          </select>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {periods.map(period => (
              <option key={period.id} value={period.id}>{period.name}</option>
            ))}
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <FaDownload size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaMoneyBillWave className="text-green-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">LKR {dashboardData.totalRevenue.toLocaleString()}</p>
              <p className={`text-sm ${getGrowthColor(dashboardData.revenueGrowth)}`}>
                {getGrowthIcon(dashboardData.revenueGrowth)} {dashboardData.revenueGrowth}% vs last period
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaUsers className="text-blue-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.totalCustomers}</p>
              <p className={`text-sm ${getGrowthColor(dashboardData.customerGrowth)}`}>
                {getGrowthIcon(dashboardData.customerGrowth)} {dashboardData.customerGrowth}% vs last period
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaCar className="text-purple-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.totalVehicles}</p>
              <p className={`text-sm ${getGrowthColor(dashboardData.vehicleGrowth)}`}>
                {getGrowthIcon(dashboardData.vehicleGrowth)} {dashboardData.vehicleGrowth}% vs last period
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaBuilding className="text-orange-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Active Branches</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.activeBranches}</p>
              <p className="text-sm text-gray-500">All operational</p>
            </div>
          </div>
        </div>
      </div>

      {/* Branch Performance Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Branch Performance</h3>
          <div className="space-y-4">
            {branchPerformance.map((branch) => (
              <div key={branch.branchId} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{branch.branchName}</h4>
                    <p className="text-sm text-gray-500">Revenue: LKR {branch.revenue.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${getGrowthColor(branch.growth)}`}>
                      {getGrowthIcon(branch.growth)} {branch.growth}%
                    </p>
                    <p className="text-xs text-gray-500">{branch.customers} customers</p>
                  </div>
                </div>
                <div className="mt-2 flex gap-4 text-xs text-gray-500">
                  <span>Staff: {branch.staff}</span>
                  <span>Vehicles: {branch.vehicles}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                  <p className="text-xs text-gray-500">{activity.branch}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{activity.date}</p>
                  {activity.amount && (
                    <p className="text-xs font-medium text-green-600">LKR {activity.amount.toLocaleString()}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Analysis</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Average Revenue per Branch</span>
              <span className="text-sm font-medium">LKR {dashboardData.averageRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Top Performing Branch</span>
              <span className="text-sm font-medium text-green-600">{dashboardData.topPerformingBranch}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Revenue Growth</span>
              <span className={`text-sm font-medium ${getGrowthColor(dashboardData.revenueGrowth)}`}>
                {getGrowthIcon(dashboardData.revenueGrowth)} {dashboardData.revenueGrowth}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Customers</span>
              <span className="text-sm font-medium">{dashboardData.totalCustomers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Customer Growth</span>
              <span className={`text-sm font-medium ${getGrowthColor(dashboardData.customerGrowth)}`}>
                {getGrowthIcon(dashboardData.customerGrowth)} {dashboardData.customerGrowth}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg. Customers per Branch</span>
              <span className="text-sm font-medium">{Math.round(dashboardData.totalCustomers / dashboardData.activeBranches)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Operational Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Staff</span>
              <span className="text-sm font-medium">{dashboardData.totalStaff}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Vehicles</span>
              <span className="text-sm font-medium">{dashboardData.totalVehicles}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Vehicle Growth</span>
              <span className={`text-sm font-medium ${getGrowthColor(dashboardData.vehicleGrowth)}`}>
                {getGrowthIcon(dashboardData.vehicleGrowth)} {dashboardData.vehicleGrowth}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors">
            <FaChartBar className="text-2xl mb-2 mx-auto" />
            <span className="text-sm">View Reports</span>
          </button>
          <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors">
            <FaBuilding className="text-2xl mb-2 mx-auto" />
            <span className="text-sm">Manage Branches</span>
          </button>
          <button className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors">
            <FaUsers className="text-2xl mb-2 mx-auto" />
            <span className="text-sm">Staff Management</span>
          </button>
          <button className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 transition-colors">
            <FaDownload className="text-2xl mb-2 mx-auto" />
            <span className="text-sm">Export Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard; 