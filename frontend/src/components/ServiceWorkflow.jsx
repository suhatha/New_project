import React, { useState } from 'react';
import { FaUserCog, FaParking, FaTools, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const ServiceWorkflow = () => {
  const [activeTab, setActiveTab] = useState('technicians');
  
  // Technicians
  const [technicians, setTechnicians] = useState([]);
  const [techForm, setTechForm] = useState({ name: '', phone: '', email: '', specialization: '' });
  const [showTechForm, setShowTechForm] = useState(false);

  // Bays
  const [bays, setBays] = useState([]);
  const [bayForm, setBayForm] = useState({ 
    name: '', 
    location: '', 
    type: 'Standard', 
    is_available: true 
  });
  const [showBayForm, setShowBayForm] = useState(false);

  // Services
  const [services, setServices] = useState([]);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    duration_minutes: 30,
    price: 0,
    is_active: true
  });
  const [showServiceForm, setShowServiceForm] = useState(false);

  // Common form handler
  const handleChange = (form, setForm) => (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Form submissions
  const handleSubmit = (e, form, setForm, items, setItems, setShowForm, defaultForm) => {
    e.preventDefault();
    setItems([...items, { ...form, id: Date.now() }]);
    setForm(defaultForm || { ...form, name: '', phone: '', email: '', specialization: '' });
    setShowForm(false);
  };

  // Delete functions
  const deleteItem = (id, items, setItems) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Tab content
  const tabs = {
    technicians: {
      title: 'Technicians',
      icon: <FaUserCog className="mr-2" />,
      items: technicians,
      form: techForm,
      setForm: setTechForm,
      showForm: showTechForm,
      setShowForm: setShowTechForm,
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'phone', label: 'Phone', type: 'tel', required: true },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'specialization', label: 'Specialization', type: 'text' }
      ]
    },
    bays: {
      title: 'Service Bays',
      icon: <FaParking className="mr-2" />,
      items: bays,
      form: bayForm,
      setForm: setBayForm,
      showForm: showBayForm,
      setShowForm: setShowBayForm,
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'location', label: 'Location', type: 'text', required: true },
        { 
          name: 'type', 
          label: 'Type', 
          type: 'select',
          options: ['Standard', 'Heavy Duty', 'Electrical', 'Body Shop']
        },
        { 
          name: 'is_available', 
          label: 'Available', 
          type: 'checkbox' 
        }
      ]
    },
    services: {
      title: 'Services',
      icon: <FaTools className="mr-2" />,
      items: services,
      form: serviceForm,
      setForm: setServiceForm,
      showForm: showServiceForm,
      setShowForm: setShowServiceForm,
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { 
          name: 'description', 
          label: 'Description', 
          type: 'textarea' 
        },
        { 
          name: 'duration_minutes', 
          label: 'Duration (min)', 
          type: 'number',
          min: 1
        },
        { 
          name: 'price', 
          label: 'Price (₹)', 
          type: 'number',
          step: '0.01',
          min: 0
        },
        { 
          name: 'is_active', 
          label: 'Active', 
          type: 'checkbox' 
        }
      ]
    }
  };

  const currentTab = tabs[activeTab];

  return (
    <div className="container mx-auto p-4">
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {Object.entries(tabs).map(([key, { title, icon }]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`${
                activeTab === key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              {icon} {title}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{currentTab.title}</h2>
            <button
              onClick={() => currentTab.setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
            >
              <FaPlus className="mr-2" /> Add {currentTab.title}
            </button>
          </div>

          {/* Form */}
          {currentTab.showForm && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Add New {currentTab.title}</h3>
              <form 
                onSubmit={(e) => handleSubmit(
                  e, 
                  currentTab.form, 
                  currentTab.setForm, 
                  currentTab.items, 
                  activeTab === 'technicians' ? setTechnicians : 
                  activeTab === 'bays' ? setBays : setServices,
                  currentTab.setShowForm,
                  activeTab === 'technicians' ? { name: '', phone: '', email: '', specialization: '' } :
                  activeTab === 'bays' ? { name: '', location: '', type: 'Standard', is_available: true } :
                  { name: '', description: '', duration_minutes: 30, price: 0, is_active: true }
                )} 
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentTab.fields.map(field => (
                    <div key={field.name} className={field.type === 'textarea' ? 'col-span-2' : ''}>
                      <label className="block text-sm font-medium text-gray-700">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          name={field.name}
                          value={currentTab.form[field.name]}
                          onChange={handleChange(currentTab.form, currentTab.setForm)}
                          className="w-full p-2 border rounded"
                          required={field.required}
                        >
                          {field.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          name={field.name}
                          value={currentTab.form[field.name]}
                          onChange={handleChange(currentTab.form, currentTab.setForm)}
                          className="w-full p-2 border rounded"
                          rows="3"
                        />
                      ) : field.type === 'checkbox' ? (
                        <div className="mt-2">
                          <input
                            type="checkbox"
                            name={field.name}
                            checked={currentTab.form[field.name]}
                            onChange={handleChange(currentTab.form, currentTab.setForm)}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300"
                          />
                        </div>
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={currentTab.form[field.name]}
                          onChange={handleChange(currentTab.form, currentTab.setForm)}
                          className="w-full p-2 border rounded"
                          required={field.required}
                          min={field.min}
                          step={field.step}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    type="button"
                    onClick={() => currentTab.setShowForm(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Save {currentTab.title}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Items List */}
        {currentTab.items.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No {currentTab.title.toLowerCase()} found. Click "Add {currentTab.title}" to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {activeTab === 'technicians' ? 'Name' : activeTab === 'bays' ? 'Bay' : 'Service'}
                  </th>
                  {activeTab === 'technicians' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Specialization
                      </th>
                    </>
                  )}
                  {activeTab === 'bays' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </>
                  )}
                  {activeTab === 'services' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </>
                  )}
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentTab.items.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-10 w-10 rounded-full ${
                          activeTab === 'technicians' ? 'bg-blue-100' : 
                          activeTab === 'bays' ? 'bg-green-100' : 'bg-yellow-100'
                        } flex items-center justify-center`}>
                          {activeTab === 'technicians' ? <FaUserCog className="h-5 w-5 text-blue-600" /> :
                           activeTab === 'bays' ? <FaParking className="h-5 w-5 text-green-600" /> :
                           <FaTools className="h-5 w-5 text-yellow-600" />}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          {activeTab === 'technicians' && item.email && (
                            <div className="text-sm text-gray-500">{item.email}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    
                    {activeTab === 'technicians' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{item.email || '-'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.specialization}</div>
                        </td>
                      </>
                    )}
                    
                    {activeTab === 'bays' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {item.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.is_available 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.is_available ? 'Available' : 'Unavailable'}
                          </span>
                        </td>
                      </>
                    )}
                    
                    {activeTab === 'services' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.duration_minutes} mins</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">₹{parseFloat(item.price).toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.is_active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </>
                    )}
                    
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          // Implement edit functionality
                          currentTab.setForm(item);
                          currentTab.setShowForm(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteItem(
                          item.id, 
                          currentTab.items, 
                          activeTab === 'technicians' ? setTechnicians : 
                          activeTab === 'bays' ? setBays : setServices
                        )}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceWorkflow;