import React, { useState } from 'react';
import { FaReceipt, FaPlus, FaEdit, FaTrash, FaSearch, FaDownload, FaPrint, FaEye, FaCalendar, FaUser, FaBuilding, FaFileAlt, FaCheck, FaTimes, FaMoneyBillWave, FaClock } from 'react-icons/fa';

const ReceiptVoucher = () => {
  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      voucherNumber: 'RV-2025-001',
      date: '2025-07-29',
      payer: 'Ahmed Khan',
      payerType: 'Customer',
      category: 'Service Payment',
      amount: 8500.00,
      paymentMethod: 'Cash',
      reference: 'INV-2025-001',
      description: 'Major service for Toyota Corolla ABC-1234',
      status: 'Received',
      receivedBy: 'Sarah Chen',
      receivedAt: '2025-07-29 10:30',
      attachments: ['invoice.pdf', 'receipt.pdf']
    },
    {
      id: 2,
      voucherNumber: 'RV-2025-002',
      date: '2025-07-28',
      payer: 'David Brown',
      payerType: 'Customer',
      category: 'Parts Sale',
      amount: 3200.00,
      paymentMethod: 'Bank Transfer',
      reference: 'INV-2025-002',
      description: 'Brake pads and brake fluid for Honda Civic',
      status: 'Received',
      receivedBy: 'Mike Wilson',
      receivedAt: '2025-07-28 14:15',
      attachments: ['invoice.pdf']
    },
    {
      id: 3,
      voucherNumber: 'RV-2025-003',
      date: '2025-07-27',
      payer: 'Ceylinco Insurance',
      payerType: 'Insurance',
      category: 'Insurance Claim',
      amount: 25000.00,
      paymentMethod: 'Bank Transfer',
      reference: 'CLAIM-2025-001',
      description: 'Insurance claim for accident repair',
      status: 'Received',
      receivedBy: 'Alex Davis',
      receivedAt: '2025-07-27 09:00',
      attachments: ['claim_form.pdf', 'repair_bill.pdf']
    },
    {
      id: 4,
      voucherNumber: 'RV-2025-004',
      date: '2025-07-26',
      payer: 'Maria Silva',
      payerType: 'Customer',
      category: 'Service Payment',
      amount: 4500.00,
      paymentMethod: 'Credit Card',
      reference: 'INV-2025-003',
      description: 'Oil change and filter replacement',
      status: 'Pending',
      receivedBy: null,
      receivedAt: null,
      attachments: ['invoice.pdf']
    }
  ]);

  const totalAmount = vouchers.reduce((sum, voucher) => sum + voucher.amount, 0);
  const receivedAmount = vouchers.filter(v => v.status === 'Received').reduce((sum, voucher) => sum + voucher.amount, 0);
  const pendingAmount = vouchers.filter(v => v.status === 'Pending').reduce((sum, voucher) => sum + voucher.amount, 0);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Receipt Vouchers</h1>
          <p className="text-gray-600">Track all incoming payments and revenue</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <FaPlus size={16} />
            New Receipt
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
            <FaMoneyBillWave className="text-green-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">LKR {totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <FaCheck className="text-green-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Received Amount</p>
              <p className="text-2xl font-bold text-gray-900">LKR {receivedAmount.toLocaleString()}</p>
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
            <FaReceipt className="text-purple-600 text-2xl mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Receipts</p>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vouchers.map((voucher) => (
                <tr key={voucher.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{voucher.voucherNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{voucher.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{voucher.payer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LKR {voucher.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      voucher.status === 'Received' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
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

export default ReceiptVoucher; 