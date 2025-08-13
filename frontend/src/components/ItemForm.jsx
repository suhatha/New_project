import React, { useState, useEffect } from 'react';
import { FiPackage, FiDollarSign, FiBox, FiTag, FiMapPin, FiArrowLeft, FiLayers, FiBarChart2, FiPlus, FiX } from 'react-icons/fi';

export default function ItemForm({ onSave, onCancel, item = null }) {
  // State to track the next available item ID
  const [nextItemId, setNextItemId] = useState(1);
  
  // State for managing popups
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [newValue, setNewValue] = useState('');
  
  // State for dropdown options
  const [categoryOptions, setCategoryOptions] = useState([
    'Engine Parts', 'Brake System', 'Electrical', 'Suspension', 'Transmission',
    'Cooling System', 'Fuel System', 'Exhaust System', 'Body Parts', 'Interior',
    'Tools', 'Lubricants', 'Filters', 'Other'
  ]);
  const [typeOptions, setTypeOptions] = useState([
    'Original', 'OEM', 'Aftermarket', 'Remanufactured', 'Used'
  ]);
  const [supplierOptions, setSupplierOptions] = useState([
    'Supplier 1', 'Supplier 2', 'Supplier 3'
  ]);
  const [companyOptions, setCompanyOptions] = useState([
    'Company 1', 'Company 2', 'Company 3'
  ]);
  const [unitOptions, setUnitOptions] = useState([
    'Piece', 'Set', 'Pair', 'Liter', 'Kilogram'
  ]);
  const [locationOptions, setLocationOptions] = useState([
    'Main Store', 'Warehouse 1', 'Warehouse 2'
  ]);
  
  const [form, setForm] = useState({
    branch: '',
    item_id: '',  // This will be auto-generated
    name: '',
    short_name: '',
    expiry: '',
    barcode: '',
    mrp: '',
    cost: '',
    sales_price: '',
    min_price: '',
    min_stock: '',
    quantity: '',
    open_qty: '',
    open_value: '',
    category: '',
    type: '',
    supplier: '',
    company: '',
    unit: '',
    store_location: '',
    cabinet: '',
    row: '',
    status: 'active'
  });

  const [loading, setLoading] = useState(false);

  // Load item data if editing or set next item ID if creating new
  useEffect(() => {
    if (item) {
      // If editing an existing item
      setForm({
        branch: item.branch || '',
        item_id: item.item_id || '',
        name: item.name || '',
        short_name: item.short_name || '',
        expiry: item.expiry || '',
        barcode: item.barcode || '',
        mrp: item.mrp || '',
        cost: item.cost || '',
        sales_price: item.sales_price || '',
        min_price: item.min_price || '',
        min_stock: item.min_stock || '',
        quantity: item.quantity || '',
        open_qty: item.open_qty || '',
        open_value: item.open_value || '',
        category: item.category || '',
        type: item.type || '',
        supplier: item.supplier || '',
        company: item.company || '',
        unit: item.unit || '',
        store_location: item.store_location || '',
        cabinet: item.cabinet || '',
        row: item.row || '',
        status: item.status || 'active'
      });
      
      // Check if the item's values need to be added to the dropdown options
      if (item.category && !categoryOptions.includes(item.category)) {
        setCategoryOptions(prev => [...prev, item.category]);
      }
      if (item.type && !typeOptions.includes(item.type)) {
        setTypeOptions(prev => [...prev, item.type]);
      }
      if (item.supplier && !supplierOptions.includes(item.supplier)) {
        setSupplierOptions(prev => [...prev, item.supplier]);
      }
      if (item.company && !companyOptions.includes(item.company)) {
        setCompanyOptions(prev => [...prev, item.company]);
      }
      if (item.unit && !unitOptions.includes(item.unit)) {
        setUnitOptions(prev => [...prev, item.unit]);
      }
      if (item.store_location && !locationOptions.includes(item.store_location)) {
        setLocationOptions(prev => [...prev, item.store_location]);
      }
    } else {
      // If creating a new item, fetch the latest item ID
      // In a real application, this would come from an API call
      // For this example, we'll simulate it with a local state
      fetchLatestItemId();
    }
  }, [item, categoryOptions, typeOptions, supplierOptions, companyOptions, unitOptions, locationOptions]);
  
  // Simulate fetching the latest item ID from the backend
  const fetchLatestItemId = () => {
    // In a real application, this would be an API call
    // For now, we'll just use the nextItemId state
    // This function would typically query the database for the highest ID and add 1
    
    // Set the item_id field with the next available ID
    setForm(prev => ({
      ...prev,
      item_id: nextItemId.toString()
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to handle opening popups
  const handleOpenPopup = (type) => {
    setPopupType(type);
    setNewValue('');
    setShowPopup(true);
  };

  // Function to handle closing popups
  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupType('');
    setNewValue('');
  };

  // Function to handle adding new values
  const handleAddNewValue = () => {
    if (!newValue.trim()) {
      alert('Please enter a value');
      return;
    }

    // In a real application, you would make an API call to add the new value to the database
    // For now, we'll just update the form with the new value and add it to the dropdown options
    setForm(prev => ({
      ...prev,
      [popupType]: newValue
    }));

    // Add the new value to the appropriate dropdown options
    switch(popupType) {
      case 'category':
        setCategoryOptions(prev => [...prev, newValue]);
        break;
      case 'type':
        setTypeOptions(prev => [...prev, newValue]);
        break;
      case 'supplier':
        setSupplierOptions(prev => [...prev, newValue]);
        break;
      case 'company':
        setCompanyOptions(prev => [...prev, newValue]);
        break;
      case 'unit':
        setUnitOptions(prev => [...prev, newValue]);
        break;
      case 'store_location':
        setLocationOptions(prev => [...prev, newValue]);
        break;
      default:
        break;
    }

    // Close the popup
    handleClosePopup();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name || !form.branch) {
      alert('Please fill in all required fields (Branch, Name)');
      return;
    }

    try {
      setLoading(true);
      
      const formData = {
        ...form,
        mrp: parseFloat(form.mrp) || 0,
        cost: parseFloat(form.cost) || 0,
        sales_price: parseFloat(form.sales_price) || 0,
        min_price: parseFloat(form.min_price) || 0,
        min_stock: parseInt(form.min_stock) || 0,
        quantity: parseInt(form.quantity) || 0,
        open_qty: parseInt(form.open_qty) || 0,
        open_value: parseFloat(form.open_value) || 0
      };

      // Save to localStorage for the Expiry component to access
      const storedItems = localStorage.getItem('inventory_items');
      let inventoryItems = [];
      
      if (storedItems) {
        try {
          inventoryItems = JSON.parse(storedItems);
        } catch (e) {
          console.error('Error parsing stored items:', e);
        }
      }
      
      // Check if we're updating an existing item or adding a new one
      if (item) {
        // Update existing item
        const index = inventoryItems.findIndex(i => i.item_id === formData.item_id);
        if (index !== -1) {
          inventoryItems[index] = formData;
        } else {
          inventoryItems.push(formData);
        }
      } else {
        // Add new item
        inventoryItems.push(formData);
      }
      
      // Save back to localStorage
      localStorage.setItem('inventory_items', JSON.stringify(inventoryItems));

      await onSave(formData);
      
      // If this was a new item, increment the next item ID for the next new item
      if (!item) {
        setNextItemId(prevId => prevId + 1);
      }
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Error saving item');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modal: {
      maxWidth: '800px',
      width: '90%',
      maxHeight: '90vh',
      backgroundColor: '#f3f4f6',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      overflow: 'auto',
    },
    header: {
      padding: '1.5rem 2rem',
      borderBottom: '1px solid #d1d5db',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1a1a1a',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#666',
    },
    content: {
      padding: '2rem',
    },
    section: {
      backgroundColor: '#ffffff',
      border: '1px solid #d1d5db',
      borderRadius: '10px',
      padding: '1.5rem 2rem',
      marginBottom: '1.5rem',
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      marginBottom: '1.2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'linear-gradient(to right, #007bff, #00c6ff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '0.5rem',
      fontWeight: '500',
      color: '#444',
    },
    input: {
      padding: '0.75rem',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '0.9rem',
    },
    textarea: {
      padding: '0.75rem',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '0.9rem',
      resize: 'vertical',
      minHeight: '100px',
    },
    select: {
      padding: '0.75rem',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '0.9rem',
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-end',
      marginTop: '2rem',
    },
    button: {
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
    },
    saveButton: {
      backgroundColor: '#007bff',
      color: 'white',
    },
    cancelButton: {
      backgroundColor: '#6c757d',
      color: 'white',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              style={{ 
                background: 'none', 
                border: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer', 
                color: '#007bff' 
              }} 
              onClick={onCancel}
            >
              <FiArrowLeft size={20} />
            </button>
            <h2 style={styles.title}>
              {item ? 'Edit Item' : 'Add New Item'}
            </h2>
          </div>
          <button style={styles.closeButton} onClick={onCancel}>
            ×
          </button>
        </div>
        
        <div style={styles.content}>
          <form onSubmit={handleSubmit}>
            {/* Branch Selection */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <FiMapPin />
                Branch
              </h3>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Branch *</label>
                  <select
                    name="branch"
                    value={form.branch}
                    onChange={handleChange}
                    style={styles.select}
                    required
                  >
                    <option value="">Select Branch</option>
                    <option value="Main Branch">Main Branch</option>
                    <option value="Branch 1">Branch 1</option>
                    <option value="Branch 2">Branch 2</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <FiPackage />
                Basic Information
              </h3>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Item ID (Auto-generated)</label>
                  <input
                    type="text"
                    name="item_id"
                    value={form.item_id}
                    onChange={handleChange}
                    style={{...styles.input, backgroundColor: '#f0f0f0'}}
                    readOnly
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Short Name</label>
                  <input
                    type="text"
                    name="short_name"
                    value={form.short_name}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Expiry Date</label>
                  <input
                    type="date"
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Barcode</label>
                  <input
                    type="text"
                    name="barcode"
                    value={form.barcode}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>MRP</label>
                  <input
                    type="number"
                    name="mrp"
                    value={form.mrp}
                    onChange={handleChange}
                    style={styles.input}
                    step="0.01"
                    min="0"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pricing Details */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <FiDollarSign />
                Pricing Details
              </h3>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Cost</label>
                  <input
                    type="number"
                    name="cost"
                    value={form.cost}
                    onChange={handleChange}
                    style={styles.input}
                    step="0.01"
                    min="0"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Sales Price</label>
                  <input
                    type="number"
                    name="sales_price"
                    value={form.sales_price}
                    onChange={handleChange}
                    style={styles.input}
                    step="0.01"
                    min="0"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Minimum Price</label>
                  <input
                    type="number"
                    name="min_price"
                    value={form.min_price}
                    onChange={handleChange}
                    style={styles.input}
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Inventory Information */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <FiBarChart2 />
                Inventory Information
              </h3>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Minimum Stock</label>
                  <input
                    type="number"
                    name="min_stock"
                    value={form.min_stock}
                    onChange={handleChange}
                    style={styles.input}
                    min="0"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    style={styles.input}
                    min="0"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Opening Quantity</label>
                  <input
                    type="number"
                    name="open_qty"
                    value={form.open_qty}
                    onChange={handleChange}
                    style={styles.input}
                    min="0"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Opening Value</label>
                  <input
                    type="number"
                    name="open_value"
                    value={form.open_value}
                    onChange={handleChange}
                    style={styles.input}
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Classification */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <FiLayers />
                Classification
              </h3>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Category</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      style={{ ...styles.select, flex: 1 }}
                    >
                      <option value="">Select Category</option>
                      {categoryOptions.map((option, index) => (
                        <option key={`category-${index}`} value={option}>{option}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        width: '40px',
                        cursor: 'pointer'
                      }}
                      title="Add New Category"
                      onClick={() => handleOpenPopup('category')}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Type</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      style={{ ...styles.select, flex: 1 }}
                    >
                      <option value="">Select Type</option>
                      {typeOptions.map((option, index) => (
                        <option key={`type-${index}`} value={option}>{option}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        width: '40px',
                        cursor: 'pointer'
                      }}
                      title="Add New Type"
                      onClick={() => handleOpenPopup('type')}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Supplier</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select
                      name="supplier"
                      value={form.supplier}
                      onChange={handleChange}
                      style={{ ...styles.select, flex: 1 }}
                    >
                      <option value="">Select Supplier</option>
                      {supplierOptions.map((option, index) => (
                        <option key={`supplier-${index}`} value={option}>{option}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        width: '40px',
                        cursor: 'pointer'
                      }}
                      title="Add New Supplier"
                      onClick={() => handleOpenPopup('supplier')}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Company</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      style={{ ...styles.select, flex: 1 }}
                    >
                      <option value="">Select Company</option>
                      {companyOptions.map((option, index) => (
                        <option key={`company-${index}`} value={option}>{option}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        width: '40px',
                        cursor: 'pointer'
                      }}
                      title="Add New Company"
                      onClick={() => handleOpenPopup('company')}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Unit</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select
                      name="unit"
                      value={form.unit}
                      onChange={handleChange}
                      style={{ ...styles.select, flex: 1 }}
                    >
                      <option value="">Select Unit</option>
                      {unitOptions.map((option, index) => (
                        <option key={`unit-${index}`} value={option}>{option}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        width: '40px',
                        cursor: 'pointer'
                      }}
                      title="Add New Unit"
                      onClick={() => handleOpenPopup('unit')}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Location */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <FiMapPin />
                Store Location
              </h3>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Store Location</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select
                      name="store_location"
                      value={form.store_location}
                      onChange={handleChange}
                      style={{ ...styles.select, flex: 1 }}
                    >
                      <option value="">Select Store Location</option>
                      {locationOptions.map((option, index) => (
                        <option key={`location-${index}`} value={option}>{option}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        width: '40px',
                        cursor: 'pointer'
                      }}
                      title="Add New Store Location"
                      onClick={() => handleOpenPopup('store_location')}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Cabinet</label>
                  <input
                    type="text"
                    name="cabinet"
                    value={form.cabinet}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Row</label>
                  <input
                    type="text"
                    name="row"
                    value={form.row}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div style={styles.buttonGroup}>
              <button
                type="button"
                onClick={onCancel}
                style={{ ...styles.button, ...styles.cancelButton }}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ ...styles.button, ...styles.saveButton }}
                disabled={loading}
              >
                {loading ? 'Saving...' : (item ? 'Update Item' : 'Save Item')}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Popup for adding new values */}
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100,
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            width: '400px',
            maxWidth: '90%',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '15px',
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}>
                Add New {popupType.charAt(0).toUpperCase() + popupType.slice(1).replace('_', ' ')}
              </h3>
              <button
                type="button"
                onClick={handleClosePopup}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#666',
                }}
              >
                <FiX />
              </button>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: '500',
              }}>
                Name
              </label>
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem',
                }}
                placeholder={`Enter new ${popupType.replace('_', ' ')}`}
              />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
            }}>
              <button
                type="button"
                onClick={handleClosePopup}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#f5f5f5',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddNewValue}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
