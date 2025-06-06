

import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeContext } from "../../context/EmployeeContext";

const EmployeeProfile = () => {
  const navigate=useNavigate()
  const { id } = useParams();
  const { employees } = useContext(EmployeeContext);

  const employee = employees.find((emp) => emp.id.toString() === id);

  if (!employee) {
    return (
      <p className="text-center mt-10 text-red-600 dark:text-red-400">
        Employee not found.
      </p>
    );
  }

  
  const InfoSection = ({ title, fields }) => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <hr className="border-gray-300 dark:border-gray-600 mb-5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ label, value }) => (
          <div
            key={label}
            className="bg-gray-50 dark:bg-[#0f355b] p-4 rounded-xl shadow-sm"
          >
            <p className="text-sm text-gray-500 dark:text-gray-300">{label}</p>
            <p className="text-lg font-medium text-gray-800 dark:text-white">
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 text-black dark:text-white bg-white dark:bg-[#0a2540] rounded shadow-md max-w-5xl mx-auto mt-">
     
<div className="text-center mb-10">
  {/* 👤 Round Profile Image */}
  <img
    src={employee.image || `https://i.pravatar.cc/150?u=${employee.id}`}
    alt={employee.fullName}
    className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-white shadow-md dark:border-gray-600"
  />

  <h1 className="text-3xl font-bold">{employee.fullName}</h1>
  <p className="text-gray-600 dark:text-gray-300">{employee.email}</p>
</div>


      {/* Sections below */}
      <InfoSection
        title="Personal Details"
        fields={[
          { label: "Phone", value: employee.phone },
          { label: "Date of Birth", value: employee.date },
          { label: "Gender", value: employee.gender },
          { label: "Marital Status", value: employee.maritalStatus },
        ]}
      />

      <InfoSection
        title="Address"
        fields={[
          { label: "Street", value: employee.address },
          { label: "City", value: employee.city },
          { label: "State", value: employee.state },
          { label: "ZIP", value: employee.zip },
        ]}
      />

      <InfoSection
        title="Department & Role"
        fields={[
          { label: "Department", value: employee.department },
          { label: "Role", value: employee.role },
          { label: "Salary", value: employee.salary },
          { label: "Shift", value: employee.shift },
          { label: "Employee Type", value: employee.employeeType },
          { label: "Joining Date", value: employee.joiningDate },
          { label: "Status", value: employee.status },
        ]}
      />

      <InfoSection
        title="Bank Details"
        fields={[
          { label: "Bank Name", value: employee.bankName },
          { label: "Account Number", value: employee.accountNumber },
          { label: "IFSC", value: employee.ifsc },
        ]}
      />

      <InfoSection
        title="Emergency Contact"
        fields={[
          { label: "Contact Name", value: employee.emergencyName },
          { label: "Contact Phone", value: employee.emergencyPhone },
          { label: "Relation", value: employee.emergencyRelation },
        ]}

      />

        <button type="submit" onClick={()=>navigate("/employeedirectory")} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                         Employe Directory 
      </button>
    </div>
  );
};

export default EmployeeProfile;
