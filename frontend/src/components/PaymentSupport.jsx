import React, { useState, useMemo } from 'react';
import { FaCreditCard, FaMoneyBillWave, FaWallet, FaReceipt, FaPrint, FaDownload, FaHistory, FaCheck, FaTimes } from 'react-icons/fa';

const PaymentSupport = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      customerName: 'Ahmed Khan',
      vehicleNumber: 'ABC-1234',
      serviceType: 'Major Service',
      totalAmount: 8500.00,
      paymentMethod: 'Card',
      paymentStatus: 'Completed',
      transactionId: 'TXN-001-2025-07-29',
      paymentDate: '2025-07-29 14:30',
      breakdown: {
        subtotal: 7500.00,
        tax: 1000.00,
        discount: 0.00,
        total: 8500.00
      },
      cardDetails: {
        type: 'Visa',
        last4: '1234',
        expiry: '12/25'
      }
    },
    {
      id: 2,
      customerName: 'Sarah Johnson',
      vehicleNumber: 'XYZ-5678',
      serviceType: 'Brake Service',
      totalAmount: 3200.00,
      paymentMethod: 'Cash',
      paymentStatus: 'Completed',
      transactionId: 'TXN-002-2025-07-29',
      paymentDate: '2025-07-29 11:15',
      breakdown: {
        subtotal: 2800.00,
        tax: 400.00,
        discount: 0.00,
        total: 3200.00
      }
    },
    {
      id: 3,
      customerName: 'David Brown',
      vehicleNumber: 'DEF-9012',
      serviceType: 'Engine Repair',
      totalAmount: 12500.00,
      paymentMethod: 'Wallet',
      paymentStatus: 'Pending',
      transactionId: 'TXN-003-2025-07-29',
      paymentDate: '2025-07-29 16:45',
      breakdown: {
        subtotal: 11000.00,
        tax: 1500.00,
        discount: 0.00,
        total: 12500.00
      },
      walletDetails: {
        provider: 'eZ Cash',
        phone: '+94 77 123 4567'
      }
    },
    {
      id: 4,
      customerName: 'Mike Wilson',
      vehicleNumber: 'GHI-3456',
      serviceType: 'AC Service',
      totalAmount: 4500.00,
      paymentMethod: 'Credit',
      paymentStatus: 'Completed',
      transactionId: 'TXN-004-2025-07-28',
      paymentDate: '2025-07-28 09:20',
      breakdown: {
        subtotal: 4000.00,
        tax: 500.00,
        discount: 0.00,
        total: 4500.00
      },
      creditDetails: {
        type: 'Installment',
        months: 3,
        monthlyPayment: 1500.00
      }
    }
  ]);

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [newPayment, setNewPayment] = useState({
    customerName: '',
    vehicleNumber: '',
    serviceType: '',
    totalAmount: 0,
    paymentMethod: 'Cash',
    breakdown: {
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0
    }
  });

  const paymentMethods = [
    { id: 'Cash', name: 'Cash', icon: FaMoneyBillWave, color: 'text-green-600' },
    { id: 'Card', name: 'Credit/Debit Card', icon: FaCreditCard, color: 'text-blue-600' },
    { id: 'Wallet', name: 'Digital Wallet', icon: FaWallet, color: 'text-purple-600' },
    { id: 'Credit', name: 'Credit/Installment', icon: FaReceipt, color: 'text-orange-600' }
  ];

  const cardTypes = ['Visa', 'Mastercard', 'American Express', 'Discover'];
  const walletProviders = ['eZ Cash', 'mCash', 'PayHere', 'Genie'];
  const creditTerms = [1, 2, 3, 6, 12];

  const handleCreatePayment = () => {
    try {
      if (!newPayment.customerName || !newPayment.vehicleNumber || !newPayment.serviceType) {
        alert('Please fill in all required fields');
        return;
      }

      const payment = {
        id: Date.now(),
        ...newPayment,
        paymentStatus: 'Pending',
        transactionId: `TXN-${String(Date.now()).slice(-6)}-${new Date().toISOString().split('T')[0]}`,
        paymentDate: new Date().toLocaleString(),
        breakdown: {
          subtotal: newPayment.totalAmount * 0.88,
          tax: newPayment.totalAmount * 0.12,
          discount: 0,
          total: newPayment.totalAmount
        }
      };

      setPayments(prev => [...prev, payment]);
      setNewPayment({
        customerName: '',
        vehicleNumber: '',
        serviceType: '',
        totalAmount: 0,
        paymentMethod: 'Cash',
        breakdown: {
          subtotal: 0,
          tax: 0,
          discount: 0,
          total: 0
        }
      });
      setShowPaymentModal(false);
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  const handleProcessPayment = (paymentId) => {
    try {
      if (window.confirm('Process this payment?')) {
        setPayments(prev => prev.map(payment => 
          payment.id === paymentId
            ? { ...payment, paymentStatus: 'Completed' }
            : payment
        ));
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  const handleCancelPayment = (paymentId) => {
    try {
      if (window.confirm('Cancel this payment?')) {
        setPayments(prev => prev.map(payment => 
          payment.id === paymentId
            ? { ...payment, paymentStatus: 'Cancelled' }
            : payment
        ));
      }
    } catch (error) {
      console.error('Error cancelling payment:', error);
    }
  };

  const handlePrintReceipt = (payment) => {
    try {
      setSelectedPayment(payment);
      setShowReceiptModal(true);
    } catch (error) {
      console.error('Error printing receipt:', error);
    }
  };

  const handleInputChange = (e) => {
    try {
      const { name, value } = e.target;
      setNewPayment(prev => ({
        ...prev,
        [name]: name === 'totalAmount' ? parseFloat(value) || 0 : value
      }));
    } catch (error) {
      console.error('Error in handleInputChange:', error);
    }
  };

  const getPaymentMethodIcon = (method) => {
    const methodInfo = paymentMethods.find(m => m.id === method);
    return methodInfo ? methodInfo.icon : FaMoneyBillWave;
  };

  const getPaymentMethodColor = (method) => {
    const methodInfo = paymentMethods.find(m => m.id === method);
    return methodInfo ? methodInfo.color : 'text-gray-600';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const completedPayments = useMemo(() => {
    try {
      return payments.filter(payment => payment.paymentStatus === 'Completed');
    } catch (error) {
      console.error('Error filtering completed payments:', error);
      return [];
    }
  }, [payments]);

  const pendingPayments = useMemo(() => {
    try {
      return payments.filter(payment => payment.paymentStatus === 'Pending');
    } catch (error) {
      console.error('Error filtering pending payments:', error);
      return [];
    }
  }, [payments]);

  const totalRevenue = useMemo(() => {
    try {
      return completedPayments.reduce((sum, payment) => sum + payment.totalAmount, 0);
    } catch (error) {
      console.error('Error calculating total revenue:', error);
      return 0;
    }
  }, [completedPayments]);

  try {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Multi-mode Payment Support</h1>
            <p className="text-gray-600">Accept various payment methods from customers</p>
          </div>
          <button
            onClick={() => setShowPaymentModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaReceipt size={14} />
            New Payment
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaMoneyBillWave className="text-green-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">LKR {totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCheck className="text-blue-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Payments</p>
                <p className="text-2xl font-bold text-gray-900">{completedPayments.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaHistory className="text-yellow-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-gray-900">{pendingPayments.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCreditCard className="text-purple-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Payment Methods</p>
                <p className="text-2xl font-bold text-gray-900">{paymentMethods.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods Overview */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Supported Payment Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const methodPayments = payments.filter(p => p.paymentMethod === method.id);
              const methodTotal = methodPayments.reduce((sum, p) => sum + p.totalAmount, 0);
              
              return (
                <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Icon className={`text-2xl mr-3 ${method.color}`} />
                    <div>
                      <h3 className="font-semibold text-gray-800">{method.name}</h3>
                      <p className="text-sm text-gray-600">{methodPayments.length} transactions</p>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    LKR {methodTotal.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((payment) => {
                  const MethodIcon = getPaymentMethodIcon(payment.paymentMethod);
                  const methodColor = getPaymentMethodColor(payment.paymentMethod);
                  
                  return (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{payment.customerName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.vehicleNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.serviceType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        LKR {payment.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MethodIcon className={`mr-2 ${methodColor}`} size={16} />
                          <span className="text-sm text-gray-900">{payment.paymentMethod}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.paymentStatus)}`}>
                          {payment.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handlePrintReceipt(payment)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Print Receipt"
                          >
                            <FaPrint size={16} />
                          </button>
                          
                          {payment.paymentStatus === 'Pending' && (
                            <>
                              <button
                                onClick={() => handleProcessPayment(payment.id)}
                                className="text-green-600 hover:text-green-800 p-1"
                                title="Process Payment"
                              >
                                <FaCheck size={16} />
                              </button>
                              <button
                                onClick={() => handleCancelPayment(payment.id)}
                                className="text-red-600 hover:text-red-800 p-1"
                                title="Cancel Payment"
                              >
                                <FaTimes size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Payment</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
                    <input
                      type="text"
                      name="customerName"
                      value={newPayment.customerName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Number *</label>
                    <input
                      type="text"
                      name="vehicleNumber"
                      value={newPayment.vehicleNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Type *</label>
                  <input
                    type="text"
                    name="serviceType"
                    value={newPayment.serviceType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount *</label>
                  <input
                    type="number"
                    name="totalAmount"
                    value={newPayment.totalAmount}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method *</label>
                  <select
                    name="paymentMethod"
                    value={newPayment.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {paymentMethods.map(method => (
                      <option key={method.id} value={method.id}>{method.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setNewPayment({
                      customerName: '',
                      vehicleNumber: '',
                      serviceType: '',
                      totalAmount: 0,
                      paymentMethod: 'Cash',
                      breakdown: {
                        subtotal: 0,
                        tax: 0,
                        discount: 0,
                        total: 0
                      }
                    });
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePayment}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create Payment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Receipt Modal */}
        {showReceiptModal && selectedPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Payment Receipt</h3>
                <button
                  onClick={() => setShowReceiptModal(false)}
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

                {/* Payment Details */}
                <div className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Customer Information</h3>
                      <p><strong>Name:</strong> {selectedPayment.customerName}</p>
                      <p><strong>Vehicle:</strong> {selectedPayment.vehicleNumber}</p>
                      <p><strong>Service:</strong> {selectedPayment.serviceType}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Payment Information</h3>
                      <p><strong>Transaction ID:</strong> {selectedPayment.transactionId}</p>
                      <p><strong>Date:</strong> {selectedPayment.paymentDate}</p>
                      <p><strong>Method:</strong> {selectedPayment.paymentMethod}</p>
                      <p><strong>Status:</strong> {selectedPayment.paymentStatus}</p>
                    </div>
                  </div>
                </div>

                {/* Amount Breakdown */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Amount Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>LKR {selectedPayment.breakdown.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>LKR {selectedPayment.breakdown.tax.toFixed(2)}</span>
                    </div>
                    {selectedPayment.breakdown.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount:</span>
                        <span>-LKR {selectedPayment.breakdown.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-300 pt-2 flex justify-between font-bold">
                      <span>Total:</span>
                      <span>LKR {selectedPayment.breakdown.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-600">
                  <p>Thank you for choosing IMSS AutoSuite!</p>
                  <p>For any queries, please contact us at +94 11 234 5678</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => alert('Receipt printed successfully!')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <FaPrint size={14} />
                  Print Receipt
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error rendering PaymentSupport:', error);
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Multi-mode Payment Support</h1>
        <p className="text-red-600">Error loading payment support page. Please refresh the page.</p>
      </div>
    );
  }
};

export default PaymentSupport; 