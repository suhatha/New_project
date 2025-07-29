import React, { useState } from 'react';
import { FaShieldAlt, FaCalendarAlt, FaBell, FaEdit, FaTrash, FaPlus, FaSearch, FaDownload, FaPrint, FaEye, FaExclamationTriangle, FaCheck, FaClock, FaFileAlt, FaEnvelope, FaSms } from 'react-icons/fa';

const InsuranceWarranty = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      vehicleId: 'ABC-1234',
      customerName: 'Ahmed Khan',
      documentType: 'Insurance',
      provider: 'Ceylinco Insurance',
      policyNumber: 'POL-2024-001',
      startDate: '2024-01-01',
      expiryDate: '2025-12-31',
      coverage: 'Comprehensive',
      premium: 45000,
      status: 'Active',
      reminderSent: false,
      nextReminder: '2025-11-15',
      documents: ['insurance_policy.pdf', 'coverage_details.pdf']
    },
    {
      id: 2,
      vehicleId: 'XYZ-5678',
      customerName: 'Sarah Johnson',
      documentType: 'Warranty',
      provider: 'Toyota Lanka',
      policyNumber: 'WAR-2024-002',
      startDate: '2024-03-15',
      expiryDate: '2026-03-15',
      coverage: 'Engine & Transmission',
      premium: 0,
      status: 'Active',
      reminderSent: false,
      nextReminder: '2026-01-15',
      documents: ['warranty_certificate.pdf', 'terms_conditions.pdf']
    },
    {
      id: 3,
      vehicleId: 'DEF-9012',
      customerName: 'David Brown',
      documentType: 'Insurance',
      provider: 'Sri Lanka Insurance',
      policyNumber: 'POL-2024-003',
      startDate: '2024-06-01',
      expiryDate: '2025-05-31',
      coverage: 'Third Party',
      premium: 25000,
      status: 'Expiring Soon',
      reminderSent: true,
      nextReminder: '2025-04-15',
      documents: ['insurance_policy.pdf']
    },
    {
      id: 4,
      vehicleId: 'GHI-3456',
      customerName: 'Maria Silva',
      documentType: 'Extended Warranty',
      provider: 'Honda Lanka',
      policyNumber: 'EXT-2024-004',
      startDate: '2024-08-20',
      expiryDate: '2027-08-20',
      coverage: 'Full Vehicle',
      premium: 75000,
      status: 'Active',
      reminderSent: false,
      nextReminder: '2027-06-20',
      documents: ['extended_warranty.pdf', 'coverage_terms.pdf']
    }
  ]);

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [newDocument, setNewDocument] = useState({
    vehicleId: '',
    customerName: '',
    documentType: 'Insurance',
    provider: '',
    policyNumber: '',
    startDate: '',
    expiryDate: '',
    coverage: '',
    premium: '',
    documents: []
  });

  const documentTypes = ['Insurance', 'Warranty', 'Extended Warranty', 'Service Contract'];
  const providers = [
    'Ceylinco Insurance', 'Sri Lanka Insurance', 'Allianz Insurance', 'AIA Insurance',
    'Toyota Lanka', 'Honda Lanka', 'Nissan Lanka', 'Suzuki Lanka', 'Mitsubishi Lanka'
  ];
  const coverageTypes = [
    'Comprehensive', 'Third Party', 'Engine & Transmission', 'Full Vehicle', 
    'Electrical System', 'Air Conditioning', 'Suspension & Steering'
  ];
  const statuses = ['Active', 'Expiring Soon', 'Expired', 'Cancelled'];

  const handleAddDocument = () => {
    try {
      if (!newDocument.vehicleId || !newDocument.customerName || !newDocument.provider || !newDocument.policyNumber) {
        alert('Please fill in all required fields');
        return;
      }

      const document = {
        id: Date.now(),
        ...newDocument,
        premium: parseFloat(newDocument.premium) || 0,
        status: 'Active',
        reminderSent: false,
        nextReminder: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        documents: []
      };

      setDocuments(prev => [...prev, document]);
      setNewDocument({
        vehicleId: '',
        customerName: '',
        documentType: 'Insurance',
        provider: '',
        policyNumber: '',
        startDate: '',
        expiryDate: '',
        coverage: '',
        premium: '',
        documents: []
      });
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const handleEditDocument = () => {
    try {
      if (!selectedDocument) return;

      setDocuments(prev => prev.map(doc => 
        doc.id === selectedDocument.id 
          ? { ...doc, ...newDocument, premium: parseFloat(newDocument.premium) || 0 }
          : doc
      ));

      setSelectedDocument(null);
      setNewDocument({
        vehicleId: '',
        customerName: '',
        documentType: 'Insurance',
        provider: '',
        policyNumber: '',
        startDate: '',
        expiryDate: '',
        coverage: '',
        premium: '',
        documents: []
      });
      setShowEditModal(false);
    } catch (error) {
      console.error('Error editing document:', error);
    }
  };

  const handleDeleteDocument = (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this document?')) {
        setDocuments(prev => prev.filter(doc => doc.id !== id));
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleViewDetails = (document) => {
    try {
      setSelectedDocument(document);
      setShowDetailsModal(true);
    } catch (error) {
      console.error('Error viewing details:', error);
    }
  };

  const handleEditClick = (document) => {
    try {
      setSelectedDocument(document);
      setNewDocument({
        vehicleId: document.vehicleId,
        customerName: document.customerName,
        documentType: document.documentType,
        provider: document.provider,
        policyNumber: document.policyNumber,
        startDate: document.startDate,
        expiryDate: document.expiryDate,
        coverage: document.coverage,
        premium: document.premium.toString(),
        documents: document.documents
      });
      setShowEditModal(true);
    } catch (error) {
      console.error('Error editing document:', error);
    }
  };

  const handleSendReminder = (id) => {
    try {
      setDocuments(prev => prev.map(doc => 
        doc.id === id
          ? { ...doc, reminderSent: true, nextReminder: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] }
          : doc
      ));
      alert('Reminder sent successfully!');
    } catch (error) {
      console.error('Error sending reminder:', error);
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.policyNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !filterType || doc.documentType === filterType;
    const matchesStatus = !filterStatus || doc.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDocumentTypeColor = (type) => {
    switch (type) {
      case 'Insurance': return 'bg-blue-100 text-blue-800';
      case 'Warranty': return 'bg-purple-100 text-purple-800';
      case 'Extended Warranty': return 'bg-indigo-100 text-indigo-800';
      case 'Service Contract': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const expiringSoon = documents.filter(doc => {
    const daysUntil = getDaysUntilExpiry(doc.expiryDate);
    return daysUntil <= 30 && daysUntil > 0;
  });

  const expired = documents.filter(doc => {
    const daysUntil = getDaysUntilExpiry(doc.expiryDate);
    return daysUntil < 0;
  });

  try {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Insurance, Warranty & Reminder Setup</h1>
            <p className="text-gray-600">Manage vehicle documentation, track expiry dates, and set up automated reminders</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <FaPlus size={16} />
              Add Document
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
              <FaDownload size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaShieldAlt className="text-blue-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCheck className="text-green-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{documents.filter(doc => doc.status === 'Active').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaExclamationTriangle className="text-yellow-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-gray-900">{expiringSoon.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaClock className="text-red-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-gray-900">{expired.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              {documentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
              <FaBell size={16} />
              Send Reminders
            </button>
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map((doc) => {
                  const daysUntil = getDaysUntilExpiry(doc.expiryDate);
                  return (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{doc.customerName}</div>
                          <div className="text-sm text-gray-500">{doc.policyNumber}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.vehicleId}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getDocumentTypeColor(doc.documentType)}`}>
                          {doc.documentType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.provider}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{doc.expiryDate}</div>
                          <div className="text-sm text-gray-500">
                            {daysUntil < 0 ? `${Math.abs(daysUntil)} days overdue` : 
                             daysUntil === 0 ? 'Expires today' : 
                             `${daysUntil} days left`}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewDetails(doc)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="View Details"
                          >
                            <FaEye size={16} />
                          </button>
                          <button
                            onClick={() => handleEditClick(doc)}
                            className="text-green-600 hover:text-green-800 p-1"
                            title="Edit Document"
                          >
                            <FaEdit size={16} />
                          </button>
                          {!doc.reminderSent && daysUntil <= 30 && daysUntil > 0 && (
                            <button
                              onClick={() => handleSendReminder(doc.id)}
                              className="text-orange-600 hover:text-orange-800 p-1"
                              title="Send Reminder"
                            >
                              <FaBell size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete Document"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Document Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Add New Document</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle ID *</label>
                  <input
                    type="text"
                    value={newDocument.vehicleId}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, vehicleId: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
                  <input
                    type="text"
                    value={newDocument.customerName}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, customerName: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Document Type *</label>
                  <select
                    value={newDocument.documentType}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, documentType: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {documentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Provider *</label>
                  <select
                    value={newDocument.provider}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, provider: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Provider</option>
                    {providers.map(provider => (
                      <option key={provider} value={provider}>{provider}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Policy Number *</label>
                  <input
                    type="text"
                    value={newDocument.policyNumber}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, policyNumber: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={newDocument.startDate}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                  <input
                    type="date"
                    value={newDocument.expiryDate}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, expiryDate: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Coverage</label>
                  <select
                    value={newDocument.coverage}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, coverage: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Coverage</option>
                    {coverageTypes.map(coverage => (
                      <option key={coverage} value={coverage}>{coverage}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Premium (LKR)</label>
                  <input
                    type="number"
                    value={newDocument.premium}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, premium: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddDocument}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Document
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Document Modal */}
        {showEditModal && selectedDocument && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Edit Document</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle ID *</label>
                  <input
                    type="text"
                    value={newDocument.vehicleId}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, vehicleId: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
                  <input
                    type="text"
                    value={newDocument.customerName}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, customerName: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Document Type *</label>
                  <select
                    value={newDocument.documentType}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, documentType: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {documentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Provider *</label>
                  <select
                    value={newDocument.provider}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, provider: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Provider</option>
                    {providers.map(provider => (
                      <option key={provider} value={provider}>{provider}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Policy Number *</label>
                  <input
                    type="text"
                    value={newDocument.policyNumber}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, policyNumber: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={newDocument.startDate}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                  <input
                    type="date"
                    value={newDocument.expiryDate}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, expiryDate: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Coverage</label>
                  <select
                    value={newDocument.coverage}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, coverage: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Coverage</option>
                    {coverageTypes.map(coverage => (
                      <option key={coverage} value={coverage}>{coverage}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Premium (LKR)</label>
                  <input
                    type="number"
                    value={newDocument.premium}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, premium: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditDocument}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Update Document
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Document Details Modal */}
        {showDetailsModal && selectedDocument && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Document Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Document Information */}
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Document Information</h4>
                  <div className="space-y-2">
                    <div><strong>Customer:</strong> {selectedDocument.customerName}</div>
                    <div><strong>Vehicle ID:</strong> {selectedDocument.vehicleId}</div>
                    <div><strong>Document Type:</strong> {selectedDocument.documentType}</div>
                    <div><strong>Provider:</strong> {selectedDocument.provider}</div>
                    <div><strong>Policy Number:</strong> {selectedDocument.policyNumber}</div>
                    <div><strong>Coverage:</strong> {selectedDocument.coverage}</div>
                    <div><strong>Premium:</strong> LKR {selectedDocument.premium.toFixed(2)}</div>
                  </div>
                </div>

                {/* Dates and Status */}
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Dates and Status</h4>
                  <div className="space-y-2">
                    <div><strong>Start Date:</strong> {selectedDocument.startDate}</div>
                    <div><strong>Expiry Date:</strong> {selectedDocument.expiryDate}</div>
                    <div><strong>Status:</strong> {selectedDocument.status}</div>
                    <div><strong>Reminder Sent:</strong> {selectedDocument.reminderSent ? 'Yes' : 'No'}</div>
                    <div><strong>Next Reminder:</strong> {selectedDocument.nextReminder}</div>
                    <div><strong>Days Until Expiry:</strong> {getDaysUntilExpiry(selectedDocument.expiryDate)}</div>
                  </div>
                </div>
              </div>

              {/* Attached Documents */}
              {selectedDocument.documents.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Attached Documents</h4>
                  <div className="space-y-2">
                    {selectedDocument.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center gap-2">
                          <FaFileAlt className="text-blue-600" />
                          <span className="text-sm text-gray-900">{doc}</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800 p-1">
                            <FaEye size={16} />
                          </button>
                          <button className="text-green-600 hover:text-green-800 p-1">
                            <FaDownload size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reminder Actions */}
              <div className="mt-6 flex gap-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <FaEnvelope size={16} />
                  Send Email Reminder
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2">
                  <FaSms size={16} />
                  Send SMS Reminder
                </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2">
                  <FaPrint size={16} />
                  Print Document
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error rendering InsuranceWarranty:', error);
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Insurance, Warranty & Reminder Setup</h1>
        <p className="text-red-600">Error loading insurance and warranty page. Please refresh the page.</p>
      </div>
    );
  }
};

export default InsuranceWarranty; 