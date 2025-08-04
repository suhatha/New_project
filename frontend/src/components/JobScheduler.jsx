import React, { useState, useMemo } from 'react';
import { FaCalendarAlt, FaCar, FaUser, FaTools, FaClock, FaPlus, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const JobScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      customerName: 'Ahmed Khan',
      vehicleNumber: 'ABC-1234',
      serviceType: 'Regular Service',
      technician: 'John Smith',
      startTime: '09:00',
      endTime: '11:00',
      status: 'In Progress',
      bay: 'Bay 1',
      priority: 'High'
    },
    {
      id: 2,
      customerName: 'Sarah Johnson',
      vehicleNumber: 'XYZ-5678',
      serviceType: 'Brake Service',
      technician: 'Mike Wilson',
      startTime: '10:00',
      endTime: '12:30',
      status: 'Scheduled',
      bay: 'Bay 2',
      priority: 'Medium'
    },
    {
      id: 3,
      customerName: 'David Brown',
      vehicleNumber: 'DEF-9012',
      serviceType: 'Engine Repair',
      technician: 'Alex Davis',
      startTime: '13:00',
      endTime: '16:00',
      status: 'Completed',
      bay: 'Bay 3',
      priority: 'Low'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    customerName: '',
    vehicleNumber: '',
    serviceType: '',
    technician: '',
    startTime: '',
    endTime: '',
    bay: '',
    priority: 'Medium',
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

  const bays = ['Bay 1', 'Bay 2', 'Bay 3', 'Bay 4', 'Bay 5'];
  const priorities = ['Low', 'Medium', 'High', 'Urgent'];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  const handleAddAppointment = () => {
    try {
      if (!newAppointment.customerName || !newAppointment.vehicleNumber || !newAppointment.serviceType) {
        alert('Please fill in all required fields');
        return;
      }

      const appointment = {
        id: Date.now(),
        ...newAppointment,
        status: 'Scheduled'
      };

      setAppointments(prev => [...prev, appointment]);
      setNewAppointment({
        customerName: '',
        vehicleNumber: '',
        serviceType: '',
        technician: '',
        startTime: '',
        endTime: '',
        bay: '',
        priority: 'Medium',
        notes: ''
      });
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  const handleUpdateAppointment = () => {
    try {
      if (!editingAppointment) return;

      setAppointments(prev => prev.map(app => 
        app.id === editingAppointment.id ? { ...app, ...newAppointment } : app
      ));

      setEditingAppointment(null);
      setNewAppointment({
        customerName: '',
        vehicleNumber: '',
        serviceType: '',
        technician: '',
        startTime: '',
        endTime: '',
        bay: '',
        priority: 'Medium',
        notes: ''
      });
      setShowAddModal(false);
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const handleDeleteAppointment = (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this appointment?')) {
        setAppointments(prev => prev.filter(app => app.id !== id));
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    try {
      setAppointments(prev => prev.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ));
    } catch (error) {
      console.error('Error changing status:', error);
    }
  };

  const handleEditAppointment = (appointment) => {
    try {
      setEditingAppointment(appointment);
      setNewAppointment({
        customerName: appointment.customerName,
        vehicleNumber: appointment.vehicleNumber,
        serviceType: appointment.serviceType,
        technician: appointment.technician,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        bay: appointment.bay,
        priority: appointment.priority,
        notes: appointment.notes || ''
      });
      setShowAddModal(true);
    } catch (error) {
      console.error('Error editing appointment:', error);
    }
  };

  const handleInputChange = (e) => {
    try {
      const { name, value } = e.target;
      setNewAppointment(prev => ({
        ...prev,
        [name]: value
      }));
    } catch (error) {
      console.error('Error in handleInputChange:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const todayAppointments = useMemo(() => {
    try {
      return appointments.filter(app => {
        const appDate = new Date(selectedDate);
        return appDate.toDateString() === selectedDate.toDateString();
      });
    } catch (error) {
      console.error('Error filtering appointments:', error);
      return [];
    }
  }, [appointments, selectedDate]);

  try {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Job Scheduler</h1>
            <p className="text-gray-600">Drag & drop appointment scheduling for automotive services</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaPlus size={14} />
            Add Appointment
          </button>
        </div>

        {/* Calendar and Schedule View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaCalendarAlt className="text-blue-600" />
                Calendar View
              </h2>
              <div className="mb-4">
                <input
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-800">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-gray-600 mt-2">
                  {todayAppointments.length} appointment{todayAppointments.length !== 1 ? 's' : ''} scheduled
                </p>
              </div>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaClock className="text-green-600" />
                Schedule for {selectedDate.toLocaleDateString()}
              </h2>
              
              {/* Time Slots */}
              <div className="space-y-2">
                {timeSlots.map((time) => {
                  const appointmentsAtTime = todayAppointments.filter(app => 
                    app.startTime === time || 
                    (app.startTime <= time && app.endTime > time)
                  );

                  return (
                    <div key={time} className="flex items-center border-b border-gray-200 py-2">
                      <div className="w-20 text-sm font-medium text-gray-600">
                        {time}
                      </div>
                      <div className="flex-1 flex gap-2">
                        {appointmentsAtTime.map((appointment) => (
                          <div
                            key={appointment.id}
                            className="flex-1 bg-blue-50 border border-blue-200 rounded-md p-3 cursor-pointer hover:bg-blue-100 transition-colors"
                            onClick={() => handleEditAppointment(appointment)}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-sm">{appointment.customerName}</span>
                              <div className="flex items-center gap-1">
                                <div 
                                  className={`w-3 h-3 rounded-full ${getPriorityColor(appointment.priority)}`}
                                  title={appointment.priority}
                                ></div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                  {appointment.status}
                                </span>
                              </div>
                            </div>
                            <div className="text-xs text-gray-600">
                              <div>{appointment.vehicleNumber} - {appointment.serviceType}</div>
                              <div>{appointment.technician} - {appointment.bay}</div>
                              <div>{appointment.startTime} - {appointment.endTime}</div>
                            </div>
                          </div>
                        ))}
                        {appointmentsAtTime.length === 0 && (
                          <div className="flex-1 text-gray-400 text-sm py-3">
                            No appointments
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaCar className="text-purple-600" />
            All Appointments
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technician</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bay</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{appointment.customerName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.vehicleNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.serviceType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.technician}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.startTime} - {appointment.endTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.bay}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={appointment.status}
                        onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)} border-0`}
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditAppointment(appointment)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Edit"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteAppointment(appointment.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Appointment Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  {editingAppointment ? 'Edit Appointment' : 'Add New Appointment'}
                </h3>
              </div>
              
              {/* Modal Body - Scrollable */}
              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
                    <input
                      type="text"
                      name="customerName"
                      value={newAppointment.customerName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Number *</label>
                    <input
                      type="text"
                      name="vehicleNumber"
                      value={newAppointment.vehicleNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Type *</label>
                    <select
                      name="serviceType"
                      value={newAppointment.serviceType}
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
                      value={newAppointment.technician}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                    <select
                      name="startTime"
                      value={newAppointment.startTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                    <select
                      name="endTime"
                      value={newAppointment.endTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bay</label>
                    <select
                      name="bay"
                      value={newAppointment.bay}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Bay</option>
                      {bays.map(bay => (
                        <option key={bay} value={bay}>{bay}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      name="priority"
                      value={newAppointment.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    name="notes"
                    value={newAppointment.notes}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>
              </div>

              {/* Modal Footer - Fixed at bottom */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingAppointment(null);
                      setNewAppointment({
                        customerName: '',
                        vehicleNumber: '',
                        serviceType: '',
                        technician: '',
                        startTime: '',
                        endTime: '',
                        bay: '',
                        priority: 'Medium',
                        notes: ''
                      });
                    }}
                    className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <FaTimes size={14} />
                    Cancel
                  </button>
                  <button
                    onClick={editingAppointment ? handleUpdateAppointment : handleAddAppointment}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <FaCheck size={14} />
                    {editingAppointment ? 'Update' : 'Save'} Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error rendering JobScheduler:', error);
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Job Scheduler</h1>
        <p className="text-red-600">Error loading job scheduler page. Please refresh the page.</p>
      </div>
    );
  }
};

export default JobScheduler; 