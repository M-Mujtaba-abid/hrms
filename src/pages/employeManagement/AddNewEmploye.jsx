
// import React, { useState, useContext, useEffect } from "react";
// import { EmployeeContext } from "../../context/EmployeeContext";
// import { useParams, useNavigate } from "react-router-dom";
// import { postEmploye } from "../../api/Api";

// const AddNewEmploye = () => {
//   const { addEmployee, updateEmployee, employees } =
//     useContext(EmployeeContext);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const isEditMode = !!id;

//   const initialState = {
//     employeeId: "",
//     fullName: "",
//     email: "",
//     password: "",
//     date: "",
//     phone: "",
//     image: "",
//     gender: "",
//     martialStatus: "",
//     address: "",
//     city: "",
//     state: "",
//     zip: "",
//     department: "68431bf25b6c908d91808e3c",
//     role: "68431c365b6c908d91808e3e",
//     salary: "",
//     shift: "",
//     employeeType: "",
//     joiningDate: "",
//     status: "",
//     bankName: "",
//     accountNumber: "",
//     ifsc: "",
//     emergencyName: "",
//     emergencyPhone: "",
//     emergencyRelation: "",
//   };

//   const [formData, setFormData] = useState(initialState);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (isEditMode) {
//       const existing = employees.find((emp) => emp.employeeId === id);
//       if (existing) setFormData(existing);
//     }
//   }, [id, employees, isEditMode]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({ ...formData, image: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.fullName.trim())
//       newErrors.fullName = "Full name is required.";
//     if (!formData.email) newErrors.email = "Email is required.";
//     else if (!/^\S+@\S+\.\S+$/.test(formData.email))
//       newErrors.email = "Email is invalid.";
//     if (!formData.password || formData.password.length < 6)
//       newErrors.password = "Password must be at least 6 characters.";
//     if (!formData.phone || !/^\d{11}$/.test(formData.phone))
//       newErrors.phone = "Phone must be 11 digits.";
//     if (!formData.salary || isNaN(formData.salary))
//       newErrors.salary = "Salary must be a number.";
//     if (!formData.accountNumber || isNaN(formData.accountNumber))
//       newErrors.accountNumber = "Account number must be numeric.";
//     if (!formData.date) newErrors.date = "Date of birth is required.";
//     if (!formData.joiningDate)
//       newErrors.joiningDate = "Joining date is required.";

//     [
//       "gender",
//       "martialStatus",
//       "address",
//       "city",
//       "state",
//       "zip",
//       "department",
//       "role",
//       "shift",
//       "employeeType",
//       "status",
//       "bankName",
//       "ifsc",
//       "emergencyName",
//       "emergencyPhone",
//       "emergencyRelation",
//     ].forEach((field) => {
//       if (!formData[field])
//         newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required.`;
//     });

//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     const payload = {
//       employeeId: formData.employeeId || Date.now().toString(),
//       name: formData.fullName,
//       dob: formData.date,
//       email: formData.email,
//       password: formData.password,
//       profilePicture: formData.image || undefined,
//       phoneNumber: formData.phone,
//       address: {
//         street: formData.address,
//         city: formData.city,
//         state: formData.state,
//         postalCode: formData.zip,
//         country: "Pakistan",
//       },
//       department: formData.department,
//       role: formData.role,
//       dateOfJoining: formData.joiningDate,
//       gender: formData.gender,
//       martialStatus: formData.martialStatus,
//       employmentType: formData.employeeType,
//       shift: formData.shift,
//       status: formData.status,
//       salary: Number(formData.salary),
//       bankDetails: {
//         bankName: formData.bankName,
//         accountNumber: formData.accountNumber,
//       },
//       emergencyContact: {
//         name: formData.emergencyName,
//         relationship: formData.emergencyRelation,
//         phoneNumber: formData.emergencyPhone,
//       },
//     };

//     if (isEditMode) {
//       updateEmployee(payload);
//     } else {
//       const postdata = async () => {
//         try {
//           const res = await postEmploye(payload);
//           alert("Employee submitted successfully");
//           console.log("Response on post:", res.data);
//         } catch (err) {
//           console.error("Error while posting employee:", err);
//         }
//       };
//       postdata();
//     }

//     setErrors({});
//     // navigate("/employeedirectory");
//   };

