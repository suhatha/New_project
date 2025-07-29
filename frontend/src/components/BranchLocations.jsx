import React, { useState } from 'react';
import { FaBuilding, FaMapMarkerAlt, FaUsers, FaChartLine, FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter, FaDownload, FaPrint, FaPhone, FaEnvelope, FaGlobe } from 'react-icons/fa';

const BranchLocations = () => {
  const [branches, setBranches] = useState([
    {
      id: 1,
      branchCode: 'BR001',
      branchName: 'IMSS AutoSuite - Main Branch',
      type: 'Owned',
      address: '123 Main Street, Colombo 03',
      city: 'Colombo',
      phone: '+94 11 234 5678',
      email: 'main@imssautosuite.lk',
      manager: 'John Smith',
      staffCount: 25,
      status: 'Active',
      revenue: 2500000,
      customers: 450,
      vehicles: 120,
      established: '2020-01-15',
      franchiseFee: 0,
      monthlyTarget: 3000000
    },
    {
      id: 2,
      branchCode: 'BR002',
      branchName: 'IMSS AutoSuite - Kandy Branch',
      type: 'Franchise',
      address: '456 Peradeniya Road, Kandy',
      city: 'Kandy',
      phone: '+94 81 234 5678',
      email: 'kandy@imssautosuite.lk',
      manager: 'Sarah Chen',
      staffCount: 18,
      status: 'Active',
      revenue: 1800000,
      customers: 320,
      vehicles: 85,
      established: '2021-03-20',
      franchiseFee: 500000,
      monthlyTarget: 2000000
    },
    {
      id: 3,
      branchCode: 'BR003',
      branchName: 'IMSS AutoSuite - Galle Branch',
      type: 'Franchise',
      address: '789 Galle Road, Galle',
      city: 'Galle',
      phone: '+94 91 234 5678',
      email: 'galle@imssautosuite.lk',
      manager: 'Mike Wilson',
      staffCount: 15,
      status: 'Active',
      revenue: 1200000,
      customers: 280,
      vehicles: 65,
      established: '2022-06-10',
      franchiseFee: 400000,
      monthlyTarget: 1500000
    },
    {
      id: 4,
      branchCode: 'BR004',
      branchName: 'IMSS AutoSuite - Jaffna Branch',
      type: 'Franchise',
      address: '321 Jaffna Road, Jaffna',
      city: 'Jaffna',
      phone: '+94 21 234 5678',
      email: 'jaffna@imssautosuite.lk',
      manager: 'Alex Davis',
      staffCount: 12,
      status: 'Planning',
      revenue: 0,
      customers: 0,
      vehicles: 0,
      established: '2025-08-01',
      franchiseFee: 300000,
      monthlyTarget: 1000000
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const branchTypes = ['Owned', 'Franchise', 'Joint Venture'];
  const statuses = ['Active', 'Planning', 'Suspended', 'Closed'];
  const cities = ['Colombo', 'Kandy', 'Galle', 'Jaffna', 'Anuradhapura', 'Matara'];

  const totalBranches = branches.length;
  const activeBranches = branches.filter(b => b.status === 'Active').length;
  const totalRevenue = branches.reduce((sum, branch) => sum + branch.revenue, 0);
  const totalStaff = branches.reduce((sum, branch) => sum + branch.staffCount, 0);

  const filteredBranches = branches.filter(branch => {
    const matchesSearch = branch.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.branchCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || branch.type === filterType;
    const matchesStatus = !filterStatus || branch.status === filterStatus;
    const matchesCity = !filterCity || branch.city === filterCity;
    
    return matchesSearch && matchesType && matchesStatus && matchesCity;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Planning': return 'bg-yellow-100 text-yellow-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Owned': return 'bg-blue-100 text-blue-800';
      case 'Franchise': return 'bg-purple-100 text-purple-800';
      case 'Joint Venture': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Branch Locations & Franchises</h1>
          <p className="text-gray-600">Manage unlimited locations and franchise operations</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <FaPlus size={16} />
            Add Branch
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
            <FaDownload size={16} />
            Export
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition-colors">
            <FaPrint size={16} />
            Print Report
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaBuilding className="text-blue-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Branches</p>
              <p className="text-2xl font-bold text-gray-900">{totalBranches}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaChartLine className="text-green-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Active Branches</p>
              <p className="text-2xl font-bold text-gray-900">{activeBranches}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaUsers className="text-purple-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Staff</p>
              <p className="text-2xl font-bold text-gray-900">{totalStaff}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaGlobe className="text-orange-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">LKR {totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search branches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Types</option>
            {branchTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Cities</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
            <FaFilter size={16} />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Branches Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBranches.map((branch) => (
                <tr key={branch.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{branch.branchName}</div>
                      <div className="text-sm text-gray-500">{branch.branchCode}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{branch.city}</div>
                      <div className="text-xs text-gray-500">{branch.address}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(branch.type)}`}>
                      {branch.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{branch.manager}</div>
                    <div className="text-xs text-gray-500">{branch.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{branch.staffCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">LKR {branch.revenue.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{branch.customers} customers</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(branch.status)}`}>
                      {branch.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedBranch(branch)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FaEdit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Branch Details Modal */}
      {selectedBranch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Branch Details</h2>
              <button
                onClick={() => setSelectedBranch(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Basic Information</h3>
                <div className="space-y-2">
                  <div><strong>Branch Code:</strong> {selectedBranch.branchCode}</div>
                  <div><strong>Branch Name:</strong> {selectedBranch.branchName}</div>
                  <div><strong>Type:</strong> {selectedBranch.type}</div>
                  <div><strong>Status:</strong> {selectedBranch.status}</div>
                  <div><strong>Established:</strong> {selectedBranch.established}</div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div><strong>Address:</strong> {selectedBranch.address}</div>
                  <div><strong>City:</strong> {selectedBranch.city}</div>
                  <div><strong>Phone:</strong> {selectedBranch.phone}</div>
                  <div><strong>Email:</strong> {selectedBranch.email}</div>
                  <div><strong>Manager:</strong> {selectedBranch.manager}</div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Performance Metrics</h3>
                <div className="space-y-2">
                  <div><strong>Staff Count:</strong> {selectedBranch.staffCount}</div>
                  <div><strong>Revenue:</strong> LKR {selectedBranch.revenue.toLocaleString()}</div>
                  <div><strong>Customers:</strong> {selectedBranch.customers}</div>
                  <div><strong>Vehicles:</strong> {selectedBranch.vehicles}</div>
                  <div><strong>Monthly Target:</strong> LKR {selectedBranch.monthlyTarget.toLocaleString()}</div>
                </div>
              </div>

              {/* Financial Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Financial Information</h3>
                <div className="space-y-2">
                  <div><strong>Franchise Fee:</strong> LKR {selectedBranch.franchiseFee.toLocaleString()}</div>
                  <div><strong>Revenue Achievement:</strong> {((selectedBranch.revenue / selectedBranch.monthlyTarget) * 100).toFixed(1)}%</div>
                  <div><strong>Average Revenue per Customer:</strong> LKR {selectedBranch.customers > 0 ? (selectedBranch.revenue / selectedBranch.customers).toLocaleString() : '0'}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Edit Branch
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                View Reports
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                Manage Staff
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchLocations; 