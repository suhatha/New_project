import React, { useState, useEffect } from "react";
import { getApiUrl, getAuthHeaders } from "../config/api";

// --- Add branch fetching ---

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [branches, setBranches] = useState([]); // <-- NEW
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role_id: roles.length > 0 ? roles[0].id : '',
    branch_id: branches.length > 0 ? branches[0].id : '',
    status: 'active',
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("inactive"); // default status


  // API helper function
  const apiCall = async (endpoint, options = {}) => {
    const defaultOptions = {
      headers: getAuthHeaders(options.headers)
    };

    try {
      const response = await fetch(getApiUrl(endpoint), {
        ...defaultOptions,
        ...options
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  // Fetch users from database
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await apiCall('/users');
      console.log('Users API Response:', data); // Debug log
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch roles from database
  const fetchRoles = async () => {
    try {
      const data = await apiCall('/users/roles/list');
      setRoles(data.roles || []);
    } catch (error) {
      setError('Failed to fetch roles: ' + error.message);
    }
  };

  // Fetch branches from backend
  const fetchBranches = async () => {
    try {
      const response = await fetch(getApiUrl('/branches'), {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      console.log('Branches API Response:', data); // Debug log
      const branchesData = Array.isArray(data) ? data : (data.branches || []);
      console.log('Setting branches:', branchesData); // Debug log
      setBranches(branchesData);
      
      // If no branch is selected, set the first one as default
      if (branchesData.length > 0 && !form.branch_id) {
        console.log('Setting default branch:', branchesData[0].id); // Debug log
        setForm(prev => ({ ...prev, branch_id: branchesData[0].id }));
      }
    } catch (error) {
      setError('Failed to fetch branches: ' + error.message);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchBranches();
  }, []);

  // Update form role_id and branch_id when roles or branches change
  useEffect(() => {
    const updates = {};
    if (roles.length > 0 && !roles.some(role => role.id.toString() === form.role_id?.toString())) {
      updates.role_id = roles[0].id;
    }
    if (branches.length > 0 && !branches.some(branch => branch.id.toString() === form.branch_id?.toString())) {
      updates.branch_id = branches[0].id;
    }
    
    if (Object.keys(updates).length > 0) {
      setForm(prev => ({ ...prev, ...updates }));
    }
  }, [roles, branches, form.role_id, form.branch_id]);

  // This effect is no longer needed as we handle both role_id and branch_id in the effect above
  // Removed duplicate effect that was causing issues

  const handleChange = (e) => {
    let value = e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    // Validation
    if (!form.name.trim() || !form.email.trim() || !form.role_id || !form.branch_id) {
      setError("Name, Email, Role, and Branch are required.");
      setLoading(false);
      return;
    }
    
    if (!form.email.includes("@")) {
      setError("Invalid email address.");
      setLoading(false);
      return;
    }
    
    if (!editingId && !form.password.trim()) {
      setError("Password is required for new users.");
      setLoading(false);
      return;
    }
    
    if (form.password && form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    
    if (form.password && form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }
    
    try {
      const userData = {
        name: form.name,
        email: form.email,
        role_id: form.role_id,
        branch_id: form.branch_id,
        status: form.status
      };

      console.log('Form data before submission:', form);
      console.log('User data being sent:', userData);

      // Only include password if provided
      if (form.password) {
        userData.password = form.password;
      }

      if (editingId) {
        // Update existing user
        await apiCall(`/users/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(userData)
        });
        setSuccessMessage("User updated successfully!");
      } else {
        // Create new user
        await apiCall('/users', {
          method: 'POST',
          body: JSON.stringify(userData)
        });
        setSuccessMessage("User created successfully!");
      }
      
      // Refresh users list
      await fetchUsers();
      
      // Reset form and close dialog
      resetForm();
      setShowAddDialog(false);
      
    } catch (error) {
      console.error('API Error Details:', error);
      if (error.message) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred. Check console for details.');
      }
    } finally {
      setLoading(false);
    }
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleEdit = (user) => {
    console.log('Editing user:', user); // Debug log
    setForm({
      name: user.name,
      email: user.email,
      password: "",
      confirmPassword: "",
      role_id: user.role_id || (roles.length > 0 ? roles[0].id : ''),
      branch_id: user.branch_id || (branches.length > 0 ? branches[0].id : ''),
      status: user.status || 'active'
    });
    setEditingId(user.id);
    setShowAddDialog(true);
    setError("");
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        setLoading(true);
        await apiCall(`/users/${userId}`, {
          method: 'DELETE'
        });
        
        setSuccessMessage("User deleted successfully!");
        await fetchUsers();
        
        if (editingId === userId) {
          resetForm();
          setShowAddDialog(false);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
      
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  const resetForm = () => {
    setForm({ 
      name: "", 
      email: "", 
      password: "", 
      confirmPassword: "",
      role_id: "", 
      branch_id: branches[0]?.id || "", // <-- NEW
      status: 'active' // default to 'active' as string
    });
    setEditingId(null);
    setError("");
  };

  const handleCancel = () => {
    resetForm();
    setShowAddDialog(false);
  };

  const openAddDialog = () => {
    resetForm();
    setShowAddDialog(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">User Management</h2>
        <button 
          onClick={openAddDialog}
          disabled={roles.length === 0 || loading}
          className={`px-4 py-2 rounded-lg transition-colors ${
            roles.length === 0 || loading
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {loading ? 'Loading...' : '+ Add User'}
        </button>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg">
          <p className="text-green-800">{successMessage}</p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {roles.length === 0 && (
        <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
          <p className="text-yellow-800">
            <strong>No roles available.</strong> Please create roles in the Role Management page before adding users.
          </p>
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Email</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Password</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Role</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Branch</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Status</th>
              <th className="py-3 px-4 text-center font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">Loading users...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">No users found.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-blue-50">
                  <td className="py-3 px-4 font-medium">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                      ••••••••
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'No Role'}
                  </td>
                  <td className="py-3 px-4">
                    {user.branch || 'N/A'}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      user.status === "active" ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === "active" ? 'active' : 'inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button 
                      onClick={() => handleEdit(user)} 
                      disabled={loading}
                      className="text-blue-600 hover:text-blue-800 hover:underline mr-3 transition-colors disabled:opacity-50"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)} 
                      disabled={loading}
                      className="text-red-600 hover:text-red-800 hover:underline transition-colors disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit User Dialog */}
      {showAddDialog && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-2 p-6 animate-fadeIn max-h-[90vh] overflow-y-auto">
      <button
        onClick={handleCancel}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
        aria-label="Close"
        type="button"
      >
        &times;
      </button>
      <h3 className="text-lg font-semibold mb-4 text-center">
        {editingId !== null ? "Edit User" : "Add New User"}
      </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter username"
                  className="w-full p-2 border rounded-lg"
                  required
                  disabled={loading}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full p-2 border rounded-lg"
                  type="email"
                  required
                  disabled={loading}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {editingId ? "New Password (leave blank to keep current)" : "Create Password"}
                </label>
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={editingId ? "Enter new password" : "Enter password"}
                  className="w-full p-2 border rounded-lg"
                  type="password"
                  required={!editingId}
                  disabled={loading}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full p-2 border rounded-lg"
                  type="password"
                  required={!editingId}
                  disabled={loading}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  name="role_id"
                  value={form.role_id}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                  disabled={loading}
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Branch selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                {branches.length === 0 ? (
                  <div className="text-sm text-red-600 mb-2">No branches available. Please create branches first.</div>
                ) : null}
                <select
                  name="branch_id"
                  value={form.branch_id || ''}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                  disabled={loading || branches.length === 0}
                >
                  <option value="">Select a branch</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
  </select>
</div>

<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
  <button
    type="button"
    onClick={() => setForm(prev => ({ ...prev, status: prev.status === "active" ? "inactive" : "active" }))}
    className={`flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 border focus:outline-none ${form.status === "active" ? 'bg-green-500 border-green-600' : 'bg-white border-gray-300'}`}
    disabled={loading}
    style={{ width: '48px', height: '24px', minHeight: 'unset' }}
  >
    <span className={`w-full h-full flex items-center transition-colors duration-200 ${form.status === "active" ? 'bg-green-400' : 'bg-gray-200'} rounded-full p-1`}>
      <span className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${form.status === "active" ? 'translate-x-6' : ''}`}></span>
    </span>
  </button>
</div>

{error && <div className="text-red-600 text-sm">{error}</div>}
<div className="flex gap-3 pt-4">
  <button 
    type="submit" 
    disabled={loading}
    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
  >
    {loading ? 'Saving...' : (editingId !== null ? "Update User" : "Create User")}
  </button>
  <button 
    type="button" 
    onClick={handleCancel}
    disabled={loading}
    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50"
  >
    Cancel
  </button>
</div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 