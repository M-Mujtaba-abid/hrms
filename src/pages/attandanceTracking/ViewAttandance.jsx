"use client"

import { useState } from "react"
import { useAttendance } from "../../context/AttendanceProvider"

const ViewAttendance = () => {
  const { departments, getAttendanceByDept } = useAttendance()
  const [selectedDept, setSelectedDept] = useState("")
  const [attendanceRecords, setAttendanceRecords] = useState([])

  const handleDeptChange = (e) => {
    const dept = e.target.value
    setSelectedDept(dept)

    if (dept) {
      const records = getAttendanceByDept(dept)
      setAttendanceRecords(records)
    } else {
      setAttendanceRecords([])
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">View Attendance Records</h2>
        <p className="text-gray-600">Select department to view attendance history</p>
      </div>

      {/* Department Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Department</label>
        <select
          value={selectedDept}
          onChange={handleDeptChange}
          className="border border-gray-300 p-3 rounded-lg w-full max-w-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">-- Choose Department --</option>
          {departments.map((dept, i) => (
            <option key={i} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Attendance Records */}
      {attendanceRecords.length > 0 ? (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Attendance Records for {selectedDept} Department</h3>

          {attendanceRecords.map((record) => (
            <div key={record.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-semibold text-gray-800">Date: {record.date}</h4>
                  <p className="text-sm text-gray-600">Time: {record.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    Total Present: {record.employeeDetails.filter((emp) => emp.status === "Present").length}
                  </p>
                  <p className="text-sm text-gray-600">
                    Total Absent: {record.employeeDetails.filter((emp) => emp.status === "Absent").length}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {record.employeeDetails.map((emp) => (
                      <tr key={emp.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">{emp.id}</td>
                        <td className="border border-gray-300 px-4 py-2">{emp.name}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              emp.status === "Present" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {emp.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ) : selectedDept ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No attendance records found for {selectedDept} department.</p>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">Please select a department to view attendance records.</p>
        </div>
      )}
    </div>
  )
}

export default ViewAttendance
