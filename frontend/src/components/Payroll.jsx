import React, { useState } from 'react';
import { FaMoneyBillWave, FaCalculator, FaDownload, FaPrint, FaEye, FaEdit, FaCheck, FaTimes, FaSearch, FaFilter, FaUser, FaCalendar, FaFileAlt } from 'react-icons/fa';

const Payroll = () => {
  const [payrollData, setPayrollData] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'John Smith',
      department: 'Service',
      basicSalary: 75000,
      overtimePay: 15000,
      allowances: 5000,
      grossSalary: 95000,
      advancePayment: 10000,
      loanDeduction: 5000,
      taxDeduction: 8000,
      otherDeductions: 2000,
      netSalary: 70000,
      status: 'Paid',
      paymentDate: '2025-07-28'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Sarah Chen',
      department: 'Parts',
      basicSalary: 65000,
      overtimePay: 8000,
      allowances: 4000,
      grossSalary: 77000,
      advancePayment: 5000,
      loanDeduction: 3000,
      taxDeduction: 6000,
      otherDeductions: 1500,
      netSalary: 62500,
      status: 'Paid',
      paymentDate: '2025-07-28'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Mike Wilson',
      department: 'Service',
      basicSalary: 70000,
      overtimePay: 12000,
      allowances: 4500,
      grossSalary: 86500,
      advancePayment: 8000,
      loanDeduction: 4000,
      taxDeduction: 7000,
      otherDeductions: 1800,
      netSalary: 65700,
      status: 'Pending',
      paymentDate: null
    },
    {
      id: 4,
      employeeId: 'EMP004',
      employeeName: 'Alex Davis',
      department: 'Sales',
      basicSalary: 80000,
      overtimePay: 10000,
      allowances: 6000,
      grossSalary: 96000,
      advancePayment: 12000,
      loanDeduction: 6000,
      taxDeduction: 9000,
      otherDeductions: 2500,
      netSalary: 66500,
      status: 'Paid',
      paymentDate: '2025-07-28'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('2025-07');

  const departments = ['Service', 'Parts', 'Sales', 'Admin', 'Management'];
  const statuses = ['Paid', 'Pending', 'Processing', 'Cancelled'];

  const totalEmployees = payrollData.length;
  const totalGrossSalary = payrollData.reduce((sum, payroll) => sum + payroll.grossSalary, 0);
  const totalNetSalary = payrollData.reduce((sum, payroll) => sum + payroll.netSalary, 0);
  const totalDeductions = payrollData.reduce((sum, payroll) => 
    sum + payroll.advancePayment + payroll.loanDeduction + payroll.taxDeduction + payroll.otherDeductions, 0);

  const filteredData = payrollData.filter(payroll => {
    const matchesSearch = payroll.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payroll.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !filterDepartment || payroll.department === filterDepartment;
    const matchesStatus = !filterStatus || payroll.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Monthly Payroll</h1>
          <p className="text-gray-600">Calculate and process monthly salaries with advances, loans & deductions</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <FaCalculator size={16} />
            Calculate Payroll
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
            <FaUser className="text-blue-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{totalEmployees}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaMoneyBillWave className="text-green-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Gross Salary</p>
              <p className="text-2xl font-bold text-gray-900">LKR {totalGrossSalary.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaCalculator className="text-purple-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Net Salary</p>
              <p className="text-2xl font-bold text-gray-900">LKR {totalNetSalary.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaFileAlt className="text-red-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Deductions</p>
              <p className="text-2xl font-bold text-gray-900">LKR {totalDeductions.toLocaleString()}</p>
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
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
            <FaFilter size={16} />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Basic Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overtime</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((payroll) => (
                <tr key={payroll.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{payroll.employeeName}</div>
                      <div className="text-sm text-gray-500">{payroll.employeeId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payroll.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LKR {payroll.basicSalary.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">LKR {payroll.overtimePay.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">LKR {payroll.grossSalary.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>Advance: LKR {payroll.advancePayment.toLocaleString()}</div>
                      <div>Loan: LKR {payroll.loanDeduction.toLocaleString()}</div>
                      <div>Tax: LKR {payroll.taxDeduction.toLocaleString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">LKR {payroll.netSalary.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payroll.status)}`}>
                      {payroll.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FaEye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FaEdit size={16} />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900">
                        <FaPrint size={16} />
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

export default Payroll; 