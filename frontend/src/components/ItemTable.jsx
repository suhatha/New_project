import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { FiFilePlus } from 'react-icons/fi';
import * as XLSX from 'xlsx';
import ItemForm from './ItemForm';
import axios from 'axios';

export default function ItemTable() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/items', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setItems(response.data.data.data || response.data.data);
      } else {
        setError('Failed to fetch items');
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('Error fetching items from server');
    } finally {
      setLoading(false);
    }
  };

  // Add new item
  const handleAddItem = async (itemData) => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/api/items', itemData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setItems(prev => [response.data.data, ...prev]);
        setShowForm(false);
        alert('Item added successfully!');
      } else {
        setError('Failed to add item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      setError('Error adding item to server');
    } finally {
      setLoading(false);
    }
  };

  // Update item
  const handleUpdateItem = async (id, itemData) => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:8000/api/items/${id}`, itemData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setItems(prev => prev.map(item => 
          item.id === id ? response.data.data : item
        ));
        setEditingItem(null);
        setShowForm(false);
        alert('Item updated successfully!');
      } else {
        setError('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      setError('Error updating item on server');
    } finally {
      setLoading(false);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete this item?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:8000/api/items/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setItems(prev => prev.filter(item => item.id !== id));
        alert('Item deleted successfully!');
      } else {
        setError('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Error deleting item from server');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleHide = (id) => {
    // Implement hide functionality if needed
    alert(`Hide item with ID: ${id}`);
  };

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure to delete all items?')) {
      setItems([]);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.short_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const token = localStorage.getItem('token');
        
        // Import each item
        for (const row of jsonData) {
          const itemData = {
            name: row.Name || '',
            category: row.Category || '',
            company: row.Company || '',
            supplier: row.Supplier || '',
            mrp: parseFloat(row.MRP) || 0,
            quantity: parseInt(row['Stock Quantity'] || row.Quantity) || 0,
            status: 'active'
          };

          await axios.post('http://localhost:8000/api/items', itemData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
        }

        // Refresh the items list
        fetchItems();
        alert('Items imported successfully!');
      } catch (error) {
        console.error('Error importing items:', error);
        alert('Error importing items');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleExport = () => {
    const dataToExport = items.map((item) => {
      // Calculate stock status for export
      const getStockStatus = (quantity, minStock) => {
        const qty = parseInt(quantity) || 0;
        const minStockThreshold = parseInt(minStock) || 10;
        if (qty === 0) return 'Out of Stock';
        else if (qty <= minStockThreshold) return 'Low Stock';
        else return 'In Stock';
      };
      
      return {
        Name: item.name,
        Category: item.category || 'N/A',
        Company: item.company || 'N/A',
        Supplier: item.supplier || 'N/A',
        MRP: item.mrp || 0,
        'Stock Quantity': item.quantity || 0,
        Status: getStockStatus(item.quantity, item.min_stock)
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Items');

    XLSX.writeFile(workbook, 'item_table.xlsx');
  };

  // Load items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Top Controls */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50"
          onClick={() => setShowForm(true)}
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin" /> : <FiFilePlus />}
          Add Item
        </button>

        <div className="flex flex-wrap gap-2">
          {/* Import Button */}
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleImport}
            className="hidden"
            id="excelImport"
          />
          <label
            htmlFor="excelImport"
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 cursor-pointer"
          >
            Import Excel
          </label>

          <button
            onClick={handleExport}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700"
          >
            Export Excel
          </button>

          <button
            onClick={handleDeleteAll}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
          >
            Delete All
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MRP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center">
                  <FaSpinner className="animate-spin mx-auto text-blue-600" />
                  <p className="mt-2 text-gray-600">Loading items...</p>
                </td>
              </tr>
            ) : filteredItems.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  No items found
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => {
                // Calculate stock status based on quantity and min_stock
                const getStockStatus = (quantity, minStock) => {
                  const qty = parseInt(quantity) || 0;
                  const minStockThreshold = parseInt(minStock) || 10; // Default to 10 if not set
                  
                  if (qty === 0) {
                    return { status: 'Out of Stock', color: 'bg-red-100 text-red-800' };
                  } else if (qty <= minStockThreshold) {
                    return { status: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
                  } else {
                    return { status: 'In Stock', color: 'bg-green-100 text-green-800' };
                  }
                };
                
                const stockInfo = getStockStatus(item.quantity, item.min_stock);
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.category || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.company || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.supplier || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      LKR {parseFloat(item.mrp || 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="font-medium">{item.quantity || 0}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockInfo.color}`}>
                        {stockInfo.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Edit"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleHide(item.id)}
                          className="text-yellow-600 hover:text-yellow-800 p-1"
                          title="Hide"
                        >
                          <FaEyeSlash size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Item Form Modal */}
      {showForm && (
        <ItemForm
          onSave={editingItem ? (data) => handleUpdateItem(editingItem.id, data) : handleAddItem}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
          item={editingItem}
        />
      )}
    </div>
  );
}
