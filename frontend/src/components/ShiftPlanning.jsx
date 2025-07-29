import React, { useState } from 'react';
import { FaCalendar, FaClock, FaUser, FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaSearch, FaFilter, FaDownload, FaPrint, FaExchangeAlt } from 'react-icons/fa';

const ShiftPlanning = () => {
  const [shifts, setShifts] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'John Smith',
      department: 'Service',
      shiftType: 'Morning',
      startTime: '08:00',
      endTime: '17:00',
      date: '2025-07-29',
      regularHours: 8,
      overtimeHours: 1,
      status: 'Active',
      location: 'Main Workshop'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Sarah Chen',
      department: 'Parts',
      shiftType: 'Morning',
      startTime: '07:30',
      endTime: '16:30',
      date: '2025-07-29',
      regularHours: 8,
      overtimeHours: 0.5,
      status: 'Active',
      location: 'Parts Store'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Mike Wilson',
      department: 'Service',
      shiftType: 'Evening',
      startTime: '14:00',
      endTime: '23:00',
      date: '2025-07-29',
      regularHours: 8,
      overtimeHours: 1,
      status: 'Active',
      location: 'Main Workshop'
    },
    {
      id: 4,
      employeeId: 'EMP004',
      employeeName: 'Alex Davis',
      department: 'Sales',
      shiftType: 'Morning',
      startTime: '09:00',
      endTime: '18:00',
      date: '2025-07-29',
      regularHours: 8,
      overtimeHours: 1,
      status: 'Pending',
      location: 'Showroom'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterShiftType, setFilterShiftType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const departments = ['Service', 'Parts', 'Sales', 'Admin', 'Management'];
  const shiftTypes = ['Morning', 'Evening', 'Night', 'Split'];
  const statuses = ['Active', 'Pending', 'Completed', 'Cancelled'];

  const totalShifts = shifts.length;
  const activeShifts = shifts.filter(s => s.status === 'Active').length;
  const totalOvertime = shifts.reduce((sum, shift) => sum + shift.overtimeHours, 0);
  const totalRegularHours = shifts.reduce((sum, shift) => sum + shift.regularHours, 0);

  const filteredShifts = shifts.filter(shift => {
    const matchesSearch = shift.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shift.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !filterDepartment || shift.department === filterDepartment;
    const matchesShiftType = !filterShiftType || shift.shiftType === filterShiftType;
    const matchesStatus = !filterStatus || shift.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesShiftType && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getShiftTypeColor = (type) => {
    switch (type) {
      case 'Morning': return 'bg-blue-100 text-blue-800';
      case 'Evening': return 'bg-purple-100 text-purple-800';
      case 'Night': return 'bg-gray-100 text-gray-800';
      case 'Split': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Shift Planning & Overtime Tracking</h1>
          <p className="text-gray-600">Manage work schedules and track overtime hours</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <FaPlus size={16} />
            New Shift
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
            <FaDownload size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaCalendar className="text-blue-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Shifts</p>
              <p className="text-2xl font-bold text-gray-900">{totalShifts}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaCheck className="text-green-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Active Shifts</p>
              <p className="text-2xl font-bold text-gray-900">{activeShifts}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaClock className="text-yellow-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Overtime</p>
              <p className="text-2xl font-bold text-gray-900">{totalOvertime}h</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaUser className="text-purple-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Regular Hours</p>
              <p className="text-2xl font-bold text-gray-900">{totalRegularHours}h</p>
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
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select
            value={filterShiftType}
            onChange={(e) => setFilterShiftType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Shift Types</option>
            {shiftTypes.map(type => (
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
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
            <FaFilter size={16} />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Shifts Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overtime</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredShifts.map((shift) => (
                <tr key={shift.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{shift.employeeName}</div>
                      <div className="text-sm text-gray-500">{shift.employeeId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getShiftTypeColor(shift.shiftType)}`}>
                      {shift.shiftType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{shift.startTime} - {shift.endTime}</div>
                    <div className="text-xs text-gray-500">{shift.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{shift.regularHours}h</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift.overtimeHours}h</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(shift.status)}`}>
                      {shift.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FaEdit size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FaCheck size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FaTimes size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShiftPlanning; 