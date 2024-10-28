import React, { useState } from "react";
import { useUpdateUserRoleMutation } from "../../../redux/features/auth/authApi";
import { Toaster, toast } from "sonner";

export default function UpdateUserModal({ user, onClose, onRoleUpdate }) {
  const [role, setRole] = useState(user?.role);
  const [updateUserRole] = useUpdateUserRoleMutation();

  const handleUpdateRole = async () => {
    try {
      await updateUserRole({ userId: user?._id, role }).unwrap();
      toast.success("User role updated successfully", {
        action: { label: "X" },
      });
      // onRoleUpdate();
      onClose();
    } catch (err) {
      console.error("Error updating user role:", err);
      toast.error("Error updating user role", { action: { label: "X" } });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Toaster richColors position="top-right" />
      <div className="bg-white p-4 rounded shadow-1g w-1/3">
        <h2 className="text-xl mb-4">Edit User</h2>
        <div className="mb-4 space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          {/* <select value></select> */}
          <input
            type="text"
            value={user?.email}
            readOnly
            className="bg-bgPrimary w-full block shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-5 focus:outline-none"
          />
        </div>

        <div className="mb-4 space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          {/* <select value></select> */}
          <select
            className="bg-bgPrimary w-full block shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-5 focus:outline-none"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex justify-end pt-5">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateRole}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
