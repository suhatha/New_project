import React, { useState } from 'react';
import { FaInfoCircle, FaPercentage, FaDollarSign } from 'react-icons/fa';

const TaxManagement = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const [taxInfo, setTaxInfo] = useState({
    taxName: '',
    description: ''
  });
  const [calculator, setCalculator] = useState({
    subtotal: 0,
    taxRate: 0,
    taxAmount: 0,
    totalWithTax: 0
  });

  const handleTaxInfoChange = (e) => {
    const { name, value } = e.target;
    setTaxInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCalculatorChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value) || 0;
    
    setCalculator(prev => {
      const newCalculator = {
        ...prev,
        [name]: numValue
      };

      // Calculate tax amount and total
      if (name === 'subtotal' || name === 'taxRate') {
        const subtotal = name === 'subtotal' ? numValue : prev.subtotal;
        const taxRate = name === 'taxRate' ? numValue : prev.taxRate;
        const taxAmount = (subtotal * taxRate) / 100;
        const totalWithTax = subtotal + taxAmount;

        return {
          ...newCalculator,
          taxAmount: taxAmount,
          totalWithTax: totalWithTax
        };
      }

      return newCalculator;
    });
  };

  const handleSaveTaxInfo = () => {
    if (taxInfo.taxName.trim()) {
      alert('Tax information saved successfully!');
      // In a real app, this would save to the database
    } else {
      alert('Please enter a tax name');
    }
  };

  const handleResetCalculator = () => {
    setCalculator({
      subtotal: 0,
      taxRate: 0,
      taxAmount: 0,
      totalWithTax: 0
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Tax Management</h1>
        <p className="text-gray-600">Calculate taxes and manage tax records</p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'calculator'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaPercentage size={14} />
              % Tax Calculator
            </button>
            <button
              onClick={() => setActiveTab('records')}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'records'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaDollarSign size={14} />
              $ Tax Records
            </button>
          </nav>
        </div>
      </div>

      {/* Content Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel: Tax Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaInfoCircle className="text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Tax Information</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="taxName"
                value={taxInfo.taxName}
                onChange={handleTaxInfoChange}
                placeholder="e.g., VAT, GST"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={taxInfo.description}
                onChange={handleTaxInfoChange}
                placeholder="Optional description"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button
              onClick={handleSaveTaxInfo}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Tax Information
            </button>
          </div>
        </div>

        {/* Right Panel: Tax Calculator */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaPercentage className="text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">% Tax Calculator</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtotal (LKR)
              </label>
              <input
                type="number"
                name="subtotal"
                value={calculator.subtotal}
                onChange={handleCalculatorChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax Rate (%)
              </label>
              <input
                type="number"
                name="taxRate"
                value={calculator.taxRate}
                onChange={handleCalculatorChange}
                min="0"
                max="100"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax Amount (LKR)
              </label>
              <input
                type="number"
                name="taxAmount"
                value={calculator.taxAmount.toFixed(2)}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
              />
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total with Tax (LKR)
              </label>
              <div className="text-2xl font-bold text-blue-600">
                LKR {calculator.totalWithTax.toFixed(2)}
              </div>
            </div>
            
            <button
              onClick={handleResetCalculator}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
            >
              Reset Calculator
            </button>
          </div>
        </div>
      </div>

      {/* Tax Records Tab Content */}
      {activeTab === 'records' && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaDollarSign className="text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Tax Records</h2>
          </div>
          
          <div className="text-center py-12">
            <FaDollarSign className="mx-auto text-gray-400 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tax records found</h3>
            <p className="text-gray-500">Tax records will appear here once you start using the calculator.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxManagement; 