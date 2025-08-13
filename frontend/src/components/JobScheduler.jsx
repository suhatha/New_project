import React, { useState, useEffect } from 'react';
import { FaCar, FaPlus, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const JobScheduler = () => {
  const navigate = useNavigate();
  // State
  const [appointments, setAppointments] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data - empty arrays
  const mockServiceTypes = [];
  const mockTechnicians = [];
  const mockBays = [];
  const mockPriorities = ['Low', 'Medium', 'High', 'Urgent'];

  // Generate time slots (8 AM to 6 PM)
  const timeSlots = Array.from({ length: 11 }, (_, i) => {
    const hour = i + 8;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // New appointment form state
  const [newAppointment, setNewAppointment] = useState({
    customerName: '',
    vehicleNumber: '',
    serviceType: '',
    technician: '',
    startTime: '',
    endTime: '',
    bay: '',
    priority: 'Medium',
    notes: '',
    status: 'Scheduled'
  });

  // Load mock data
  useEffect(() => {
    const loadMockData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setAppointments([]); // Empty appointments array
      } catch (err) {
        setError('Failed to load data');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMockData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingAppointment) {
      // Update existing appointment
      setAppointments(prev => 
        prev.map(app => 
          app.id === editingAppointment.id ? { ...newAppointment, id: editingAppointment.id } : app
        )
      );
    } else {
      // Add new appointment
      const newAppt = {
        ...newAppointment,
        id: Date.now()
      };
      setAppointments(prev => [...prev, newAppt]);
    }
    
    // Reset form and close modal
    resetForm();
    setShowAddModal(false);
  };

  // Reset form
  const resetForm = () => {
    setNewAppointment({
      customerName: '',
      vehicleNumber: '',
      serviceType: '',
      technician: '',
      startTime: '',
      endTime: '',
      bay: '',
      priority: 'Medium',
      notes: '',
      status: 'Scheduled'
    });
    setEditingAppointment(null);
  };

  // Handle edit appointment
  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setNewAppointment({ ...appointment });
    setShowAddModal(true);
  };

  // Handle delete appointment
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(prev => prev.filter(app => app.id !== id));
    }
  };

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setAppointments(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  // Get status color class
  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-2xl font-bold">Job Scheduler</h1>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700 transition-colors"
        >
          <FaPlus className="mr-2" /> Add Appointment
        </button>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaCar className="mr-2 text-purple-600" /> Appointments
          </h2>
        </div>
        <div className="overflow-x-auto max-h-[calc(100vh-250px)]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Time Slot
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FaCar className="h-12 w-12 text-gray-300 mb-3" />
                      <p className="text-gray-500 text-sm">No appointments found</p>
                      <p className="text-gray-400 text-xs mt-1">Add a new appointment to get started</p>
                    </div>
                  </td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                          <FaUserCog className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{appointment.customerName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-gray-100 rounded-full p-2">
                          <FaCar className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{appointment.vehicleNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-purple-100 rounded-full">
                          <FaTools className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{appointment.serviceType}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        {appointment.startTime} - {appointment.endTime}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={appointment.status}
                        onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : appointment.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : appointment.status === 'Cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(appointment)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4 px-3 py-1 rounded-md hover:bg-indigo-50 transition-colors"
                      >
                        <FaEdit className="inline mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="text-red-600 hover:text-red-900 px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                      >
                        <FaTrash className="inline mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md flex flex-col max-h-[90vh]">
            <div className="p-6 pb-0">
              <h3 className="text-lg font-semibold">
                {editingAppointment ? 'Edit Appointment' : 'Add New Appointment'}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 pt-4 space-y-4 overflow-y-auto flex-1">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                  <input
                    type="text"
                    name="customerName"
                    value={newAppointment.customerName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number *</label>
                  <input
                    type="text"
                    name="vehicleNumber"
                    value={newAppointment.vehicleNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Type *</label>
                  <select
                    name="serviceType"
                    value={newAppointment.serviceType}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select Service Type</option>
                    {mockServiceTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                    <select
                      name="startTime"
                      value={newAppointment.startTime}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="">Select Time</option>
                      {timeSlots.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
                    <select
                      name="endTime"
                      value={newAppointment.endTime}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                      disabled={!newAppointment.startTime}
                    >
                      <option value="">Select Time</option>
                      {timeSlots
                        .filter(time => !newAppointment.startTime || time > newAppointment.startTime)
                        .map((time, index) => (
                          <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Technician</label>
                    <select
                      name="technician"
                      value={newAppointment.technician}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select Technician</option>
                      {mockTechnicians.map((tech, index) => (
                        <option key={index} value={tech}>{tech}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bay</label>
                    <select
                      name="bay"
                      value={newAppointment.bay}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select Bay</option>
                      {mockBays.map((bay, index) => (
                        <option key={index} value={bay}>{bay}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    name="priority"
                    value={newAppointment.priority}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    {mockPriorities.map((priority, index) => (
                      <option key={index} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    name="notes"
                    value={newAppointment.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div className="p-6 pt-4 border-t border-gray-200 mt-auto">
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors min-w-[100px]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors min-w-[100px]"
                  >
                    {editingAppointment ? 'Update' : 'Add'} Appointment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobScheduler;