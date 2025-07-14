import React, { useState } from 'react';
import { FiPackage, FiDollarSign, FiBox, FiTag, FiMapPin } from 'react-icons/fi';

export default function ItemForm({ onSave }) {
  const [form, setForm] = useState({
    itemId: '', name: '', shortName: '', expiry: '', barcode: '', mrp: '',
    cost: '', salesPrice: '', minPrice: '',
    minStock: '', openQty: '', openValue: '',
    category: '', type: '', supplier: '', company: '', unit: '',
    storeLocation: '', cabinet: '', row: ''
  });

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const addNew = field => alert(`Add new ${field}`);
  const capitalize = label => label.charAt(0).toUpperCase() + label.slice(1);

  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#f3f4f6',
      fontFamily: 'Segoe UI, sans-serif',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      textAlign: 'center',
      color: '#1a1a1a',
    },
    section: {
      backgroundColor: '#ffffff',
      border: '1px solid #d1d5db',
      borderRadius: '10px',
      padding: '1.5rem 2rem',
      marginBottom: '2rem',
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
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '1rem',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '0.3rem',
      fontWeight: '500',
      color: '#444',
    },
    input: {
      padding: '0.3rem 0.6rem',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '0.85rem',
    },
    inputWithButton: {
      display: 'flex',
      gap: '0.5rem',
    },
    addButton: {
      padding: '0.3rem 0.8rem',
      fontSize: '0.85rem',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    saveButton: {
      display: 'block',
      margin: '2rem auto 0',
      padding: '0.8rem 1.5rem',
      fontSize: '1rem',
      backgroundColor: 'black',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create New Product</h2>

      {/* Basic Information */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}><FiPackage /> Basic Information</h3>
        <div style={styles.grid}>
          {['itemId', 'name', 'shortName', 'expiry', 'barcode', 'mrp'].map(f => (
            <div key={f} style={styles.formGroup}>
              <label style={styles.label}>{capitalize(f)}</label>
              <input name={f} value={form[f]} onChange={handle} style={styles.input} required />
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Information */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}><FiDollarSign /> Pricing Details</h3>
        <div style={styles.grid}>
          {['cost', 'salesPrice', 'minPrice'].map(f => (
            <div key={f} style={styles.formGroup}>
              <label style={styles.label}>{capitalize(f)}</label>
              <input name={f} value={form[f]} onChange={handle} style={styles.input} />
            </div>
          ))}
        </div>
      </div>

      {/* Inventory Information */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}><FiBox /> Inventory Information</h3>
        <div style={styles.grid}>
          {['minStock', 'openQty', 'openValue'].map(f => (
            <div key={f} style={styles.formGroup}>
              <label style={styles.label}>{capitalize(f)}</label>
              <input name={f} value={form[f]} onChange={handle} style={styles.input} />
            </div>
          ))}
        </div>
      </div>

      {/* Classification */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}><FiTag /> Classification</h3>
        <div style={styles.grid}>
          {['category', 'type', 'supplier', 'company', 'unit'].map(f => (
            <div key={f} style={styles.formGroup}>
              <label style={styles.label}>{capitalize(f)}</label>
              <div style={styles.inputWithButton}>
                <input name={f} value={form[f]} onChange={handle} style={styles.input} />
                <button type="button" style={styles.addButton} onClick={() => addNew(f)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Store Information */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}><FiMapPin /> Store Information</h3>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Store Location</label>
            <div style={styles.inputWithButton}>
              <input name="storeLocation" value={form.storeLocation} onChange={handle} style={styles.input} />
              <button type="button" style={styles.addButton} onClick={() => addNew('storeLocation')}>+</button>
            </div>
          </div>
          {['cabinet', 'row'].map(f => (
            <div key={f} style={styles.formGroup}>
              <label style={styles.label}>{capitalize(f)}</label>
              <input name={f} value={form[f]} onChange={handle} style={styles.input} />
            </div>
          ))}
        </div>
      </div>

      <button
        style={styles.saveButton}
        onClick={(e) => {
          e.preventDefault();
          onSave(form);
        }}
      >
        Save
      </button>
    </div>
  );
}
