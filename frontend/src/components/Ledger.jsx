import React, { useState } from 'react';
import { FaBook, FaPlus, FaSearch, FaDownload, FaPrint, FaEye, FaCalendar, FaCalculator, FaChartLine, FaFilter } from 'react-icons/fa';

const Ledger = () => {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      accountCode: '1001',
      accountName: 'Cash in Hand',
      accountType: 'Asset',
      balance: 125000.00,
      transactions: [
        { date: '2025-07-29', description: 'Service payment from Ahmed Khan', debit: 8500, credit: 0, balance: 125000 },
        { date: '2025-07-28', description: 'Parts sale to David Brown', debit: 3200, credit: 0, balance: 116500 },
        { date: '2025-07-27', description: 'Insurance claim received', debit: 25000, credit: 0, balance: 113300 }
      ]
    },
    {
      id: 2,
      accountCode: '1002',
      accountName: 'Bank Account',
      accountType: 'Asset',
      balance: 450000.00,
      transactions: [
        { date: '2025-07-29', description: 'Bank transfer from customer', debit: 15000, credit: 0, balance: 450000 },
        { date: '2025-07-28', description: 'Payment to Toyota Lanka', debit: 0, credit: 125000, balance: 435000 },
        { date: '2025-07-27', description: 'Salary payment', debit: 0, credit: 85000, balance: 560000 }
      ]
    },
    {
      id: 3,
      accountCode: '2001',
      accountName: 'Accounts Payable',
      accountType: 'Liability',
      balance: 75000.00,
      transactions: [
        { date: '2025-07-29', description: 'Invoice from Honda Lanka', debit: 0, credit: 75000, balance: 75000 },
        { date: '2025-07-28', description: 'Payment to supplier', debit: 125000, credit: 0, balance: 0 },
        { date: '2025-07-27', description: 'Invoice from parts supplier', debit: 0, credit: 125000, balance: 125000 }
      ]
    },
    {
      id: 4,
      accountCode: '3001',
      accountName: 'Service Revenue',
      accountType: 'Revenue',
      balance: 850000.00,
      transactions: [
        { date: '2025-07-29', description: 'Major service for Toyota Corolla', debit: 0, credit: 8500, balance: 850000 },
        { date: '2025-07-28', description: 'Brake service for Honda Civic', debit: 0, credit: 3200, balance: 841500 },
        { date: '2025-07-27', description: 'Oil change service', debit: 0, credit: 2500, balance: 838300 }
      ]
    },
    {
      id: 5,
      accountCode: '4001',
      accountName: 'Parts Sales',
      accountType: 'Revenue',
      balance: 320000.00,
      transactions: [
        { date: '2025-07-29', description: 'Brake pads sale', debit: 0, credit: 3200, balance: 320000 },
        { date: '2025-07-28', description: 'Engine oil sale', debit: 0, credit: 1800, balance: 316800 },
        { date: '2025-07-27', description: 'Air filter sale', debit: 0, credit: 1200, balance: 315000 }
      ]
    },
    {
      id: 6,
      accountCode: '5001',
      accountName: 'Parts Cost',
      accountType: 'Expense',
      balance: 280000.00,
      transactions: [
        { date: '2025-07-29', description: 'Purchase from Toyota Lanka', debit: 125000, credit: 0, balance: 280000 },
        { date: '2025-07-28', description: 'Purchase from Honda Lanka', debit: 75000, credit: 0, balance: 155000 },
        { date: '2025-07-27', description: 'Purchase from parts supplier', debit: 80000, credit: 0, balance: 80000 }
      ]
    },
    {
      id: 7,
      accountCode: '5002',
      accountName: 'Salaries & Wages',
      accountType: 'Expense',
      balance: 85000.00,
      transactions: [
        { date: '2025-07-29', description: 'Monthly salary payment', debit: 85000, credit: 0, balance: 85000 },
        { date: '2025-06-29', description: 'Monthly salary payment', debit: 85000, credit: 0, balance: 0 },
        { date: '2025-05-29', description: 'Monthly salary payment', debit: 85000, credit: 0, balance: 0 }
      ]
    },
    {
      id: 8,
      accountCode: '5003',
      accountName: 'Utilities',
      accountType: 'Expense',
      balance: 45000.00,
      transactions: [
        { date: '2025-07-29', description: 'Electricity bill', debit: 45000, credit: 0, balance: 45000 },
        { date: '2025-06-29', description: 'Electricity bill', debit: 42000, credit: 0, balance: 0 },
        { date: '2025-05-29', description: 'Electricity bill', debit: 38000, credit: 0, balance: 0 }
      ]
    }
  ]);

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterBalance, setFilterBalance] = useState('');

  const accountTypes = ['Asset', 'Liability', 'Revenue', 'Expense', 'Equity'];
  const balanceFilters = ['All', 'Debit', 'Credit', 'Zero'];

  const handleViewDetails = (account) => {
    try {
      setSelectedAccount(account);
      setShowDetailsModal(true);
    } catch (error) {
      console.error('Error viewing details:', error);
    }
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.accountCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !filterType || account.accountType === filterType;
    
    let matchesBalance = true;
    if (filterBalance === 'Debit') matchesBalance = account.balance > 0;
    else if (filterBalance === 'Credit') matchesBalance = account.balance < 0;
    else if (filterBalance === 'Zero') matchesBalance = account.balance === 0;
    
    return matchesSearch && matchesType && matchesBalance;
  });

  const getAccountTypeColor = (type) => {
    switch (type) {
      case 'Asset': return 'bg-green-100 text-green-800';
      case 'Liability': return 'bg-red-100 text-red-800';
      case 'Revenue': return 'bg-blue-100 text-blue-800';
      case 'Expense': return 'bg-orange-100 text-orange-800';
      case 'Equity': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBalanceColor = (balance) => {
    if (balance > 0) return 'text-green-600';
    if (balance < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const totalAssets = accounts.filter(acc => acc.accountType === 'Asset').reduce((sum, acc) => sum + acc.balance, 0);
  const totalLiabilities = accounts.filter(acc => acc.accountType === 'Liability').reduce((sum, acc) => sum + Math.abs(acc.balance), 0);
  const totalRevenue = accounts.filter(acc => acc.accountType === 'Revenue').reduce((sum, acc) => sum + acc.balance, 0);
  const totalExpenses = accounts.filter(acc => acc.accountType === 'Expense').reduce((sum, acc) => sum + acc.balance, 0);

  try {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">General Ledger</h1>
            <p className="text-gray-600">Master record of all financial transactions and account balances</p>
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

        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCalculator className="text-green-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold text-gray-900">LKR {totalAssets.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCalculator className="text-red-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Liabilities</p>
                <p className="text-2xl font-bold text-gray-900">LKR {totalLiabilities.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCalculator className="text-blue-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">LKR {totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCalculator className="text-orange-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900">LKR {totalExpenses.toLocaleString()}</p>
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
                placeholder="Search accounts..."
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
              {accountTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select
              value={filterBalance}
              onChange={(e) => setFilterBalance(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {balanceFilters.map(filter => (
                <option key={filter} value={filter}>{filter} Balance</option>
              ))}
            </select>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
              <FaFilter size={16} />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Accounts Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{account.accountCode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.accountName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getAccountTypeColor(account.accountType)}`}>
                        {account.accountType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${getBalanceColor(account.balance)}`}>
                        LKR {account.balance.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(account)}
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

        {/* Account Details Modal */}
        {showDetailsModal && selectedAccount && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Account Details - {selectedAccount.accountName}</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Account Information */}
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Account Information</h4>
                  <div className="space-y-2">
                    <div><strong>Account Code:</strong> {selectedAccount.accountCode}</div>
                    <div><strong>Account Name:</strong> {selectedAccount.accountName}</div>
                    <div><strong>Account Type:</strong> {selectedAccount.accountType}</div>
                    <div><strong>Current Balance:</strong> LKR {selectedAccount.balance.toLocaleString()}</div>
                  </div>
                </div>

                {/* Balance Summary */}
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Balance Summary</h4>
                  <div className="space-y-2">
                    <div><strong>Total Debits:</strong> LKR {selectedAccount.transactions.reduce((sum, t) => sum + t.debit, 0).toLocaleString()}</div>
                    <div><strong>Total Credits:</strong> LKR {selectedAccount.transactions.reduce((sum, t) => sum + t.credit, 0).toLocaleString()}</div>
                    <div><strong>Net Balance:</strong> LKR {selectedAccount.balance.toLocaleString()}</div>
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
                      <FaChartLine size={16} />
                      View Chart
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
                      {selectedAccount.transactions.map((transaction, index) => (
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
    console.error('Error rendering Ledger:', error);
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">General Ledger</h1>
        <p className="text-red-600">Error loading ledger page. Please refresh the page.</p>
      </div>
    );
  }
};

export default Ledger; 