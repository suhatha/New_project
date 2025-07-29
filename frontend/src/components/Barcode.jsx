import React, { useState } from 'react';
import { FaSearch, FaBarcode } from 'react-icons/fa';

const Barcode = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [templateSize, setTemplateSize] = useState('50mm x 25mm');
  const [paperSize, setPaperSize] = useState('50mm');

  // Mock product data
  const mockProduct = {
    name: 'Bangle-INI',
    batchNo: 'N/A',
    barcode: '11067',
    expDate: 'N/A',
    mrp: 'LKR 550.00',
    stock: '12'
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Simulate finding a product
      setSelectedProduct(mockProduct);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleGenerateBarcode = () => {
    if (selectedProduct) {
      alert('Barcode generated successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
          BARCODE GENERATOR
        </h1>

        {/* Search Section */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search by Product Name or Barcode"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
            />
            <button
              onClick={handleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
            >
              <FaSearch size={20} />
            </button>
          </div>
        </div>

        {/* Product Details Section */}
        {selectedProduct && (
          <div className="space-y-6">
            {/* Selected Product Header */}
            <div className="text-center">
              <h2 className="text-xl font-bold text-blue-600">
                Selected: {selectedProduct.name} - Batch {selectedProduct.batchNo}
              </h2>
            </div>

            {/* Product Information */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Batch No:</span>
                <span className="text-gray-900">{selectedProduct.batchNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Barcode:</span>
                <span className="text-gray-900">{selectedProduct.barcode}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">EXP Date:</span>
                <span className="text-gray-900">{selectedProduct.expDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">MRP:</span>
                <span className="text-gray-900">{selectedProduct.mrp}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Stock:</span>
                <span className="text-gray-900">{selectedProduct.stock}</span>
              </div>
            </div>

            {/* Barcode Generation Options */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Size
                  </label>
                  <select
                    value={templateSize}
                    onChange={(e) => setTemplateSize(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="50mm x 25mm">50mm x 25mm</option>
                    <option value="40mm x 20mm">40mm x 20mm</option>
                    <option value="30mm x 15mm">30mm x 15mm</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paper Size
                  </label>
                  <select
                    value={paperSize}
                    onChange={(e) => setPaperSize(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="50mm">50mm</option>
                    <option value="40mm">40mm</option>
                    <option value="30mm">30mm</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerateBarcode}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold"
              >
                <FaBarcode size={16} />
                Generate Barcode
              </button>
            </div>
          </div>
        )}

        {/* No Product Selected Message */}
        {!selectedProduct && searchTerm && (
          <div className="text-center text-gray-500 py-8">
            No product found. Try searching with a different term.
          </div>
        )}
      </div>
    </div>
  );
};

export default Barcode; 