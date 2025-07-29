import React, { useState, useMemo } from 'react';
import { FaFileAlt, FaTools, FaCheck, FaTimes, FaEye, FaEdit, FaPlay, FaClock, FaUser, FaCar } from 'react-icons/fa';

const QuoteToJob = () => {
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      customerName: 'Ahmed Khan',
      vehicleNumber: 'ABC-1234',
      serviceType: 'Major Service',
      quoteAmount: 8500.00,
      status: 'Approved',
      approvedAt: '2025-07-29 10:30',
      approvedBy: 'John Smith',
      jobOrder: {
        id: 'JO-001',
        status: 'Created',
        assignedTo: 'Mike Wilson',
        estimatedStart: '2025-07-30',
        estimatedDuration: '4 hours',
        priority: 'High'
      },
      items: [
        { name: 'Engine Oil Filter', quantity: 1, price: 450.00 },
        { name: 'Air Filter', quantity: 1, price: 280.00 },
        { name: 'Spark Plugs Set', quantity: 4, price: 1800.00 },
        { name: 'Labor - Major Service', quantity: 1, price: 5970.00 }
      ]
    },
    {
      id: 2,
      customerName: 'Sarah Johnson',
      vehicleNumber: 'XYZ-5678',
      serviceType: 'Brake Service',
      quoteAmount: 3200.00,
      status: 'Pending',
      approvedAt: null,
      approvedBy: null,
      jobOrder: null,
      items: [
        { name: 'Brake Pads Set (Front)', quantity: 1, price: 1200.00 },
        { name: 'Brake Fluid', quantity: 1, price: 600.00 },
        { name: 'Labor - Brake Service', quantity: 1, price: 1400.00 }
      ]
    },
    {
      id: 3,
      customerName: 'David Brown',
      vehicleNumber: 'DEF-9012',
      serviceType: 'Engine Repair',
      quoteAmount: 12500.00,
      status: 'Approved',
      approvedAt: '2025-07-28 14:15',
      approvedBy: 'Alex Davis',
      jobOrder: {
        id: 'JO-002',
        status: 'In Progress',
        assignedTo: 'John Smith',
        estimatedStart: '2025-07-29',
        estimatedDuration: '6 hours',
        priority: 'Urgent'
      },
      items: [
        { name: 'Timing Belt', quantity: 1, price: 2200.00 },
        { name: 'Water Pump', quantity: 1, price: 950.00 },
        { name: 'Labor - Engine Repair', quantity: 1, price: 9350.00 }
      ]
    }
  ]);

  const [selectedQuote, setSelectedQuote] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [newJobOrder, setNewJobOrder] = useState({
    assignedTo: '',
    estimatedStart: '',
    estimatedDuration: '',
    priority: 'Medium',
    notes: ''
  });

  const technicians = [
    'John Smith',
    'Mike Wilson',
    'Alex Davis',
    'Sarah Chen',
    'Tom Anderson'
  ];

  const priorities = ['Low', 'Medium', 'High', 'Urgent'];
  const durations = ['1 hour', '2 hours', '3 hours', '4 hours', '5 hours', '6 hours', '8 hours'];

  const handleApproveQuote = (quoteId) => {
    try {
      if (window.confirm('Approve this quote and create job order?')) {
        setQuotes(prev => prev.map(quote => 
          quote.id === quoteId
            ? {
                ...quote,
                status: 'Approved',
                approvedAt: new Date().toLocaleString(),
                approvedBy: 'Current User',
                jobOrder: {
                  id: `JO-${String(quoteId).padStart(3, '0')}`,
                  status: 'Created',
                  assignedTo: '',
                  estimatedStart: new Date().toISOString().split('T')[0],
                  estimatedDuration: '4 hours',
                  priority: 'Medium'
                }
              }
            : quote
        ));
      }
    } catch (error) {
      console.error('Error approving quote:', error);
    }
  };

  const handleRejectQuote = (quoteId) => {
    try {
      if (window.confirm('Reject this quote?')) {
        setQuotes(prev => prev.map(quote => 
          quote.id === quoteId
            ? { ...quote, status: 'Rejected' }
            : quote
        ));
      }
    } catch (error) {
      console.error('Error rejecting quote:', error);
    }
  };

  const handleCreateJobOrder = (quoteId) => {
    try {
      if (!newJobOrder.assignedTo || !newJobOrder.estimatedStart) {
        alert('Please fill in all required fields');
        return;
      }

      setQuotes(prev => prev.map(quote => 
        quote.id === quoteId
          ? {
              ...quote,
              jobOrder: {
                ...quote.jobOrder,
                ...newJobOrder,
                status: 'Scheduled'
              }
            }
          : quote
      ));

      setNewJobOrder({
        assignedTo: '',
        estimatedStart: '',
        estimatedDuration: '',
        priority: 'Medium',
        notes: ''
      });
      setShowJobModal(false);
      setSelectedQuote(null);
    } catch (error) {
      console.error('Error creating job order:', error);
    }
  };

  const handleStartJob = (quoteId) => {
    try {
      setQuotes(prev => prev.map(quote => 
        quote.id === quoteId
          ? {
              ...quote,
              jobOrder: {
                ...quote.jobOrder,
                status: 'In Progress',
                actualStart: new Date().toLocaleString()
              }
            }
          : quote
      ));
    } catch (error) {
      console.error('Error starting job:', error);
    }
  };

  const handleCompleteJob = (quoteId) => {
    try {
      if (window.confirm('Mark this job as completed?')) {
        setQuotes(prev => prev.map(quote => 
          quote.id === quoteId
            ? {
                ...quote,
                jobOrder: {
                  ...quote.jobOrder,
                  status: 'Completed',
                  actualEnd: new Date().toLocaleString()
                }
              }
            : quote
        ));
      }
    } catch (error) {
      console.error('Error completing job:', error);
    }
  };

  const handleViewDetails = (quote) => {
    try {
      setSelectedQuote(quote);
      setShowDetailsModal(true);
    } catch (error) {
      console.error('Error viewing details:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getJobStatusColor = (status) => {
    switch (status) {
      case 'Created': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      case 'In Progress': return 'bg-orange-100 text-orange-800';
      case 'Completed': return 'bg-green-100 text-green-800';
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

  const approvedQuotes = useMemo(() => {
    try {
      return quotes.filter(quote => quote.status === 'Approved');
    } catch (error) {
      console.error('Error filtering approved quotes:', error);
      return [];
    }
  }, [quotes]);

  const pendingQuotes = useMemo(() => {
    try {
      return quotes.filter(quote => quote.status === 'Pending');
    } catch (error) {
      console.error('Error filtering pending quotes:', error);
      return [];
    }
  }, [quotes]);

  const activeJobs = useMemo(() => {
    try {
      return quotes.filter(quote => quote.jobOrder && quote.jobOrder.status === 'In Progress');
    } catch (error) {
      console.error('Error filtering active jobs:', error);
      return [];
    }
  }, [quotes]);

  try {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Quote to Job Order Conversion</h1>
            <p className="text-gray-600">Convert approved quotes to job orders automatically</p>
          </div>
          <div className="flex gap-2">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {approvedQuotes.length} Approved
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {activeJobs.length} Active Jobs
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaFileAlt className="text-blue-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Quotes</p>
                <p className="text-2xl font-bold text-gray-900">{quotes.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCheck className="text-green-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Approved Quotes</p>
                <p className="text-2xl font-bold text-gray-900">{approvedQuotes.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaClock className="text-yellow-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Quotes</p>
                <p className="text-2xl font-bold text-gray-900">{pendingQuotes.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaTools className="text-purple-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{activeJobs.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quotes Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{quote.customerName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.vehicleNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.serviceType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      LKR {quote.quoteAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(quote.status)}`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {quote.jobOrder ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">{quote.jobOrder.id}</span>
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getJobStatusColor(quote.jobOrder.status)}`}>
                            {quote.jobOrder.status}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">No job order</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(quote)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="View Details"
                        >
                          <FaEye size={16} />
                        </button>
                        
                        {quote.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleApproveQuote(quote.id)}
                              className="text-green-600 hover:text-green-800 p-1"
                              title="Approve Quote"
                            >
                              <FaCheck size={16} />
                            </button>
                            <button
                              onClick={() => handleRejectQuote(quote.id)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Reject Quote"
                            >
                              <FaTimes size={16} />
                            </button>
                          </>
                        )}
                        
                        {quote.status === 'Approved' && quote.jobOrder && quote.jobOrder.status === 'Created' && (
                          <button
                            onClick={() => {
                              setSelectedQuote(quote);
                              setShowJobModal(true);
                            }}
                            className="text-purple-600 hover:text-purple-800 p-1"
                            title="Create Job Order"
                          >
                            <FaEdit size={16} />
                          </button>
                        )}
                        
                        {quote.jobOrder && quote.jobOrder.status === 'Scheduled' && (
                          <button
                            onClick={() => handleStartJob(quote.id)}
                            className="text-orange-600 hover:text-orange-800 p-1"
                            title="Start Job"
                          >
                            <FaPlay size={16} />
                          </button>
                        )}
                        
                        {quote.jobOrder && quote.jobOrder.status === 'In Progress' && (
                          <button
                            onClick={() => handleCompleteJob(quote.id)}
                            className="text-green-600 hover:text-green-800 p-1"
                            title="Complete Job"
                          >
                            <FaCheck size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Job Order Modal */}
        {showJobModal && selectedQuote && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Create Job Order for {selectedQuote.customerName}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Vehicle: {selectedQuote.vehicleNumber} - {selectedQuote.serviceType}
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assign To *</label>
                  <select
                    value={newJobOrder.assignedTo}
                    onChange={(e) => setNewJobOrder(prev => ({ ...prev, assignedTo: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Technician</option>
                    {technicians.map(tech => (
                      <option key={tech} value={tech}>{tech}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Start Date *</label>
                  <input
                    type="date"
                    value={newJobOrder.estimatedStart}
                    onChange={(e) => setNewJobOrder(prev => ({ ...prev, estimatedStart: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Duration</label>
                  <select
                    value={newJobOrder.estimatedDuration}
                    onChange={(e) => setNewJobOrder(prev => ({ ...prev, estimatedDuration: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {durations.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={newJobOrder.priority}
                    onChange={(e) => setNewJobOrder(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={newJobOrder.notes}
                    onChange={(e) => setNewJobOrder(prev => ({ ...prev, notes: e.target.value }))}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => {
                    setShowJobModal(false);
                    setSelectedQuote(null);
                    setNewJobOrder({
                      assignedTo: '',
                      estimatedStart: '',
                      estimatedDuration: '',
                      priority: 'Medium',
                      notes: ''
                    });
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleCreateJobOrder(selectedQuote.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create Job Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedQuote && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Quote Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quote Information */}
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Quote Information</h4>
                  <div className="space-y-2">
                    <div><strong>Customer:</strong> {selectedQuote.customerName}</div>
                    <div><strong>Vehicle:</strong> {selectedQuote.vehicleNumber}</div>
                    <div><strong>Service Type:</strong> {selectedQuote.serviceType}</div>
                    <div><strong>Amount:</strong> LKR {selectedQuote.quoteAmount.toFixed(2)}</div>
                    <div><strong>Status:</strong> {selectedQuote.status}</div>
                    {selectedQuote.approvedAt && (
                      <div><strong>Approved At:</strong> {selectedQuote.approvedAt}</div>
                    )}
                    {selectedQuote.approvedBy && (
                      <div><strong>Approved By:</strong> {selectedQuote.approvedBy}</div>
                    )}
                  </div>
                </div>

                {/* Job Order Information */}
                {selectedQuote.jobOrder && (
                  <div>
                    <h4 className="text-md font-semibold text-gray-800 mb-3">Job Order Information</h4>
                    <div className="space-y-2">
                      <div><strong>Job ID:</strong> {selectedQuote.jobOrder.id}</div>
                      <div><strong>Status:</strong> {selectedQuote.jobOrder.status}</div>
                      <div><strong>Assigned To:</strong> {selectedQuote.jobOrder.assignedTo}</div>
                      <div><strong>Estimated Start:</strong> {selectedQuote.jobOrder.estimatedStart}</div>
                      <div><strong>Duration:</strong> {selectedQuote.jobOrder.estimatedDuration}</div>
                      <div><strong>Priority:</strong> {selectedQuote.jobOrder.priority}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="mt-6">
                <h4 className="text-md font-semibold text-gray-800 mb-3">Quote Items</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedQuote.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm text-gray-900">{item.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">LKR {item.price.toFixed(2)}</td>
                          <td className="px-4 py-2 text-sm font-medium text-gray-900">
                            LKR {(item.quantity * item.price).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error rendering QuoteToJob:', error);
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Quote to Job Order Conversion</h1>
        <p className="text-red-600">Error loading quote to job conversion page. Please refresh the page.</p>
      </div>
    );
  }
};

export default QuoteToJob; 