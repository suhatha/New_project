import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Unit = () => {
  const [units, setUnits] = useState([
    { id: 1, name: 'Pcs.' },
    { id: 2, name: 'Yard' }
  ]);
  
  const [formData, setFormData] = useState({
    name: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddUnit = () => {
    if (formData.name.trim()) {
      const newUnit = {
        id: Date.now(),
        name: formData.name.trim()
      };
      setUnits(prev => [...prev, newUnit]);
      setFormData({ name: '' });
    }
  };

  const handleDeleteUnit = (id) => {
    setUnits(prev => prev.filter(unit => unit.id !== id));
  };

  const handleEditUnit = (unit) => {
    setFormData({ name: unit.name });
    handleDeleteUnit(unit.id);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddUnit();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Add Unit Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">Add Unit</h2>
          
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Unit Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button
              onClick={handleAddUnit}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold"
            >
              <FaPlus size={16} />
              Add Unit
            </button>
          </div>
        </div>

        {/* Right Section - Unit List Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-800 text-white">
            <div className="grid grid-cols-3 gap-4 p-4 font-bold text-sm">
              <div>S.No</div>
              <div>Unit Name</div>
              <div>Actions</div>
            </div>
          </div>
          
          <div className="p-4">
            {units.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No units added yet.
              </div>
            ) : (
              <div className="space-y-2">
                {units.map((unit, index) => (
                  <div key={unit.id} className="grid grid-cols-3 gap-4 p-4 border-b hover:bg-gray-50">
                    <div>{index + 1}</div>
                    <div>{unit.name}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditUnit(unit)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteUnit(unit.id)}
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

export default Unit; 