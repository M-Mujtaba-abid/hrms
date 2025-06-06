

import React, { useContext } from "react";
import { useDelete } from '../../context/DeleteContext';
import { EmployeeContext } from "../../context/EmployeeContext";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const EmployeeDirectory = () => {
  const navigate = useNavigate();
  const { setEmployees,employees, deleteEmployee } = useContext(EmployeeContext);
   const { showDelete } = useDelete();

  //  const handleDelete = (id) => {
  //   const updated = employees.filter(emp => emp.id !== id);
  //   setEmployees(updated);
  // };

  return (
    <div className="p-4 overflow-x-auto bg-white text-black dark:bg-[#0a2540] dark:text-white">
      <h2 className="text-xl font-bold mb-4">Employee Directory</h2>
      <table className="w-full border border-gray-200 text-left">
        <thead className="bg-white text-black dark:bg-[#0a2540] dark:text-white">
          <tr>
            <th className="p-2 border hidden md:table-cell">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border hidden md:table-cell">Department</th>
            <th className="p-2 border hidden md:table-cell">Position</th>
            <th className="p-2 border hidden md:table-cell">Status</th>
            <th className="p-2 border">Contact Info</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-t">
              <td className="p-2 border hidden md:table-cell">{emp.id}</td>
              <td className="p-2 border">{emp.fullName}</td>
              <td className="p-2 border hidden md:table-cell">{emp.department}</td>
              <td className="p-2 border hidden md:table-cell">{emp.role}</td>
              <td className="p-2 border hidden md:table-cell">{emp.status}</td>
              <td className="p-2 border">{emp.phone} / {emp.email}</td>
             <td className="py-4 px-2 border flex gap-1">
  <button
    onClick={() => navigate(`/employee/${emp.id}`)}
    className="text-blue-600 hover:text-blue-800"
    title="View Details"
  >
    <FiEye />
  </button>
  <button
    onClick={() => navigate(`/addnewemploye/${emp.id}`)}
    className="text-green-600 hover:text-green-800"
    title="Edit"
  >
    <FiEdit />
  </button>
  <button
    onClick={() =>
      showDelete(() => deleteEmployee(emp.id), `Are you sure you want to delete ${emp.fullName}?`)
    }
    className="text-red-600 hover:text-red-800"
    title="Delete"
  >
    <FiTrash2 />
  </button>
</td>

            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan="7" className="p-4 text-center text-gray-500">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDirectory;
