import React, { useState, useEffect, useCallback, memo } from 'react';
import { FaPlus, FaPrint, FaFilter, FaSync, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

// Using memo to prevent unnecessary re-renders
const Expiry = memo(() => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [referenceDate, setReferenceDate] = useState(new Date().toISOString().slice(0, 10));
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

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

  // Memoize the getExpiryStatus function to prevent unnecessary calculations
  const getExpiryStatus = useCallback((date) => {
    const today = new Date();
    const expiry = new Date(date);
    const diff = (expiry - today) / (1000 * 60 * 60 * 24);

    if (diff <= 0) return 'Expired';
    if (diff <= 30) return 'Expiring Soon';
    return 'Good';
  }, []);

  // Memoize the fetch function to prevent unnecessary re-renders
  const fetchItems = useCallback(() => {
    setLoading(true);
    
    // First try to fetch from the backend API
    axios.get('/api/expiry-items', {
      params: {
        search: searchTerm,
        status: filterStatus !== 'All' ? filterStatus : '',
        referenceDate: referenceDate
      }
    })
    .then(response => {
      if (response.data.success) {
        setItems(response.data.data);
      } else {
        console.error('API returned error:', response.data.message);
        // Fallback to localStorage if API fails
        fetchFromLocalStorage();
      }
    })
    .catch(error => {
      console.error('Failed to fetch items from API:', error);
      // Fallback to localStorage if API fails
      fetchFromLocalStorage();
    })
    .finally(() => {
      setLoading(false);
    });
  }, [searchTerm, filterStatus, referenceDate]);
  
  // Fallback function to fetch from localStorage
  const fetchFromLocalStorage = useCallback(() => {
    try {
      // Get items from localStorage
      const storedItems = localStorage.getItem('inventory_items');
      let inventoryItems = [];
      
      if (storedItems) {
        try {
          inventoryItems = JSON.parse(storedItems);
        } catch (e) {
          console.error('Error parsing stored items:', e);
        }
      }
      
      // Filter items that have expiry dates
      const itemsWithExpiry = inventoryItems
        .filter(item => item.expiry && item.expiry.trim() !== '')
        .map(item => ({
          itemName: item.name || '',
          batchNumber: item.barcode || `B${Math.floor(Math.random() * 100000)}`,
          category: item.category || '',
          quantity: parseInt(item.quantity) || 0,
          expiryDate: item.expiry || '',
          supplier: item.supplier || '',
          purchaseDate: new Date().toISOString().slice(0, 10), // Default to today
          cost: parseFloat(item.cost) || 0,
          location: item.store_location || '',
          status: getExpiryStatus(item.expiry)
        }));
      
      // If no items with expiry are found, provide a fallback message or empty array
      setItems(itemsWithExpiry.length > 0 ? itemsWithExpiry : []);
    } catch (err) {
      console.error('Failed to fetch items from localStorage:', err);
      setItems([]);
    }
  }, [getExpiryStatus]);

  useEffect(() => {
    // Fetch items when component mounts or when search/filter/date changes
    fetchItems();
    
    // Set up a storage event listener to refresh items when localStorage changes
    const handleStorageChange = (e) => {
      if (e.key === 'inventory_items') {
        fetchItems();
      }
    };
    
    // Add event listener
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [fetchItems, searchTerm, filterStatus, referenceDate]);

  const handleAddExpiry = async () => {
    const newItem = {
      ...newExpiry,
      quantity: parseInt(newExpiry.quantity) || 0,
      cost: parseFloat(newExpiry.cost) || 0
      // Status will be calculated on the server
    };

    try {
      // Send the new expiry item to the backend API
      const response = await axios.post('/api/expiry-items', newItem);
      
      if (response.data.success) {
        // Add the newly created item (with server-generated ID and status) to the list
        setItems(prev => [...prev, response.data.data]);
        // Reset the form
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
        // Close the modal
        setShowAddModal(false);
      } else {
        console.error('Failed to add expiry item:', response.data.message);
        alert('Failed to add expiry item: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error adding expiry item:', error);
      alert('Error adding expiry item. Please try again.');
      
      // Fallback to localStorage if API fails
      const storedItems = localStorage.getItem('inventory_items');
      let inventoryItems = [];
      
      if (storedItems) {
        try {
          inventoryItems = JSON.parse(storedItems);
        } catch (e) {
          console.error('Error parsing stored items:', e);
        }
      }
      
      // Create an inventory item from the expiry item
      const inventoryItem = {
        item_id: `EXP${Date.now()}`, // Generate a unique ID
        name: newItem.itemName,
        barcode: newItem.batchNumber,
        category: newItem.category,
        quantity: newItem.quantity,
        expiry: newItem.expiryDate,
        supplier: newItem.supplier,
        cost: newItem.cost,
        store_location: newItem.location,
        branch: 'Main Branch', // Default value
        status: 'active'
      };
      
      // Add to inventory items
      inventoryItems.push(inventoryItem);
      
      // Save back to localStorage
      localStorage.setItem('inventory_items', JSON.stringify(inventoryItems));
      
      // Add to the expiry items list with calculated status
      const expiryItemWithStatus = {
        ...newItem,
        status: getExpiryStatus(newItem.expiryDate)
      };
      setItems(prev => [...prev, expiryItemWithStatus]);
      
      // Close modal and reset form
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
    }
  };

  // Function to manually refresh data
  const refreshData = useCallback(() => {
    fetchItems();
  }, [fetchItems]);
  
  // Function to delete an expiry item
  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      // Send delete request to the API
      const response = await axios.delete(`/api/expiry-items/${itemId}`);
      
      if (response.data.success) {
        // Remove the item from the state
        setItems(prev => prev.filter(item => item.id !== itemId));
      } else {
        console.error('Failed to delete item:', response.data.message);
        alert('Failed to delete item: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item. Please try again.');
    }
  };
  
  // State for editing an item
  const [editItem, setEditItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Function to open edit modal
  const openEditModal = (item) => {
    setEditItem(item);
    setShowEditModal(true);
  };
  
  // Function to update an expiry item
  const handleUpdateItem = async () => {
    if (!editItem) return;
    
    try {
      // Send update request to the API
      const response = await axios.put(`/api/expiry-items/${editItem.id}`, editItem);
      
      if (response.data.success) {
        // Update the item in the state
        setItems(prev => prev.map(item => 
          item.id === editItem.id ? response.data.data : item
        ));
        // Close the modal
        setShowEditModal(false);
        setEditItem(null);
      } else {
        console.error('Failed to update item:', response.data.message);
        alert('Failed to update item: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Error updating item. Please try again.');
    }
  };

  // Memoize the filtering logic to prevent unnecessary re-renders
  const filteredItems = useCallback(() => {
    return items.filter(item =>
      (item.itemName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) &&
      (filterStatus === 'All' || item.status === filterStatus)
    );
  }, [items, searchTerm, filterStatus]);
  
  // Get the filtered items
  const displayItems = filteredItems();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Item Inventory Expiries</h2>
      <p className="text-gray-600 mb-6">Track and manage item expiry dates</p>
      
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-300 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      )}

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
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded inline-flex items-center"
          onClick={refreshData}
        >
          <FaSync className="mr-2" /> Refresh Data
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded inline-flex items-center"
        >
          <FaPrint className="mr-2" /> Print Report
        </button>
      </div>

      {!loading && (
        <div className="overflow-x-auto">
          {displayItems.length > 0 ? (
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
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayItems.map((item, idx) => (
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
                  <td className="px-4 py-2 text-center">
                    <button 
                      onClick={() => openEditModal(item)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                      title="Edit Item"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Item"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No expiry items found</p>
              <p className="text-gray-400 mt-2">Add items with expiry dates in the Item Form or use the "Add Expiry Item" button above</p>
            </div>
          )}
        </div>
      )}

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
      
      {showEditModal && editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-lg font-bold mb-4">Edit Expiry Item</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(editItem).map(([key, val]) => {
                // Skip id and status fields as they shouldn't be edited directly
                if (key === 'id' || key === 'status') return null;
                
                return (
                  <input
                    key={key}
                    type={key === 'quantity' || key === 'cost' ? 'number' : key.includes('Date') ? 'date' : 'text'}
                    placeholder={key.replace(/([A-Z])/g, ' $1')}
                    className="border rounded px-3 py-2"
                    value={val || ''}
                    onChange={e => setEditItem({ ...editItem, [key]: e.target.value })}
                  />
                );
              })}
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditItem(null);
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateItem}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

// Using memo to prevent unnecessary re-renders
export default Expiry;
