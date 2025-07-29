import React, { useState, useMemo } from 'react';
import { FaUser, FaCar, FaTools, FaBox, FaCalculator, FaPrint, FaSave, FaPlus, FaTrash, FaEdit, FaFileAlt } from 'react-icons/fa';

const Quotation = () => {
  const [quotationInfo, setQuotationInfo] = useState({
    quotationNumber: 'QT-2025-001',
    date: new Date().toLocaleDateString(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    vehicleNumber: '',
    vehicleModel: '',
    vehicleYear: '',
    mileage: '',
    serviceType: 'Regular Service'
  });

  const [serviceItems, setServiceItems] = useState([
    {
      id: 1,
      type: 'service',
      description: 'Engine Oil Change',
      quantity: 1,
      unitPrice: 2500.00,
      total: 2500.00
    },
    {
      id: 2,
      type: 'service',
      description: 'Oil Filter Replacement',
      quantity: 1,
      unitPrice: 800.00,
      total: 800.00
    },
    {
      id: 3,
      type: 'service',
      description: 'Air Filter Replacement',
      quantity: 1,
      unitPrice: 450.00,
      total: 450.00
    }
  ]);

  const [partsItems, setPartsItems] = useState([
    {
      id: 4,
      type: 'parts',
      description: 'Brake Pads Set (Front)',
      quantity: 1,
      unitPrice: 1200.00,
      total: 1200.00
    },
    {
      id: 5,
      type: 'parts',
      description: 'Spark Plugs (Set of 4)',
      quantity: 1,
      unitPrice: 1800.00,
      total: 1800.00
    }
  ]);

  const [laborItems, setLaborItems] = useState([
    {
      id: 6,
      type: 'labor',
      description: 'Labor - Engine Service',
      quantity: 1,
      unitPrice: 1500.00,
      total: 1500.00
    },
    {
      id: 7,
      type: 'labor',
      description: 'Labor - Brake System',
      quantity: 1,
      unitPrice: 800.00,
      total: 800.00
    }
  ]);

  const [newItem, setNewItem] = useState({
    type: 'service',
    description: '',
    quantity: 1,
    unitPrice: 0
  });

  // Mock data for dropdowns
  const serviceTypes = [
    'Regular Service',
    'Major Service',
    'Brake Service',
    'Engine Repair',
    'Electrical Work',
    'AC Service',
    'Tire Service',
    'Custom Work'
  ];

  const vehicleModels = [
    'Toyota Corolla',
    'Honda Civic',
    'Nissan Sunny',
    'Suzuki Swift',
    'Mitsubishi Lancer',
    'Hyundai Accent',
    'Kia Rio',
    'Other'
  ];

  const handleQuotationChange = (e) => {
    try {
      const { name, value } = e.target;
      setQuotationInfo(prev => ({
        ...prev,
        [name]: value
      }));
    } catch (error) {
      console.error('Error in handleQuotationChange:', error);
    }
  };

  const handleItemChange = (e) => {
    try {
      const { name, value } = e.target;
      setNewItem(prev => ({
        ...prev,
        [name]: name === 'quantity' || name === 'unitPrice' ? parseFloat(value) || 0 : value
      }));
    } catch (error) {
      console.error('Error in handleItemChange:', error);
    }
  };

  const handleAddItem = () => {
    try {
      if (!newItem.description || newItem.quantity <= 0 || newItem.unitPrice <= 0) {
        alert('Please fill in all required fields with valid values');
        return;
      }

      const item = {
        id: Date.now(),
        type: newItem.type,
        description: newItem.description,
        quantity: newItem.quantity,
        unitPrice: newItem.unitPrice,
        total: newItem.quantity * newItem.unitPrice
      };

      // Add to appropriate list based on type
      if (newItem.type === 'service') {
        setServiceItems(prev => [...prev, item]);
      } else if (newItem.type === 'parts') {
        setPartsItems(prev => [...prev, item]);
      } else if (newItem.type === 'labor') {
        setLaborItems(prev => [...prev, item]);
      }

      // Reset form
      setNewItem({
        type: 'service',
        description: '',
        quantity: 1,
        unitPrice: 0
      });
    } catch (error) {
      console.error('Error in handleAddItem:', error);
    }
  };

  const handleDeleteItem = (itemId, type) => {
    try {
      if (window.confirm('Are you sure you want to remove this item?')) {
        if (type === 'service') {
          setServiceItems(prev => prev.filter(item => item.id !== itemId));
        } else if (type === 'parts') {
          setPartsItems(prev => prev.filter(item => item.id !== itemId));
        } else if (type === 'labor') {
          setLaborItems(prev => prev.filter(item => item.id !== itemId));
        }
      }
    } catch (error) {
      console.error('Error in handleDeleteItem:', error);
    }
  };

  const handlePrintQuotation = () => {
    try {
      alert('Printing quotation...');
      // In a real app, this would open a print dialog
    } catch (error) {
      console.error('Error printing quotation:', error);
    }
  };

  const handleSaveQuotation = () => {
    try {
      if (!quotationInfo.customerName || !quotationInfo.vehicleNumber) {
        alert('Please fill in customer name and vehicle number');
        return;
      }

      const totalAmount = serviceTotal + partsTotal + laborTotal;
      alert(`Quotation saved successfully!\nTotal Amount: LKR ${totalAmount.toFixed(2)}`);
    } catch (error) {
      console.error('Error saving quotation:', error);
    }
  };

  const handleConvertToJobOrder = () => {
    try {
      if (!quotationInfo.customerName || !quotationInfo.vehicleNumber) {
        alert('Please fill in customer name and vehicle number');
        return;
      }

      alert('Converting quotation to job order...');
      // In a real app, this would create a job order
    } catch (error) {
      console.error('Error converting to job order:', error);
    }
  };

  // Calculate totals
  const serviceTotal = useMemo(() => {
    try {
      return serviceItems.reduce((sum, item) => sum + item.total, 0);
    } catch (error) {
      console.error('Error calculating service total:', error);
      return 0;
    }
  }, [serviceItems]);

  const partsTotal = useMemo(() => {
    try {
      return partsItems.reduce((sum, item) => sum + item.total, 0);
    } catch (error) {
      console.error('Error calculating parts total:', error);
      return 0;
    }
  }, [partsItems]);

  const laborTotal = useMemo(() => {
    try {
      return laborItems.reduce((sum, item) => sum + item.total, 0);
    } catch (error) {
      console.error('Error calculating labor total:', error);
      return 0;
    }
  }, [laborItems]);

  const grandTotal = serviceTotal + partsTotal + laborTotal;

  const renderItemTable = (items, type, title) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No {type} items added</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Unit Price (LKR)</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total (LKR)</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-900">{item.description}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{item.unitPrice.toFixed(2)}</td>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">{item.total.toFixed(2)}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    <button
                      onClick={() => handleDeleteItem(item.id, type)}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Delete Item"
                    >
                      <FaTrash size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  try {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Service Quotation</h1>
                <p className="text-gray-600">Create professional quotations for automotive services</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handlePrintQuotation}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <FaPrint size={14} />
                  Print
                </button>
                <button
                  onClick={handleSaveQuotation}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <FaSave size={14} />
                  Save
                </button>
                <button
                  onClick={handleConvertToJobOrder}
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors flex items-center gap-2"
                >
                  <FaFileAlt size={14} />
                  Convert to Job Order
                </button>
              </div>
            </div>

            {/* Quotation Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quotation Number</label>
                <input
                  type="text"
                  name="quotationNumber"
                  value={quotationInfo.quotationNumber}
                  onChange={handleQuotationChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="text"
                  name="date"
                  value={quotationInfo.date}
                  onChange={handleQuotationChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Valid Until</label>
                <input
                  type="text"
                  name="validUntil"
                  value={quotationInfo.validUntil}
                  onChange={handleQuotationChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaUser className="text-blue-600" />
                  Customer Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                    <input
                      type="text"
                      name="customerName"
                      value={quotationInfo.customerName}
                      onChange={handleQuotationChange}
                      placeholder="Enter customer name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      name="customerPhone"
                      value={quotationInfo.customerPhone}
                      onChange={handleQuotationChange}
                      placeholder="Enter phone number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={quotationInfo.customerEmail}
                      onChange={handleQuotationChange}
                      placeholder="Enter email address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaCar className="text-green-600" />
                  Vehicle Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number *</label>
                    <input
                      type="text"
                      name="vehicleNumber"
                      value={quotationInfo.vehicleNumber}
                      onChange={handleQuotationChange}
                      placeholder="Enter vehicle number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Model</label>
                    <select
                      name="vehicleModel"
                      value={quotationInfo.vehicleModel}
                      onChange={handleQuotationChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Vehicle Model</option>
                      {vehicleModels.map(model => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                      <input
                        type="text"
                        name="vehicleYear"
                        value={quotationInfo.vehicleYear}
                        onChange={handleQuotationChange}
                        placeholder="Year"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mileage</label>
                      <input
                        type="text"
                        name="mileage"
                        value={quotationInfo.mileage}
                        onChange={handleQuotationChange}
                        placeholder="Mileage"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                    <select
                      name="serviceType"
                      value={quotationInfo.serviceType}
                      onChange={handleQuotationChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {serviceTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add New Item Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaPlus className="text-blue-600" />
              Add New Item
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  name="type"
                  value={newItem.type}
                  onChange={handleItemChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="service">Service</option>
                  <option value="parts">Parts</option>
                  <option value="labor">Labor</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  name="description"
                  value={newItem.description}
                  onChange={handleItemChange}
                  placeholder="Enter item description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={newItem.quantity}
                  onChange={handleItemChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit Price (LKR)</label>
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
            </div>
            <div className="mt-4">
              <button
                onClick={handleAddItem}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <FaPlus size={14} />
                Add Item
              </button>
            </div>
          </div>

          {/* Items Tables */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {renderItemTable(serviceItems, 'service', 'Service Items')}
            {renderItemTable(partsItems, 'parts', 'Parts Items')}
            {renderItemTable(laborItems, 'labor', 'Labor Items')}
          </div>

          {/* Summary Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-end">
              <div className="w-80">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Total:</span>
                    <span className="font-medium">LKR {serviceTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Parts Total:</span>
                    <span className="font-medium">LKR {partsTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Labor Total:</span>
                    <span className="font-medium">LKR {laborTotal.toFixed(2)}</span>
                  </div>
                  <hr className="border-gray-300" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Grand Total:</span>
                    <span className="text-blue-600">LKR {grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering Quotation:', error);
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800">Service Quotation</h1>
          <p className="text-red-600">Error loading quotation page. Please refresh the page.</p>
        </div>
      </div>
    );
  }
};

export default Quotation; 