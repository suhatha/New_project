import React, { useState } from 'react';
import { FaCloud, FaServer, FaShieldAlt, FaDownload, FaUpload, FaSync, FaCog, FaEye, FaEdit, FaTrash, FaPlus, FaCheck, FaTimes, FaExclamationTriangle, FaNetworkWired, FaDatabase } from 'react-icons/fa';

const CloudHosting = () => {
  const [hostingConfig, setHostingConfig] = useState({
    deploymentType: 'cloud',
    cloudProvider: 'AWS',
    serverLocation: 'Singapore',
    databaseType: 'MySQL',
    backupFrequency: 'daily',
    securityLevel: 'high',
    autoScaling: true,
    monitoring: true,
    sslCertificate: true
  });

  const [servers, setServers] = useState([
    {
      id: 1,
      name: 'Production Server - Main',
      type: 'Cloud',
      provider: 'AWS',
      location: 'Singapore',
      status: 'Active',
      cpu: '8 cores',
      memory: '32 GB',
      storage: '500 GB SSD',
      uptime: '99.9%',
      lastBackup: '2025-07-29 02:00',
      nextBackup: '2025-07-30 02:00'
    },
    {
      id: 2,
      name: 'Development Server',
      type: 'Cloud',
      provider: 'AWS',
      location: 'Singapore',
      status: 'Active',
      cpu: '4 cores',
      memory: '16 GB',
      storage: '200 GB SSD',
      uptime: '99.5%',
      lastBackup: '2025-07-28 02:00',
      nextBackup: '2025-07-29 02:00'
    },
    {
      id: 3,
      name: 'On-Premise Server - Backup',
      type: 'On-Premise',
      provider: 'Local',
      location: 'Colombo Office',
      status: 'Standby',
      cpu: '16 cores',
      memory: '64 GB',
      storage: '2 TB HDD',
      uptime: '95.2%',
      lastBackup: '2025-07-27 02:00',
      nextBackup: '2025-07-30 02:00'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedServer, setSelectedServer] = useState(null);
  const [newServer, setNewServer] = useState({
    name: '',
    type: 'Cloud',
    provider: 'AWS',
    location: '',
    cpu: '',
    memory: '',
    storage: ''
  });

  const deploymentTypes = ['Cloud', 'On-Premise', 'Hybrid'];
  const cloudProviders = ['AWS', 'Google Cloud', 'Microsoft Azure', 'DigitalOcean'];
  const serverLocations = ['Singapore', 'Mumbai', 'Tokyo', 'Sydney', 'Frankfurt', 'New York'];
  const databaseTypes = ['MySQL', 'PostgreSQL', 'MongoDB', 'SQL Server'];
  const backupFrequencies = ['hourly', 'daily', 'weekly', 'monthly'];
  const securityLevels = ['basic', 'standard', 'high', 'enterprise'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Standby': return 'bg-yellow-100 text-yellow-800';
      case 'Maintenance': return 'bg-blue-100 text-blue-800';
      case 'Offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Cloud': return 'bg-blue-100 text-blue-800';
      case 'On-Premise': return 'bg-purple-100 text-purple-800';
      case 'Hybrid': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddServer = () => {
    const newServerRecord = {
      id: servers.length + 1,
      ...newServer,
      status: 'Active',
      uptime: '99.9%',
      lastBackup: new Date().toISOString().split('T')[0] + ' 02:00',
      nextBackup: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] + ' 02:00'
    };

    setServers(prev => [...prev, newServerRecord]);
    setShowAddModal(false);
    setNewServer({
      name: '',
      type: 'Cloud',
      provider: 'AWS',
      location: '',
      cpu: '',
      memory: '',
      storage: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Cloud & Hosting Configuration</h1>
          <p className="text-gray-600">Manage cloud-based or on-premise hosting infrastructure</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <FaPlus size={16} />
            Add Server
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
            <FaSync size={16} />
            Sync Data
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition-colors">
            <FaDownload size={16} />
            Backup Now
          </button>
        </div>
      </div>

      {/* Configuration Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Configuration</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Deployment Type</span>
              <span className="text-sm font-medium capitalize">{hostingConfig.deploymentType}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Cloud Provider</span>
              <span className="text-sm font-medium">{hostingConfig.cloudProvider}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Server Location</span>
              <span className="text-sm font-medium">{hostingConfig.serverLocation}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Database Type</span>
              <span className="text-sm font-medium">{hostingConfig.databaseType}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Backup Frequency</span>
              <span className="text-sm font-medium capitalize">{hostingConfig.backupFrequency}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Security Level</span>
              <span className="text-sm font-medium capitalize">{hostingConfig.securityLevel}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaCloud className="text-blue-600" />
                <span className="text-sm text-gray-600">Cloud Services</span>
              </div>
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaDatabase className="text-purple-600" />
                <span className="text-sm text-gray-600">Database</span>
              </div>
              <span className="text-sm font-medium text-green-600">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-green-600" />
                <span className="text-sm text-gray-600">SSL Certificate</span>
              </div>
              <span className="text-sm font-medium text-green-600">Valid</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaNetworkWired className="text-orange-600" />
                <span className="text-sm text-gray-600">Auto Scaling</span>
              </div>
              <span className="text-sm font-medium text-green-600">Enabled</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaCog className="text-gray-600" />
                <span className="text-sm text-gray-600">Monitoring</span>
              </div>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Servers Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Server Infrastructure</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Server</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specifications</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uptime</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {servers.map((server) => (
                <tr key={server.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{server.name}</div>
                      <div className="text-sm text-gray-500">{server.location}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(server.type)}`}>
                      {server.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{server.provider}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>{server.cpu}</div>
                      <div>{server.memory}</div>
                      <div>{server.storage}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(server.status)}`}>
                      {server.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{server.uptime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedServer(server)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FaEdit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Server Details Modal */}
      {selectedServer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Server Details</h2>
              <button
                onClick={() => setSelectedServer(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Basic Information</h3>
                <div className="space-y-2">
                  <div><strong>Server Name:</strong> {selectedServer.name}</div>
                  <div><strong>Type:</strong> {selectedServer.type}</div>
                  <div><strong>Provider:</strong> {selectedServer.provider}</div>
                  <div><strong>Location:</strong> {selectedServer.location}</div>
                  <div><strong>Status:</strong> {selectedServer.status}</div>
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Specifications</h3>
                <div className="space-y-2">
                  <div><strong>CPU:</strong> {selectedServer.cpu}</div>
                  <div><strong>Memory:</strong> {selectedServer.memory}</div>
                  <div><strong>Storage:</strong> {selectedServer.storage}</div>
                  <div><strong>Uptime:</strong> {selectedServer.uptime}</div>
                </div>
              </div>

              {/* Backup Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Backup Information</h3>
                <div className="space-y-2">
                  <div><strong>Last Backup:</strong> {selectedServer.lastBackup}</div>
                  <div><strong>Next Backup:</strong> {selectedServer.nextBackup}</div>
                </div>
              </div>

              {/* Actions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Restart Server
                  </button>
                  <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                    Create Backup
                  </button>
                  <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                    View Logs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Server Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Add New Server</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Server Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Server Name
                </label>
                <input
                  type="text"
                  value={newServer.name}
                  onChange={(e) => setNewServer(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter server name"
                />
              </div>

              {/* Server Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Server Type
                </label>
                <select
                  value={newServer.type}
                  onChange={(e) => setNewServer(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {deploymentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Provider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Provider
                </label>
                <select
                  value={newServer.provider}
                  onChange={(e) => setNewServer(prev => ({ ...prev, provider: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {cloudProviders.map(provider => (
                    <option key={provider} value={provider}>{provider}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={newServer.location}
                  onChange={(e) => setNewServer(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select location...</option>
                  {serverLocations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CPU
                  </label>
                  <input
                    type="text"
                    value={newServer.cpu}
                    onChange={(e) => setNewServer(prev => ({ ...prev, cpu: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 8 cores"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Memory
                  </label>
                  <input
                    type="text"
                    value={newServer.memory}
                    onChange={(e) => setNewServer(prev => ({ ...prev, memory: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 32 GB"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Storage
                  </label>
                  <input
                    type="text"
                    value={newServer.storage}
                    onChange={(e) => setNewServer(prev => ({ ...prev, storage: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 500 GB SSD"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddServer}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Server
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloudHosting; 