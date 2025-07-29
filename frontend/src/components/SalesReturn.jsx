import React, { useState } from 'react';
import { FaExclamationCircle, FaSearch, FaBox, FaCheck, FaDownload, FaPlus } from 'react-icons/fa';

const SalesReturn = () => {
  const [formData, setFormData] = useState({
    salesReturnNumber: '',
    invoiceNumber: '',
    customerName: '',
    refundMethod: 'Cash',
    status: 'Pending',
    remarks: ''
  });

  const [returnItems, setReturnItems] = useState([]);
  const [newItem, setNewItem] = useState({
    product: '',
    quantity: 0,
    unitPrice: 0,
    reason: ''
  });

  const [hasError, setHasError] = useState(false); // No error state

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddItem = () => {
    if (newItem.product && newItem.quantity > 0 && newItem.unitPrice > 0) {
      const item = {
        id: Date.now(),
        ...newItem,
        total: newItem.quantity * newItem.unitPrice
      };
      setReturnItems(prev => [...prev, item]);
      setNewItem({
        product: '',
        quantity: 0,
        unitPrice: 0,
        reason: ''
      });
    } else {
      alert('Please fill in all required fields for the item');
    }
  };

  const handleRemoveItem = (itemId) => {
    setReturnItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleSubmitReturn = () => {
    if (returnItems.length === 0) {
      alert('Please add at least one item to return');
      return;
    }
    if (!formData.customerName) {
      alert('Please enter customer name');
      return;
    }
    alert('Sales return submitted successfully!');
    // In a real app, this would save to the database
  };

  const handleExport = () => {
    alert('Exporting sales return history...');
  };

  const handleNewReturn = () => {
    setFormData({
      salesReturnNumber: '',
      invoiceNumber: '',
      customerName: '',
      refundMethod: 'Cash',
      status: 'Pending',
      remarks: ''
    });
    setReturnItems([]);
    setNewItem({
      product: '',
      quantity: 0,
      unitPrice: 0,
      reason: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Sales Return Form</h1>
        <p className="text-gray-600">Create a new sales return</p>
      </div>

      {/* Error Message Banner */}
      {hasError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div className="flex items-center">
            <FaExclamationCircle className="text-red-400 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Please fix the following issues:</h3>
              <ul className="mt-1 text-sm text-red-700">
                <li>• Error fetching data</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Sales Return Details Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sales Return Number
            </label>
            <div className="relative">
              <input
                type="text"
                name="salesReturnNumber"
                value={formData.salesReturnNumber}
                onChange={handleFormChange}
                placeholder="Auto-generated"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">#</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Invoice/Bill Number
            </label>
            <div className="relative">
              <input
                type="text"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleFormChange}
                placeholder="Search Invoice/Bill Number..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer Name
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleFormChange}
              placeholder="Customer Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Items to Return Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Items to Return</h3>
            <span className="text-sm text-gray-500">{returnItems.length} item(s) added</span>
          </div>

          {/* Item Input Row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Product
              </label>
              <input
                type="text"
                name="product"
                value={newItem.product}
                onChange={handleItemChange}
                placeholder="Type to search product:"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={newItem.quantity}
                onChange={handleItemChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit Price
              </label>
              <input
                type="number"
                name="unitPrice"
                value={newItem.unitPrice}
                onChange={handleItemChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason (Optional)
              </label>
              <input
                type="text"
                name="reason"
                value={newItem.reason}
                onChange={handleItemChange}
                placeholder="Damage, Wrong item, etc"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={handleAddItem}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Item
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            {returnItems.length === 0 ? (
              <div>
                <FaBox className="mx-auto text-gray-400 text-4xl mb-4" />
                <p className="text-lg font-semibold text-gray-900 mb-2">No items added</p>
                <p className="text-gray-600">Search for products above to add return items</p>
              </div>
            ) : (
              <div className="space-y-2">
                {returnItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <div className="flex-1">
                      <span className="font-medium">{item.product}</span>
                      <span className="text-gray-500 ml-4">Qty: {item.quantity}</span>
                      <span className="text-gray-500 ml-4">Price: LKR {item.unitPrice.toFixed(2)}</span>
                      {item.reason && <span className="text-gray-500 ml-4">Reason: {item.reason}</span>}
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-800 ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Return Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Refund Method
            </label>
            <select
              name="refundMethod"
              value={formData.refundMethod}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Store Credit">Store Credit</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Remarks
            </label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleFormChange}
              placeholder="Additional notes about this return..."
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmitReturn}
            className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition-colors flex items-center gap-2"
            disabled={returnItems.length === 0}
          >
            <FaCheck size={14} />
            Submit Return
          </button>
        </div>
      </div>

      {/* Sales Return History Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Sales Return History</h2>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaDownload size={14} />
              Export
            </button>
            <button
              onClick={handleNewReturn}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <FaPlus size={14} />
              New Return
            </button>
          </div>
        </div>

        {/* History Table Placeholder */}
        <div className="text-center py-12">
          <FaBox className="mx-auto text-gray-400 text-4xl mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No return history found</h3>
          <p className="text-gray-500">Sales return history will appear here once you submit returns.</p>
        </div>
      </div>
    </div>
  );
};

export default SalesReturn; 