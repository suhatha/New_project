import React, { useState, useEffect } from 'react';
import { FiPackage, FiDollarSign, FiBox, FiTag, FiMapPin, FiArrowLeft } from 'react-icons/fi';

export default function ItemForm({ onSave, onCancel, item = null }) {
  const [form, setForm] = useState({
    name: '',
    short_name: '',
    category: '',
    company: '',
    supplier: '',
    mrp: '',
    quantity: '',
    description: '',
    status: 'active'
  });

  const [loading, setLoading] = useState(false);

  // Load item data if editing
  useEffect(() => {
    if (item) {
      setForm({
        name: item.name || '',
        short_name: item.short_name || '',
        category: item.category || '',
        company: item.company || '',
        supplier: item.supplier || '',
        mrp: item.mrp || '',
        quantity: item.quantity || '',
        description: item.description || '',
        status: item.status || 'active'
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name || !form.category || !form.mrp || !form.quantity) {
      alert('Please fill in all required fields (Name, Category, MRP, Quantity)');
      return;
    }

    try {
      setLoading(true);
      
      const formData = {
        ...form,
        mrp: parseFloat(form.mrp),
        quantity: parseInt(form.quantity)
      };

      await onSave(formData);
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
          <h2 style={styles.title}>
            {item ? 'Edit Item' : 'Add New Item'}
          </h2>
          <button style={styles.closeButton} onClick={onCancel}>
            ×
          </button>
        </div>
        
        <div style={styles.content}>
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <FiPackage />
                Basic Information
              </h3>
              <div style={styles.grid}>
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
                  <label style={styles.label}>Category *</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    style={styles.select}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Engine Parts">Engine Parts</option>
                    <option value="Brake System">Brake System</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Suspension">Suspension</option>
                    <option value="Transmission">Transmission</option>
                    <option value="Cooling System">Cooling System</option>
                    <option value="Fuel System">Fuel System</option>
                    <option value="Exhaust System">Exhaust System</option>
                    <option value="Body Parts">Body Parts</option>
                    <option value="Interior">Interior</option>
                    <option value="Tools">Tools</option>
                    <option value="Lubricants">Lubricants</option>
                    <option value="Filters">Filters</option>
                    <option value="Other">Other</option>
                  </select>
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

            {/* Company & Supplier */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <FiBox />
                Company & Supplier
              </h3>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Company</label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Supplier</label>
                  <input
                    type="text"
                    name="supplier"
                    value={form.supplier}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Stock */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <FiDollarSign />
                Pricing & Stock
              </h3>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>MRP (LKR) *</label>
                  <input
                    type="number"
                    name="mrp"
                    value={form.mrp}
                    onChange={handleChange}
                    style={styles.input}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Quantity *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    style={styles.input}
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <FiTag />
                Description
              </h3>
              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  style={styles.textarea}
                  placeholder="Enter item description..."
                />
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
    </div>
  );
}
