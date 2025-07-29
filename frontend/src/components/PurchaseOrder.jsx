import React, { useState, useMemo } from 'react';
import { FaEye, FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const PurchaseOrder = () => {
  const [supplierInfo, setSupplierInfo] = useState({
    supplier: '',
    phone: '',
    address: ''
  });

  const [newItem, setNewItem] = useState({
    product: '',
    quantity: 1,
    unitPrice: 0
  });

  const [orderItems, setOrderItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  // Mock suppliers for the dropdown
  const suppliers = [
    { id: 1, name: 'Auto Parts Plus', phone: '+94712345678', address: '123 Main Street, Colombo' },
    { id: 2, name: 'Motor Solutions Ltd', phone: '+94787654321', address: '456 Auto Lane, Kandy' },
    { id: 3, name: 'Car Care Pro', phone: '+94711223344', address: '789 Garage Road, Galle' },
    { id: 4, name: 'Premium Auto Supplies', phone: '+94755667788', address: '321 Parts Avenue, Jaffna' }
  ];

  // Mock products for the dropdown
  const products = [
    { id: 1, name: 'Engine Oil Filter - Premium Grade', batch: 'BATCH-001', price: 1250.00 },
    { id: 2, name: 'Brake Pads Set - Front & Rear', batch: 'BATCH-002', price: 890.00 },
    { id: 3, name: 'Air Filter - High Performance', batch: 'BATCH-003', price: 450.00 },
    { id: 4, name: 'Spark Plugs - Iridium', batch: 'BATCH-004', price: 350.00 },
    { id: 5, name: 'Timing Belt - OEM Quality', batch: 'BATCH-005', price: 2200.00 },
    { id: 6, name: 'Oil Pump - Complete Assembly', batch: 'BATCH-006', price: 1800.00 },
    { id: 7, name: 'Water Pump - Aluminum Housing', batch: 'BATCH-007', price: 950.00 },
    { id: 8, name: 'Fuel Filter - Inline Type', batch: 'BATCH-008', price: 280.00 }
  ];

  const handleSupplierChange = (e) => {
    try {
      const { name, value } = e.target;
      setSupplierInfo(prev => ({
        ...prev,
        [name]: value
      }));

      // Auto-fill supplier details when supplier is selected
      if (name === 'supplier') {
        const selectedSupplier = suppliers.find(s => s.id.toString() === value);
        if (selectedSupplier) {
          setSupplierInfo(prev => ({
            ...prev,
            phone: selectedSupplier.phone,
            address: selectedSupplier.address
          }));
        }
      }
    } catch (error) {
      console.error('Error in handleSupplierChange:', error);
    }
  };

  const handleItemChange = (e) => {
    try {
      const { name, value } = e.target;
      setNewItem(prev => ({
        ...prev,
        [name]: name === 'quantity' || name === 'unitPrice' ? parseFloat(value) || 0 : value
      }));
    } catch (error) {
      console.error('Error in handleItemChange:', error);
    }
  };

  const handleAddItem = () => {
    try {
      if (!newItem.product || newItem.quantity <= 0 || newItem.unitPrice <= 0) {
        alert('Please fill in all required fields with valid values');
        return;
      }

      const selectedProduct = products.find(p => p.id.toString() === newItem.product);
      if (!selectedProduct) {
        alert('Please select a valid product');
        return;
      }

      const item = {
        id: Date.now(),
        productName: selectedProduct.name,
        batch: selectedProduct.batch,
        quantity: newItem.quantity,
        unitPrice: newItem.unitPrice,
        total: newItem.quantity * newItem.unitPrice
      };

      setOrderItems(prev => [...prev, item]);
      
      // Reset form
      setNewItem({
        product: '',
        quantity: 1,
        unitPrice: 0
      });
    } catch (error) {
      console.error('Error in handleAddItem:', error);
    }
  };

  const handleEditItem = (itemId) => {
    try {
      const item = orderItems.find(item => item.id === itemId);
      if (item) {
        setEditingItem(item);
        setNewItem({
          product: products.find(p => p.name === item.productName)?.id.toString() || '',
          quantity: item.quantity,
          unitPrice: item.unitPrice
        });
      }
    } catch (error) {
      console.error('Error in handleEditItem:', error);
    }
  };

  const handleUpdateItem = () => {
    try {
      if (!editingItem) return;

      const selectedProduct = products.find(p => p.id.toString() === newItem.product);
      if (!selectedProduct) {
        alert('Please select a valid product');
        return;
      }

      const updatedItem = {
        ...editingItem,
        productName: selectedProduct.name,
        batch: selectedProduct.batch,
        quantity: newItem.quantity,
        unitPrice: newItem.unitPrice,
        total: newItem.quantity * newItem.unitPrice
      };

      setOrderItems(prev => prev.map(item => 
        item.id === editingItem.id ? updatedItem : item
      ));

      // Reset form
      setEditingItem(null);
      setNewItem({
        product: '',
        quantity: 1,
        unitPrice: 0
      });
    } catch (error) {
      console.error('Error in handleUpdateItem:', error);
    }
  };

  const handleDeleteItem = (itemId) => {
    try {
      if (window.confirm('Are you sure you want to remove this item?')) {
        setOrderItems(prev => prev.filter(item => item.id !== itemId));
      }
    } catch (error) {
      console.error('Error in handleDeleteItem:', error);
    }
  };

  const handleCancelEdit = () => {
    try {
      setEditingItem(null);
      setNewItem({
        product: '',
        quantity: 1,
        unitPrice: 0
      });
    } catch (error) {
      console.error('Error in handleCancelEdit:', error);
    }
  };

  const handleSubmitOrder = () => {
    try {
      if (!supplierInfo.supplier) {
        alert('Please select a supplier');
        return;
      }

      if (orderItems.length === 0) {
        alert('Please add at least one item to the order');
        return;
      }

      const orderTotal = orderItems.reduce((sum, item) => sum + item.total, 0);
      alert(`Purchase order submitted successfully!\nTotal: LKR ${orderTotal.toFixed(2)}`);
      
      // Reset form
      setSupplierInfo({ supplier: '', phone: '', address: '' });
      setOrderItems([]);
      setNewItem({ product: '', quantity: 1, unitPrice: 0 });
      setEditingItem(null);
    } catch (error) {
      console.error('Error in handleSubmitOrder:', error);
    }
  };

  const handleViewOrders = () => {
    try {
      alert('View Orders functionality - This would show a list of all purchase orders');
    } catch (error) {
      console.error('Error in handleViewOrders:', error);
    }
  };

  // Calculate total
  const orderTotal = useMemo(() => {
    try {
      return orderItems.reduce((sum, item) => sum + item.total, 0);
    } catch (error) {
      console.error('Error calculating total:', error);
      return 0;
    }
  }, [orderItems]);

  try {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="bg-blue-600 text-white px-8 py-4 rounded-lg flex-1 mr-4">
              <h1 className="text-2xl font-bold text-center">PURCHASE ORDER</h1>
              <p className="text-center text-blue-100 mt-1">Manage your purchase orders</p>
            </div>
            <button
              onClick={handleViewOrders}
              className="bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaEye size={16} />
              View Orders
            </button>
          </div>

          {/* Supplier Information Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Supplier Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                <select
                  name="supplier"
                  value={supplierInfo.supplier}
                  onChange={handleSupplierChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map(supplier => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={supplierInfo.phone}
                  onChange={handleSupplierChange}
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={supplierInfo.address}
                  onChange={handleSupplierChange}
                  placeholder="Supplier Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Order Items Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Items</h2>
            
            {/* Add New Item Sub-section */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Item</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="product"
                    value={newItem.product}
                    onChange={handleItemChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Search or select product with batch info...</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name} - {product.batch}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={newItem.quantity}
                    onChange={handleItemChange}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit Price (LKR) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="unitPrice"
                    value={newItem.unitPrice}
                    onChange={handleItemChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  {editingItem ? (
                    <div className="flex gap-2">
                      <button
                        onClick={handleUpdateItem}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        <FaSave size={14} />
                        Update
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center gap-2"
                      >
                        <FaTimes size={14} />
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleAddItem}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center gap-2"
                    >
                      <FaPlus size={14} />
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRODUCT & BATCH DETAILS</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QUANTITY</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UNIT PRICE (LKR)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL (LKR)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orderItems.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        No items added to the order yet.
                      </td>
                    </tr>
                  ) : (
                    orderItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                            <div className="text-sm text-gray-500">Batch: {item.batch}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">LKR {item.unitPrice.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LKR {item.total.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditItem(item.id)}
                              className="text-blue-600 hover:text-blue-800 p-1"
                              title="Edit Item"
                            >
                              <FaEdit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Delete Item"
                            >
                              <FaTrash size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Total and Submit Button */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <div></div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">Total: LKR {orderTotal.toFixed(2)}</p>
                </div>
                <button
                  onClick={handleSubmitOrder}
                  disabled={orderItems.length === 0}
                  className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <FaSave size={16} />
                  Submit Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering PurchaseOrder:', error);
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800">Purchase Order</h1>
          <p className="text-red-600">Error loading purchase order page. Please refresh the page.</p>
        </div>
      </div>
    );
  }
};

export default PurchaseOrder; 