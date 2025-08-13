import React, { useState, useEffect } from 'react';
import { FiPackage, FiDollarSign, FiBox, FiTag, FiMapPin, FiArrowLeft, FiLayers, FiBarChart2, FiPlus, FiX } from 'react-icons/fi';
import axios from 'axios';

export default function ItemForm({ onSave, onCancel, item = null }) {
  // State to track the next available item ID
  const [nextItemId, setNextItemId] = useState(1);
  
  // State for managing popups
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [newValue, setNewValue] = useState('');
  
  // State for dropdown options
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [typeOptions, setTypeOptions] = useState([
    'Original', 'OEM', 'Aftermarket', 'Remanufactured', 'Used'
  ]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(false);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [unitOptions, setUnitOptions] = useState([]);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [locationOptions, setLocationOptions] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(false);

  // API base URL - adjust this to match your Laravel backend URL
  const API_BASE_URL = 'http://127.0.0.1:8000/api';

  // Fetch suppliers from backend API
  const fetchSuppliers = async () => {
    try {
      setLoadingSuppliers(true);
      const response = await axios.get(`${API_BASE_URL}/suppliers`);
      // Extract supplier names from the response
      const supplierNames = response.data.map(supplier => supplier.supplier_name);
      setSupplierOptions(supplierNames);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      // Fallback to default options if API fails
      setSupplierOptions(['No suppliers available']);
    } finally {
      setLoadingSuppliers(false);
    }
  };

  // Fetch companies from backend API
  const fetchCompanies = async () => {
    try {
      setLoadingCompanies(true);
      const response = await axios.get(`${API_BASE_URL}/companies`);
      // Extract company names from the response
      const companyNames = response.data.map(company => company.company_name);
      setCompanyOptions(companyNames);
    } catch (error) {
      console.error('Error fetching companies:', error);
      // Fallback to default options if API fails
      setCompanyOptions(['No companies available']);
    } finally {
      setLoadingCompanies(false);
    }
  };

  // Fetch units from backend API
  const fetchUnits = async () => {
    try {
      setLoadingUnits(true);
      const response = await axios.get(`${API_BASE_URL}/units`);
      // Extract unit names from the response
      const unitNames = response.data.map(unit => unit.unit_name);
      setUnitOptions(unitNames);
    } catch (error) {
      console.error('Error fetching units:', error);
      // Fallback to default options if API fails
      setUnitOptions(['No units available']);
    } finally {
      setLoadingUnits(false);
    }
  };

  // Fetch store locations from backend API
  const fetchLocations = async () => {
    try {
      setLoadingLocations(true);
      const response = await axios.get(`${API_BASE_URL}/store-locations`);
      // Extract location names from the response
      const locationNames = response.data.map(location => location.location_name);
      setLocationOptions(locationNames);
    } catch (error) {
      console.error('Error fetching store locations:', error);
      // Fallback to default options if API fails
      setLocationOptions(['No locations available']);
    } finally {
      setLoadingLocations(false);
    }
  };

  // Fetch categories from backend API
  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await axios.get(`${API_BASE_URL}/categories`);
      // Extract category names from the response
      const categoryNames = response.data.map(category => category.category_name);
      setCategoryOptions(categoryNames);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback to default options if API fails
      setCategoryOptions(['No categories available']);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Check for duplicate item names
  const checkDuplicateItem = async (productName) => {
    if (!productName.trim()) {
      setDuplicateError('');
      setDuplicateCheckPassed(false);
      setFieldsDisabled(true);
      return;
    }

    try {
      setIsCheckingDuplicate(true);
      setDuplicateError('');
      
      // Check if item exists by searching for the name
      const response = await axios.get(`${API_BASE_URL}/items?search=${encodeURIComponent(productName.trim())}`);
      
      // Handle the API response structure correctly
      let items = [];
      if (response.data && response.data.success && response.data.data) {
        // Handle paginated response
        items = response.data.data.data || response.data.data;
      } else if (Array.isArray(response.data)) {
        // Handle direct array response
        items = response.data;
      }
      
      // Check if any item has the exact same name (case-insensitive)
      const existingItem = items.find(
        item => item.name && item.name.toLowerCase() === productName.trim().toLowerCase()
      );
      
      if (existingItem) {
        setDuplicateError(`Item "${productName}" already exists! Please choose a different name.`);
        setDuplicateCheckPassed(false);
        setFieldsDisabled(true);
      } else {
        setDuplicateError('');
        setDuplicateCheckPassed(true);
        setFieldsDisabled(false);
        // Auto-populate the name field in basic information
        setForm(prev => ({ ...prev, name: productName.trim() }));
      }
    } catch (error) {
      console.error('Error checking duplicate item:', error);
      console.error('Response data:', error.response?.data);
      setDuplicateError('Error checking item name. Please try again.');
      setDuplicateCheckPassed(false);
      setFieldsDisabled(true);
    } finally {
      setIsCheckingDuplicate(false);
    }
  };
  
  const [form, setForm] = useState({
    product_name: '', // Replaced branch with product_name
    item_id: '',  // This will be auto-generated
    name: '',
    short_name: '',
    expiry: '',
    barcode: '',
    mrp: '',
    buying_cost: '', // Renamed from cost to buying_cost
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
  
  // Duplicate checking states
  const [isCheckingDuplicate, setIsCheckingDuplicate] = useState(false);
  const [duplicateCheckPassed, setDuplicateCheckPassed] = useState(false);
  const [duplicateError, setDuplicateError] = useState('');
  const [fieldsDisabled, setFieldsDisabled] = useState(true); // Initially disable all fields except product_name

  // Debounced product name checking
  useEffect(() => {
    if (form.product_name) {
      const timeoutId = setTimeout(() => {
        checkDuplicateItem(form.product_name);
      }, 500); // 500ms delay
      
      return () => clearTimeout(timeoutId);
    } else {
      setDuplicateError('');
      setDuplicateCheckPassed(false);
      setFieldsDisabled(true);
    }
  }, [form.product_name]);

  // Fetch suppliers, categories, companies, units, and store locations from backend when component mounts
  useEffect(() => {
    fetchSuppliers();
    fetchCategories();
    fetchCompanies();
    fetchUnits();
    fetchLocations();
  }, []);

  // Popup handler functions
  const handleOpenPopup = (type) => {
    setPopupType(type);
    setNewValue('');
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupType('');
    setNewValue('');
  };

  const handleAddNewValue = async () => {
    if (!newValue.trim()) {
      alert('Please enter a value');
      return;
    }

    try {
      let endpoint = '';
      let data = {};
      
      switch (popupType) {
        case 'category':
          endpoint = `${API_BASE_URL}/categories`;
          data = { category_name: newValue.trim(), description: '' };
          break;
        case 'supplier':
          endpoint = `${API_BASE_URL}/suppliers`;
          data = { supplier_name: newValue.trim(), address: '', contact: '', opening_balance: 0 };
          break;
        case 'company':
          endpoint = `${API_BASE_URL}/companies`;
          data = { company_name: newValue.trim(), description: '' };
          break;
        case 'unit':
          endpoint = `${API_BASE_URL}/units`;
          data = { unit_name: newValue.trim(), description: '' };
          break;
        case 'store_location':
          endpoint = `${API_BASE_URL}/store-locations`;
          data = { location_name: newValue.trim(), phone: '', address: '' };
          break;
        case 'type':
          // Type is handled locally since it's not connected to backend
          setTypeOptions(prev => [...prev, newValue.trim()]);
          handleClosePopup();
          return;
        default:
          alert('Unknown type');
          return;
      }

      // Make API call to save new item
      const response = await axios.post(endpoint, data);
      
      if (response.status === 200 || response.status === 201) {
        // Successfully added, now refresh the dropdown data
        switch (popupType) {
          case 'category':
            await fetchCategories();
            // Set the form field to the newly added value
            setForm(prev => ({ ...prev, category: newValue.trim() }));
            break;
          case 'supplier':
            await fetchSuppliers();
            setForm(prev => ({ ...prev, supplier: newValue.trim() }));
            break;
          case 'company':
            await fetchCompanies();
            setForm(prev => ({ ...prev, company: newValue.trim() }));
            break;
          case 'unit':
            await fetchUnits();
            setForm(prev => ({ ...prev, unit: newValue.trim() }));
            break;
          case 'store_location':
            await fetchLocations();
            setForm(prev => ({ ...prev, store_location: newValue.trim() }));
            break;
        }
        
        alert(`${popupType.charAt(0).toUpperCase() + popupType.slice(1).replace('_', ' ')} added successfully!`);
        handleClosePopup();
      } else {
        throw new Error('Failed to add new item');
      }
    } catch (error) {
      console.error(`Error adding new ${popupType}:`, error);
      alert(`Failed to add new ${popupType.replace('_', ' ')}. Please try again.`);
    }
  };

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
      // Note: Category options are now fetched from backend, so we don't need to add them manually
      // The category dropdown will be populated from the database
      if (item.type && !typeOptions.includes(item.type)) {
        setTypeOptions(prev => [...prev, item.type]);
      }
      // Note: Supplier options are now fetched from backend, so we don't need to add them manually
      // The supplier dropdown will be populated from the database
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
  }, [item, typeOptions, companyOptions, unitOptions, locationOptions]);
  
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



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.product_name || !form.name) {
      alert('Please fill in all required fields (Product Name, Name)');
      return;
    }
    
    // Check if duplicate validation has passed
    if (!duplicateCheckPassed) {
      alert('Please enter a unique product name and wait for validation to complete.');
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
            {/* Product/Item Name */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <FiPackage />
                Product/Item Name
              </h3>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Product/Item Name *</label>
                  <input
                    type="text"
                    name="product_name"
                    value={form.product_name}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      borderColor: duplicateError ? '#ef4444' : duplicateCheckPassed ? '#10b981' : '#d1d5db'
                    }}
                    placeholder="Enter product/item name"
                    required
                  />
                  {isCheckingDuplicate && (
                    <div style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      🔍 Checking for duplicates...
                    </div>
                  )}
                  {duplicateError && (
                    <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      ⚠️ {duplicateError}
                    </div>
                  )}
                  {duplicateCheckPassed && !duplicateError && (
                    <div style={{ color: '#10b981', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      ✅ Product name is available!
                    </div>
                  )}
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
                  <label style={styles.label}>Name * (Auto-populated after product name check)</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      backgroundColor: '#f0f0f0',
                      cursor: 'not-allowed'
                    }}
                    required
                    readOnly
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Short Name</label>
                  <input
                    type="text"
                    name="short_name"
                    value={form.short_name}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      backgroundColor: fieldsDisabled ? '#f5f5f5' : '#ffffff',
                      cursor: fieldsDisabled ? 'not-allowed' : 'text'
                    }}
                    disabled={fieldsDisabled}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Expiry Date</label>
                  <input
                    type="date"
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      backgroundColor: fieldsDisabled ? '#f5f5f5' : '#ffffff',
                      cursor: fieldsDisabled ? 'not-allowed' : 'text'
                    }}
                    disabled={fieldsDisabled}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Barcode</label>
                  <input
                    type="text"
                    name="barcode"
                    value={form.barcode}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      backgroundColor: fieldsDisabled ? '#f5f5f5' : '#ffffff',
                      cursor: fieldsDisabled ? 'not-allowed' : 'text'
                    }}
                    disabled={fieldsDisabled}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>MRP</label>
                  <input
                    type="number"
                    name="mrp"
                    value={form.mrp}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      backgroundColor: fieldsDisabled ? '#f5f5f5' : '#ffffff',
                      cursor: fieldsDisabled ? 'not-allowed' : 'text'
                    }}
                    step="0.01"
                    min="0"
                    disabled={fieldsDisabled}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    style={{
                      ...styles.select,
                      backgroundColor: fieldsDisabled ? '#f5f5f5' : '#ffffff',
                      cursor: fieldsDisabled ? 'not-allowed' : 'pointer'
                    }}
                    disabled={fieldsDisabled}
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
                  <label style={styles.label}>Buying Cost</label>
                  <input
                    type="number"
                    name="buying_cost"
                    value={form.buying_cost}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      backgroundColor: fieldsDisabled ? '#f5f5f5' : '#ffffff',
                      cursor: fieldsDisabled ? 'not-allowed' : 'text'
                    }}
                    step="0.01"
                    min="0"
                    disabled={fieldsDisabled}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Sales Price</label>
                  <input
                    type="number"
                    name="sales_price"
                    value={form.sales_price}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      backgroundColor: fieldsDisabled ? '#f5f5f5' : '#ffffff',
                      cursor: fieldsDisabled ? 'not-allowed' : 'text'
                    }}
                    step="0.01"
                    min="0"
                    disabled={fieldsDisabled}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Minimum Price</label>
                  <input
                    type="number"
                    name="min_price"
                    value={form.min_price}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      backgroundColor: fieldsDisabled ? '#f5f5f5' : '#ffffff',
                      cursor: fieldsDisabled ? 'not-allowed' : 'text'
                    }}
                    step="0.01"
                    min="0"
                    disabled={fieldsDisabled}
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
                    style={{
                      ...styles.input,
                      backgroundColor: fieldsDisabled ? '#f5f5f5' : '#ffffff',
                      cursor: fieldsDisabled ? 'not-allowed' : 'text'
                    }}
                    min="0"
                    disabled={fieldsDisabled}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      backgroundColor: fieldsDisabled ? '#f5f5f5' : '#ffffff',
                      cursor: fieldsDisabled ? 'not-allowed' : 'text'
                    }}
                    min="0"
                    disabled={fieldsDisabled}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Opening Quantity</label>
                  <input
                    type="number"
                    name="open_qty"
                    value={form.open_qty}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      backgroundColor: fieldsDisabled ? '#f5f5f5' : '#ffffff',
                      cursor: fieldsDisabled ? 'not-allowed' : 'text'
                    }}
                    min="0"
                    disabled={fieldsDisabled}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Opening Value</label>
                  <input
                    type="number"
                    name="open_value"
                    value={form.open_value}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      backgroundColor: fieldsDisabled ? '#f5f5f5' : '#ffffff',
                      cursor: fieldsDisabled ? 'not-allowed' : 'text'
                    }}
                    step="0.01"
                    min="0"
                    disabled={fieldsDisabled}
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
                      style={{
                        ...styles.select,
                        flex: 1,
                        backgroundColor: (fieldsDisabled || loadingCategories) ? '#f5f5f5' : '#ffffff',
                        cursor: (fieldsDisabled || loadingCategories) ? 'not-allowed' : 'pointer'
                      }}
                      disabled={fieldsDisabled || loadingCategories}
                    >
                      <option value="">
                        {loadingCategories ? 'Loading categories...' : 'Select Category'}
                      </option>
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
                      style={{ 
                        ...styles.select, 
                        flex: 1,
                        backgroundColor: fieldsDisabled ? '#f5f5f5' : '#ffffff',
                        cursor: fieldsDisabled ? 'not-allowed' : 'pointer'
                      }}
                      disabled={fieldsDisabled}
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
                      style={{ 
                        ...styles.select, 
                        flex: 1,
                        backgroundColor: (fieldsDisabled || loadingSuppliers) ? '#f5f5f5' : '#ffffff',
                        cursor: (fieldsDisabled || loadingSuppliers) ? 'not-allowed' : 'pointer'
                      }}
                      disabled={fieldsDisabled || loadingSuppliers}
                    >
                      <option value="">
                        {loadingSuppliers ? 'Loading suppliers...' : 'Select Supplier'}
                      </option>
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
                      style={{ 
                        ...styles.select, 
                        flex: 1,
                        backgroundColor: (fieldsDisabled || loadingCompanies) ? '#f5f5f5' : '#ffffff',
                        cursor: (fieldsDisabled || loadingCompanies) ? 'not-allowed' : 'pointer'
                      }}
                      disabled={fieldsDisabled || loadingCompanies}
                    >
                      <option value="">
                        {loadingCompanies ? 'Loading companies...' : 'Select Company'}
                      </option>
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
                      style={{ 
                        ...styles.select, 
                        flex: 1,
                        backgroundColor: (fieldsDisabled || loadingUnits) ? '#f5f5f5' : '#ffffff',
                        cursor: (fieldsDisabled || loadingUnits) ? 'not-allowed' : 'pointer'
                      }}
                      disabled={fieldsDisabled || loadingUnits}
                    >
                      <option value="">
                        {loadingUnits ? 'Loading units...' : 'Select Unit'}
                      </option>
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
                      style={{ 
                        ...styles.select, 
                        flex: 1,
                        backgroundColor: (fieldsDisabled || loadingLocations) ? '#f5f5f5' : '#ffffff',
                        cursor: (fieldsDisabled || loadingLocations) ? 'not-allowed' : 'pointer'
                      }}
                      disabled={fieldsDisabled || loadingLocations}
                    >
                      <option value="">
                        {loadingLocations ? 'Loading locations...' : 'Select Store Location'}
                      </option>
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
