import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const BranchManagement = () => {
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: '',
    manager: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddBranch = () => {
    if (formData.name && formData.address && formData.contact && formData.manager) {
      const newBranch = {
        id: Date.now(),
        ...formData
      };
      setBranches(prev => [...prev, newBranch]);
      setFormData({
        name: '',
        address: '',
        contact: '',
        manager: ''
      });
    }
  };

  const handleDeleteBranch = (id) => {
    setBranches(prev => prev.filter(branch => branch.id !== id));
  };

  const handleEditBranch = (branch) => {
    setFormData(branch);
    handleDeleteBranch(branch.id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Branch Management</h1>

        {/* Input Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Branch Name"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            placeholder="Contact"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="manager"
            value={formData.manager}
            onChange={handleInputChange}
            placeholder="Manager"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Add Branch Button */}
        <button
          onClick={handleAddBranch}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FaPlus size={14} />
          Add Branch
        </button>

        {/* Table Section */}
        <div className="mt-8">
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Address</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Contact</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Manager</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {branches.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                    No branches added yet.
                  </td>
                </tr>
              ) : (
                branches.map((branch) => (
                  <tr key={branch.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{branch.name}</td>
                    <td className="px-4 py-3">{branch.address}</td>
                    <td className="px-4 py-3">{branch.contact}</td>
                    <td className="px-4 py-3">{branch.manager}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditBranch(branch)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Edit"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteBranch(branch.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BranchManagement; 