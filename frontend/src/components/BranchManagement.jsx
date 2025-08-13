import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000'; // or your backend server URL

const BranchManagement = () => {
  const [branches, setBranches] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    phone: '',
    email: '',
    status: 'active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/branches');
      setBranches(Array.isArray(res.data.branches) ? res.data.branches : []);
    } catch (err) {
      setError('Failed to fetch branches');
    }
    setLoading(false);
  };


  const handleSaveBranch = async () => {
    if (formData.name && formData.location && formData.phone) {
      try {
        const payload = {
          ...formData,
          status: formData.status === true || formData.status === 'active' ? true : false,
        };
        if (editingId) {
          await axios.put(`/api/branches/${editingId}`, payload);
        } else {
          await axios.post('/api/branches', payload);
        }
        fetchBranches();
        setFormData({
          name: '',
          location: '',
          phone: '',
          email: '',
          status: 'active'
        });
        setEditingId(null);
        setShowModal(false);
      } catch (err) {
        setError('Failed to save branch');
      }
    }
  };


  const handleOpenModal = () => {
    setFormData({
      name: '',
      location: '',
      phone: '',
      email: '',
      status: 'active'
    });
    setEditingId(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: '',
      location: '',
      phone: '',
      email: '',
      status: 'active'
    });
    setEditingId(null);
  };

  const handleDeleteBranch = async (id) => {
    try {
      await axios.delete(`/api/branches/${id}`);
      fetchBranches();
    } catch (err) {
      setError('Failed to delete branch');
    }
  };

  const handleEditBranch = (branch) => {
    setFormData({
      name: branch.name,
      location: branch.location,
      phone: branch.phone,
      email: branch.email,
      status: branch.status === true || branch.status === 1 || branch.status === 'active',
    });
    setEditingId(branch.id);
    setShowModal(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Branch Management</h1>

        {/* Add Branch Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4 text-blue-600">Add Branch</h2>
              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Branch Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email (optional)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                  <label className="font-medium text-gray-700">Status:</label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData(prev => ({
                        ...prev,
                        status: prev.status === true || prev.status === 'active' ? false : true
                      }))
                    }
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 border focus:outline-none ${formData.status === true || formData.status === 'active' ? 'bg-green-500 border-green-600' : 'bg-white border-gray-300'}`}
                  >
                    <span className={`w-full h-full flex items-center transition-colors duration-200 ${formData.status === true || formData.status === 'active' ? 'bg-green-400' : 'bg-gray-200'} rounded-full p-1`}>
                      <span className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${formData.status === true || formData.status === 'active' ? 'translate-x-6' : ''}`}></span>
                    </span>
                  </button>
                  <span className="ml-2 text-sm">
                    {formData.status === true ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveBranch}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}


        {/* Add Branch Button */}
        <button
          onClick={handleOpenModal}
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
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Location</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Phone</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                    Loading branches...
                  </td>
                </tr>
              ) : branches.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                    No branches added yet.
                  </td>
                </tr>
              ) : (
                branches.map((branch) => (
                  <tr key={branch.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{branch.name}</td>
                    <td className="px-4 py-3">{branch.location}</td>
                    <td className="px-4 py-3">{branch.phone}</td>
                    <td className="px-4 py-3">{branch.email}</td>
                    <td className="px-4 py-3">
                      {branch.status === true || branch.status === 'active' ? (
                        <span className="inline-block px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded">Active</span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded">Inactive</span>
                      )}
                    </td>
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