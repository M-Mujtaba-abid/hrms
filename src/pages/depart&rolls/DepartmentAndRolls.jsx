
import React, { useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import DepartAndRollModel from '../../model/DepartAndRollModel';

const DepartmentAndRolls = () => {
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [departments, setDepartments] = useState(() => {
    // Load from localStorage on first render
    const stored = localStorage.getItem("departmentAndRolls");
    return stored ? JSON.parse(stored) : [
      {
        department: "Marketing",
        detail: "The Marketing Department is responsible for driving brand awareness and customer engagement.",
        person: "Obaid Ali Siddiqui"
      },
      {
        department: "Finance",
        detail: "Handles budgeting, reporting, and financial planning.",
        person: "Ahmed Raza"
      },
      {
        department: "Security Guard",
        detail: "Ensures the safety and security of premises and employees.",
        person: "Zeeshan Khan"
      },
      {
        department: "Cashier",
        detail: "Manages transactions and customer checkouts.",
        person: "Maira Saeed"
      },
      {
        department: "Logistic",
        detail: "Coordinates the transportation and storage of goods.",
        person: "Hassan Mir"
      },
      {
        department: "Grocery",
        detail: "Manages inventory and stock in the grocery section.",
        person: "Ali Nawaz"
      },
      {
        department: "Superviser",
        detail: "Oversees operations and ensures tasks are completed efficiently.",
        person: "Uzair Sheikh"
      },
    ];
  });

  // Save to localStorage whenever departments change
  useEffect(() => {
    localStorage.setItem("departmentAndRolls", JSON.stringify(departments));
  }, [departments]);

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowModal(true);
  };

  const handleUpdate = (updated) => {
    const updatedList = [...departments];
    updatedList[editIndex] = updated;
    setDepartments(updatedList); // This triggers localStorage update via useEffect
    setShowModal(false);
  };

  return (
    <div className="p-4 grid grid-cols-1 dark:bg-black sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {departments.map((item, index) => (
        <div
          key={index}
          className="relative bg-white dark:bg-[#0a2540] shadow-lg rounded-xl flex items-stretch overflow-hidden group"
        >
          {/* Left Side Icon Area */}
          <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center px-4">
            <FaUserAlt className="text-8xl" />
          </div>

          {/* Content */}
          <div className="flex-1 p-4 text-black dark:text-white">
            <h3 className="text-lg font-bold">{item.department}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{item.detail}</p>
            <p className="mt-2 font-medium">{item.person}</p>
          </div>

          {/* Edit Button */}
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={() => handleEdit(index)}
            title="Edit"
          >
            <FiEdit className="text-xl" />
          </button>
        </div>
      ))}

      {showModal && (
        <DepartAndRollModel
          initialData={departments[editIndex]}
          onClose={() => setShowModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default DepartmentAndRolls;