//   const renderInput = (name, placeholder, type = "text") => (
//     <div className="flex flex-col">
//       <input
//         name={name}
//         type={type}
//         value={formData[name]}
//         onChange={handleChange}
//         placeholder={placeholder}
//         className={`border p-2 rounded 
//           ${
//             errors[name]
//               ? "border-red-500"
//               : "border-gray-300 dark:border-gray-600"
//           } 
//           bg-white dark:bg-[#0a2540] 
//           text-black dark:text-white 
//           placeholder-gray-500 dark:placeholder-gray-400`}
//       />
//       {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
//     </div>
//   );

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="p-4 bg-white border border-gray-300 dark:border-gray-600 dark:bg-[#0a2540] text-black dark:text-white space-y-6 rounded"
//     >
//       <div>
//         <h2 className="font-bold text-lg">Basic Details</h2>
//         <div className="grid grid-cols-2 gap-4">
//           {renderInput("fullName", "Full Name")}
//           {renderInput("email", "Email", "email")}
//           {renderInput("password", "Password", "password")}
//           {renderInput("date", "Date of Birth", "date")}
//           {renderInput("phone", "Phone Number")}
//           {renderInput("gender", "Gender")}
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium">Profile Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="border p-2 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a2540] text-black dark:text-white file:cursor-pointer"
//             />
//           </div>
//           {renderInput("martialStatus", "Marital Status")}
//         </div>
//       </div>

//       <div>
//         <h2 className="font-bold text-lg">Address</h2>
//         <div className="grid grid-cols-2 gap-4">
//           {renderInput("address", "Street Address")}
//           {renderInput("city", "City")}
//           {renderInput("state", "State")}
//           {renderInput("zip", "ZIP Code")}
//         </div>
//       </div>

//       <div>
//         <h2 className="font-bold text-lg">Department & Role</h2>
//         <div className="grid grid-cols-2 gap-4">
//           {/* {renderInput("department", "Department")}
//           {renderInput("role", "Role")} */}
//           {renderInput("salary", "Salary")}
//           {renderInput("shift", "Shift")}
//           {renderInput("employeeType", "Employee Type")}
//           {renderInput("joiningDate", "Joining Date", "date")}
//           {renderInput("status", "Status")}
//         </div>
//       </div>

//       <div>
//         <h2 className="font-bold text-lg">Bank Details</h2>
//         <div className="grid grid-cols-2 gap-4">
//           {renderInput("bankName", "Bank Name")}
//           {renderInput("accountNumber", "Account Number")}
//           {renderInput("ifsc", "IFSC Code")}
//         </div>
//       </div>

//       <div>
//         <h2 className="font-bold text-lg">Emergency Contact</h2>
//         <div className="grid grid-cols-2 gap-4">
//           {renderInput("emergencyName", "Contact Name")}
//           {renderInput("emergencyPhone", "Contact Phone")}
//           {renderInput("emergencyRelation", "Relation")}
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//       >
//         {isEditMode ? "Update Employee" : "Add Employee"}
//       </button>
//     </form>
//   );
// };

// export default AddNewEmploye;

import React, { useState, useContext, useEffect } from "react";
import { EmployeeContext } from "../../context/EmployeeContext";
import { useParams, useNavigate } from "react-router-dom";
import { postEmploye } from "../../api/Api";

