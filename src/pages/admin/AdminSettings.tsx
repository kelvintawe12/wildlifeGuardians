
import React, { useState, useEffect } from 'react';
import { UserIcon, ShieldIcon, PlusIcon, Trash2Icon, EditIcon, XIcon, CheckIcon, LogOutIcon } from 'lucide-react';
import * as adminAPI from '../../services/adminAPI';
import { useAdminAuth } from '../../contexts/AdminContext';


const AdminSettings: React.FC = () => {
  const { logout, admin } = useAdminAuth();
  const [admins, setAdmins] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    role: 'Admin',
    phone: '',
    notes: '',
  });
  const [editAdmin, setEditAdmin] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Fetch admins on mount
  useEffect(() => {
    (async () => {
      try {
        const data = await adminAPI.getAdmins();
        setAdmins(data);
      } catch (err) {
        setError('Failed to load admins');
      }
    })();
  }, []);

  // Add new admin
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const created = await adminAPI.createAdmin(newAdmin);
      setAdmins(prev => [...prev, created]);
      setNewAdmin({ name: '', email: '', role: 'Admin', phone: '', notes: '' });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
    } catch (err) {
      setError('Failed to add admin');
    }
    setSaving(false);
  };

  // Delete admin
  const handleDelete = async (id: number) => {
    setSaving(true);
    setError('');
    try {
      await adminAPI.deleteAdmin(id);
      setAdmins(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      setError('Failed to delete admin');
    }
    setSaving(false);
  };

  // Start editing
  const handleEdit = (admin: any) => {
    setEditingId(admin.id);
    setEditAdmin({ ...admin });
  };

  // Save edit
  const handleEditSave = async () => {
    if (editingId === null) {
      setError('No admin selected for editing');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const updated = await adminAPI.updateAdmin(editingId, editAdmin);
      setAdmins(prev => prev.map(a => (a.id === editingId ? updated : a)));
      setEditingId(null);
      setEditAdmin(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
    } catch (err) {
      setError('Failed to update admin');
    }
    setSaving(false);
  };

  // Cancel edit
  const handleEditCancel = () => {
    setEditingId(null);
    setEditAdmin(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-2 lg:py-10">
      <div className="w-full max-w-3xl mx-auto px-1 sm:px-2 lg:px-8">
      <div className="mb-4 lg:mb-8 flex items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <ShieldIcon className="h-7 w-7 text-emerald-700" />
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-['Playfair_Display']">Admin Settings</h1>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-1 text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1 rounded text-sm font-semibold"
          title="Logout"
        >
          <LogOutIcon className="h-4 w-4" /> Logout
        </button>
      </div>
        {/* Add Admin Form */}
        <form onSubmit={handleAdd} className="bg-white rounded-lg shadow p-3 sm:p-5 lg:p-8 space-y-4 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <UserIcon className="h-6 w-6 text-emerald-600" />
            <span className="font-semibold text-lg">Add New Admin</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="name" placeholder="Name" className="rounded border px-3 py-2" value={newAdmin.name} onChange={e => setNewAdmin({ ...newAdmin, name: e.target.value })} required />
            <input type="email" name="email" placeholder="Email" className="rounded border px-3 py-2" value={newAdmin.email} onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })} required />
            <input type="tel" name="phone" placeholder="Phone" className="rounded border px-3 py-2" value={newAdmin.phone} onChange={e => setNewAdmin({ ...newAdmin, phone: e.target.value })} />
            <input type="text" name="role" placeholder="Role" className="rounded border px-3 py-2" value={newAdmin.role} onChange={e => setNewAdmin({ ...newAdmin, role: e.target.value })} />
          </div>
          <textarea name="notes" placeholder="Notes" className="rounded border px-3 py-2 w-full min-h-[40px]" value={newAdmin.notes} onChange={e => setNewAdmin({ ...newAdmin, notes: e.target.value })} />
          <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2" disabled={saving}>
            <PlusIcon className="h-4 w-4" /> {saving ? 'Saving...' : 'Add Admin'}
          </button>
          {success && <span className="text-emerald-600 font-medium">Saved!</span>}
          {error && <span className="text-red-600 font-medium">{error}</span>}
        </form>
        {/* Admins Table */}
        <div className="bg-white rounded-lg shadow p-3 sm:p-5 lg:p-8">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Role</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Notes</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map(admin => (
                <tr key={admin.id} className="border-b hover:bg-emerald-50/40">
                  {editingId === admin.id ? (
                    <>
                      <td className="py-2"><input type="text" className="rounded border px-2 py-1 w-full" value={editAdmin.name} onChange={e => setEditAdmin({ ...editAdmin, name: e.target.value })} /></td>
                      <td className="py-2"><input type="email" className="rounded border px-2 py-1 w-full" value={editAdmin.email} onChange={e => setEditAdmin({ ...editAdmin, email: e.target.value })} /></td>
                      <td className="py-2"><input type="text" className="rounded border px-2 py-1 w-full" value={editAdmin.role} onChange={e => setEditAdmin({ ...editAdmin, role: e.target.value })} /></td>
                      <td className="py-2"><input type="tel" className="rounded border px-2 py-1 w-full" value={editAdmin.phone} onChange={e => setEditAdmin({ ...editAdmin, phone: e.target.value })} /></td>
                      <td className="py-2"><input type="text" className="rounded border px-2 py-1 w-full" value={editAdmin.notes} onChange={e => setEditAdmin({ ...editAdmin, notes: e.target.value })} /></td>
                      <td className="py-2 flex gap-2">
                        <button className="text-green-600 hover:underline" onClick={handleEditSave} title="Save" type="button" disabled={saving}><CheckIcon className="h-4 w-4" /></button>
                        <button className="text-gray-400 hover:text-red-600" onClick={handleEditCancel} title="Cancel" type="button" disabled={saving}><XIcon className="h-4 w-4" /></button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-2 font-medium">{admin.name}</td>
                      <td className="py-2">{admin.email}</td>
                      <td className="py-2">{admin.role}</td>
                      <td className="py-2">{admin.phone}</td>
                      <td className="py-2">{admin.notes}</td>
                      <td className="py-2 flex gap-2">
                        <button className="text-blue-600 hover:underline" onClick={() => handleEdit(admin)} title="Edit" type="button" disabled={saving}><EditIcon className="h-4 w-4" /></button>
                        <button className="text-red-600 hover:underline" onClick={() => handleDelete(admin.id)} title="Delete" type="button" disabled={saving}><Trash2Icon className="h-4 w-4" /></button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
