import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEyeSlash } from 'react-icons/fa';
import { FiFilePlus } from 'react-icons/fi';
import * as XLSX from 'xlsx';
import ItemForm from './ItemForm';

export default function ItemTable() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddItem = (item) => {
    setItems([...items, { ...item, id: Date.now() }]);
    setShowForm(false);
  };

  const handleEdit = (id) => alert(`Edit item with ID: ${id}`);
  const handleHide = (id) => alert(`Hide item with ID: ${id}`);
  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete this item?')) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure to delete all items?')) {
      setItems([]);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const formatted = jsonData.map((row, index) => ({
        id: Date.now() + index,
        name: row.Name || '',
        shortName: row['Short Name'] || '',
        category: row.Category || '',
        company: row.Company || '',
        supplier: row.Supplier || '',
        mrp: row.MRP || '',
        quantity: row.Quantity || '',
      }));

      setItems((prev) => [...prev, ...formatted]);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleExport = () => {
    const dataToExport = items.map(({ name, shortName, category, company, supplier, mrp, quantity }) => ({
      Name: name,
      'Short Name': shortName,
      Category: category,
      Company: company,
      Supplier: supplier,
      MRP: mrp,
      Quantity: quantity,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Items');

    XLSX.writeFile(workbook, 'item_table.xlsx');
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      {/* Top Controls */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          onClick={() => setShowForm(true)}
        >
          <FiFilePlus /> Add Item
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
            className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg cursor-pointer hover:bg-blue-100"
          >
            📁 Import Excel
          </label>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="px-4 py-2 border border-cyan-500 text-cyan-500 rounded-lg hover:bg-cyan-100"
          >
            ⬇ Export Excel
          </button>

          <button
            className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-100"
            onClick={handleDeleteAll}
          >
            🗑 Delete All
          </button>
        </div>

        <input
          type="text"
          className="border rounded-lg px-4 py-2 w-60"
          placeholder="🔍 Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Form or Table */}
      {showForm ? (
        <ItemForm onSave={handleAddItem} onCancel={() => setShowForm(false)} />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-center border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-3 border">No</th>
                <th className="py-2 px-3 border">Name</th>
                <th className="py-2 px-3 border">Short Name</th>
                <th className="py-2 px-3 border">Category</th>
                <th className="py-2 px-3 border">Company</th>
                <th className="py-2 px-3 border">Supplier</th>
                <th className="py-2 px-3 border">MRP</th>
                <th className="py-2 px-3 border">Quantity</th>
                <th className="py-2 px-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-6 text-gray-500">
                    No items found.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="py-2 px-3 border">{index + 1}</td>
                    <td className="py-2 px-3 border">{item.name}</td>
                    <td className="py-2 px-3 border">{item.shortName}</td>
                    <td className="py-2 px-3 border">{item.category}</td>
                    <td className="py-2 px-3 border">{item.company}</td>
                    <td className="py-2 px-3 border">{item.supplier}</td>
                    <td className="py-2 px-3 border">{item.mrp}</td>
                    <td className="py-2 px-3 border">{item.quantity}</td>
                    <td className="py-2 px-3 border">
                      <div className="flex justify-center gap-2">
                        <button
                          className="text-gray-600 hover:text-black"
                          onClick={() => handleHide(item.id)}
                          title="Hide"
                        >
                          <FaEyeSlash />
                        </button>
                        <button
                          className="text-yellow-500 hover:text-yellow-700"
                          onClick={() => handleEdit(item.id)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(item.id)}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
