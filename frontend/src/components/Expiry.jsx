import React, { useState } from 'react';
import { FaCalendarAlt, FaPrint, FaPlus, FaTimes, FaSearch, FaFilter } from 'react-icons/fa';

const Expiry = () => {
  const [referenceDate, setReferenceDate] = useState('2025-07-28');
  const [filterExpiry, setFilterExpiry] = useState('Show All');
  const [searchTerm, setSearchTerm] = useState('');
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

  const [items, setItems] = useState([
    {
      id: 1,
      itemName: 'Engine Oil Filter',
      batchNumber: 'BATCH-2025-001',
      category: 'Filters',
      quantity: 50,
      expiryDate: '2025-08-15',
      supplier: 'Toyota Lanka',
      purchaseDate: '2025-01-15',
      cost: 250.00,
      location: 'Main Store',
      status: 'Expiring Soon'
    },
    {
      id: 2,
      itemName: 'Brake Fluid DOT 4',
      batchNumber: 'BATCH-2025-002',
      category: 'Fluids',
      quantity: 25,
      expiryDate: '2025-07-30',
      supplier: 'Honda Lanka',
      purchaseDate: '2025-02-20',
      cost: 180.00,
      location: 'Parts Store',
      status: 'Expiring Soon'
    },
    {
      id: 3,
      itemName: 'Air Filter Element',
      batchNumber: 'BATCH-2025-003',
      category: 'Filters',
      quantity: 30,
      expiryDate: '2025-06-20',
      supplier: 'Nissan Lanka',
      purchaseDate: '2025-01-10',
      cost: 120.00,
      location: 'Main Store',
      status: 'Expired'
    },
    {
      id: 4,
      itemName: 'Coolant Antifreeze',
      batchNumber: 'BATCH-2025-004',
      category: 'Fluids',
      quantity: 40,
      expiryDate: '2025-09-10',
      supplier: 'Mitsubishi Lanka',
      purchaseDate: '2025-03-05',
      cost: 300.00,
      location: 'Parts Store',
      status: 'Good'
    }
  ]);

  const filterOptions = [
    'Show All',
    'Expired',
    'Expiring Today',
    'Expiring This Week',
    'Expiring This Month',
    'Expiring Next Month'
  ];

  const categories = ['Filters', 'Fluids', 'Belts', 'Hoses', 'Gaskets', 'Seals', 'Oils', 'Greases'];
  const suppliers = ['Toyota Lanka', 'Honda Lanka', 'Nissan Lanka', 'Mitsubishi Lanka', 'Suzuki Lanka', 'BMW Lanka'];
  const locations = ['Main Store', 'Parts Store', 'Service Bay 1', 'Service Bay 2', 'Admin Office'];

  const handlePrint = () => {
    window.print();
  };

  const handleAddExpiry = () => {
    const newItem = {
      id: items.length + 1,
      ...newExpiry,
      quantity: parseInt(newExpiry.quantity),
      cost: parseFloat(newExpiry.cost),
      status: getExpiryStatus(newExpiry.expiryDate)
    };

    setItems(prev => [...prev, newItem]);
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
  };

  const getExpiryStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Expiring Today';
    if (diffDays <= 7) return 'Expiring Soon';
    if (diffDays <= 30) return 'Expiring This Month';
    return 'Good';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Expiring Today': return 'bg-orange-100 text-orange-800';
      case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800';
      case 'Expiring This Month': return 'bg-blue-100 text-blue-800';
      case 'Good': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterExpiry === 'Show All' || item.status === filterExpiry;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Item Inventory Expiries</h1>
          <p className="text-gray-600">Track and manage item expiry dates</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <FaPlus size={16} />
            Add Expiry Item
          </button>
          <button
            onClick={handlePrint}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
          >
            <FaPrint size={16} />
            Print Report
          </button>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Reference Date */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Reference Date:</label>
            <div className="relative">
              <input
                type="date"
                value={referenceDate}
                onChange={(e) => setReferenceDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Filter Expiry */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Filter Status:</label>
            <select
              value={filterExpiry}
              onChange={(e) => setFilterExpiry(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {filterOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
            <FaFilter size={16} />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-800 text-white">
          <div className="grid grid-cols-7 gap-4 p-4 font-bold text-sm">
            <div>ITEM NAME</div>
            <div>BATCH NUMBER</div>
            <div>CATEGORY</div>
            <div>QUANTITY</div>
            <div>EXPIRY DATE</div>
            <div>SUPPLIER</div>
            <div>STATUS</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-lg">
              No items found matching the criteria.
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="grid grid-cols-7 gap-4 p-4 hover:bg-gray-50">
                <div className="font-medium text-gray-900">{item.itemName}</div>
                <div className="text-gray-600">{item.batchNumber}</div>
                <div className="text-gray-600">{item.category}</div>
                <div className="text-gray-600">{item.quantity}</div>
                <div className="text-gray-600">{item.expiryDate}</div>
                <div className="text-gray-600">{item.supplier}</div>
                <div>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Expiry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Add New Expiry Item</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Item Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Name
                </label>
                <input
                  type="text"
                  value={newExpiry.itemName}
                  onChange={(e) => setNewExpiry(prev => ({ ...prev, itemName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter item name"
                />
              </div>

              {/* Batch Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch Number
                </label>
                <input
                  type="text"
                  value={newExpiry.batchNumber}
                  onChange={(e) => setNewExpiry(prev => ({ ...prev, batchNumber: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter batch number"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newExpiry.category}
                  onChange={(e) => setNewExpiry(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select category...</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={newExpiry.quantity}
                  onChange={(e) => setNewExpiry(prev => ({ ...prev, quantity: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter quantity"
                />
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={newExpiry.expiryDate}
                  onChange={(e) => setNewExpiry(prev => ({ ...prev, expiryDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Supplier */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supplier
                </label>
                <select
                  value={newExpiry.supplier}
                  onChange={(e) => setNewExpiry(prev => ({ ...prev, supplier: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select supplier...</option>
                  {suppliers.map(supplier => (
                    <option key={supplier} value={supplier}>{supplier}</option>
                  ))}
                </select>
              </div>

              {/* Purchase Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Date
                </label>
                <input
                  type="date"
                  value={newExpiry.purchaseDate}
                  onChange={(e) => setNewExpiry(prev => ({ ...prev, purchaseDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Cost */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost (LKR)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newExpiry.cost}
                  onChange={(e) => setNewExpiry(prev => ({ ...prev, cost: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter cost"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={newExpiry.location}
                  onChange={(e) => setNewExpiry(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select location...</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddExpiry}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Expiry Item
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expiry; 