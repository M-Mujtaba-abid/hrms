import React, { useState, useEffect } from 'react';

const DepartAndRollModel = ({ initialData, onClose, onUpdate }) => {
  const [department, setDepartment] = useState('');
  const [person, setPerson] = useState('');
  const [detail, setDetail] = useState('');

  useEffect(() => {
    if (initialData) {
      setDepartment(initialData.department);
      setPerson(initialData.person);
      setDetail(initialData.detail);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ department, person, detail });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white  dark:bg-[#0a2540] p-6 rounded-xl w-100 shadow-lg text-black dark:text-white">
        <h2 className="text-lg font-bold mb-4">Update Department</h2>
        <form onSubmit={handleSubmit} className="space-y-4  ">
          <input
            type="text"
            placeholder="Department"
            className="w-full border border-dark text-xl text-center p-3 rounded-3xl  border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a2540] text-black dark:text-white file:cursor-pointer "
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <input
            type="text"
            placeholder="Person Name"
           className="w-full border p-3 text-center border-dark text-xl rounded-3xl  border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a2540] text-black dark:text-white file:cursor-pointer "
            value={person}
            onChange={(e) => setPerson(e.target.value)}
          />
          <textarea
            placeholder="Details"
            className="w-full border p-2 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a2540] text-black dark:text-white file:cursor-pointer "
            rows={4}
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartAndRollModel;
