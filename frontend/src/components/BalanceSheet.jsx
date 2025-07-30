import React, { useState } from 'react';
import { FaBalanceScale, FaDownload, FaPrint, FaCalendar, FaCalculator, FaBuilding, FaMoneyBillWave } from 'react-icons/fa';

const BalanceSheet = () => {
  const [balanceSheetData, setBalanceSheetData] = useState({
    asOfDate: '2025-07-29',
    assets: {
      currentAssets: {
        cashInHand: 125000,
        bankAccount: 450000,
        accountsReceivable: 85000,
        inventory: 280000,
        prepaidExpenses: 15000,
        totalCurrentAssets: 955000
      },
      fixedAssets: {
        equipment: 500000,
        vehicles: 800000,
        building: 2000000,
        accumulatedDepreciation: -300000,
        totalFixedAssets: 3000000
      },
      totalAssets: 3955000
    },
    liabilities: {
      currentLiabilities: {
        accountsPayable: 75000,
        shortTermLoans: 200000,
        accruedExpenses: 25000,
        totalCurrentLiabilities: 300000
      },
      longTermLiabilities: {
        longTermLoans: 1000000,
        totalLongTermLiabilities: 1000000
      },
      totalLiabilities: 1300000
    },
    equity: {
      ownerCapital: 2000000,
      retainedEarnings: 655000,
      totalEquity: 2655000
    }
  });

  const [selectedDate, setSelectedDate] = useState('2025-07-29');

  // Calculate ratios
  const currentRatio = balanceSheetData.assets.currentAssets.totalCurrentAssets / balanceSheetData.liabilities.currentLiabilities.totalCurrentLiabilities;
  const debtToEquityRatio = balanceSheetData.liabilities.totalLiabilities / balanceSheetData.equity.totalEquity;
  const workingCapital = balanceSheetData.assets.currentAssets.totalCurrentAssets - balanceSheetData.liabilities.currentLiabilities.totalCurrentLiabilities;

  try {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Balance Sheet</h1>
            <p className="text-gray-600">Financial position as of {balanceSheetData.asOfDate}</p>
          </div>
          <div className="flex gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaBuilding className="text-green-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold text-gray-900">LKR {balanceSheetData.assets.totalAssets.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaBalanceScale className="text-red-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Liabilities</p>
                <p className="text-2xl font-bold text-gray-900">LKR {balanceSheetData.liabilities.totalLiabilities.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaMoneyBillWave className="text-blue-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Equity</p>
                <p className="text-2xl font-bold text-gray-900">LKR {balanceSheetData.equity.totalEquity.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Balance Sheet Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Assets */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaBuilding className="text-green-600" />
                Assets
              </h3>
              
              {/* Current Assets */}
              <div className="mb-4">
                <h4 className="text-md font-semibold text-gray-700 mb-3">Current Assets</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cash in Hand</span>
                    <span className="font-medium">LKR {balanceSheetData.assets.currentAssets.cashInHand.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Bank Account</span>
                    <span className="font-medium">LKR {balanceSheetData.assets.currentAssets.bankAccount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Accounts Receivable</span>
                    <span className="font-medium">LKR {balanceSheetData.assets.currentAssets.accountsReceivable.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Inventory</span>
                    <span className="font-medium">LKR {balanceSheetData.assets.currentAssets.inventory.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Prepaid Expenses</span>
                    <span className="font-medium">LKR {balanceSheetData.assets.currentAssets.prepaidExpenses.toLocaleString()}</span>
                  </div>
                  <hr className="border-gray-300" />
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Total Current Assets</span>
                    <span className="text-green-600">LKR {balanceSheetData.assets.currentAssets.totalCurrentAssets.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Fixed Assets */}
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-3">Fixed Assets</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Equipment</span>
                    <span className="font-medium">LKR {balanceSheetData.assets.fixedAssets.equipment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Vehicles</span>
                    <span className="font-medium">LKR {balanceSheetData.assets.fixedAssets.vehicles.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Building</span>
                    <span className="font-medium">LKR {balanceSheetData.assets.fixedAssets.building.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Accumulated Depreciation</span>
                    <span className="font-medium text-red-600">LKR {balanceSheetData.assets.fixedAssets.accumulatedDepreciation.toLocaleString()}</span>
                  </div>
                  <hr className="border-gray-300" />
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Total Fixed Assets</span>
                    <span className="text-green-600">LKR {balanceSheetData.assets.fixedAssets.totalFixedAssets.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <hr className="border-gray-300 my-4" />
              <div className="flex justify-between items-center font-bold text-xl">
                <span>Total Assets</span>
                <span className="text-green-600">LKR {balanceSheetData.assets.totalAssets.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Liabilities & Equity */}
          <div className="space-y-6">
            {/* Liabilities */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaBalanceScale className="text-red-600" />
                Liabilities
              </h3>
              
              {/* Current Liabilities */}
              <div className="mb-4">
                <h4 className="text-md font-semibold text-gray-700 mb-3">Current Liabilities</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Accounts Payable</span>
                    <span className="font-medium">LKR {balanceSheetData.liabilities.currentLiabilities.accountsPayable.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Short-term Loans</span>
                    <span className="font-medium">LKR {balanceSheetData.liabilities.currentLiabilities.shortTermLoans.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Accrued Expenses</span>
                    <span className="font-medium">LKR {balanceSheetData.liabilities.currentLiabilities.accruedExpenses.toLocaleString()}</span>
                  </div>
                  <hr className="border-gray-300" />
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Total Current Liabilities</span>
                    <span className="text-red-600">LKR {balanceSheetData.liabilities.currentLiabilities.totalCurrentLiabilities.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Long-term Liabilities */}
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-3">Long-term Liabilities</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Long-term Loans</span>
                    <span className="font-medium">LKR {balanceSheetData.liabilities.longTermLiabilities.longTermLoans.toLocaleString()}</span>
                  </div>
                  <hr className="border-gray-300" />
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Total Long-term Liabilities</span>
                    <span className="text-red-600">LKR {balanceSheetData.liabilities.longTermLiabilities.totalLongTermLiabilities.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <hr className="border-gray-300 my-4" />
              <div className="flex justify-between items-center font-bold text-xl">
                <span>Total Liabilities</span>
                <span className="text-red-600">LKR {balanceSheetData.liabilities.totalLiabilities.toLocaleString()}</span>
              </div>
            </div>

            {/* Equity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaMoneyBillWave className="text-blue-600" />
                Equity
              </h3>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Owner's Capital</span>
                  <span className="font-medium">LKR {balanceSheetData.equity.ownerCapital.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Retained Earnings</span>
                  <span className="font-medium">LKR {balanceSheetData.equity.retainedEarnings.toLocaleString()}</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between items-center font-bold text-xl">
                  <span>Total Equity</span>
                  <span className="text-blue-600">LKR {balanceSheetData.equity.totalEquity.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Ratios */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCalculator className="text-blue-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Current Ratio</p>
                <p className="text-2xl font-bold text-gray-900">{currentRatio.toFixed(2)}</p>
                <p className="text-xs text-gray-500">Assets / Liabilities</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCalculator className="text-green-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Working Capital</p>
                <p className="text-2xl font-bold text-gray-900">LKR {workingCapital.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Current Assets - Current Liabilities</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCalculator className="text-purple-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Debt to Equity</p>
                <p className="text-2xl font-bold text-gray-900">{debtToEquityRatio.toFixed(2)}</p>
                <p className="text-xs text-gray-500">Liabilities / Equity</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaBalanceScale className="text-orange-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Asset Coverage</p>
                <p className="text-2xl font-bold text-gray-900">
                  {((balanceSheetData.assets.totalAssets / balanceSheetData.liabilities.totalLiabilities) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500">Assets / Liabilities %</p>
              </div>
            </div>
          </div>
        </div>

        {/* Balance Check */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Balance Check</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Assets</p>
              <p className="text-xl font-bold text-green-600">LKR {balanceSheetData.assets.totalAssets.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Liabilities + Equity</p>
              <p className="text-xl font-bold text-blue-600">LKR {(balanceSheetData.liabilities.totalLiabilities + balanceSheetData.equity.totalEquity).toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Difference</p>
              <p className={`text-xl font-bold ${balanceSheetData.assets.totalAssets === (balanceSheetData.liabilities.totalLiabilities + balanceSheetData.equity.totalEquity) ? 'text-green-600' : 'text-red-600'}`}>
                LKR {(balanceSheetData.assets.totalAssets - (balanceSheetData.liabilities.totalLiabilities + balanceSheetData.equity.totalEquity)).toLocaleString()}
              </p>
            </div>
          </div>
          {balanceSheetData.assets.totalAssets === (balanceSheetData.liabilities.totalLiabilities + balanceSheetData.equity.totalEquity) ? (
            <div className="mt-4 text-center text-green-600 font-medium">✅ Balance Sheet is Balanced</div>
          ) : (
            <div className="mt-4 text-center text-red-600 font-medium">❌ Balance Sheet is Not Balanced</div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering BalanceSheet:', error);
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Balance Sheet</h1>
        <p className="text-red-600">Error loading balance sheet page. Please refresh the page.</p>
      </div>
    );
  }
};

export default BalanceSheet; 