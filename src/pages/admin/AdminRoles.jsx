import { useState, useEffect } from 'react';

const AdminRoles = () => {
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState({});
    const [selectedRole, setSelectedRole] = useState(null);
    const [rolePermissions, setRolePermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [showAddRole, setShowAddRole] = useState(false);
    const [editingRole, setEditingRole] = useState(null);
    const [roleForm, setRoleForm] = useState({ name: '', description: '' });

    useEffect(() => {
        fetchRoles();
        fetchPermissions();
    }, []);

    const fetchRoles = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/roles');
            const data = await res.json();
            setRoles(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching roles:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchPermissions = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/permissions/grouped');
            const data = await res.json();
            setPermissions(data || {});
        } catch (err) {
            console.error('Error fetching permissions:', err);
        }
    };

    const fetchRolePermissions = async (roleId) => {
        try {
            const res = await fetch(`http://localhost:8080/api/permissions/by-role/${roleId}`);
            const data = await res.json();
            setRolePermissions(Array.isArray(data) ? data.map(p => p.id) : []);
        } catch (err) {
            console.error('Error fetching role permissions:', err);
        }
    };

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setEditingRole(null);
        setShowAddRole(false);
        fetchRolePermissions(role.id);
    };

    const handlePermissionToggle = (permId) => {
        setRolePermissions(prev =>
            prev.includes(permId)
                ? prev.filter(id => id !== permId)
                : [...prev, permId]
        );
    };

    const handleSavePermissions = async () => {
        if (!selectedRole) return;

        try {
            const res = await fetch(`http://localhost:8080/api/roles/assign-permissions/${selectedRole.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ permission_ids: rolePermissions })
            });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: 'Permissions updated successfully!', type: 'success' });
            }
        } catch (err) {
            setMessage({ text: 'Error updating permissions', type: 'error' });
        }
    };

    const handleAddRole = () => {
        setShowAddRole(true);
        setEditingRole(null);
        setSelectedRole(null);
        setRoleForm({ name: '', description: '' });
    };

    const handleEditRole = (role, e) => {
        e.stopPropagation();
        setEditingRole(role.id);
        setShowAddRole(false);
        setSelectedRole(null);
        setRoleForm({ name: role.name, description: role.description });
    };

    const handleSaveRole = async () => {
        try {
            const url = editingRole
                ? `http://localhost:8080/api/roles/update/${editingRole}`
                : 'http://localhost:8080/api/roles/create';

            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(roleForm)
            });
            const result = await res.json();

            if (result.status === 'success') {
                setMessage({ text: `Role ${editingRole ? 'updated' : 'created'} successfully!`, type: 'success' });
                setShowAddRole(false);
                setEditingRole(null);
                setRoleForm({ name: '', description: '' });
                fetchRoles();
            } else {
                setMessage({ text: 'Error: ' + JSON.stringify(result.messages || result), type: 'error' });
            }
        } catch (err) {
            setMessage({ text: 'Error saving role', type: 'error' });
        }
    };

    const handleDeleteRole = async (roleId, e) => {
        e.stopPropagation();
        if (!window.confirm('Are you sure you want to delete this role?')) return;

        try {
            const res = await fetch(`http://localhost:8080/api/roles/delete/${roleId}`, { method: 'POST' });
            const result = await res.json();

            if (result.status === 'success') {
                setMessage({ text: 'Role deleted successfully!', type: 'success' });
                if (selectedRole?.id === roleId) setSelectedRole(null);
                fetchRoles();
            } else {
                setMessage({ text: result.messages || 'Error deleting role', type: 'error' });
            }
        } catch (err) {
            setMessage({ text: 'Error deleting role', type: 'error' });
        }
    };

    const handleCancelEdit = () => {
        setShowAddRole(false);
        setEditingRole(null);
        setRoleForm({ name: '', description: '' });
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading roles...</div>;

    return (
        <div className="font-inter">
            <header className="px-8 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Roles & Permissions</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Manage User Roles and Permissions</p>
                </div>
                <button
                    onClick={handleAddRole}
                    className="bg-[#003399] hover:bg-black text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all"
                >
                    <i className="fas fa-plus-circle mr-2"></i> Add Role
                </button>
            </header>

            <div className="px-8 py-6">
                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        <i className="fas fa-info-circle mr-2"></i> {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Roles List */}
                    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Roles</h3>
                        <div className="space-y-2">
                            {roles.map(role => (
                                <div key={role.id} className="relative group">
                                    <button
                                        onClick={() => handleRoleSelect(role)}
                                        className={`w-full text-left p-3 rounded-lg transition ${selectedRole?.id === role.id ? 'bg-[#003399] text-white' : editingRole === role.id ? 'bg-yellow-50 border-2 border-yellow-400' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}
                                    >
                                        <div className="font-bold text-sm pr-16">{role.name}</div>
                                        <div className={`text-xs mt-1 ${selectedRole?.id === role.id ? 'text-blue-100' : 'text-gray-500'}`}>
                                            {role.description}
                                        </div>
                                    </button>
                                    {role.name !== 'Super Administrator' && (
                                        <div className="absolute right-2 top-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => handleEditRole(role, e)}
                                                className="text-gray-400 hover:text-[#003399] transition"
                                            >
                                                <i className="fas fa-edit text-sm"></i>
                                            </button>
                                            <button
                                                onClick={(e) => handleDeleteRole(role.id, e)}
                                                className="text-gray-400 hover:text-red-500 transition"
                                            >
                                                <i className="fas fa-trash-alt text-sm"></i>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Permissions Management OR Add/Edit Role Form */}
                    <div className="md:col-span-2 bg-white border border-gray-100 rounded-xl shadow-sm p-6">
                        {showAddRole || editingRole ? (
                            <>
                                <h3 className="text-lg font-bold text-gray-800 mb-6">
                                    {editingRole ? 'Edit Role' : 'Add New Role'}
                                </h3>
                                <div className="space-y-4 max-w-xl">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Role Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50"
                                            value={roleForm.name}
                                            onChange={e => setRoleForm({ ...roleForm, name: e.target.value })}
                                            placeholder="e.g., Editor, Moderator"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Description</label>
                                        <textarea
                                            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50"
                                            value={roleForm.description}
                                            onChange={e => setRoleForm({ ...roleForm, description: e.target.value })}
                                            rows="3"
                                            placeholder="Describe the role's purpose and responsibilities"
                                        />
                                    </div>
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            onClick={handleSaveRole}
                                            className="bg-[#003399] hover:bg-black text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all"
                                        >
                                            {editingRole ? 'Update Role' : 'Create Role'}
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : selectedRole ? (
                            <>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-gray-800">
                                        Permissions for <span className="text-[#003399]">{selectedRole.name}</span>
                                    </h3>
                                    <button
                                        onClick={handleSavePermissions}
                                        className="bg-[#003399] hover:bg-black text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all"
                                    >
                                        Save Changes
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {Object.keys(permissions).map(module => (
                                        <div key={module} className="border-b border-gray-100 pb-4 last:border-0">
                                            <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">{module}</h4>
                                            <div className="space-y-2">
                                                {permissions[module].map(perm => (
                                                    <label key={perm.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={rolePermissions.includes(perm.id)}
                                                            onChange={() => handlePermissionToggle(perm.id)}
                                                            className="w-4 h-4 text-[#003399] rounded"
                                                            disabled={selectedRole.name === 'Super Administrator'}
                                                        />
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">{perm.name.replace(/_/g, ' ').toUpperCase()}</div>
                                                            <div className="text-xs text-gray-500">{perm.description}</div>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {selectedRole.name === 'Super Administrator' && (
                                    <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-700 font-medium">
                                        <i className="fas fa-info-circle mr-2"></i>
                                        Super Administrator role has all permissions and cannot be modified.
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-12 text-gray-400">
                                <i className="fas fa-hand-pointer text-4xl mb-3"></i>
                                <p className="text-sm font-medium">Select a role to manage permissions or click "Add Role" to create a new one</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRoles;
