import React, { useState, useMemo } from 'react';
import { FaCamera, FaUpload, FaEye, FaTrash, FaPlus, FaDownload, FaPrint, FaCar, FaTools } from 'react-icons/fa';

const PhotoUpload = () => {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      customerName: 'Ahmed Khan',
      vehicleNumber: 'ABC-1234',
      serviceType: 'Brake Service',
      status: 'In Progress',
      beforePhotos: [
        { id: 1, url: '/img/car.jpg', description: 'Front brake damage', timestamp: '2025-07-29 09:00' },
        { id: 2, url: '/img/car.jpg', description: 'Rear brake damage', timestamp: '2025-07-29 09:05' }
      ],
      afterPhotos: [
        { id: 3, url: '/img/car.jpg', description: 'Front brake repaired', timestamp: '2025-07-29 14:30' }
      ]
    },
    {
      id: 2,
      customerName: 'Sarah Johnson',
      vehicleNumber: 'XYZ-5678',
      serviceType: 'Engine Repair',
      status: 'Completed',
      beforePhotos: [
        { id: 4, url: '/img/car.jpg', description: 'Engine compartment', timestamp: '2025-07-28 10:00' }
      ],
      afterPhotos: [
        { id: 5, url: '/img/car.jpg', description: 'Engine repaired', timestamp: '2025-07-28 16:00' }
      ]
    }
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState('before'); // 'before' or 'after'
  const [uploadData, setUploadData] = useState({
    description: '',
    photo: null
  });

  const handleFileUpload = (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        setUploadData(prev => ({
          ...prev,
          photo: file
        }));
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleUploadPhoto = () => {
    try {
      if (!uploadData.photo || !uploadData.description) {
        alert('Please select a photo and add a description');
        return;
      }

      const newPhoto = {
        id: Date.now(),
        url: URL.createObjectURL(uploadData.photo),
        description: uploadData.description,
        timestamp: new Date().toLocaleString()
      };

      setVehicles(prev => prev.map(vehicle => 
        vehicle.id === selectedVehicle.id
          ? {
              ...vehicle,
              [uploadType === 'before' ? 'beforePhotos' : 'afterPhotos']: [
                ...vehicle[uploadType === 'before' ? 'beforePhotos' : 'afterPhotos'],
                newPhoto
              ]
            }
          : vehicle
      ));

      setUploadData({
        description: '',
        photo: null
      });
      setShowUploadModal(false);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  const handleDeletePhoto = (vehicleId, photoId, type) => {
    try {
      if (window.confirm('Delete this photo?')) {
        setVehicles(prev => prev.map(vehicle => 
          vehicle.id === vehicleId
            ? {
                ...vehicle,
                [type === 'before' ? 'beforePhotos' : 'afterPhotos']: 
                  vehicle[type === 'before' ? 'beforePhotos' : 'afterPhotos'].filter(photo => photo.id !== photoId)
              }
            : vehicle
        ));
      }
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const handlePrintReport = (vehicle) => {
    try {
      alert(`Printing photo report for ${vehicle.customerName} - ${vehicle.vehicleNumber}`);
    } catch (error) {
      console.error('Error printing report:', error);
    }
  };

  const handleDownloadPhotos = (vehicle) => {
    try {
      alert(`Downloading all photos for ${vehicle.customerName} - ${vehicle.vehicleNumber}`);
    } catch (error) {
      console.error('Error downloading photos:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPhotos = useMemo(() => {
    try {
      return vehicles.reduce((sum, vehicle) => 
        sum + vehicle.beforePhotos.length + vehicle.afterPhotos.length, 0
      );
    } catch (error) {
      console.error('Error calculating total photos:', error);
      return 0;
    }
  }, [vehicles]);

  const completedVehicles = useMemo(() => {
    try {
      return vehicles.filter(vehicle => vehicle.status === 'Completed');
    } catch (error) {
      console.error('Error filtering completed vehicles:', error);
      return [];
    }
  }, [vehicles]);

  try {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Photo Upload for Damages</h1>
            <p className="text-gray-600">Document vehicle condition before and after service</p>
          </div>
          <div className="flex gap-2">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {totalPhotos} Photos
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {completedVehicles.length} Completed
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCar className="text-blue-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
                <p className="text-2xl font-bold text-gray-900">{vehicles.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaCamera className="text-green-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Before Photos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {vehicles.reduce((sum, vehicle) => sum + vehicle.beforePhotos.length, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaTools className="text-purple-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">After Photos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {vehicles.reduce((sum, vehicle) => sum + vehicle.afterPhotos.length, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaDownload className="text-orange-600 text-2xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedVehicles.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg shadow-md p-6">
              {/* Vehicle Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{vehicle.customerName}</h3>
                  <p className="text-sm text-gray-600">{vehicle.vehicleNumber}</p>
                  <p className="text-sm text-gray-600">{vehicle.serviceType}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDownloadPhotos(vehicle)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                      title="Download Photos"
                    >
                      <FaDownload size={16} />
                    </button>
                    <button
                      onClick={() => handlePrintReport(vehicle)}
                      className="text-green-600 hover:text-green-800 p-1"
                      title="Print Report"
                    >
                      <FaPrint size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Before Photos */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-md font-medium text-gray-800 flex items-center gap-2">
                    <FaCamera className="text-red-600" />
                    Before Photos ({vehicle.beforePhotos.length})
                  </h4>
                  <button
                    onClick={() => {
                      setSelectedVehicle(vehicle);
                      setUploadType('before');
                      setShowUploadModal(true);
                    }}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors flex items-center gap-1 text-sm"
                  >
                    <FaPlus size={12} />
                    Add Before
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {vehicle.beforePhotos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <img
                        src={photo.url}
                        alt={photo.description}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                          <button
                            onClick={() => handleDeletePhoto(vehicle.id, photo.id, 'before')}
                            className="bg-red-600 text-white p-1 rounded hover:bg-red-700"
                            title="Delete Photo"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-1 rounded-b-md">
                        {photo.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* After Photos */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-md font-medium text-gray-800 flex items-center gap-2">
                    <FaTools className="text-green-600" />
                    After Photos ({vehicle.afterPhotos.length})
                  </h4>
                  <button
                    onClick={() => {
                      setSelectedVehicle(vehicle);
                      setUploadType('after');
                      setShowUploadModal(true);
                    }}
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors flex items-center gap-1 text-sm"
                  >
                    <FaPlus size={12} />
                    Add After
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {vehicle.afterPhotos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <img
                        src={photo.url}
                        alt={photo.description}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                          <button
                            onClick={() => handleDeletePhoto(vehicle.id, photo.id, 'after')}
                            className="bg-red-600 text-white p-1 rounded hover:bg-red-700"
                            title="Delete Photo"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-1 rounded-b-md">
                        {photo.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Modal */}
        {showUploadModal && selectedVehicle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Upload {uploadType === 'before' ? 'Before' : 'After'} Photo
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Vehicle: {selectedVehicle.customerName} - {selectedVehicle.vehicleNumber}
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Photo Description</label>
                  <input
                    type="text"
                    value={uploadData.description}
                    onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the damage or repair..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <FaUpload className="mx-auto text-gray-400 text-3xl mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        JPEG, PNG (max 5MB)
                      </p>
                    </label>
                    {uploadData.photo && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {uploadData.photo.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setSelectedVehicle(null);
                    setUploadData({
                      description: '',
                      photo: null
                    });
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadPhoto}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Upload Photo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error rendering PhotoUpload:', error);
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Photo Upload for Damages</h1>
        <p className="text-red-600">Error loading photo upload page. Please refresh the page.</p>
      </div>
    );
  }
};

export default PhotoUpload; 