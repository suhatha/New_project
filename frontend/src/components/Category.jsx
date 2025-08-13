import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  // API base URL - adjust this to match your Laravel backend URL
  const API_BASE_URL = 'http://127.0.0.1:8000/api';

  // Load categories from backend on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Failed to load categories. Please check if the backend server is running.');
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

  const handleAddCategory = async () => {
    if (formData.name.trim()) {
      try {
        setLoading(true);
        // Map frontend field names to backend field names
        const categoryData = {
          category_name: formData.name.trim(),
          description: formData.description || null
        };
        
        const response = await axios.post(`${API_BASE_URL}/categories`, categoryData);
        
        // Add the new category to the local state
        setCategories(prev => [...prev, response.data]);
        
        // Clear the form
        setFormData({ name: '', description: '' });
        
        alert('Category added successfully!');
      } catch (error) {
        console.error('Error adding category:', error);
        alert('Failed to add category. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter a category name.');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        setLoading(true);
        await axios.delete(`${API_BASE_URL}/categories/${id}`);
        
        // Remove the category from local state
        setCategories(prev => prev.filter(category => category.id !== id));
        
        alert('Category deleted successfully!');
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditCategory = (category) => {
    // Fill the form with category data for editing
    setFormData({
      name: category.category_name,
      description: category.description || ''
    });
    
    // Remove the category from the list temporarily (it will be re-added when form is submitted)
    setCategories(prev => prev.filter(c => c.id !== category.id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddCategory();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Add Category Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">Add Category</h2>
          
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Category Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button
              onClick={handleAddCategory}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <FaPlus size={16} />
              {loading ? 'Adding...' : 'Add Category'}
            </button>
          </div>
        </div>

        {/* Right Section - Category List Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-800 text-white">
            <div className="grid grid-cols-3 gap-4 p-4 font-bold text-sm">
              <div>S.No</div>
              <div>Category Name</div>
              <div>Actions</div>
            </div>
          </div>
          
          <div className="p-4">
            {loading ? (
              <div className="text-center text-gray-500 py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                Loading categories...
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No categories added yet.
              </div>
            ) : (
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <div key={category.id} className="grid grid-cols-3 gap-4 p-4 border-b hover:bg-gray-50">
                    <div>{index + 1}</div>
                    <div>{category.category_name}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCategory(category)}
                        disabled={loading}
                        className="text-blue-600 hover:text-blue-800 p-1 disabled:text-gray-400"
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
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

export default Category; 