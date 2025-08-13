import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';

const StoreLocation = () => {
  const [storeLocations, setStoreLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  // API base URL - adjust this to match your Laravel backend URL
  const API_BASE_URL = 'http://127.0.0.1:8000/api';

  // Fetch store locations from backend API
  const fetchStoreLocations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/store-locations`);
      setStoreLocations(response.data);
    } catch (error) {
      console.error('Error fetching store locations:', error);
      alert('Failed to fetch store locations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch store locations when component mounts
  useEffect(() => {
    fetchStoreLocations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddStoreLocation = async () => {
    if (formData.name.trim()) {
      try {
        setLoading(true);
        // Map frontend field names to backend field names
        const storeLocationData = {
          location_name: formData.name.trim(),
          phone: formData.phone || null,
          address: formData.address || null
        };
        
        const response = await axios.post(`${API_BASE_URL}/store-locations`, storeLocationData);
        
        // Add the new store location to the local state
        setStoreLocations(prev => [...prev, response.data]);
        
        // Clear the form
        setFormData({ name: '', phone: '', address: '' });
        
        alert('Store location added successfully!');
      } catch (error) {
        console.error('Error adding store location:', error);
        alert('Failed to add store location. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter a store location name.');
    }
  };

  const handleDeleteStoreLocation = async (id) => {
    if (window.confirm('Are you sure you want to delete this store location?')) {
      try {
        setLoading(true);
        await axios.delete(`${API_BASE_URL}/store-locations/${id}`);
        
        // Remove the store location from local state
        setStoreLocations(prev => prev.filter(store => store.id !== id));
        
        alert('Store location deleted successfully!');
      } catch (error) {
        console.error('Error deleting store location:', error);
        alert('Failed to delete store location. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditStoreLocation = (store) => {
    // Fill the form with store location data for editing
    setFormData({
      name: store.location_name,
      phone: store.phone || '',
      address: store.address || ''
    });
    
    // Remove the store location from the list temporarily (it will be re-added when form is submitted)
    setStoreLocations(prev => prev.filter(s => s.id !== store.id));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Add Store Location Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">Add Store Location</h2>
          
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Store Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
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
            
            <button
              onClick={handleAddStoreLocation}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <FaPlus size={16} />
              {loading ? 'Adding...' : 'Add Store'}
            </button>
          </div>
        </div>

        {/* Right Section - Store Location List Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-800 text-white">
            <div className="grid grid-cols-5 gap-4 p-4 font-bold text-sm">
              <div>S.No</div>
              <div>Store Name</div>
              <div>Phone</div>
              <div>Address</div>
              <div>Actions</div>
            </div>
          </div>
          
          <div className="p-4">
            {loading ? (
              <div className="text-center text-gray-500 py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                Loading store locations...
              </div>
            ) : storeLocations.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No store locations added yet.
              </div>
            ) : (
              <div className="space-y-2">
                {storeLocations.map((store, index) => (
                  <div key={store.id} className="grid grid-cols-5 gap-4 p-4 border-b hover:bg-gray-50">
                    <div>{index + 1}</div>
                    <div>{store.location_name}</div>
                    <div>{store.phone || 'N/A'}</div>
                    <div>{store.address || 'N/A'}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditStoreLocation(store)}
                        disabled={loading}
                        className="text-blue-600 hover:text-blue-800 p-1 disabled:text-gray-400"
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteStoreLocation(store.id)}
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

export default StoreLocation; 