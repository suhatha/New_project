import React, { useState, useMemo } from 'react';
import { FaUser, FaClock, FaCheck, FaPlay, FaPause, FaStop, FaEdit, FaTrash, FaChartBar, FaCalendar, FaTools } from 'react-icons/fa';

const TechnicianTracking = () => {
  const [technicians, setTechnicians] = useState([
    {
      id: 1,
      name: 'John Smith',
      status: 'Working',
      currentTask: 'Brake Service - ABC-1234',
      startTime: '09:00',
      totalHours: 8.5,
      completedTasks: 12,
      efficiency: 95,
      tasks: [
        {
          id: 1,
          customerName: 'Ahmed Khan',
          vehicleNumber: 'ABC-1234',
          serviceType: 'Brake Service',
          startTime: '09:00',
          endTime: null,
          status: 'In Progress',
          estimatedHours: 2,
          actualHours: 1.5
        },
        {
          id: 2,
          customerName: 'Sarah Johnson',
          vehicleNumber: 'XYZ-5678',
          serviceType: 'Engine Service',
          startTime: '07:30',
          endTime: '09:00',
          status: 'Completed',
          estimatedHours: 1.5,
          actualHours: 1.5
        }
      ]
    },
    {
      id: 2,
      name: 'Mike Wilson',
      status: 'Available',
      currentTask: null,
      startTime: null,
      totalHours: 6.0,
      completedTasks: 8,
      efficiency: 88,
      tasks: [
        {
          id: 3,
          customerName: 'David Brown',
          vehicleNumber: 'DEF-9012',
          serviceType: 'AC Service',
          startTime: '08:00',
          endTime: '10:30',
          status: 'Completed',
          estimatedHours: 2.5,
          actualHours: 2.5
        }
      ]
    },
    {
      id: 3,
      name: 'Alex Davis',
      status: 'Break',
      currentTask: null,
      startTime: null,
      totalHours: 7.5,
      completedTasks: 10,
      efficiency: 92,
      tasks: []
    }
  ]);

  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    customerName: '',
    vehicleNumber: '',
    serviceType: '',
    estimatedHours: 2
  });

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

  const handleStartTask = (technicianId, taskId) => {
    try {
      setTechnicians(prev => prev.map(tech => 
        tech.id === technicianId
          ? {
              ...tech,
              status: 'Working',
              currentTask: tech.tasks.find(t => t.id === taskId)?.serviceType + ' - ' + tech.tasks.find(t => t.id === taskId)?.vehicleNumber,
              startTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
              tasks: tech.tasks.map(task => 
                task.id === taskId 
                  ? { ...task, status: 'In Progress', startTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) }
                  : task
              )
            }
          : tech
      ));
    } catch (error) {
      console.error('Error starting task:', error);
    }
  };

  const handleCompleteTask = (technicianId, taskId) => {
    try {
      setTechnicians(prev => prev.map(tech => 
        tech.id === technicianId
          ? {
              ...tech,
              status: 'Available',
              currentTask: null,
              startTime: null,
              completedTasks: tech.completedTasks + 1,
              tasks: tech.tasks.map(task => 
                task.id === taskId 
                  ? { 
                      ...task, 
                      status: 'Completed', 
                      endTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
                      actualHours: calculateActualHours(task.startTime, new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }))
                    }
                  : task
              )
            }
          : tech
      ));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleAddTask = () => {
    try {
      if (!newTask.customerName || !newTask.vehicleNumber || !newTask.serviceType) {
        alert('Please fill in all required fields');
        return;
      }

      const task = {
        id: Date.now(),
        customerName: newTask.customerName,
        vehicleNumber: newTask.vehicleNumber,
        serviceType: newTask.serviceType,
        startTime: null,
        endTime: null,
        status: 'Pending',
        estimatedHours: newTask.estimatedHours,
        actualHours: 0
      };

      setTechnicians(prev => prev.map(tech => 
        tech.id === selectedTechnician.id
          ? { ...tech, tasks: [...tech.tasks, task] }
          : tech
      ));

      setNewTask({
        customerName: '',
        vehicleNumber: '',
        serviceType: '',
        estimatedHours: 2
      });
      setShowTaskModal(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = (technicianId, taskId) => {
    try {
      if (window.confirm('Delete this task?')) {
        setTechnicians(prev => prev.map(tech => 
          tech.id === technicianId
            ? { ...tech, tasks: tech.tasks.filter(task => task.id !== taskId) }
            : tech
        ));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const calculateActualHours = (startTime, endTime) => {
    try {
      if (!startTime || !endTime) return 0;
      
      const start = new Date(`2000-01-01 ${startTime}`);
      const end = new Date(`2000-01-01 ${endTime}`);
      const diffMs = end - start;
      return Math.round((diffMs / (1000 * 60 * 60)) * 10) / 10; // Round to 1 decimal
    } catch (error) {
      console.error('Error calculating hours:', error);
      return 0;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Working': return 'bg-green-100 text-green-800';
      case 'Available': return 'bg-blue-100 text-blue-800';
      case 'Break': return 'bg-yellow-100 text-yellow-800';
      case 'Off': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTaskStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalTechnicians = useMemo(() => technicians.length, [technicians]);
  const workingTechnicians = useMemo(() => technicians.filter(t => t.status === 'Working').length, [technicians]);
  const totalTasks = useMemo(() => technicians.reduce((sum, tech) => sum + tech.tasks.length, 0), [technicians]);
  const completedTasks = useMemo(() => technicians.reduce((sum, tech) => sum + tech.completedTasks, 0), [technicians]);

  try {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Technician Time Tracking</h1>
            <p className="text-gray-600">Monitor technician productivity and task completion</p>
          </div>
          <div className="flex gap-2">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {workingTechnicians} Working
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {completedTasks} Completed
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaUser className="text-blue-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Technicians</p>
                <p className="text-2xl font-bold text-gray-900">{totalTechnicians}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaClock className="text-green-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Working Now</p>
                <p className="text-2xl font-bold text-gray-900">{workingTechnicians}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaTools className="text-purple-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCheck className="text-orange-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technicians Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {technicians.map((technician) => (
            <div key={technician.id} className="bg-white rounded-lg shadow-md p-6">
              {/* Technician Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{technician.name}</h3>
                  <p className="text-sm text-gray-600">
                    {technician.currentTask || 'No current task'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(technician.status)}`}>
                    {technician.status}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedTechnician(technician);
                      setShowTaskModal(true);
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Add Task
                  </button>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{technician.totalHours}h</div>
                  <div className="text-xs text-gray-600">Total Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{technician.completedTasks}</div>
                  <div className="text-xs text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{technician.efficiency}%</div>
                  <div className="text-xs text-gray-600">Efficiency</div>
                </div>
              </div>

              {/* Current Status */}
              {technician.status === 'Working' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-800">Currently Working</p>
                      <p className="text-xs text-green-600">Started at {technician.startTime}</p>
                    </div>
                    <div className="flex gap-1">
                      <button className="bg-green-600 text-white p-1 rounded hover:bg-green-700" title="Pause">
                        <FaPause size={12} />
                      </button>
                      <button className="bg-red-600 text-white p-1 rounded hover:bg-red-700" title="Stop">
                        <FaStop size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tasks List */}
              <div>
                <h4 className="text-md font-medium text-gray-800 mb-3">Tasks</h4>
                <div className="space-y-2">
                  {technician.tasks.length === 0 ? (
                    <p className="text-gray-500 text-sm">No tasks assigned</p>
                  ) : (
                    technician.tasks.map((task) => (
                      <div key={task.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{task.customerName}</p>
                            <p className="text-xs text-gray-600">{task.vehicleNumber} - {task.serviceType}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTaskStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
                          <span>Est: {task.estimatedHours}h</span>
                          {task.actualHours > 0 && <span>Actual: {task.actualHours}h</span>}
                        </div>

                        <div className="flex gap-1">
                          {task.status === 'Pending' && (
                            <button
                              onClick={() => handleStartTask(technician.id, task.id)}
                              className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 flex items-center gap-1"
                            >
                              <FaPlay size={10} />
                              Start
                            </button>
                          )}
                          {task.status === 'In Progress' && (
                            <button
                              onClick={() => handleCompleteTask(technician.id, task.id)}
                              className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700 flex items-center gap-1"
                            >
                              <FaCheck size={10} />
                              Complete
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteTask(technician.id, task.id)}
                            className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 flex items-center gap-1"
                          >
                            <FaTrash size={10} />
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Task Modal */}
        {showTaskModal && selectedTechnician && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Add Task for {selectedTechnician.name}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
                  <input
                    type="text"
                    value={newTask.customerName}
                    onChange={(e) => setNewTask(prev => ({ ...prev, customerName: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Number *</label>
                  <input
                    type="text"
                    value={newTask.vehicleNumber}
                    onChange={(e) => setNewTask(prev => ({ ...prev, vehicleNumber: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Type *</label>
                  <select
                    value={newTask.serviceType}
                    onChange={(e) => setNewTask(prev => ({ ...prev, serviceType: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Service Type</option>
                    {serviceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Hours</label>
                  <input
                    type="number"
                    value={newTask.estimatedHours}
                    onChange={(e) => setNewTask(prev => ({ ...prev, estimatedHours: parseFloat(e.target.value) || 0 }))}
                    min="0.5"
                    max="8"
                    step="0.5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => {
                    setShowTaskModal(false);
                    setSelectedTechnician(null);
                    setNewTask({
                      customerName: '',
                      vehicleNumber: '',
                      serviceType: '',
                      estimatedHours: 2
                    });
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error rendering TechnicianTracking:', error);
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Technician Time Tracking</h1>
        <p className="text-red-600">Error loading technician tracking page. Please refresh the page.</p>
      </div>
    );
  }
};

export default TechnicianTracking; 