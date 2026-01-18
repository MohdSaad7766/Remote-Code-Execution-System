import React, { useState } from "react";

export default function ManageUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", submissions: 120 },
    { id: 2, name: "Bob Smith", email: "bob@example.com", submissions: 98 },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", submissions: 143 },
  ]);
  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = (id) => {
    const user = users.find((u) => u.id === id);
    setEditingUser(user);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editingUser.id) {
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === editingUser.id ? editingUser : user))
      );
    } else {
      const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      setUsers([...users, { ...editingUser, id: newId }]);
    }
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen mt-0 md:ml-64 bg-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Registered Users</h1>
        <button
          onClick={() => setEditingUser({ name: "", email: "", submissions: 0 })}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-gray-900 text-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-sm">
              <th className="px-4 py-3 text-left font-semibold">#</th>
              <th className="px-4 py-3 text-left font-semibold">Name & Email</th>
              <th className="px-4 py-3 text-right font-semibold">Submissions</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id} className="border-t border-gray-700 hover:bg-gray-800">
                <td className="px-4 py-3 align-top text-sm">{idx + 1}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-gray-400 text-xs">{user.email}</div>
                </td>
                <td className="px-4 py-3 text-right text-sm font-medium">{user.submissions}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="text-yellow-400 hover:text-yellow-500 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-400 hover:text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit/Add Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-96 text-white">
            <h2 className="text-xl font-bold mb-4">
              {editingUser.id ? "Edit User" : "Add User"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingUser.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Submissions</label>
                <input
                  type="number"
                  name="submissions"
                  value={editingUser.submissions}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
