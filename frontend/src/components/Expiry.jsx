import React, { useState, useEffect } from 'react';
import { FaPlus, FaPrint, FaFilter } from 'react-icons/fa';
import axios from 'axios';

const Expiry = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [referenceDate, setReferenceDate] = useState(new Date().toISOString().slice(0, 10));
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newExpiry, setNewExpiry] = useState({
    itemName: '',
    batchNumber: '',
    category: '',
    quantity: '',
    expiryDate: '',
    supplier: '',
    purchaseDate: '',
    cost: '',
    location: ''
  });

  useEffect(() => {
    axios.get('/api/expiry-items')
      .then(res => setItems(res.data))
      .catch(err => console.error('Failed to fetch items:', err));
  }, []);

  const getExpiryStatus = (date) => {
    const today = new Date();
    const expiry = new Date(date);
    const diff = (expiry - today) / (1000 * 60 * 60 * 24);

    if (diff <= 0) return 'Expired';
    if (diff <= 30) return 'Expiring Soon';
    return 'Good';
  };

  const handleAddExpiry = async () => {
    const newItem = {
      ...newExpiry,
      quantity: parseInt(newExpiry.quantity),
      cost: parseFloat(newExpiry.cost),
      status: getExpiryStatus(newExpiry.expiryDate)
    };

    try {
      const res = await axios.post('/api/expiry-items', newItem);
      setItems(prev => [...prev, res.data]);
      setShowAddModal(false);
      setNewExpiry({
        itemName: '',
        batchNumber: '',
        category: '',
        quantity: '',
        expiryDate: '',
        supplier: '',
        purchaseDate: '',
        cost: '',
        location: ''
      });
    } catch (err) {
      console.error('Failed to add expiry item:', err);
    }
  };

  const filteredItems = items.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === 'All' || item.status === filterStatus)
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Item Inventory Expiries</h2>
      <p className="text-gray-600 mb-6">Track and manage item expiry dates</p>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search items..."
          className="border rounded px-3 py-2 w-full sm:w-auto"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          value={referenceDate}
          onChange={e => setReferenceDate(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="All">Show All</option>
          <option value="Expiring Soon">Expiring Soon</option>
          <option value="Expired">Expired</option>
          <option value="Good">Good</option>
        </select>
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded inline-flex items-center"
          onClick={() => {}}
        >
          <FaFilter className="mr-2" /> Apply Filters
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-flex items-center"
          onClick={() => setShowAddModal(true)}
        >
          <FaPlus className="mr-2" /> Add Expiry Item
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded inline-flex items-center"
        >
          <FaPrint className="mr-2" /> Print Report
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Item Name</th>
              <th className="px-4 py-2">Batch Number</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Expiry Date</th>
              <th className="px-4 py-2">Supplier</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{item.itemName}</td>
                <td className="px-4 py-2">{item.batchNumber}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">{item.expiryDate}</td>
                <td className="px-4 py-2">{item.supplier}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-white text-xs ${
                    item.status === 'Expired' ? 'bg-red-500' :
                    item.status === 'Expiring Soon' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-lg font-bold mb-4">Add Expiry Item</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(newExpiry).map(([key, val]) => (
                <input
                  key={key}
                  type={key === 'quantity' || key === 'cost' ? 'number' : key.includes('Date') ? 'date' : 'text'}
                  placeholder={key.replace(/([A-Z])/g, ' $1')}
                  className="border rounded px-3 py-2"
                  value={val}
                  onChange={e => setNewExpiry({ ...newExpiry, [key]: e.target.value })}
                />
              ))}
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExpiry}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expiry;
