import React, { useState } from 'react';
import { FaCar, FaUser, FaTools, FaHistory, FaEdit, FaTrash, FaPlus, FaSearch, FaFilter, FaDownload, FaPrint, FaEye, FaCalendar, FaCog, FaFileAlt } from 'react-icons/fa';

const VehicleProfiles = () => {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      customerName: 'Ahmed Khan',
      customerPhone: '+94 77 123 4567',
      customerEmail: 'ahmed.khan@email.com',
      make: 'Toyota',
      model: 'Corolla',
      year: 2020,
      vin: '1HGBH41JXMN109186',
      licensePlate: 'ABC-1234',
      engineType: '1.8L 4-Cylinder',
      transmission: 'Automatic',
      mileage: 45000,
      color: 'Silver',
      fuelType: 'Petrol',
      lastService: '2025-07-15',
      nextService: '2025-10-15',
      serviceHistory: [
        { date: '2025-07-15', service: 'Major Service', cost: 8500, technician: 'John Smith' },
        { date: '2025-04-10', service: 'Oil Change', cost: 2500, technician: 'Mike Wilson' },
        { date: '2025-01-20', service: 'Brake Service', cost: 3200, technician: 'Alex Davis' }
      ],
      insurance: {
        provider: 'Ceylinco Insurance',
        policyNumber: 'POL-2024-001',
        expiryDate: '2025-12-31',
        coverage: 'Comprehensive'
      },
      warranty: {
        type: 'Manufacturer',
        expiryDate: '2025-06-30',
        coverage: 'Engine & Transmission'
      }
    },
    {
      id: 2,
      customerName: 'Sarah Johnson',
      customerPhone: '+94 76 987 6543',
      customerEmail: 'sarah.johnson@email.com',
      make: 'Honda',
      model: 'Civic',
      year: 2019,
      vin: '2T1BURHE0JC123456',
      licensePlate: 'XYZ-5678',
      engineType: '1.5L Turbo',
      transmission: 'CVT',
      mileage: 62000,
      color: 'Blue',
      fuelType: 'Petrol',
      lastService: '2025-06-20',
      nextService: '2025-09-20',
      serviceHistory: [
        { date: '2025-06-20', service: 'Minor Service', cost: 4200, technician: 'Sarah Chen' },
        { date: '2025-03-15', service: 'Air Filter Replacement', cost: 1800, technician: 'Tom Anderson' },
        { date: '2024-12-05', service: 'Timing Belt', cost: 12500, technician: 'John Smith' }
      ],
      insurance: {
        provider: 'Sri Lanka Insurance',
        policyNumber: 'POL-2024-002',
        expiryDate: '2025-11-30',
        coverage: 'Third Party'
      },
      warranty: {
        type: 'Extended',
        expiryDate: '2026-03-15',
        coverage: 'Full Vehicle'
      }
    },
    {
      id: 3,
      customerName: 'David Brown',
      customerPhone: '+94 75 555 1234',
      customerEmail: 'david.brown@email.com',
      make: 'Nissan',
      model: 'Sunny',
      year: 2021,
      vin: '3N1AB6AP7BL789012',
      licensePlate: 'DEF-9012',
      engineType: '1.6L 4-Cylinder',
      transmission: 'Manual',
      mileage: 28000,
      color: 'White',
      fuelType: 'Petrol',
      lastService: '2025-05-10',
      nextService: '2025-08-10',
      serviceHistory: [
        { date: '2025-05-10', service: 'Oil Change', cost: 2200, technician: 'Mike Wilson' },
        { date: '2025-02-25', service: 'Brake Pads', cost: 3800, technician: 'Alex Davis' }
      ],
      insurance: {
        provider: 'Allianz Insurance',
        policyNumber: 'POL-2024-003',
        expiryDate: '2025-10-15',
        coverage: 'Comprehensive'
      },
      warranty: {
        type: 'Manufacturer',
        expiryDate: '2026-01-15',
        coverage: 'Engine & Transmission'
      }
    }
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMake, setFilterMake] = useState('');
  const [filterYear, setFilterYear] = useState('');

  const [newVehicle, setNewVehicle] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    make: '',
    model: '',
    year: '',
    vin: '',
    licensePlate: '',
    engineType: '',
    transmission: '',
    mileage: '',
    color: '',
    fuelType: 'Petrol'
  });

  const makes = ['Toyota', 'Honda', 'Nissan', 'Suzuki', 'Mitsubishi', 'Mazda', 'Ford', 'Hyundai', 'Kia', 'BMW', 'Mercedes', 'Audi'];
  const years = Array.from({ length: 25 }, (_, i) => 2025 - i);
  const transmissions = ['Automatic', 'Manual', 'CVT', 'Semi-Automatic'];
  const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];

  const handleAddVehicle = () => {
    try {
      if (!newVehicle.customerName || !newVehicle.make || !newVehicle.model || !newVehicle.vin) {
        alert('Please fill in all required fields');
        return;
      }

      const vehicle = {
        id: Date.now(),
        ...newVehicle,
        year: parseInt(newVehicle.year),
        mileage: parseInt(newVehicle.mileage),
        lastService: new Date().toISOString().split('T')[0],
        nextService: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        serviceHistory: [],
        insurance: {
          provider: '',
          policyNumber: '',
          expiryDate: '',
          coverage: ''
        },
        warranty: {
          type: '',
          expiryDate: '',
          coverage: ''
        }
      };

      setVehicles(prev => [...prev, vehicle]);
      setNewVehicle({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        make: '',
        model: '',
        year: '',
        vin: '',
        licensePlate: '',
        engineType: '',
        transmission: '',
        mileage: '',
        color: '',
        fuelType: 'Petrol'
      });
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  const handleEditVehicle = () => {
    try {
      if (!selectedVehicle) return;

      setVehicles(prev => prev.map(vehicle => 
        vehicle.id === selectedVehicle.id 
          ? { ...vehicle, ...newVehicle, year: parseInt(newVehicle.year), mileage: parseInt(newVehicle.mileage) }
          : vehicle
      ));

      setSelectedVehicle(null);
      setNewVehicle({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        make: '',
        model: '',
        year: '',
        vin: '',
        licensePlate: '',
        engineType: '',
        transmission: '',
        mileage: '',
        color: '',
        fuelType: 'Petrol'
      });
      setShowEditModal(false);
    } catch (error) {
      console.error('Error editing vehicle:', error);
    }
  };

  const handleDeleteVehicle = (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this vehicle profile?')) {
        setVehicles(prev => prev.filter(vehicle => vehicle.id !== id));
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleViewHistory = (vehicle) => {
    try {
      setSelectedVehicle(vehicle);
      setShowHistoryModal(true);
    } catch (error) {
      console.error('Error viewing history:', error);
    }
  };

  const handleEditClick = (vehicle) => {
    try {
      setSelectedVehicle(vehicle);
      setNewVehicle({
        customerName: vehicle.customerName,
        customerPhone: vehicle.customerPhone,
        customerEmail: vehicle.customerEmail,
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year.toString(),
        vin: vehicle.vin,
        licensePlate: vehicle.licensePlate,
        engineType: vehicle.engineType,
        transmission: vehicle.transmission,
        mileage: vehicle.mileage.toString(),
        color: vehicle.color,
        fuelType: vehicle.fuelType
      });
      setShowEditModal(true);
    } catch (error) {
      console.error('Error editing vehicle:', error);
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMake = !filterMake || vehicle.make === filterMake;
    const matchesYear = !filterYear || vehicle.year === parseInt(filterYear);
    
    return matchesSearch && matchesMake && matchesYear;
  });

  const getDaysUntilService = (nextServiceDate) => {
    const today = new Date();
    const nextService = new Date(nextServiceDate);
    const diffTime = nextService - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getServiceStatus = (nextServiceDate) => {
    const daysUntil = getDaysUntilService(nextServiceDate);
    if (daysUntil < 0) return { status: 'Overdue', color: 'text-red-600 bg-red-100' };
    if (daysUntil <= 7) return { status: 'Due Soon', color: 'text-orange-600 bg-orange-100' };
    if (daysUntil <= 30) return { status: 'Upcoming', color: 'text-yellow-600 bg-yellow-100' };
    return { status: 'Good', color: 'text-green-600 bg-green-100' };
  };

  try {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Vehicle Profiles</h1>
            <p className="text-gray-600">Manage customer vehicles, service history, and documentation</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <FaPlus size={16} />
              Add Vehicle
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
              <FaDownload size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={filterMake}
              onChange={(e) => setFilterMake(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Makes</option>
              {makes.map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
              <FaFilter size={16} />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Vehicles Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License Plate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mileage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Insurance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVehicles.map((vehicle) => {
                  const serviceStatus = getServiceStatus(vehicle.nextService);
                  return (
                    <tr key={vehicle.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{vehicle.customerName}</div>
                          <div className="text-sm text-gray-500">{vehicle.customerPhone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{vehicle.make} {vehicle.model}</div>
                          <div className="text-sm text-gray-500">{vehicle.year} • {vehicle.color}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.licensePlate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.mileage.toLocaleString()} km</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-900">{vehicle.nextService}</span>
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${serviceStatus.color}`}>
                            {serviceStatus.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{vehicle.insurance.provider}</div>
                        <div className="text-sm text-gray-500">Expires: {vehicle.insurance.expiryDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewHistory(vehicle)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="View History"
                          >
                            <FaHistory size={16} />
                          </button>
                          <button
                            onClick={() => handleEditClick(vehicle)}
                            className="text-green-600 hover:text-green-800 p-1"
                            title="Edit Vehicle"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteVehicle(vehicle.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete Vehicle"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Vehicle Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Add New Vehicle</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
                  <input
                    type="text"
                    value={newVehicle.customerName}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, customerName: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Phone</label>
                  <input
                    type="tel"
                    value={newVehicle.customerPhone}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, customerPhone: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Email</label>
                  <input
                    type="email"
                    value={newVehicle.customerEmail}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, customerEmail: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Make *</label>
                  <select
                    value={newVehicle.make}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, make: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Make</option>
                    {makes.map(make => (
                      <option key={make} value={make}>{make}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model *</label>
                  <input
                    type="text"
                    value={newVehicle.model}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, model: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <select
                    value={newVehicle.year}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, year: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">VIN *</label>
                  <input
                    type="text"
                    value={newVehicle.vin}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, vin: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">License Plate</label>
                  <input
                    type="text"
                    value={newVehicle.licensePlate}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, licensePlate: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Engine Type</label>
                  <input
                    type="text"
                    value={newVehicle.engineType}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, engineType: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
                  <select
                    value={newVehicle.transmission}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, transmission: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Transmission</option>
                    {transmissions.map(trans => (
                      <option key={trans} value={trans}>{trans}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mileage (km)</label>
                  <input
                    type="number"
                    value={newVehicle.mileage}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, mileage: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <input
                    type="text"
                    value={newVehicle.color}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                  <select
                    value={newVehicle.fuelType}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, fuelType: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {fuelTypes.map(fuel => (
                      <option key={fuel} value={fuel}>{fuel}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddVehicle}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Vehicle
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Vehicle Modal */}
        {showEditModal && selectedVehicle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Edit Vehicle</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
                  <input
                    type="text"
                    value={newVehicle.customerName}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, customerName: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Phone</label>
                  <input
                    type="tel"
                    value={newVehicle.customerPhone}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, customerPhone: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Email</label>
                  <input
                    type="email"
                    value={newVehicle.customerEmail}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, customerEmail: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Make *</label>
                  <select
                    value={newVehicle.make}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, make: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Make</option>
                    {makes.map(make => (
                      <option key={make} value={make}>{make}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model *</label>
                  <input
                    type="text"
                    value={newVehicle.model}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, model: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <select
                    value={newVehicle.year}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, year: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">VIN *</label>
                  <input
                    type="text"
                    value={newVehicle.vin}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, vin: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">License Plate</label>
                  <input
                    type="text"
                    value={newVehicle.licensePlate}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, licensePlate: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Engine Type</label>
                  <input
                    type="text"
                    value={newVehicle.engineType}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, engineType: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
                  <select
                    value={newVehicle.transmission}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, transmission: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Transmission</option>
                    {transmissions.map(trans => (
                      <option key={trans} value={trans}>{trans}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mileage (km)</label>
                  <input
                    type="number"
                    value={newVehicle.mileage}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, mileage: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <input
                    type="text"
                    value={newVehicle.color}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                  <select
                    value={newVehicle.fuelType}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, fuelType: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {fuelTypes.map(fuel => (
                      <option key={fuel} value={fuel}>{fuel}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditVehicle}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Update Vehicle
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Service History Modal */}
        {showHistoryModal && selectedVehicle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Service History</h3>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Vehicle Information */}
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Vehicle Information</h4>
                  <div className="space-y-2">
                    <div><strong>Customer:</strong> {selectedVehicle.customerName}</div>
                    <div><strong>Vehicle:</strong> {selectedVehicle.make} {selectedVehicle.model} ({selectedVehicle.year})</div>
                    <div><strong>License Plate:</strong> {selectedVehicle.licensePlate}</div>
                    <div><strong>VIN:</strong> {selectedVehicle.vin}</div>
                    <div><strong>Mileage:</strong> {selectedVehicle.mileage.toLocaleString()} km</div>
                    <div><strong>Color:</strong> {selectedVehicle.color}</div>
                  </div>
                </div>

                {/* Insurance & Warranty */}
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Insurance & Warranty</h4>
                  <div className="space-y-2">
                    <div><strong>Insurance:</strong> {selectedVehicle.insurance.provider}</div>
                    <div><strong>Policy:</strong> {selectedVehicle.insurance.policyNumber}</div>
                    <div><strong>Expires:</strong> {selectedVehicle.insurance.expiryDate}</div>
                    <div><strong>Warranty:</strong> {selectedVehicle.warranty.type}</div>
                    <div><strong>Warranty Expires:</strong> {selectedVehicle.warranty.expiryDate}</div>
                  </div>
                </div>
              </div>

              {/* Service History Table */}
              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-3">Service History</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Technician</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedVehicle.serviceHistory.map((service, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm text-gray-900">{service.date}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{service.service}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{service.technician}</td>
                          <td className="px-4 py-2 text-sm font-medium text-gray-900">LKR {service.cost.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error rendering VehicleProfiles:', error);
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Vehicle Profiles</h1>
        <p className="text-red-600">Error loading vehicle profiles page. Please refresh the page.</p>
      </div>
    );
  }
};

export default VehicleProfiles; 