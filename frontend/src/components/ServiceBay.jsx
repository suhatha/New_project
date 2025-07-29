import React, { useState, useMemo } from 'react';
import { FaCar, FaTools, FaUser, FaClock, FaCheck, FaTimes, FaEdit, FaPlus, FaEye } from 'react-icons/fa';

const ServiceBay = () => {
  const [bays, setBays] = useState([
    {
      id: 1,
      name: 'Bay 1',
      status: 'Occupied',
      currentVehicle: {
        id: 1,
        customerName: 'Ahmed Khan',
        vehicleNumber: 'ABC-1234',
        serviceType: 'Regular Service',
        technician: 'John Smith',
        startTime: '09:00',
        estimatedEndTime: '11:00',
        progress: 65,
        notes: 'Oil change and filter replacement in progress'
      }
    },
    {
      id: 2,
      name: 'Bay 2',
      status: 'Available',
      currentVehicle: null
    },
    {
      id: 3,
      name: 'Bay 3',
      status: 'Occupied',
      currentVehicle: {
        id: 2,
        customerName: 'Sarah Johnson',
        vehicleNumber: 'XYZ-5678',
        serviceType: 'Brake Service',
        technician: 'Mike Wilson',
        startTime: '10:00',
        estimatedEndTime: '12:30',
        progress: 30,
        notes: 'Front brake pads replacement'
      }
    },
    {
      id: 4,
      name: 'Bay 4',
      status: 'Maintenance',
      currentVehicle: null
    },
    {
      id: 5,
      name: 'Bay 5',
      status: 'Occupied',
      currentVehicle: {
        id: 3,
        customerName: 'David Brown',
        vehicleNumber: 'DEF-9012',
        serviceType: 'Engine Repair',
        technician: 'Alex Davis',
        startTime: '13:00',
        estimatedEndTime: '16:00',
        progress: 15,
        notes: 'Engine diagnostic and repair'
      }
    }
  ]);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedBay, setSelectedBay] = useState(null);
  const [newAssignment, setNewAssignment] = useState({
    customerName: '',
    vehicleNumber: '',
    serviceType: '',
    technician: '',
    estimatedHours: 2,
    notes: ''
  });

  // Mock data
  const technicians = [
    'John Smith',
    'Mike Wilson',
    'Alex Davis',
    'Sarah Chen',
    'Tom Anderson'
  ];

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Occupied': return 'bg-blue-100 text-blue-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Cleaning': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Available': return '🟢';
      case 'Occupied': return '🔵';
      case 'Maintenance': return '🟡';
      case 'Cleaning': return '🟣';
      default: return '⚪';
    }
  };

  const handleAssignVehicle = (bayId) => {
    try {
      setSelectedBay(bayId);
      setShowAssignModal(true);
    } catch (error) {
      console.error('Error assigning vehicle:', error);
    }
  };

  const handleCompleteService = (bayId) => {
    try {
      if (window.confirm('Mark this service as completed?')) {
        setBays(prev => prev.map(bay => 
          bay.id === bayId 
            ? { ...bay, status: 'Available', currentVehicle: null }
            : bay
        ));
      }
    } catch (error) {
      console.error('Error completing service:', error);
    }
  };

  const handleAssignToBay = () => {
    try {
      if (!newAssignment.customerName || !newAssignment.vehicleNumber || !newAssignment.serviceType) {
        alert('Please fill in all required fields');
        return;
      }

      const startTime = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });

      const endTime = new Date(Date.now() + newAssignment.estimatedHours * 60 * 60 * 1000)
        .toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });

      const vehicle = {
        id: Date.now(),
        customerName: newAssignment.customerName,
        vehicleNumber: newAssignment.vehicleNumber,
        serviceType: newAssignment.serviceType,
        technician: newAssignment.technician,
        startTime: startTime,
        estimatedEndTime: endTime,
        progress: 0,
        notes: newAssignment.notes
      };

      setBays(prev => prev.map(bay => 
        bay.id === selectedBay 
          ? { ...bay, status: 'Occupied', currentVehicle: vehicle }
          : bay
      ));

      setNewAssignment({
        customerName: '',
        vehicleNumber: '',
        serviceType: '',
        technician: '',
        estimatedHours: 2,
        notes: ''
      });
      setShowAssignModal(false);
      setSelectedBay(null);
    } catch (error) {
      console.error('Error assigning to bay:', error);
    }
  };

  const handleInputChange = (e) => {
    try {
      const { name, value } = e.target;
      setNewAssignment(prev => ({
        ...prev,
        [name]: name === 'estimatedHours' ? parseFloat(value) || 0 : value
      }));
    } catch (error) {
      console.error('Error in handleInputChange:', error);
    }
  };

  const handleUpdateProgress = (bayId, newProgress) => {
    try {
      setBays(prev => prev.map(bay => 
        bay.id === bayId && bay.currentVehicle
          ? { 
              ...bay, 
              currentVehicle: { 
                ...bay.currentVehicle, 
                progress: Math.max(0, Math.min(100, newProgress)) 
              } 
            }
          : bay
      ));
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const availableBays = useMemo(() => {
    try {
      return bays.filter(bay => bay.status === 'Available');
    } catch (error) {
      console.error('Error filtering available bays:', error);
      return [];
    }
  }, [bays]);

  const occupiedBays = useMemo(() => {
    try {
      return bays.filter(bay => bay.status === 'Occupied');
    } catch (error) {
      console.error('Error filtering occupied bays:', error);
      return [];
    }
  }, [bays]);

  try {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Service Bay Assignment</h1>
            <p className="text-gray-600">Multi-bay view for real-time vehicle tracking</p>
          </div>
          <div className="flex gap-2">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {availableBays.length} Available
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {occupiedBays.length} Occupied
            </div>
          </div>
        </div>

        {/* Bay Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {bays.map((bay) => (
            <div key={bay.id} className="bg-white rounded-lg shadow-md p-6">
              {/* Bay Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{bay.name}</h3>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bay.status)}`}>
                    {getStatusIcon(bay.status)} {bay.status}
                  </span>
                </div>
              </div>

              {/* Bay Content */}
              {bay.currentVehicle ? (
                <div className="space-y-4">
                  {/* Vehicle Info */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FaCar className="text-blue-600" />
                      <span className="font-medium text-gray-800">{bay.currentVehicle.vehicleNumber}</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div><strong>Customer:</strong> {bay.currentVehicle.customerName}</div>
                      <div><strong>Service:</strong> {bay.currentVehicle.serviceType}</div>
                      <div><strong>Technician:</strong> {bay.currentVehicle.technician}</div>
                      <div><strong>Time:</strong> {bay.currentVehicle.startTime} - {bay.currentVehicle.estimatedEndTime}</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-600">{bay.currentVehicle.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${bay.currentVehicle.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleUpdateProgress(bay.id, bay.currentVehicle.progress - 10)}
                        className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                      >
                        -10%
                      </button>
                      <button
                        onClick={() => handleUpdateProgress(bay.id, bay.currentVehicle.progress + 10)}
                        className="text-xs bg-blue-200 text-blue-700 px-2 py-1 rounded hover:bg-blue-300"
                      >
                        +10%
                      </button>
                    </div>
                  </div>

                  {/* Notes */}
                  {bay.currentVehicle.notes && (
                    <div className="bg-yellow-50 rounded-lg p-3">
                      <div className="text-sm text-gray-700">
                        <strong>Notes:</strong> {bay.currentVehicle.notes}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCompleteService(bay.id)}
                      className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaCheck size={14} />
                      Complete
                    </button>
                    <button className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      <FaEdit size={14} />
                      Edit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaCar className="text-gray-400 text-4xl mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No vehicle assigned</p>
                  {bay.status === 'Available' && (
                    <button
                      onClick={() => handleAssignVehicle(bay.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                    >
                      <FaPlus size={14} />
                      Assign Vehicle
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Bay Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{bays.length}</div>
              <div className="text-sm text-gray-600">Total Bays</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{availableBays.length}</div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{occupiedBays.length}</div>
              <div className="text-sm text-gray-600">Occupied</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {bays.filter(bay => bay.status === 'Maintenance').length}
              </div>
              <div className="text-sm text-gray-600">Maintenance</div>
            </div>
          </div>
        </div>

        {/* Assign Vehicle Modal */}
        {showAssignModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Assign Vehicle to {bays.find(b => b.id === selectedBay)?.name}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
                  <input
                    type="text"
                    name="customerName"
                    value={newAssignment.customerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Number *</label>
                  <input
                    type="text"
                    name="vehicleNumber"
                    value={newAssignment.vehicleNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Type *</label>
                  <select
                    name="serviceType"
                    value={newAssignment.serviceType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Service Type</option>
                    {serviceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Technician</label>
                  <select
                    name="technician"
                    value={newAssignment.technician}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Technician</option>
                    {technicians.map(tech => (
                      <option key={tech} value={tech}>{tech}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Hours</label>
                  <input
                    type="number"
                    name="estimatedHours"
                    value={newAssignment.estimatedHours}
                    onChange={handleInputChange}
                    min="0.5"
                    max="8"
                    step="0.5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    name="notes"
                    value={newAssignment.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedBay(null);
                    setNewAssignment({
                      customerName: '',
                      vehicleNumber: '',
                      serviceType: '',
                      technician: '',
                      estimatedHours: 2,
                      notes: ''
                    });
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignToBay}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Assign Vehicle
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error rendering ServiceBay:', error);
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Service Bay Assignment</h1>
        <p className="text-red-600">Error loading service bay page. Please refresh the page.</p>
      </div>
    );
  }
};

export default ServiceBay; 