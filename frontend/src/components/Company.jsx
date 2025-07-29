import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Company = () => {
  const [companies, setCompanies] = useState([]);
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

  const handleAddCompany = () => {
    if (formData.name && formData.contact && formData.address && formData.openingBalance) {
      const newCompany = {
        id: Date.now(),
        ...formData
      };
      setCompanies(prev => [...prev, newCompany]);
      setFormData({
        name: '',
        contact: '',
        address: '',
        openingBalance: ''
      });
    }
  };

  const handleDeleteCompany = (id) => {
    setCompanies(prev => prev.filter(company => company.id !== id));
  };

  const handleEditCompany = (company) => {
    setFormData(company);
    handleDeleteCompany(company.id);
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
              onClick={handleAddCompany}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold"
            >
              <FaPlus size={16} />
              Add Company
            </button>
          </div>
        </div>

        {/* Right Section - Company List Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-800 text-white">
            <div className="grid grid-cols-6 gap-4 p-4 font-bold text-sm">
              <div>S.No</div>
              <div>Company Name</div>
              <div>Contact</div>
              <div>Address</div>
              <div>Opening Balance</div>
              <div>Actions</div>
            </div>
          </div>
          
          <div className="p-4">
            {companies.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No companies added yet.
              </div>
            ) : (
              <div className="space-y-2">
                {companies.map((company, index) => (
                  <div key={company.id} className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-50">
                    <div>{index + 1}</div>
                    <div>{company.name}</div>
                    <div>{company.contact}</div>
                    <div>{company.address}</div>
                    <div>{company.openingBalance}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCompany(company)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteCompany(company.id)}
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

export default Company; 