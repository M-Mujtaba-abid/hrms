// "use client"

// import { useState, useEffect } from "react"

// const MarkAttendance = () => {
//   const [employees, setEmployees] = useState([])
//   const [selectedDept, setSelectedDept] = useState("")
//   const [filteredEmployees, setFilteredEmployees] = useState([])
//   const [attendance, setAttendance] = useState({})
//   const [isSubmitted, setIsSubmitted] = useState(false)

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("employees")) || []
//     console.log("All Employees from localStorage:", data)
//     setEmployees(data)
//   }, [])

//   // Get unique departments
//   const departments = [...new Set(employees.map((emp) => emp.department?.trim()).filter(Boolean))]

//   const handleDeptChange = (e) => {
//     const dept = e.target.value.trim()
//     console.log("Selected Dept:", dept)

//     if (dept === "") {
//       setFilteredEmployees([])
//       setSelectedDept("")
//       setAttendance({})
//       return
//     }

//     const filtered = employees.filter((emp) => emp.department?.trim() === dept)
//     console.log("Filtered Employees:", filtered)

//     setSelectedDept(dept)
//     setFilteredEmployees(filtered)
//     setAttendance({}) // Reset attendance when department changes
//     setIsSubmitted(false)
//   }

//   const handleAttendance = (id, status) => {
//     setAttendance((prev) => ({
//       ...prev,
//       [id]: status,
//     }))
//   }

//   const submitAttendance = () => {
//     if (Object.keys(attendance).length === 0) {
//       alert("Please mark attendance for at least one employee!")
//       return
//     }

//     // Create attendance record with timestamp
//     const attendanceRecord = {
//       department: selectedDept,
//       date: new Date().toLocaleDateString(),
//       time: new Date().toLocaleTimeString(),
//       attendance: attendance,
//       employeeDetails: filteredEmployees.map((emp) => ({
//         id: emp.id,
//         name: emp.fullName || emp.name,
//         status: attendance[emp.id] || "Not Marked",
//       })),
//     }

//     // Save to localStorage
//     const existingRecords = JSON.parse(localStorage.getItem("attendanceRecords")) || []
//     existingRecords.push(attendanceRecord)
//     localStorage.setItem("attendanceRecords", JSON.stringify(existingRecords))

//     console.log("Attendance Record Saved:", attendanceRecord)
//     setIsSubmitted(true)

//     // Show success message
//     alert(`Attendance submitted successfully for ${selectedDept} department!`)
//   }

//   const resetForm = () => {
//     setSelectedDept("")
//     setFilteredEmployees([])
//     setAttendance({})
//     setIsSubmitted(false)
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white min-h-screen">
//       <div className="bg-blue-50 p-4 rounded-lg mb-6">
//         <h2 className="text-2xl font-bold text-blue-800 mb-2">Mark Attendance</h2>
//         <p className="text-gray-600">Select department and mark attendance for employees</p>
//       </div>

//       {/* Department Selection */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">Select Department</label>
//         <select
//           value={selectedDept}
//           onChange={handleDeptChange}
//           className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         >
//           <option value="">-- Choose Department --</option>
//           {departments.map((dept, i) => (
//             <option key={i} value={dept}>
//               {dept}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Show total employees count */}
//       {selectedDept && (
//         <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//           <p className="text-sm text-gray-600">
//             <strong>{selectedDept}</strong> Department - Total Employees: <strong>{filteredEmployees.length}</strong>
//           </p>
//         </div>
//       )}

//       {/* Employee List */}
//       {filteredEmployees.length > 0 && (
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Employees in {selectedDept} Department</h3>

//           {filteredEmployees.map((emp) => (
//             <div
//               key={emp.id}
//               className="flex justify-between items-center border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               <div className="flex-1">
//                 <span className="font-medium text-gray-800">{emp.fullName || emp.name}</span>
//                 <p className="text-sm text-gray-500">ID: {emp.id}</p>
//               </div>

//               <div className="flex space-x-3">
//                 <button
//                   onClick={() => handleAttendance(emp.id, "Present")}
//                   className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                     attendance[emp.id] === "Present"
//                       ? "bg-green-600 text-white"
//                       : "bg-green-100 text-green-700 hover:bg-green-200"
//                   }`}
//                 >
//                   Present
//                 </button>
//                 <button
//                   onClick={() => handleAttendance(emp.id, "Absent")}
//                   className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                     attendance[emp.id] === "Absent"
//                       ? "bg-red-600 text-white"
//                       : "bg-red-100 text-red-700 hover:bg-red-200"
//                   }`}
//                 >
//                   Absent
//                 </button>
//               </div>
//             </div>
//           ))}

