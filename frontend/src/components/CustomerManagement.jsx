import React, { useState } from 'react';
import { FaSync, FaCalendarAlt, FaUpload, FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const CustomerManagement = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    nicNumber: '',
    loyaltyCardNumber: '',
    validUntil: '',
    email: '',
    address: '',
    openingBalance: 0,
    cardName: '',
    photo: null
  });

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Sharaf',
      email: 'sharafahmed@gmail.com',
      phone: '+94753614133',
      loyaltyCardNumber: '601911',
      cardNames: '-',
      cardTypes: '-'
    }
  ]);

  const handleFormChange = (e) => {
    try {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } catch (error) {
      console.error('Error in handleFormChange:', error);
    }
  };

  const handlePhotoUpload = (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        setFormData(prev => ({
          ...prev,
          photo: file
        }));
      }
    } catch (error) {
      console.error('Error in handlePhotoUpload:', error);
    }
  };

  const handleRefreshLoyaltyCards = () => {
    try {
      alert('Refreshing loyalty cards...');
    } catch (error) {
      console.error('Error in handleRefreshLoyaltyCards:', error);
    }
  };

  const handleAddCustomer = () => {
    try {
      if (formData.name && formData.phone) {
        const newCustomer = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          loyaltyCardNumber: formData.loyaltyCardNumber || '-',
          cardNames: formData.cardName || '-',
          cardTypes: formData.cardName ? 'Premium' : '-'
        };
        setCustomers(prev => [...prev, newCustomer]);
        
        // Reset form
        setFormData({
          name: '',
          phone: '',
          nicNumber: '',
          loyaltyCardNumber: '',
          validUntil: '',
          email: '',
          address: '',
          openingBalance: 0,
          cardName: '',
          photo: null
        });
        
        alert('Customer added successfully!');
      } else {
        alert('Please fill in the required fields (Name and Phone)');
      }
    } catch (error) {
      console.error('Error in handleAddCustomer:', error);
      alert('Error adding customer. Please try again.');
    }
  };

  const handleViewCustomer = (customerId) => {
    try {
      alert(`Viewing details for customer ${customerId}`);
    } catch (error) {
      console.error('Error in handleViewCustomer:', error);
    }
  };

  const handleEditCustomer = (customerId) => {
    try {
      alert(`Editing customer ${customerId}`);
    } catch (error) {
      console.error('Error in handleEditCustomer:', error);
    }
  };

  const handleDeleteCustomer = (customerId) => {
    try {
      if (window.confirm('Are you sure you want to delete this customer?')) {
        setCustomers(prev => prev.filter(customer => customer.id !== customerId));
        alert('Customer deleted successfully!');
      }
    } catch (error) {
      console.error('Error in handleDeleteCustomer:', error);
    }
  };

  try {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Customer Management</h1>
        </div>

        {/* Add Customer Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Add Customer</h2>
            <button
              onClick={handleRefreshLoyaltyCards}
              className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-2"
            >
              <FaSync size={14} />
              Refresh Loyalty Cards
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Ahmed Khan"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="+94712345678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NIC Number
                </label>
                <input
                  type="text"
                  name="nicNumber"
                  value={formData.nicNumber}
                  onChange={handleFormChange}
                  placeholder="123456789V"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loyalty Card Number
                </label>
                <input
                  type="text"
                  name="loyaltyCardNumber"
                  value={formData.loyaltyCardNumber}
                  onChange={handleFormChange}
                  placeholder="Auto-generated"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valid Until
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="validUntil"
                    value={formData.validUntil}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  />
                  <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="ahmed.khan@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  placeholder="123 Main Street, Colombo"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opening Balance
                </label>
                <input
                  type="number"
                  name="openingBalance"
                  value={formData.openingBalance}
                  onChange={handleFormChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Name
                </label>
                <select
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Card Name</option>
                  <option value="Premium Auto">Premium Auto</option>
                  <option value="Gold Member">Gold Member</option>
                  <option value="Silver Plus">Silver Plus</option>
                  <option value="Basic Member">Basic Member</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <FaUpload className="mx-auto text-gray-400 text-2xl mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      JPEG, PNG (max 2MB)
                    </p>
                  </label>
                  {formData.photo && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.photo.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Add Customer Button */}
          <div className="mt-6">
            <button
              onClick={handleAddCustomer}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaPlus size={14} />
              Add Customer
            </button>
          </div>
        </div>

        {/* Customer List Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EMAIL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PHONE</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LOYALTY CARD NUMBER</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CARD NAME(S)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CARD TYPE(S)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.loyaltyCardNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.cardNames}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.cardTypes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewCustomer(customer.id)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="View Details"
                        >
                          <FaEye size={16} />
                        </button>
                        <button
                          onClick={() => handleEditCustomer(customer.id)}
                          className="text-green-600 hover:text-green-800 p-1"
                          title="Edit"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          <FaTrash size={16} />
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
  } catch (error) {
    console.error('Error rendering CustomerManagement:', error);
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Customer Management</h1>
        <p className="text-red-600">Error loading customer management page. Please refresh the page.</p>
      </div>
    );
  }
};

export default CustomerManagement; 