import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const StoreLocation = () => {
  const [storeLocations, setStoreLocations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddStoreLocation = () => {
    if (formData.name && formData.phone && formData.address) {
      const newStoreLocation = {
        id: Date.now(),
        ...formData
      };
      setStoreLocations(prev => [...prev, newStoreLocation]);
      setFormData({
        name: '',
        phone: '',
        address: ''
      });
    }
  };

  const handleDeleteStoreLocation = (id) => {
    setStoreLocations(prev => prev.filter(store => store.id !== id));
  };

  const handleEditStoreLocation = (store) => {
    setFormData(store);
    handleDeleteStoreLocation(store.id);
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
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold"
            >
              <FaPlus size={16} />
              Add Store
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
            {storeLocations.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No store locations added yet.
              </div>
            ) : (
              <div className="space-y-2">
                {storeLocations.map((store, index) => (
                  <div key={store.id} className="grid grid-cols-5 gap-4 p-4 border-b hover:bg-gray-50">
                    <div>{index + 1}</div>
                    <div>{store.name}</div>
                    <div>{store.phone}</div>
                    <div>{store.address}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditStoreLocation(store)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteStoreLocation(store.id)}
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

export default StoreLocation; 