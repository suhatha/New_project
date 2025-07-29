import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaDownload, FaPrint, FaCalculator, FaSearch, FaFilter } from 'react-icons/fa';

const TrialBalance = () => {
  const [trialBalanceData, setTrialBalanceData] = useState([
    {
      id: 1,
      accountCode: '1001',
      accountName: 'Cash in Hand',
      accountType: 'Asset',
      debitBalance: 125000,
      creditBalance: 0,
      netBalance: 125000,
      balanceType: 'Debit'
    },
    {
      id: 2,
      accountCode: '1002',
      accountName: 'Bank Account',
      accountType: 'Asset',
      debitBalance: 450000,
      creditBalance: 0,
      netBalance: 450000,
      balanceType: 'Debit'
    },
    {
      id: 3,
      accountCode: '1101',
      accountName: 'Accounts Receivable',
      accountType: 'Asset',
      debitBalance: 85000,
      creditBalance: 0,
      netBalance: 85000,
      balanceType: 'Debit'
    },
    {
      id: 4,
      accountCode: '1201',
      accountName: 'Inventory',
      accountType: 'Asset',
      debitBalance: 280000,
      creditBalance: 0,
      netBalance: 280000,
      balanceType: 'Debit'
    },
    {
      id: 5,
      accountCode: '2001',
      accountName: 'Accounts Payable',
      accountType: 'Liability',
      debitBalance: 0,
      creditBalance: 75000,
      netBalance: 75000,
      balanceType: 'Credit'
    },
    {
      id: 6,
      accountCode: '2101',
      accountName: 'Short-term Loans',
      accountType: 'Liability',
      debitBalance: 0,
      creditBalance: 200000,
      netBalance: 200000,
      balanceType: 'Credit'
    },
    {
      id: 7,
      accountCode: '3001',
      accountName: 'Service Revenue',
      accountType: 'Revenue',
      debitBalance: 0,
      creditBalance: 850000,
      netBalance: 850000,
      balanceType: 'Credit'
    },
    {
      id: 8,
      accountCode: '4001',
      accountName: 'Parts Sales',
      accountType: 'Revenue',
      debitBalance: 0,
      creditBalance: 320000,
      netBalance: 320000,
      balanceType: 'Credit'
    },
    {
      id: 9,
      accountCode: '5001',
      accountName: 'Parts Cost',
      accountType: 'Expense',
      debitBalance: 280000,
      creditBalance: 0,
      netBalance: 280000,
      balanceType: 'Debit'
    },
    {
      id: 10,
      accountCode: '5002',
      accountName: 'Salaries & Wages',
      accountType: 'Expense',
      debitBalance: 85000,
      creditBalance: 0,
      netBalance: 85000,
      balanceType: 'Debit'
    },
    {
      id: 11,
      accountCode: '5003',
      accountName: 'Utilities',
      accountType: 'Expense',
      debitBalance: 45000,
      creditBalance: 0,
      netBalance: 45000,
      balanceType: 'Debit'
    },
    {
      id: 12,
      accountCode: '6001',
      accountName: 'Owner\'s Capital',
      accountType: 'Equity',
      debitBalance: 0,
      creditBalance: 2000000,
      netBalance: 2000000,
      balanceType: 'Credit'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterBalance, setFilterBalance] = useState('');

  const accountTypes = ['Asset', 'Liability', 'Revenue', 'Expense', 'Equity'];
  const balanceTypes = ['All', 'Debit', 'Credit'];

  // Calculate totals
  const totalDebits = trialBalanceData.reduce((sum, account) => sum + account.debitBalance, 0);
  const totalCredits = trialBalanceData.reduce((sum, account) => sum + account.creditBalance, 0);
  const difference = totalDebits - totalCredits;
  const isBalanced = difference === 0;

  const filteredAccounts = trialBalanceData.filter(account => {
    const matchesSearch = account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.accountCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !filterType || account.accountType === filterType;
    const matchesBalance = !filterBalance || filterBalance === 'All' || account.balanceType === filterBalance;
    
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

  const getBalanceTypeColor = (type) => {
    switch (type) {
      case 'Debit': return 'bg-blue-100 text-blue-800';
      case 'Credit': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  try {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Trial Balance</h1>
            <p className="text-gray-600">Verify accounting accuracy and balance</p>
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

        {/* Balance Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              {isBalanced ? (
                <FaCheckCircle className="text-green-600 text-4xl" />
              ) : (
                <FaTimesCircle className="text-red-600 text-4xl" />
              )}
              <h2 className="text-2xl font-bold text-gray-800">
                {isBalanced ? 'Trial Balance is Balanced' : 'Trial Balance is Not Balanced'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Debits</p>
                <p className="text-xl font-bold text-blue-600">LKR {totalDebits.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Credits</p>
                <p className="text-xl font-bold text-green-600">LKR {totalCredits.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Difference</p>
                <p className={`text-xl font-bold ${isBalanced ? 'text-green-600' : 'text-red-600'}`}>
                  LKR {difference.toLocaleString()}
                </p>
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
              {balanceTypes.map(type => (
                <option key={type} value={type}>{type} Balance</option>
              ))}
            </select>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
              <FaFilter size={16} />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Trial Balance Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Debit Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance Type</th>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {account.debitBalance > 0 ? `LKR ${account.debitBalance.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {account.creditBalance > 0 ? `LKR ${account.creditBalance.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      LKR {account.netBalance.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getBalanceTypeColor(account.balanceType)}`}>
                        {account.balanceType}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-sm font-semibold text-gray-900">Totals</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600">LKR {totalDebits.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">LKR {totalCredits.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">-</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">-</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCalculator className="text-blue-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Accounts</p>
                <p className="text-2xl font-bold text-gray-900">{trialBalanceData.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCalculator className="text-green-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Debit Accounts</p>
                <p className="text-2xl font-bold text-gray-900">{trialBalanceData.filter(acc => acc.balanceType === 'Debit').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCalculator className="text-purple-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Credit Accounts</p>
                <p className="text-2xl font-bold text-gray-900">{trialBalanceData.filter(acc => acc.balanceType === 'Credit').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCalculator className="text-orange-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Balance Status</p>
                <p className={`text-2xl font-bold ${isBalanced ? 'text-green-600' : 'text-red-600'}`}>
                  {isBalanced ? 'Balanced' : 'Unbalanced'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Analysis */}
        {!isBalanced && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-4">Balance Error Analysis</h3>
            <div className="space-y-2">
              <p className="text-red-700">
                <strong>Difference:</strong> LKR {difference.toLocaleString()}
              </p>
              <p className="text-red-700">
                <strong>Possible Issues:</strong>
              </p>
              <ul className="list-disc list-inside text-red-700 space-y-1 ml-4">
                <li>Missing journal entries</li>
                <li>Incorrect posting of transactions</li>
                <li>Data entry errors</li>
                <li>Unbalanced transactions</li>
                <li>Missing account balances</li>
              </ul>
              <p className="text-red-700 mt-4">
                <strong>Recommendation:</strong> Review all transactions and ensure all journal entries are properly balanced.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error rendering TrialBalance:', error);
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Trial Balance</h1>
        <p className="text-red-600">Error loading trial balance page. Please refresh the page.</p>
      </div>
    );
  }
};

export default TrialBalance; 