//           {/* Attendance Summary */}
//           {Object.keys(attendance).length > 0 && (
//             <div className="mt-6 p-4 bg-blue-50 rounded-lg">
//               <h4 className="font-semibold text-blue-800 mb-2">Attendance Summary</h4>
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <span className="text-green-600 font-medium">Present: </span>
//                   {Object.values(attendance).filter((status) => status === "Present").length}
//                 </div>
//                 <div>
//                   <span className="text-red-600 font-medium">Absent: </span>
//                   {Object.values(attendance).filter((status) => status === "Absent").length}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex space-x-4 mt-6">
//             <button
//               onClick={submitAttendance}
//               disabled={Object.keys(attendance).length === 0}
//               className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
//             >
//               Submit Attendance
//             </button>
//             <button
//               onClick={resetForm}
//               className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
//             >
//               Reset
//             </button>
//           </div>

//           {isSubmitted && (
//             <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
//               <p className="text-green-800 font-medium">
//                 ✅ Attendance submitted successfully for {selectedDept} department!
//               </p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* No employees message */}
//       {selectedDept && filteredEmployees.length === 0 && (
//         <div className="text-center py-8">
//           <p className="text-gray-500">No employees found in {selectedDept} department.</p>
//         </div>
//       )}

//       {/* Debug Info */}
//       <div className="mt-8 p-4 bg-gray-50 rounded-lg">
//         <details>
//           <summary className="cursor-pointer text-sm text-gray-600 font-medium">
//             Debug Information (Click to expand)
//           </summary>
//           <div className="mt-2 text-xs text-gray-500">
//             <p>Total Employees: {employees.length}</p>
//             <p>Available Departments: {departments.join(", ")}</p>
//             <p>Selected Department: {selectedDept || "None"}</p>
//             <p>Filtered Employees: {filteredEmployees.length}</p>
//             <p>Current Attendance: {JSON.stringify(attendance)}</p>
//           </div>
//         </details>
//       </div>
//     </div>
//   )
// }

// export default MarkAttendance


"use client"

import { useAttendance } from "../../context/AttendanceProvider"
import AttendanceModal from "../../model/AttandanceModel"
import { useState, useEffect } from "react"

const MarkAttendance = () => {
  const { isModalOpen, setIsModalOpen } = useAttendance()
  const [employees, setEmployees] = useState([])
  const [selectedDept, setSelectedDept] = useState("")
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [attendance, setAttendance] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees")) || []
    console.log("All Employees from localStorage:", data)
    setEmployees(data)
  }, [])

  // Get unique departments
  const departments = [...new Set(employees.map((emp) => emp.department?.trim()).filter(Boolean))]

  const handleDeptChange = (e) => {
    const dept = e.target.value.trim()
    console.log("Selected Dept:", dept)

    if (dept === "") {
      setFilteredEmployees([])
      setSelectedDept("")
      setAttendance({})
      return
    }

    const filtered = employees.filter((emp) => emp.department?.trim() === dept)
    console.log("Filtered Employees:", filtered)

    setSelectedDept(dept)
    setFilteredEmployees(filtered)
    setAttendance({}) // Reset attendance when department changes
    setIsSubmitted(false)
  }

  const handleAttendance = (id, status) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: status,
    }))
  }

  const submitAttendance = () => {
    if (Object.keys(attendance).length === 0) {
      alert("Please mark attendance for at least one employee!")
      return
    }

    // Create attendance record with timestamp
    const attendanceRecord = {
      department: selectedDept,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      attendance: attendance,
      employeeDetails: filteredEmployees.map((emp) => ({
        id: emp.id,
        name: emp.fullName || emp.name,
        status: attendance[emp.id] || "Not Marked",
      })),
    }

    // Save to localStorage
    const existingRecords = JSON.parse(localStorage.getItem("attendanceRecords")) || []
    existingRecords.push(attendanceRecord)
    localStorage.setItem("attendanceRecords", JSON.stringify(existingRecords))

    console.log("Attendance Record Saved:", attendanceRecord)
    setIsSubmitted(true)

    // Show success message
    alert(`Attendance submitted successfully for ${selectedDept} department!`)
  }

  const resetForm = () => {
    setSelectedDept("")
    setFilteredEmployees([])
    setAttendance({})
    setIsSubmitted(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Attendance Management</h1>

        <button
          onClick={openModal}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold px-8 py-4 rounded-lg shadow-lg transition-colors duration-200"
        >
          Select Department
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && <AttendanceModal />}
    </div>
  )
}

export default MarkAttendance
