import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaTrash, FaSearch, FaTimes } from 'react-icons/fa';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const SalesEntry = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Form state
  const [form, setForm] = useState({
    billNumber: '',
    customer: '',
    date: new Date().toISOString().slice(0, 16),
    items: [],
    subtotal: 0,
    discount: 0,
    tax: 0,
    total: 0,
    payment: 'cash',
    notes: ''
  });
  
  // Item selection modal state
  const [showItemModal, setShowItemModal] = useState(false);
  const [availableItems, setAvailableItems] = useState([]);
  const [itemSearch, setItemSearch] = useState('');
  const [loadingItems, setLoadingItems] = useState(false);
  
  // Customer list (will be fetched from backend)
  const [customers, setCustomers] = useState(['Walk-in Customer']);
  
  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Generate bill number on component mount
  useEffect(() => {
    generateBillNumber();
  }, []);

  // Calculate totals when items or discount changes
  useEffect(() => {
    calculateTotals();
  }, [form.items, form.discount]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customers`);
      if (response.data && response.data.data) {
        setCustomers(['Walk-in Customer', ...response.data.data.map(c => c.name)]);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const generateBillNumber = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/generate-bill-number`);
      setForm(prev => ({ ...prev, billNumber: response.data.bill_number }));
    } catch (error) {
      console.error('Error generating bill number:', error);
      // Fallback to timestamp-based bill number
      const timestamp = Date.now();
      setForm(prev => ({ ...prev, billNumber: `BILL-${timestamp}` }));
    }
  };

  const fetchItems = async (search = '') => {
    setLoadingItems(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/items`, {
        params: { search, per_page: 50 }
      });
      setAvailableItems(response.data.data?.data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
      setAvailableItems([]);
    } finally {
      setLoadingItems(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleItemSearch = (value) => {
    setItemSearch(value);
    if (value.length > 2) {
      fetchItems(value);
    } else if (value.length === 0) {
      fetchItems();
    }
  };

  const addItemToSale = (item) => {
    const existingItemIndex = form.items.findIndex(saleItem => saleItem.id === item.id);
    
    if (existingItemIndex >= 0) {
      // Item already exists, increase quantity
      const updatedItems = [...form.items];
      updatedItems[existingItemIndex].quantity += 1;
      updatedItems[existingItemIndex].amount = updatedItems[existingItemIndex].quantity * updatedItems[existingItemIndex].rate;
      setForm(prev => ({ ...prev, items: updatedItems }));
    } else {
      // Add new item
      const newItem = {
        id: item.id,
        name: item.name,
        stock: item.quantity || 0,
        quantity: 1,
        rate: parseFloat(item.mrp) || 0,
        discount: 0,
        amount: parseFloat(item.mrp) || 0
      };
      setForm(prev => ({ ...prev, items: [...prev.items, newItem] }));
    }
    
    setShowItemModal(false);
    setItemSearch('');
  };

  const updateItemQuantity = (index, quantity) => {
    const updatedItems = [...form.items];
    updatedItems[index].quantity = Math.max(1, parseInt(quantity) || 1);
    updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].rate;
    setForm(prev => ({ ...prev, items: updatedItems }));
  };

  const updateItemRate = (index, rate) => {
    const updatedItems = [...form.items];
    updatedItems[index].rate = Math.max(0, parseFloat(rate) || 0);
    updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].rate;
    setForm(prev => ({ ...prev, items: updatedItems }));
  };

  const updateItemDiscount = (index, discount) => {
    const updatedItems = [...form.items];
    updatedItems[index].discount = Math.max(0, parseFloat(discount) || 0);
    const discountAmount = (updatedItems[index].quantity * updatedItems[index].rate * updatedItems[index].discount) / 100;
    updatedItems[index].amount = (updatedItems[index].quantity * updatedItems[index].rate) - discountAmount;
    setForm(prev => ({ ...prev, items: updatedItems }));
  };

  const removeItem = (index) => {
    const updatedItems = form.items.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, items: updatedItems }));
  };

  const calculateTotals = () => {
    const subtotal = form.items.reduce((sum, item) => sum + item.amount, 0);
    const discountAmount = (subtotal * form.discount) / 100;
    const taxableAmount = subtotal - discountAmount;
    const tax = taxableAmount * 0.18; // 18% GST
    const total = taxableAmount + tax;
    
    setForm(prev => ({
      ...prev,
      subtotal: subtotal,
      tax: tax,
      total: total
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.customer.trim()) {
      newErrors.customer = 'Customer name is required';
    }
    
    if (form.items.length === 0) {
      newErrors.items = 'At least one item is required';
    }
    
    // Check stock availability
    for (let item of form.items) {
      if (item.quantity > item.stock) {
        newErrors.stock = `Insufficient stock for ${item.name}. Available: ${item.stock}`;
        break;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare sales data
      const salesData = {
        bill_number: form.billNumber,
        customer: form.customer,
        date: form.date,
        subtotal: form.subtotal,
        discount: form.discount,
        tax: form.tax,
        total: form.total,
        payment_method: form.payment,
        notes: form.notes,
        items: form.items.map(item => ({
          item_id: item.id,
          quantity: item.quantity,
          rate: item.rate,
          discount: item.discount,
          amount: item.amount
        }))
      };
      
      const response = await axios.post(`${API_BASE_URL}/sales`, salesData);
      
      if (response.status === 201) {
        alert('Sales entry created successfully!');
        navigate('/sales');
      }
    } catch (error) {
      console.error('Error creating sales entry:', error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert('Failed to create sales entry. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Create Sales Entry</h2>
        <button
          onClick={() => navigate('/sales')}
          className="text-gray-600 hover:text-gray-800 px-4 py-2 border rounded-md"
        >
          Back to Sales
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bill Number</label>
            <input 
              name="billNumber" 
              value={form.billNumber} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" 
              required 
              readOnly 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
            <select 
              name="customer" 
              value={form.customer} 
              onChange={handleChange} 
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.customer ? 'border-red-500' : 'border-gray-300'
              }`}
              required 
            >
              <option value="">Select Customer</option>
              {customers.map((customer, index) => (
                <option key={index} value={customer}>{customer}</option>
              ))}
            </select>
            {errors.customer && <p className="text-red-500 text-sm mt-1">{errors.customer}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time *</label>
            <input 
              name="date" 
              value={form.date} 
              onChange={handleChange} 
              type="datetime-local" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
            />
          </div>
        </div>

        {/* Items Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Items</h3>
            <button
              type="button"
              onClick={() => {
                setShowItemModal(true);
                fetchItems();
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <FaPlus /> Add Item
            </button>
          </div>
          
          {errors.items && <p className="text-red-500 text-sm mb-2">{errors.items}</p>}
          {errors.stock && <p className="text-red-500 text-sm mb-2">{errors.stock}</p>}
          
          {form.items.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Item</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Stock</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Qty</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Rate</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Discount %</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Amount</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {form.items.map((item, index) => (
                    <tr key={item.id}>
                      <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.stock > 10 ? 'bg-green-100 text-green-800' :
                          item.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.stock}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItemQuantity(index, e.target.value)}
                          min="1"
                          max={item.stock}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItemRate(index, e.target.value)}
                          min="0"
                          step="0.01"
                          className="w-24 px-2 py-1 border border-gray-300 rounded text-center"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="number"
                          value={item.discount}
                          onChange={(e) => updateItemDiscount(index, e.target.value)}
                          min="0"
                          max="100"
                          step="0.01"
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                        ₹{item.amount.toFixed(2)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No items added. Click "Add Item" to start.
            </div>
          )}
        </div>

        {/* Totals Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select 
                  name="payment" 
                  value={form.payment} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="upi">UPI</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Overall Discount %</label>
                <input 
                  name="discount" 
                  value={form.discount} 
                  onChange={handleChange} 
                  type="number" 
                  min="0" 
                  max="100" 
                  step="0.01" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea 
                  name="notes" 
                  value={form.notes} 
                  onChange={handleChange} 
                  rows="3" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Additional notes..."
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Bill Summary</h3>
            <div className="bg-gray-50 p-4 rounded-md space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{form.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount ({form.discount}%):</span>
                <span>-₹{((form.subtotal * form.discount) / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18% GST):</span>
                <span>₹{form.tax.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>₹{form.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/sales')}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || form.items.length === 0}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Sales Entry'}
          </button>
        </div>
      </form>

      {/* Item Selection Modal */}
      {showItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Select Items</h3>
              <button
                onClick={() => {
                  setShowItemModal(false);
                  setItemSearch('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="mb-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={itemSearch}
                  onChange={(e) => handleItemSearch(e.target.value)}
                  placeholder="Search items..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {loadingItems ? (
              <div className="text-center py-4">Loading items...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {availableItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => addItemToSale(item)}
                    className="border border-gray-300 rounded-md p-4 hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">Category: {item.category?.name || 'N/A'}</p>
                    <p className="text-sm text-gray-600">MRP: ₹{item.mrp || '0.00'}</p>
                    <p className="text-sm">
                      Stock: 
                      <span className={`ml-1 px-2 py-1 rounded text-xs ${
                        item.quantity > 10 ? 'bg-green-100 text-green-800' :
                        item.quantity > 0 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.quantity || 0}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}
            
            {!loadingItems && availableItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {itemSearch ? 'No items found matching your search.' : 'No items available.'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesEntry;
