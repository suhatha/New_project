import React, { useState } from 'react';

const SalesEntry = () => {
  const [form, setForm] = useState({
    billNumber: '',
    customer: '',
    date: '',
    total: '',
    payment: '',
    status: 'Paid',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Sales entry created! (Demo only)');
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Create Sales Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="billNumber" value={form.billNumber} onChange={handleChange} placeholder="Bill Number" className="w-full px-4 py-2 border rounded" required />
        <input name="customer" value={form.customer} onChange={handleChange} placeholder="Customer" className="w-full px-4 py-2 border rounded" required />
        <input name="date" value={form.date} onChange={handleChange} placeholder="Date" type="datetime-local" className="w-full px-4 py-2 border rounded" required />
        <input name="total" value={form.total} onChange={handleChange} placeholder="Total" type="number" className="w-full px-4 py-2 border rounded" required />
        <select name="payment" value={form.payment} onChange={handleChange} className="w-full px-4 py-2 border rounded" required>
          <option value="">Select Payment Method</option>
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="upi">UPI</option>
        </select>
        <select name="status" value={form.status} onChange={handleChange} className="w-full px-4 py-2 border rounded" required>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Create Entry</button>
      </form>
    </div>
  );
};

export default SalesEntry; 