import React, { useState, useMemo } from 'react';
import { FaBox, FaTools, FaCalculator, FaCheck, FaTimes, FaPlus, FaTrash, FaEdit, FaEye, FaFileAlt, FaUser } from 'react-icons/fa';

const PartsEstimation = () => {
  const [estimations, setEstimations] = useState([
    {
      id: 1,
      customerName: 'Ahmed Khan',
      vehicleNumber: 'ABC-1234',
      serviceType: 'Major Service',
      status: 'Pending Approval',
      totalAmount: 8500.00,
      partsTotal: 5200.00,
      laborTotal: 3300.00,
      createdAt: '2025-07-29',
      approvedBy: null,
      approvedAt: null
    },
    {
      id: 2,
      customerName: 'Sarah Johnson',
      vehicleNumber: 'XYZ-5678',
      serviceType: 'Brake Service',
      status: 'Approved',
      totalAmount: 3200.00,
      partsTotal: 1800.00,
      laborTotal: 1400.00,
      createdAt: '2025-07-28',
      approvedBy: 'John Smith',
      approvedAt: '2025-07-28'
    }
  ]);

  const [selectedEstimation, setSelectedEstimation] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEstimation, setNewEstimation] = useState({
    customerName: '',
    vehicleNumber: '',
    serviceType: '',
    parts: [],
    labor: []
  });

  // Mock data
  const serviceTypes = [
    'Regular Service',
    'Major Service',
    'Brake Service',
    'Engine Repair',
    'Electrical Work',
    'AC Service',
    'Tire Service',
    'Custom Work'
  ];

  const availableParts = [
    { id: 1, name: 'Engine Oil Filter', price: 450.00, category: 'Engine' },
    { id: 2, name: 'Air Filter', price: 280.00, category: 'Engine' },
    { id: 3, name: 'Brake Pads Set (Front)', price: 1200.00, category: 'Brake' },
    { id: 4, name: 'Brake Pads Set (Rear)', price: 950.00, category: 'Brake' },
    { id: 5, name: 'Spark Plugs (Set of 4)', price: 1800.00, category: 'Engine' },
    { id: 6, name: 'Timing Belt', price: 2200.00, category: 'Engine' },
    { id: 7, name: 'Water Pump', price: 950.00, category: 'Cooling' },
    { id: 8, name: 'Fuel Filter', price: 280.00, category: 'Fuel' },
    { id: 9, name: 'AC Filter', price: 350.00, category: 'AC' },
    { id: 10, name: 'Battery', price: 4500.00, category: 'Electrical' }
  ];

  const laborTypes = [
    { id: 1, name: 'Engine Service Labor', rate: 800.00, hours: 2 },
    { id: 2, name: 'Brake System Labor', rate: 600.00, hours: 1.5 },
    { id: 3, name: 'Electrical Work Labor', rate: 700.00, hours: 2 },
    { id: 4, name: 'AC Service Labor', rate: 500.00, hours: 1 },
    { id: 5, name: 'Tire Service Labor', rate: 400.00, hours: 0.5 },
    { id: 6, name: 'Engine Repair Labor', rate: 1000.00, hours: 3 },
    { id: 7, name: 'Diagnostic Labor', rate: 300.00, hours: 0.5 },
    { id: 8, name: 'Custom Work Labor', rate: 900.00, hours: 2.5 }
  ];

  const handleCreateEstimation = () => {
    try {
      if (!newEstimation.customerName || !newEstimation.vehicleNumber || !newEstimation.serviceType) {
        alert('Please fill in all required fields');
        return;
      }

      const estimation = {
        id: Date.now(),
        customerName: newEstimation.customerName,
        vehicleNumber: newEstimation.vehicleNumber,
        serviceType: newEstimation.serviceType,
        status: 'Pending Approval',
        totalAmount: 0,
        partsTotal: 0,
        laborTotal: 0,
        createdAt: new Date().toISOString().split('T')[0],
        approvedBy: null,
        approvedAt: null,
        parts: newEstimation.parts,
        labor: newEstimation.labor
      };

      setEstimations(prev => [...prev, estimation]);
      setNewEstimation({
        customerName: '',
        vehicleNumber: '',
        serviceType: '',
        parts: [],
        labor: []
      });
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating estimation:', error);
    }
  };

  const handleApproveEstimation = (id) => {
    try {
      if (window.confirm('Approve this estimation?')) {
        setEstimations(prev => prev.map(est => 
          est.id === id 
            ? { 
                ...est, 
                status: 'Approved', 
                approvedBy: 'Current User',
                approvedAt: new Date().toISOString().split('T')[0]
              }
            : est
        ));
      }
    } catch (error) {
      console.error('Error approving estimation:', error);
    }
  };

  const handleRejectEstimation = (id) => {
    try {
      if (window.confirm('Reject this estimation?')) {
        setEstimations(prev => prev.map(est => 
          est.id === id 
            ? { ...est, status: 'Rejected' }
            : est
        ));
      }
    } catch (error) {
      console.error('Error rejecting estimation:', error);
    }
  };

  const handleViewDetails = (estimation) => {
    try {
      setSelectedEstimation(estimation);
      setShowDetailsModal(true);
    } catch (error) {
      console.error('Error viewing details:', error);
    }
  };

  const handleDeleteEstimation = (id) => {
    try {
      if (window.confirm('Delete this estimation?')) {
        setEstimations(prev => prev.filter(est => est.id !== id));
      }
    } catch (error) {
      console.error('Error deleting estimation:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingApprovals = useMemo(() => {
    try {
      return estimations.filter(est => est.status === 'Pending Approval');
    } catch (error) {
      console.error('Error filtering pending approvals:', error);
      return [];
    }
  }, [estimations]);

  const approvedEstimations = useMemo(() => {
    try {
      return estimations.filter(est => est.status === 'Approved');
    } catch (error) {
      console.error('Error filtering approved estimations:', error);
      return [];
    }
  }, [estimations]);

  try {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Parts Estimation & Labor Costing</h1>
            <p className="text-gray-600">Create detailed cost estimates with approval workflow</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaPlus size={14} />
            Create Estimation
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCalculator className="text-blue-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Estimations</p>
                <p className="text-2xl font-bold text-gray-900">{estimations.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaClock className="text-yellow-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold text-gray-900">{pendingApprovals.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCheck className="text-green-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{approvedEstimations.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCalculator className="text-purple-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  LKR {estimations.reduce((sum, est) => sum + est.totalAmount, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Estimations Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parts Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Labor Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {estimations.map((estimation) => (
                  <tr key={estimation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{estimation.customerName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{estimation.vehicleNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{estimation.serviceType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">LKR {estimation.partsTotal.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">LKR {estimation.laborTotal.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LKR {estimation.totalAmount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(estimation.status)}`}>
                        {estimation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(estimation)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="View Details"
                        >
                          <FaEye size={16} />
                        </button>
                        {estimation.status === 'Pending Approval' && (
                          <>
                            <button
                              onClick={() => handleApproveEstimation(estimation.id)}
                              className="text-green-600 hover:text-green-800 p-1"
                              title="Approve"
                            >
                              <FaCheck size={16} />
                            </button>
                            <button
                              onClick={() => handleRejectEstimation(estimation.id)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Reject"
                            >
                              <FaTimes size={16} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDeleteEstimation(estimation.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Estimation Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Estimation</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
                    <input
                      type="text"
                      value={newEstimation.customerName}
                      onChange={(e) => setNewEstimation(prev => ({ ...prev, customerName: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Number *</label>
                    <input
                      type="text"
                      value={newEstimation.vehicleNumber}
                      onChange={(e) => setNewEstimation(prev => ({ ...prev, vehicleNumber: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Type *</label>
                    <select
                      value={newEstimation.serviceType}
                      onChange={(e) => setNewEstimation(prev => ({ ...prev, serviceType: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Service Type</option>
                      {serviceTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Parts Selection */}
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaBox className="text-blue-600" />
                    Select Parts
                  </h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {availableParts.map((part) => (
                      <div key={part.id} className="flex items-center justify-between p-2 border border-gray-200 rounded">
                        <div>
                          <div className="text-sm font-medium">{part.name}</div>
                          <div className="text-xs text-gray-500">{part.category} - LKR {part.price.toFixed(2)}</div>
                        </div>
                        <button
                          onClick={() => {
                            const isSelected = newEstimation.parts.some(p => p.id === part.id);
                            if (isSelected) {
                              setNewEstimation(prev => ({
                                ...prev,
                                parts: prev.parts.filter(p => p.id !== part.id)
                              }));
                            } else {
                              setNewEstimation(prev => ({
                                ...prev,
                                parts: [...prev.parts, { ...part, quantity: 1 }]
                              }));
                            }
                          }}
                          className={`px-3 py-1 rounded text-xs ${
                            newEstimation.parts.some(p => p.id === part.id)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {newEstimation.parts.some(p => p.id === part.id) ? 'Selected' : 'Add'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Labor Selection */}
              <div className="mt-6">
                <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaTools className="text-green-600" />
                  Select Labor
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {laborTypes.map((labor) => (
                    <div key={labor.id} className="flex items-center justify-between p-3 border border-gray-200 rounded">
                      <div>
                        <div className="text-sm font-medium">{labor.name}</div>
                        <div className="text-xs text-gray-500">
                          {labor.hours} hours @ LKR {labor.rate.toFixed(2)}/hour
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const isSelected = newEstimation.labor.some(l => l.id === labor.id);
                          if (isSelected) {
                            setNewEstimation(prev => ({
                              ...prev,
                              labor: prev.labor.filter(l => l.id !== labor.id)
                            }));
                          } else {
                            setNewEstimation(prev => ({
                              ...prev,
                              labor: [...prev.labor, labor]
                            }));
                          }
                        }}
                        className={`px-3 py-1 rounded text-xs ${
                          newEstimation.labor.some(l => l.id === labor.id)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {newEstimation.labor.some(l => l.id === labor.id) ? 'Selected' : 'Add'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-md font-semibold text-gray-800 mb-3">Estimation Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Parts Total</p>
                    <p className="text-lg font-bold text-gray-900">
                      LKR {newEstimation.parts.reduce((sum, part) => sum + (part.price * (part.quantity || 1)), 0).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Labor Total</p>
                    <p className="text-lg font-bold text-gray-900">
                      LKR {newEstimation.labor.reduce((sum, labor) => sum + (labor.rate * labor.hours), 0).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-lg font-bold text-blue-600">
                      LKR {(newEstimation.parts.reduce((sum, part) => sum + (part.price * (part.quantity || 1)), 0) + 
                           newEstimation.labor.reduce((sum, labor) => sum + (labor.rate * labor.hours), 0)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewEstimation({
                      customerName: '',
                      vehicleNumber: '',
                      serviceType: '',
                      parts: [],
                      labor: []
                    });
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateEstimation}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create Estimation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedEstimation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Estimation Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Customer Information</h4>
                  <div className="space-y-2">
                    <div><strong>Customer:</strong> {selectedEstimation.customerName}</div>
                    <div><strong>Vehicle:</strong> {selectedEstimation.vehicleNumber}</div>
                    <div><strong>Service Type:</strong> {selectedEstimation.serviceType}</div>
                    <div><strong>Status:</strong> {selectedEstimation.status}</div>
                    <div><strong>Created:</strong> {selectedEstimation.createdAt}</div>
                    {selectedEstimation.approvedBy && (
                      <div><strong>Approved By:</strong> {selectedEstimation.approvedBy}</div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Cost Breakdown</h4>
                  <div className="space-y-2">
                    <div><strong>Parts Total:</strong> LKR {selectedEstimation.partsTotal.toFixed(2)}</div>
                    <div><strong>Labor Total:</strong> LKR {selectedEstimation.laborTotal.toFixed(2)}</div>
                    <div><strong>Total Amount:</strong> LKR {selectedEstimation.totalAmount.toFixed(2)}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error rendering PartsEstimation:', error);
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Parts Estimation & Labor Costing</h1>
        <p className="text-red-600">Error loading parts estimation page. Please refresh the page.</p>
      </div>
    );
  }
};

export default PartsEstimation; 