import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: '',
    openingBalance: ''
  });

  // API base URL - adjust this to match your Laravel backend URL
  const API_BASE_URL = 'http://127.0.0.1:8000/api';

  // Load suppliers from backend on component mount
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/suppliers`);
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      alert('Failed to load suppliers. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSupplier = async () => {
    if (formData.name && formData.contact && formData.address && formData.openingBalance) {
      try {
        setLoading(true);
        // Map frontend field names to backend field names
        const supplierData = {
          supplier_name: formData.name,
          contact: formData.contact,
          address: formData.address,
          opening_balance: formData.openingBalance
        };
        
        const response = await axios.post(`${API_BASE_URL}/suppliers`, supplierData);
        
        // Add the new supplier to the local state
        setSuppliers(prev => [...prev, response.data]);
        
        // Clear the form
        setFormData({
          name: '',
          contact: '',
          address: '',
          openingBalance: ''
        });
        
        alert('Supplier added successfully!');
      } catch (error) {
        console.error('Error adding supplier:', error);
        alert('Failed to add supplier. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleDeleteSupplier = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        setLoading(true);
        await axios.delete(`${API_BASE_URL}/suppliers/${id}`);
        
        // Remove the supplier from local state
        setSuppliers(prev => prev.filter(supplier => supplier.id !== id));
        
        alert('Supplier deleted successfully!');
      } catch (error) {
        console.error('Error deleting supplier:', error);
        alert('Failed to delete supplier. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditSupplier = async (supplier) => {
    // Fill the form with supplier data for editing
    setFormData({
      name: supplier.supplier_name,
      contact: supplier.contact,
      address: supplier.address,
      openingBalance: supplier.opening_balance
    });
    
    // Remove the supplier from the list temporarily (it will be re-added when form is submitted)
    setSuppliers(prev => prev.filter(s => s.id !== supplier.id));
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
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <FaPlus size={16} />
              {loading ? 'Adding...' : 'Add Supplier'}
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
            {loading ? (
              <div className="text-center text-gray-500 py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                Loading suppliers...
              </div>
            ) : suppliers.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No suppliers added yet.
              </div>
            ) : (
              <div className="space-y-2">
                {suppliers.map((supplier, index) => (
                  <div key={supplier.id} className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-50">
                    <div>{index + 1}</div>
                    <div>{supplier.supplier_name}</div>
                    <div>{supplier.contact}</div>
                    <div>{supplier.address}</div>
                    <div>{supplier.opening_balance}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditSupplier(supplier)}
                        disabled={loading}
                        className="text-blue-600 hover:text-blue-800 p-1 disabled:text-gray-400"
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteSupplier(supplier.id)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-800 p-1 disabled:text-gray-400"
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