import React, { useState } from 'react';
import { FaFileAlt, FaEdit, FaTrash, FaPlus, FaEye, FaDownload, FaCopy, FaPalette } from 'react-icons/fa';

const QuotationTemplates = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Standard Service Template',
      description: 'Professional template for regular automotive services',
      category: 'Service',
      isActive: true,
      createdAt: '2025-07-29',
      lastUsed: '2025-07-28',
      usageCount: 45
    },
    {
      id: 2,
      name: 'Premium Repair Template',
      description: 'High-end template for major repairs and custom work',
      category: 'Repair',
      isActive: true,
      createdAt: '2025-07-25',
      lastUsed: '2025-07-27',
      usageCount: 23
    },
    {
      id: 3,
      name: 'Quick Service Template',
      description: 'Simple template for quick services and maintenance',
      category: 'Quick Service',
      isActive: false,
      createdAt: '2025-07-20',
      lastUsed: '2025-07-25',
      usageCount: 67
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    category: 'Service'
  });

  const categories = ['Service', 'Repair', 'Quick Service', 'Custom', 'Premium'];

  const handleCreateTemplate = () => {
    try {
      if (!newTemplate.name || !newTemplate.description) {
        alert('Please fill in all required fields');
        return;
      }

      const template = {
        id: Date.now(),
        ...newTemplate,
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0],
        lastUsed: null,
        usageCount: 0
      };

      setTemplates(prev => [...prev, template]);
      setNewTemplate({
        name: '',
        description: '',
        category: 'Service'
      });
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  const handleEditTemplate = () => {
    try {
      if (!selectedTemplate) return;

      setTemplates(prev => prev.map(template => 
        template.id === selectedTemplate.id 
          ? { ...template, ...newTemplate }
          : template
      ));

      setSelectedTemplate(null);
      setNewTemplate({
        name: '',
        description: '',
        category: 'Service'
      });
      setShowEditModal(false);
    } catch (error) {
      console.error('Error editing template:', error);
    }
  };

  const handleDeleteTemplate = (id) => {
    try {
      if (window.confirm('Delete this template?')) {
        setTemplates(prev => prev.filter(template => template.id !== id));
      }
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  const handleDuplicateTemplate = (template) => {
    try {
      const duplicated = {
        ...template,
        id: Date.now(),
        name: `${template.name} (Copy)`,
        createdAt: new Date().toISOString().split('T')[0],
        lastUsed: null,
        usageCount: 0
      };
      setTemplates(prev => [...prev, duplicated]);
    } catch (error) {
      console.error('Error duplicating template:', error);
    }
  };

  const handleToggleActive = (id) => {
    try {
      setTemplates(prev => prev.map(template => 
        template.id === id 
          ? { ...template, isActive: !template.isActive }
          : template
      ));
    } catch (error) {
      console.error('Error toggling template status:', error);
    }
  };

  const handleEditTemplateClick = (template) => {
    try {
      setSelectedTemplate(template);
      setNewTemplate({
        name: template.name,
        description: template.description,
        category: template.category
      });
      setShowEditModal(true);
    } catch (error) {
      console.error('Error editing template:', error);
    }
  };

  const handlePreviewTemplate = (template) => {
    try {
      setSelectedTemplate(template);
      setShowPreviewModal(true);
    } catch (error) {
      console.error('Error previewing template:', error);
    }
  };

  const activeTemplates = templates.filter(template => template.isActive);
  const totalUsage = templates.reduce((sum, template) => sum + template.usageCount, 0);

  try {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Custom Quotation Templates</h1>
            <p className="text-gray-600">Create and manage professional quotation templates</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaPlus size={14} />
            Create Template
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaFileAlt className="text-blue-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Templates</p>
                <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaEye className="text-green-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Active Templates</p>
                <p className="text-2xl font-bold text-gray-900">{activeTemplates.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaDownload className="text-purple-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Usage</p>
                <p className="text-2xl font-bold text-gray-900">{totalUsage}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaPalette className="text-orange-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow-md p-6">
              {/* Template Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {template.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleActive(template.id)}
                    className={`p-1 rounded ${template.isActive ? 'text-green-600' : 'text-gray-400'}`}
                    title={template.isActive ? 'Deactivate' : 'Activate'}
                  >
                    <FaEye size={16} />
                  </button>
                </div>
              </div>

              {/* Template Info */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{template.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Usage:</span>
                  <span className="font-medium">{template.usageCount} times</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Used:</span>
                  <span className="font-medium">{template.lastUsed || 'Never'}</span>
                </div>
              </div>

              {/* Template Preview */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="text-center">
                  <FaFileAlt className="text-gray-400 text-2xl mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Template Preview</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handlePreviewTemplate(template)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 text-sm"
                >
                  <FaEye size={12} />
                  Preview
                </button>
                <button
                  onClick={() => handleEditTemplateClick(template)}
                  className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-1 text-sm"
                >
                  <FaEdit size={12} />
                  Edit
                </button>
                <button
                  onClick={() => handleDuplicateTemplate(template)}
                  className="flex-1 bg-purple-600 text-white px-3 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center gap-1 text-sm"
                >
                  <FaCopy size={12} />
                  Copy
                </button>
                <button
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-1 text-sm"
                >
                  <FaTrash size={12} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Create Template Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Template</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Template Name *</label>
                  <input
                    type="text"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewTemplate({
                      name: '',
                      description: '',
                      category: 'Service'
                    });
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTemplate}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create Template
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Template Modal */}
        {showEditModal && selectedTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Template</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Template Name *</label>
                  <input
                    type="text"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedTemplate(null);
                    setNewTemplate({
                      name: '',
                      description: '',
                      category: 'Service'
                    });
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditTemplate}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Update Template
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {showPreviewModal && selectedTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Template Preview</h3>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="border border-gray-300 rounded-lg p-6">
                {/* Header */}
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">IMSS AutoSuite</h1>
                  <p className="text-gray-600">Professional Automotive Services</p>
                  <p className="text-sm text-gray-500 mt-2">123 Auto Street, Colombo, Sri Lanka</p>
                  <p className="text-sm text-gray-500">Phone: +94 11 234 5678</p>
                </div>

                {/* Template Details */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Template Information</h3>
                  <div className="space-y-2">
                    <div><strong>Name:</strong> {selectedTemplate.name}</div>
                    <div><strong>Description:</strong> {selectedTemplate.description}</div>
                    <div><strong>Category:</strong> {selectedTemplate.category}</div>
                    <div><strong>Status:</strong> {selectedTemplate.isActive ? 'Active' : 'Inactive'}</div>
                    <div><strong>Usage Count:</strong> {selectedTemplate.usageCount}</div>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-600">
                  <p>This is a preview of the {selectedTemplate.name} template.</p>
                  <p>Template ID: {selectedTemplate.id}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error rendering QuotationTemplates:', error);
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Custom Quotation Templates</h1>
        <p className="text-red-600">Error loading quotation templates page. Please refresh the page.</p>
      </div>
    );
  }
};

export default QuotationTemplates; 