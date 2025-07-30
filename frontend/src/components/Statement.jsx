import React, { useState } from 'react';
import { FaFileAlt, FaSearch, FaDownload, FaPrint, FaEye, FaCalendar, FaUser, FaBuilding, FaFilter } from 'react-icons/fa';

const Statement = () => {
  const [statements, setStatements] = useState([
    {
      id: 1,
      statementType: 'Customer Statement',
      accountName: 'Ahmed Khan',
      accountType: 'Customer',
      period: 'July 2025',
      openingBalance: 0,
      totalDebits: 8500,
      totalCredits: 8500,
      closingBalance: 0,
      status: 'Current',
      lastUpdated: '2025-07-29',
      transactions: [
        { date: '2025-07-29', description: 'Major service for Toyota Corolla', debit: 8500, credit: 0, balance: 8500 },
        { date: '2025-07-29', description: 'Payment received', debit: 0, credit: 8500, balance: 0 }
      ]
    },
    {
      id: 2,
      statementType: 'Supplier Statement',
      accountName: 'Toyota Lanka (Pvt) Ltd',
      accountType: 'Supplier',
      period: 'July 2025',
      openingBalance: 0,
      totalDebits: 125000,
      totalCredits: 125000,
      closingBalance: 0,
      status: 'Paid',
      lastUpdated: '2025-07-28',
      transactions: [
        { date: '2025-07-28', description: 'Engine parts and filters', debit: 0, credit: 125000, balance: 125000 },
        { date: '2025-07-28', description: 'Payment made', debit: 125000, credit: 0, balance: 0 }
      ]
    },
    {
      id: 3,
      statementType: 'Bank Statement',
      accountName: 'Commercial Bank - Main Account',
      accountType: 'Bank',
      period: 'July 2025',
      openingBalance: 500000,
      totalDebits: 15000,
      totalCredits: 125000,
      closingBalance: 450000,
      status: 'Reconciled',
      lastUpdated: '2025-07-29',
      transactions: [
        { date: '2025-07-29', description: 'Customer payment received', debit: 15000, credit: 0, balance: 515000 },
        { date: '2025-07-28', description: 'Payment to supplier', debit: 0, credit: 125000, balance: 500000 },
        { date: '2025-07-27', description: 'Salary payment', debit: 0, credit: 85000, balance: 585000 }
      ]
    },
    {
      id: 4,
      statementType: 'Customer Statement',
      accountName: 'David Brown',
      accountType: 'Customer',
      period: 'July 2025',
      openingBalance: 0,
      totalDebits: 3200,
      totalCredits: 3200,
      closingBalance: 0,
      status: 'Current',
      lastUpdated: '2025-07-28',
      transactions: [
        { date: '2025-07-28', description: 'Brake pads and brake fluid', debit: 3200, credit: 0, balance: 3200 },
        { date: '2025-07-28', description: 'Payment received', debit: 0, credit: 3200, balance: 0 }
      ]
    }
  ]);

  const [selectedStatement, setSelectedStatement] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const statementTypes = ['Customer Statement', 'Supplier Statement', 'Bank Statement', 'Account Statement'];
  const accountTypes = ['Customer', 'Supplier', 'Bank', 'Employee', 'Other'];
  const statuses = ['Current', 'Paid', 'Overdue', 'Reconciled', 'Pending'];

  const handleViewDetails = (statement) => {
    try {
      setSelectedStatement(statement);
      setShowDetailsModal(true);
    } catch (error) {
      console.error('Error viewing details:', error);
    }
  };

  const filteredStatements = statements.filter(statement => {
    const matchesSearch = statement.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         statement.statementType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !filterType || statement.statementType === filterType;
    const matchesStatus = !filterStatus || statement.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Current': return 'bg-green-100 text-green-800';
      case 'Paid': return 'bg-blue-100 text-blue-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Reconciled': return 'bg-purple-100 text-purple-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccountTypeColor = (type) => {
    switch (type) {
      case 'Customer': return 'bg-blue-100 text-blue-800';
      case 'Supplier': return 'bg-orange-100 text-orange-800';
      case 'Bank': return 'bg-green-100 text-green-800';
      case 'Employee': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalStatements = statements.length;
  const currentStatements = statements.filter(s => s.status === 'Current').length;
  const overdueStatements = statements.filter(s => s.status === 'Overdue').length;
  const reconciledStatements = statements.filter(s => s.status === 'Reconciled').length;

  try {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Account Statements</h1>
            <p className="text-gray-600">Generate and manage account-specific financial reports</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
              <FaDownload size={16} />
              Export
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
              <FaPrint size={16} />
              Print
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaFileAlt className="text-blue-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Statements</p>
                <p className="text-2xl font-bold text-gray-900">{totalStatements}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaFileAlt className="text-green-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Current</p>
                <p className="text-2xl font-bold text-gray-900">{currentStatements}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaFileAlt className="text-red-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-gray-900">{overdueStatements}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaFileAlt className="text-purple-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Reconciled</p>
                <p className="text-2xl font-bold text-gray-900">{reconciledStatements}</p>
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
                placeholder="Search statements..."
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
              {statementTypes.map(type => (
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
              Clear Filters
            </button>
          </div>
        </div>

        {/* Statements Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statement Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStatements.map((statement) => (
                  <tr key={statement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{statement.statementType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{statement.accountName}</div>
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getAccountTypeColor(statement.accountType)}`}>
                          {statement.accountType}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{statement.period}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">LKR {statement.closingBalance.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">
                        Debits: {statement.totalDebits.toLocaleString()} | Credits: {statement.totalCredits.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(statement.status)}`}>
                        {statement.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(statement)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="View Details"
                        >
                          <FaEye size={16} />
                        </button>
                        <button className="text-green-600 hover:text-green-800 p-1" title="Print Statement">
                          <FaPrint size={16} />
                        </button>
                        <button className="text-purple-600 hover:text-purple-800 p-1" title="Download PDF">
                          <FaDownload size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Statement Details Modal */}
        {showDetailsModal && selectedStatement && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Statement Details - {selectedStatement.statementType}</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Statement Information */}
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Statement Information</h4>
                  <div className="space-y-2">
                    <div><strong>Statement Type:</strong> {selectedStatement.statementType}</div>
                    <div><strong>Account Name:</strong> {selectedStatement.accountName}</div>
                    <div><strong>Account Type:</strong> {selectedStatement.accountType}</div>
                    <div><strong>Period:</strong> {selectedStatement.period}</div>
                    <div><strong>Status:</strong> {selectedStatement.status}</div>
                    <div><strong>Last Updated:</strong> {selectedStatement.lastUpdated}</div>
                  </div>
                </div>

                {/* Balance Summary */}
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Balance Summary</h4>
                  <div className="space-y-2">
                    <div><strong>Opening Balance:</strong> LKR {selectedStatement.openingBalance.toLocaleString()}</div>
                    <div><strong>Total Debits:</strong> LKR {selectedStatement.totalDebits.toLocaleString()}</div>
                    <div><strong>Total Credits:</strong> LKR {selectedStatement.totalCredits.toLocaleString()}</div>
                    <div><strong>Closing Balance:</strong> LKR {selectedStatement.closingBalance.toLocaleString()}</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <FaPrint size={16} />
                      Print Statement
                    </button>
                    <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2">
                      <FaDownload size={16} />
                      Download PDF
                    </button>
                    <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2">
                      <FaFileAlt size={16} />
                      Email Statement
                    </button>
                  </div>
                </div>
              </div>

              {/* Transaction History */}
              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-3">Transaction History</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Debit</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Credit</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedStatement.transactions.map((transaction, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm text-gray-900">{transaction.date}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{transaction.description}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {transaction.debit > 0 ? `LKR ${transaction.debit.toLocaleString()}` : '-'}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {transaction.credit > 0 ? `LKR ${transaction.credit.toLocaleString()}` : '-'}
                          </td>
                          <td className="px-4 py-2 text-sm font-medium text-gray-900">
                            LKR {transaction.balance.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error rendering Statement:', error);
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Account Statements</h1>
        <p className="text-red-600">Error loading statements page. Please refresh the page.</p>
      </div>
    );
  }
};

export default Statement; 