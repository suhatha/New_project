import React, { useState } from 'react';
import { FaChartLine, FaDownload, FaPrint, FaCalendar, FaCalculator, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const ProfitLoss = () => {
  const [profitLossData, setProfitLossData] = useState({
    period: 'July 2025',
    revenue: {
      serviceRevenue: 850000,
      partsSales: 320000,
      otherIncome: 25000,
      totalRevenue: 1195000
    },
    costOfGoodsSold: {
      partsCost: 280000,
      directLabor: 150000,
      totalCOGS: 430000
    },
    operatingExpenses: {
      salaries: 85000,
      utilities: 45000,
      rent: 60000,
      marketing: 25000,
      insurance: 15000,
      maintenance: 20000,
      otherExpenses: 10000,
      totalExpenses: 260000
    },
    otherIncome: {
      interestIncome: 5000,
      commission: 8000,
      totalOtherIncome: 13000
    },
    otherExpenses: {
      interestExpense: 3000,
      bankCharges: 2000,
      totalOtherExpenses: 5000
    }
  });

  const [selectedPeriod, setSelectedPeriod] = useState('July 2025');
  const [showComparison, setShowComparison] = useState(false);

  const periods = ['July 2025', 'June 2025', 'May 2025', 'April 2025'];

  // Calculate profit/loss
  const grossProfit = profitLossData.revenue.totalRevenue - profitLossData.costOfGoodsSold.totalCOGS;
  const operatingProfit = grossProfit - profitLossData.operatingExpenses.totalExpenses;
  const netProfit = operatingProfit + profitLossData.otherIncome.totalOtherIncome - profitLossData.otherExpenses.totalOtherExpenses;

  const getProfitColor = (amount) => {
    return amount >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getProfitIcon = (amount) => {
    return amount >= 0 ? FaArrowUp : FaArrowDown;
  };

  const getProfitColorClass = (amount) => {
    return amount >= 0 ? 'text-green-600' : 'text-red-600';
  };

  try {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Profit & Loss Statement</h1>
            <p className="text-gray-600">Business profitability analysis and financial performance</p>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {periods.map(period => (
                <option key={period} value={period}>{period}</option>
              ))}
            </select>
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

        {/* Net Profit Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Net Profit/Loss</h2>
            <div className={`text-4xl font-bold ${getProfitColor(netProfit)} mb-2`}>
              LKR {netProfit.toLocaleString()}
            </div>
            <div className="flex items-center justify-center gap-2">
              {React.createElement(getProfitIcon(netProfit), { 
                className: getProfitColorClass(netProfit),
                size: 20 
              })}
              <span className={`text-sm font-medium ${getProfitColorClass(netProfit)}`}>
                {netProfit >= 0 ? 'Profit' : 'Loss'}
              </span>
            </div>
          </div>
        </div>

        {/* Profit & Loss Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaArrowUp className="text-green-600" />
              Revenue
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Service Revenue</span>
                <span className="font-medium">LKR {profitLossData.revenue.serviceRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Parts Sales</span>
                <span className="font-medium">LKR {profitLossData.revenue.partsSales.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Other Income</span>
                <span className="font-medium">LKR {profitLossData.revenue.otherIncome.toLocaleString()}</span>
              </div>
              <hr className="border-gray-300" />
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total Revenue</span>
                <span className="text-green-600">LKR {profitLossData.revenue.totalRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Cost of Goods Sold Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaArrowDown className="text-red-600" />
              Cost of Goods Sold
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Parts Cost</span>
                <span className="font-medium">LKR {profitLossData.costOfGoodsSold.partsCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Direct Labor</span>
                <span className="font-medium">LKR {profitLossData.costOfGoodsSold.directLabor.toLocaleString()}</span>
              </div>
              <hr className="border-gray-300" />
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total COGS</span>
                <span className="text-red-600">LKR {profitLossData.costOfGoodsSold.totalCOGS.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Gross Profit */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Gross Profit</h3>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getProfitColor(grossProfit)}`}>
                LKR {grossProfit.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Revenue - Cost of Goods Sold
              </div>
            </div>
          </div>

          {/* Operating Expenses */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Operating Expenses</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Salaries & Wages</span>
                <span className="font-medium">LKR {profitLossData.operatingExpenses.salaries.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Utilities</span>
                <span className="font-medium">LKR {profitLossData.operatingExpenses.utilities.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Rent</span>
                <span className="font-medium">LKR {profitLossData.operatingExpenses.rent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Marketing</span>
                <span className="font-medium">LKR {profitLossData.operatingExpenses.marketing.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Insurance</span>
                <span className="font-medium">LKR {profitLossData.operatingExpenses.insurance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Maintenance</span>
                <span className="font-medium">LKR {profitLossData.operatingExpenses.maintenance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Other Expenses</span>
                <span className="font-medium">LKR {profitLossData.operatingExpenses.otherExpenses.toLocaleString()}</span>
              </div>
              <hr className="border-gray-300" />
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total Operating Expenses</span>
                <span className="text-red-600">LKR {profitLossData.operatingExpenses.totalExpenses.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Operating Profit */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Operating Profit</h3>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getProfitColor(operatingProfit)}`}>
                LKR {operatingProfit.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Gross Profit - Operating Expenses
              </div>
            </div>
          </div>

          {/* Other Income & Expenses */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Other Income & Expenses</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Interest Income</span>
                <span className="font-medium text-green-600">LKR {profitLossData.otherIncome.interestIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Commission</span>
                <span className="font-medium text-green-600">LKR {profitLossData.otherIncome.commission.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Interest Expense</span>
                <span className="font-medium text-red-600">LKR {profitLossData.otherExpenses.interestExpense.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Bank Charges</span>
                <span className="font-medium text-red-600">LKR {profitLossData.otherExpenses.bankCharges.toLocaleString()}</span>
              </div>
              <hr className="border-gray-300" />
              <div className="flex justify-between items-center font-semibold">
                <span>Net Other Income</span>
                <span className={`${getProfitColor(profitLossData.otherIncome.totalOtherIncome - profitLossData.otherExpenses.totalOtherExpenses)}`}>
                  LKR {(profitLossData.otherIncome.totalOtherIncome - profitLossData.otherExpenses.totalOtherExpenses).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCalculator className="text-blue-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Gross Profit Margin</p>
                <p className="text-2xl font-bold text-gray-900">
                  {((grossProfit / profitLossData.revenue.totalRevenue) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCalculator className="text-green-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Operating Margin</p>
                <p className="text-2xl font-bold text-gray-900">
                  {((operatingProfit / profitLossData.revenue.totalRevenue) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCalculator className="text-purple-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Net Profit Margin</p>
                <p className="text-2xl font-bold text-gray-900">
                  {((netProfit / profitLossData.revenue.totalRevenue) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaChartLine className="text-orange-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Expense Ratio</p>
                <p className="text-2xl font-bold text-gray-900">
                  {((profitLossData.operatingExpenses.totalExpenses / profitLossData.revenue.totalRevenue) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering ProfitLoss:', error);
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Profit & Loss Statement</h1>
        <p className="text-red-600">Error loading profit & loss page. Please refresh the page.</p>
      </div>
    );
  }
};

export default ProfitLoss; 