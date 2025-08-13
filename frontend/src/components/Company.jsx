import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  // API base URL - adjust this to match your Laravel backend URL
  const API_BASE_URL = 'http://127.0.0.1:8000/api';

  // Load companies from backend on component mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/companies`);
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
      alert('Failed to load companies. Please check if the backend server is running.');
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

  const handleAddCompany = async () => {
    if (formData.name.trim()) {
      try {
        setLoading(true);
        // Map frontend field names to backend field names
        const companyData = {
          company_name: formData.name.trim(),
          description: formData.description || null
        };
        
        const response = await axios.post(`${API_BASE_URL}/companies`, companyData);
        
        // Add the new company to the local state
        setCompanies(prev => [...prev, response.data]);
        
        // Clear the form
        setFormData({ name: '', description: '' });
        
        alert('Company added successfully!');
      } catch (error) {
        console.error('Error adding company:', error);
        alert('Failed to add company. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter a company name.');
    }
  };

  const handleDeleteCompany = async (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        setLoading(true);
        await axios.delete(`${API_BASE_URL}/companies/${id}`);
        
        // Remove the company from local state
        setCompanies(prev => prev.filter(company => company.id !== id));
        
        alert('Company deleted successfully!');
      } catch (error) {
        console.error('Error deleting company:', error);
        alert('Failed to delete company. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditCompany = (company) => {
    // Fill the form with company data for editing
    setFormData({
      name: company.company_name,
      description: company.description || ''
    });
    
    // Remove the company from the list temporarily (it will be re-added when form is submitted)
    setCompanies(prev => prev.filter(c => c.id !== company.id));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Add Company Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">Add Company</h2>
          
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Company Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description (Optional)"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button
              onClick={handleAddCompany}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <FaPlus size={16} />
              {loading ? 'Adding...' : 'Add Company'}
            </button>
          </div>
        </div>

        {/* Right Section - Company List Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-800 text-white">
            <div className="grid grid-cols-4 gap-4 p-4 font-bold text-sm">
              <div>S.No</div>
              <div>Company Name</div>
              <div>Description</div>
              <div>Actions</div>
            </div>
          </div>
          
          <div className="p-4">
            {loading ? (
              <div className="text-center text-gray-500 py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                Loading companies...
              </div>
            ) : companies.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No companies added yet.
              </div>
            ) : (
              <div className="space-y-2">
                {companies.map((company, index) => (
                  <div key={company.id} className="grid grid-cols-4 gap-4 p-4 border-b hover:bg-gray-50">
                    <div>{index + 1}</div>
                    <div>{company.company_name}</div>
                    <div>{company.description || 'No description'}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCompany(company)}
                        disabled={loading}
                        className="text-blue-600 hover:text-blue-800 p-1 disabled:text-gray-400"
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteCompany(company.id)}
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

export default Company; 