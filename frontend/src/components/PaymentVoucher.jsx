import React, { useState } from 'react';
import { FaMoneyBillWave, FaPlus, FaEdit, FaTrash, FaSearch, FaDownload, FaPrint, FaEye, FaCalendar, FaUser, FaBuilding, FaFileAlt, FaCheck, FaTimes, FaClock } from 'react-icons/fa';

const PaymentVoucher = () => {
  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      voucherNumber: 'PV-2025-001',
      date: '2025-07-29',
      payee: 'Toyota Lanka (Pvt) Ltd',
      payeeType: 'Supplier',
      category: 'Parts Purchase',
      amount: 125000.00,
      paymentMethod: 'Bank Transfer',
      reference: 'PO-2025-001',
      description: 'Engine parts and filters for major service',
      status: 'Paid',
      approvedBy: 'John Smith',
      approvedAt: '2025-07-28 10:30',
      attachments: ['invoice.pdf', 'purchase_order.pdf']
    }
  ]);

  const totalAmount = vouchers.reduce((sum, voucher) => sum + voucher.amount, 0);
  const paidAmount = vouchers.filter(v => v.status === 'Paid').reduce((sum, voucher) => sum + voucher.amount, 0);
  const pendingAmount = vouchers.filter(v => v.status === 'Pending').reduce((sum, voucher) => sum + voucher.amount, 0);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Payment Vouchers</h1>
          <p className="text-gray-600">Track all outgoing payments and expenses</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <FaPlus size={16} />
            New Voucher
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
            <FaMoneyBillWave className="text-blue-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">LKR {totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaCheck className="text-green-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Paid Amount</p>
              <p className="text-2xl font-bold text-gray-900">LKR {paidAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaClock className="text-yellow-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Amount</p>
              <p className="text-2xl font-bold text-gray-900">LKR {pendingAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaFileAlt className="text-purple-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Vouchers</p>
              <p className="text-2xl font-bold text-gray-900">{vouchers.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voucher No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vouchers.map((voucher) => (
                <tr key={voucher.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{voucher.voucherNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{voucher.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{voucher.payee}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LKR {voucher.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {voucher.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentVoucher; 