import React from 'react';
import { UsersIcon, PlusIcon } from 'lucide-react';

const AdminUsers: React.FC = () => {
  // Example users (replace with real data/fetch in production)
  const users = [
    { id: 1, name: 'Jane Doe', email: 'jane@example.com', role: 'User' },
    { id: 2, name: 'John Smith', email: 'john@example.com', role: 'Moderator' },
    { id: 3, name: 'Alice Admin', email: 'alice@example.com', role: 'Admin' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-2 lg:py-10">
      <div className="w-full max-w-4xl mx-auto px-1 sm:px-2 lg:px-8">
        <div className="mb-4 lg:mb-8 flex items-center gap-3">
          <UsersIcon className="h-7 w-7 text-emerald-700" />
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-['Playfair_Display']">Manage Users</h1>
          <button className="ml-auto flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm font-semibold">
            <PlusIcon className="h-4 w-4" /> Add User
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-5 lg:p-8">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Role</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b hover:bg-emerald-50/40">
                  <td className="py-2 font-medium">{user.name}</td>
                  <td className="py-2">{user.email}</td>
                  <td className="py-2">{user.role}</td>
                  <td className="py-2">
                    <button className="text-xs text-blue-600 hover:underline mr-2">Edit</button>
                    <button className="text-xs text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
