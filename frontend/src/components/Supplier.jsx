import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: '',
    openingBalance: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSupplier = () => {
    if (formData.name && formData.contact && formData.address && formData.openingBalance) {
      const newSupplier = {
        id: Date.now(),
        ...formData
      };
      setSuppliers(prev => [...prev, newSupplier]);
      setFormData({
        name: '',
        contact: '',
        address: '',
        openingBalance: ''
      });
    }
  };

  const handleDeleteSupplier = (id) => {
    setSuppliers(prev => prev.filter(supplier => supplier.id !== id));
  };

  const handleEditSupplier = (supplier) => {
    setFormData(supplier);
    handleDeleteSupplier(supplier.id);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Add Supplier Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">Add Supplier</h2>
          
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Supplier Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder="Contact"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <input
                type="number"
                name="openingBalance"
                value={formData.openingBalance}
                onChange={handleInputChange}
                placeholder="Opening Balance"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button
              onClick={handleAddSupplier}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold"
            >
              <FaPlus size={16} />
              Add Supplier
            </button>
          </div>
        </div>

        {/* Right Section - Supplier List Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-800 text-white">
            <div className="grid grid-cols-6 gap-4 p-4 font-bold text-sm">
              <div>S.No</div>
              <div>Supplier Name</div>
              <div>Contact</div>
              <div>Address</div>
              <div>Opening Balance</div>
              <div>Actions</div>
            </div>
          </div>
          
          <div className="p-4">
            {suppliers.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No suppliers added yet.
              </div>
            ) : (
              <div className="space-y-2">
                {suppliers.map((supplier, index) => (
                  <div key={supplier.id} className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-50">
                    <div>{index + 1}</div>
                    <div>{supplier.name}</div>
                    <div>{supplier.contact}</div>
                    <div>{supplier.address}</div>
                    <div>{supplier.openingBalance}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditSupplier(supplier)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteSupplier(supplier.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Supplier; 