const AddNewEmploye = () => {
  const { addEmployee, updateEmployee, employees } = useContext(EmployeeContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = !!id;

  const initialState = {
    employeeId: "",
    fullName: "",
    email: "",
    password: "",
    date: "",
    phone: "",
    image: "",
    gender: "",
    martialStatus: "",
    address: "",
    city: "",
    state: "",
    zip: "",
     department: "68431bf25b6c908d91808e3c",
    role: "68431c365b6c908d91808e3e",
    salary: "",
    shift: "",
    employeeType: "",
    joiningDate: "",
    status: "",
    bankName: "",
    accountNumber: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const existing = employees.find((emp) => emp.employeeId === id);
      if (existing) setFormData({
        ...existing,
        fullName: existing.name,
        date: existing.dob,
        phone: existing.phoneNumber,
        image: existing.profilePicture,
        address: existing.address?.street,
        city: existing.address?.city,
        state: existing.address?.state,
        zip: existing.address?.postalCode,
        employeeType: existing.employmentType,
        joiningDate: existing.dateOfJoining,
        bankName: existing.bankDetails?.bankName,
        accountNumber: existing.bankDetails?.accountNumber,
        emergencyName: existing.emergencyContact?.name,
        emergencyPhone: existing.emergencyContact?.phoneNumber,
        emergencyRelation: existing.emergencyContact?.relationship,
      });
    }
  }, [id, employees, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email.";
    if (!formData.password || formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (!formData.phone || !/^\d{11}$/.test(formData.phone)) newErrors.phone = "Phone must be 11 digits.";
    if (!formData.salary || isNaN(formData.salary)) newErrors.salary = "Salary must be a number.";
    if (!formData.accountNumber || isNaN(formData.accountNumber)) newErrors.accountNumber = "Account number must be numeric.";
    if (!formData.date) newErrors.date = "Date of birth is required.";
    if (!formData.joiningDate) newErrors.joiningDate = "Joining date is required.";

    [
      "gender", "martialStatus", "address", "city", "state", "zip",
      "department", "role", "shift", "employeeType", "status",
      "bankName", "emergencyName", "emergencyPhone", "emergencyRelation"
    ].forEach(field => {
      if (!formData[field]) newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required.`;
    });

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    
    const payload = {
      employeeId: formData.employeeId || Date.now().toString(),
      name: formData.fullName,
      dob: formData.date,
      email: formData.email,
      password: formData.password,
      profilePicture: formData.image || undefined,
      phoneNumber: formData.phone,
      address: {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.zip,
        country: "Pakistan",
      },
      department: formData.department,
      role: formData.role,
      dateOfJoining: formData.joiningDate,
      gender: formData.gender,
      martialStatus: formData.martialStatus,
      employmentType: formData.employeeType,
      shift: formData.shift,
      status: formData.status,
      salary: Number(formData.salary),
      bankDetails: {
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
      },
      emergencyContact: {
        name: formData.emergencyName,
        relationship: formData.emergencyRelation,
        phoneNumber: formData.emergencyPhone,
      },
    };

    if (isEditMode) {
      updateEmployee(payload);
    } else {
      const postdata = async () => {
        try {
          const res = await postEmploye(payload);
          alert("Employee submitted successfully");
        } catch (err) {
          console.error("Error while posting employee:", err);
        }
      };
      postdata();
    }

    setErrors({});
    navigate("/employeedirectory");
  };

  const renderInput = (name, placeholder, type = "text") => (
    <div className="flex flex-col">
      <input
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`border p-2 rounded ${
          errors[name] ? "border-red-500" : "border-gray-300 dark:border-gray-600"
        } bg-white dark:bg-[#0a2540] text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
      />
      {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-6 rounded bg-white border border-gray-300 dark:border-gray-600 dark:bg-[#0a2540] text-black dark:text-white">
      <div>
        <h2 className="font-bold text-lg">Basic Details</h2>
        <div className="grid grid-cols-2 gap-4">
          {renderInput("fullName", "Full Name")}
          {renderInput("email", "Email", "email")}
          {renderInput("password", "Password", "password")}
          {renderInput("date", "Date of Birth", "date")}
          {renderInput("phone", "Phone Number")}
          {renderInput("gender", "Gender")}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border p-2 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a2540] text-black dark:text-white file:cursor-pointer"
            />
          </div>
          {renderInput("martialStatus", "Marital Status")}
        </div>
      </div>

      <div>
        <h2 className="font-bold text-lg">Address</h2>
        <div className="grid grid-cols-2 gap-4">
          {renderInput("address", "Street Address")}
          {renderInput("city", "City")}
          {renderInput("state", "State")}
          {renderInput("zip", "ZIP Code")}
        </div>
      </div>

      <div>
        <h2 className="font-bold text-lg">Department & Role</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* {renderInput("department", "Department ID")} */}
          {/* {renderInput("role", "Role ID")} */}
          {renderInput("salary", "Salary")}
          {renderInput("shift", "Shift")}
          {renderInput("employeeType", "Employee Type")}
          {renderInput("joiningDate", "Joining Date", "date")}
          {renderInput("status", "Status")}
        </div>
      </div>

      <div>
        <h2 className="font-bold text-lg">Bank Details</h2>
        <div className="grid grid-cols-2 gap-4">
          {renderInput("bankName", "Bank Name")}
          {renderInput("accountNumber", "Account Number")}
        </div>
      </div>

      <div>
        <h2 className="font-bold text-lg">Emergency Contact</h2>
        <div className="grid grid-cols-2 gap-4">
          {renderInput("emergencyName", "Contact Name")}
          {renderInput("emergencyPhone", "Contact Phone")}
          {renderInput("emergencyRelation", "Relationship")}
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isEditMode ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );
};

export default AddNewEmploye;
