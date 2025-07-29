import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaKey, FaTrash, FaLock } from "react-icons/fa";
import axios from 'axios';

function getRolesFromStorage() {
  const data = localStorage.getItem("roles");
  return data ? JSON.parse(data) : [];
}

function saveRolesToStorage(roles) {
  localStorage.setItem("roles", JSON.stringify(roles));
}

function getRolePermissionsFromStorage() {
  const data = localStorage.getItem("rolePermissions");
  return data ? JSON.parse(data) : {};
}

// Function to count permissions for a specific role
function countRolePermissions(roleId) {
  // Get the role to check if it's admin
  const roles = getRolesFromStorage();
  const role = roles.find(r => r.id == roleId);
  
  // If it's admin role, return "All Access" instead of counting
  if (role && role.name === 'admin') {
    return 'All Access';
  }
  
  const allPermissions = getRolePermissionsFromStorage();
  const rolePermissions = allPermissions[roleId] || {};
  
  let totalPermissions = 0;
  Object.values(rolePermissions).forEach(permissionSet => {
    if (typeof permissionSet === 'object' && permissionSet !== null) {
      const permissionCount = Object.keys(permissionSet).length;
      totalPermissions += permissionCount;
    }
  });
  
  return totalPermissions;
}

export default function RoleManagement() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        // Try to fetch roles from API first
        const response = await axios.get('http://localhost:8000/api/roles');
        console.log('Fetched roles from API:', response.data);
        
        if (response.data.roles) {
          setRoles(response.data.roles);
        } else {
          // Fallback to localStorage if API doesn't return roles
          let rolesFromStorage = getRolesFromStorage();
          setRoles(rolesFromStorage);
        }
        
        // Get current user from localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching roles from API:', error);
        // Fallback to localStorage
        try {
          let rolesFromStorage = getRolesFromStorage();
          setRoles(rolesFromStorage);
          
          const user = JSON.parse(localStorage.getItem("user"));
          setCurrentUser(user);
        } catch (err) {
          setError("Failed to load roles");
        }
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    try {
      saveRolesToStorage(roles);
    } catch (err) {
      console.error("Error saving roles:", err);
    }
  }, [roles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);
    
    if (!form.name.trim()) {
      setError("Role name is required.");
      setIsLoading(false);
      return;
    }
    
    if (roles.some(r => r.name === form.name && r.id !== editingId)) {
      setError("Role name already exists.");
      setIsLoading(false);
      return;
    }

    try {
      if (editingId) {
        // Edit role using API
        console.log('Updating role with ID:', editingId);
        
        const response = await axios.put(`http://localhost:8000/api/roles/${editingId}`, {
          name: form.name,
          description: form.description
        });
        
        console.log('Update API Response:', response.data);
        
        // Update local state
        setRoles(roles.map(r => 
          r.id === editingId 
            ? { ...form, id: editingId }
            : r
        ));
        setEditingId(null);
        setMessage(response.data.message || "Role updated successfully!");
      } else {
        // Add role using API
        console.log('Sending role data to API:', {
          name: form.name,
          description: form.description
        });
        
        const response = await axios.post('http://localhost:8000/api/roles', {
          name: form.name,
          description: form.description
        });
        
        console.log('API Response:', response.data);
        
        // Add the new role to local state
        const newRole = {
          id: response.data.role.id || Date.now(),
          name: form.name,
          description: form.description
        };
        
        setRoles([...roles, newRole]);
        setMessage(response.data.message || "Role added successfully!");
      }
      
      setForm({
        name: "",
        description: ""
      });
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to save role');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (role) => {
    setForm({
      name: role.name,
      description: role.description
    });
    setEditingId(role.id);
    setError("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        // Delete from API
        await axios.delete(`http://localhost:8000/api/roles/${id}`);
        console.log('Role deleted from API successfully');
        
        // Update frontend state
        setRoles(roles.filter(r => r.id !== id));
        setMessage("Role deleted successfully!");
        
        if (editingId === id) {
          setForm({
            name: "",
            description: ""
          });
          setEditingId(null);
        }
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } catch (error) {
        console.error('Error deleting role:', error);
        setError('Failed to delete role from database');
      }
    }
  };

  const handleCancel = () => {
    setForm({
      name: "",
      description: ""
    });
    setEditingId(null);
    setError("");
  };

  const handlePermissions = (roleId) => {
    navigate(`/role-permissions/${roleId}`);
  };

  // Check if actions should be disabled for a role
  const isActionDisabled = (role) => {
    // Disable actions for admin role (protect it from deletion/editing)
    if (role.name === 'admin') {
      return true;
    }
    
    return false;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Role Management</h2>
      </div>
      
      {message && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg">
          <p className="text-green-800">{message}</p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {roles.length === 0 && (
        <div className="mb-6 p-4 bg-blue-100 border border-blue-400 rounded-lg">
          <p className="text-blue-800">
            <strong>Welcome to Role Management!</strong> Create your first role using the form below. 
            After creating a role, you can configure its permissions by clicking the "Permissions" button.
          </p>
        </div>
      )}
      
      {/* Add/Edit Role Form */}
      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Role" : "Add New Role"}
        </h3>
        
        <div className="mb-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Role Name (e.g., admin, manager, user)"
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Role Description"
          className="w-full p-2 border rounded-lg mb-4"
          rows="2"
        />

        <div className="flex gap-4">
          <button 
            type="submit" 
            disabled={isLoading}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              isLoading 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                : 'bg-blue-700 text-white hover:bg-blue-800'
            }`}
          >
            {isLoading ? "Saving..." : (editingId ? "Update Role" : "Add Role")}
          </button>
          {editingId && (
            <button 
              type="button" 
              onClick={handleCancel} 
              disabled={isLoading}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition disabled:opacity-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Roles Table */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-3 px-4 text-left">Role Name</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-center">Permissions</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No roles found. Add your first role using the form above.
                </td>
              </tr>
            ) : (
              roles.map((role) => {
                const permissionCount = countRolePermissions(role.id);
                const isDisabled = isActionDisabled(role);
                
                return (
                  <tr key={role.id} className={`border-t hover:bg-blue-50 ${isDisabled ? 'bg-gray-50' : ''}`}>
                    <td className="py-3 px-4 font-medium">{role.name}</td>
                    <td className="py-3 px-4">{role.description}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        permissionCount === 'All Access'
                          ? 'bg-purple-100 text-purple-800'
                          : permissionCount === 0 
                            ? 'bg-red-100 text-red-800' 
                            : permissionCount < 10 
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                      }`}>
                        {permissionCount === 'All Access' 
                          ? 'All Access' 
                          : `${permissionCount} ${permissionCount === 1 ? 'permission' : 'permissions'}`
                        }
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {isDisabled ? (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-gray-400 flex items-center gap-1 px-2 py-1">
                            <FaLock className="text-sm" />
                            Current Role
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleEdit(role)} 
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                          >
                            <FaEdit className="text-sm" />
                            Edit
                          </button>
                          <button 
                            onClick={() => handlePermissions(role.id)} 
                            className="text-green-600 hover:text-green-800 flex items-center gap-1 px-2 py-1 rounded hover:bg-green-50 transition-colors"
                          >
                            <FaKey className="text-sm" />
                            Permissions
                          </button>
                          <button 
                            onClick={() => handleDelete(role.id)} 
                            className="text-red-600 hover:text-red-800 flex items-center gap-1 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                          >
                            <FaTrash className="text-sm" />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 