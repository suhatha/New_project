import React, { useState } from 'react';
import { FaUser, FaClock, FaMapMarkerAlt, FaMobile, FaFingerprint, FaEye, FaDownload, FaPrint, FaCalendar, FaCheck, FaTimes, FaSearch, FaFilter, FaPlus } from 'react-icons/fa';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'John Smith',
      department: 'Service',
      date: '2025-07-29',
      clockIn: '08:00',
      clockOut: '17:00',
      totalHours: 9,
      overtime: 1,
      method: 'Biometric',
      location: 'Main Workshop',
      status: 'Present',
      lateMinutes: 0
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Sarah Chen',
      department: 'Parts',
      date: '2025-07-29',
      clockIn: '07:45',
      clockOut: '16:30',
      totalHours: 8.75,
      overtime: 0,
      method: 'Mobile App',
      location: 'Parts Store',
      status: 'Present',
      lateMinutes: 0
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Mike Wilson',
      department: 'Service',
      date: '2025-07-29',
      clockIn: '08:15',
      clockOut: '17:30',
      totalHours: 9.25,
      overtime: 1.25,
      method: 'Biometric',
      location: 'Main Workshop',
      status: 'Present',
      lateMinutes: 15
    },
    {
      id: 4,
      employeeId: 'EMP004',
      employeeName: 'Alex Davis',
      department: 'Sales',
      date: '2025-07-29',
      clockIn: null,
      clockOut: null,
      totalHours: 0,
      overtime: 0,
      method: null,
      location: null,
      status: 'Absent',
      lateMinutes: 0
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('2025-07-29');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAttendance, setNewAttendance] = useState({
    employeeId: '',
    employeeName: '',
    department: '',
    date: new Date().toISOString().split('T')[0],
    clockIn: '',
    clockOut: '',
    method: 'Biometric',
    location: '',
    status: 'Present'
  });

  // Available employees for selection
  const availableEmployees = [
    { id: 'EMP001', name: 'John Smith', department: 'Service' },
    { id: 'EMP002', name: 'Sarah Chen', department: 'Parts' },
    { id: 'EMP003', name: 'Mike Wilson', department: 'Service' },
    { id: 'EMP004', name: 'Alex Davis', department: 'Sales' },
    { id: 'EMP005', name: 'David Brown', department: 'Admin' },
    { id: 'EMP006', name: 'Maria Silva', department: 'Management' }
  ];

  const departments = ['Service', 'Parts', 'Sales', 'Admin', 'Management'];
  const statuses = ['Present', 'Absent', 'Late', 'Half Day', 'Leave'];
  const methods = ['Biometric', 'Mobile App'];
  const locations = ['Main Workshop', 'Parts Store', 'Showroom', 'Admin Office', 'Service Bay 1', 'Service Bay 2'];

  const totalEmployees = attendanceData.length;
  const presentEmployees = attendanceData.filter(a => a.status === 'Present').length;
  const absentEmployees = attendanceData.filter(a => a.status === 'Absent').length;
  const lateEmployees = attendanceData.filter(a => a.lateMinutes > 0).length;

  const filteredData = attendanceData.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !filterDepartment || record.department === filterDepartment;
    const matchesStatus = !filterStatus || record.status === filterStatus;
    const matchesDate = record.date === filterDate;
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesDate;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Absent': return 'bg-red-100 text-red-800';
      case 'Late': return 'bg-yellow-100 text-yellow-800';
      case 'Half Day': return 'bg-orange-100 text-orange-800';
      case 'Leave': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method) => {
    return method === 'Biometric' ? FaFingerprint : FaMobile;
  };

  const handleEmployeeSelect = (employeeId) => {
    const employee = availableEmployees.find(emp => emp.id === employeeId);
    if (employee) {
      setNewAttendance(prev => ({
        ...prev,
        employeeId: employee.id,
        employeeName: employee.name,
        department: employee.department
      }));
    }
  };

  const calculateHours = (clockIn, clockOut) => {
    if (!clockIn || !clockOut) return 0;
    
    const start = new Date(`2000-01-01T${clockIn}`);
    const end = new Date(`2000-01-01T${clockOut}`);
    const diffMs = end - start;
    const diffHours = diffMs / (1000 * 60 * 60);
    
    return Math.max(0, diffHours);
  };

  const calculateOvertime = (totalHours) => {
    const regularHours = 8;
    return Math.max(0, totalHours - regularHours);
  };

  const calculateLateMinutes = (clockIn) => {
    if (!clockIn) return 0;
    
    const startTime = new Date(`2000-01-01T${clockIn}`);
    const expectedTime = new Date(`2000-01-01T08:00`);
    const diffMs = startTime - expectedTime;
    const diffMinutes = diffMs / (1000 * 60);
    
    return Math.max(0, diffMinutes);
  };

  const handleAddAttendance = () => {
    const totalHours = calculateHours(newAttendance.clockIn, newAttendance.clockOut);
    const overtime = calculateOvertime(totalHours);
    const lateMinutes = calculateLateMinutes(newAttendance.clockIn);

    const newRecord = {
      id: attendanceData.length + 1,
      ...newAttendance,
      totalHours,
      overtime,
      lateMinutes,
      status: newAttendance.status
    };

    setAttendanceData(prev => [...prev, newRecord]);
    setShowAddModal(false);
    setNewAttendance({
      employeeId: '',
      employeeName: '',
      department: '',
      date: new Date().toISOString().split('T')[0],
      clockIn: '',
      clockOut: '',
      method: 'Biometric',
      location: '',
      status: 'Present'
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Attendance Management</h1>
          <p className="text-gray-600">Track employee attendance via biometric and mobile app</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <FaPlus size={16} />
            Add Attendance
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
            <FaDownload size={16} />
            Export Report
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
            <FaUser className="text-blue-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{totalEmployees}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaCheck className="text-green-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Present Today</p>
              <p className="text-2xl font-bold text-gray-900">{presentEmployees}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaTimes className="text-red-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Absent Today</p>
              <p className="text-2xl font-bold text-gray-900">{absentEmployees}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaClock className="text-yellow-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Late Today</p>
              <p className="text-2xl font-bold text-gray-900">{lateEmployees}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overtime</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((record) => {
                const MethodIcon = getMethodIcon(record.method);
                return (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                        <div className="text-sm text-gray-500">{record.employeeId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{record.clockIn || 'Not clocked in'}</div>
                      {record.lateMinutes > 0 && (
                        <div className="text-xs text-red-600">+{record.lateMinutes} min late</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.clockOut || 'Not clocked out'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.totalHours}h</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.overtime}h</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {record.method ? (
                        <div className="flex items-center gap-2">
                          <MethodIcon className="text-blue-600" />
                          <span className="text-sm text-gray-900">{record.method}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Attendance Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Add New Attendance</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Employee Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Employee
                </label>
                <select
                  value={newAttendance.employeeId}
                  onChange={(e) => handleEmployeeSelect(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose an employee...</option>
                  {availableEmployees.map(employee => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name} ({employee.id}) - {employee.department}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={newAttendance.date}
                  onChange={(e) => setNewAttendance(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Clock In Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clock In Time
                </label>
                <input
                  type="time"
                  value={newAttendance.clockIn}
                  onChange={(e) => setNewAttendance(prev => ({ ...prev, clockIn: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Clock Out Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clock Out Time
                </label>
                <input
                  type="time"
                  value={newAttendance.clockOut}
                  onChange={(e) => setNewAttendance(prev => ({ ...prev, clockOut: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Method
                </label>
                <select
                  value={newAttendance.method}
                  onChange={(e) => setNewAttendance(prev => ({ ...prev, method: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {methods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={newAttendance.location}
                  onChange={(e) => setNewAttendance(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select location...</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={newAttendance.status}
                  onChange={(e) => setNewAttendance(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddAttendance}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Attendance
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance; 