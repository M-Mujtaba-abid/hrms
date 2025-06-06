"use client"

import { useState, useEffect } from "react"
import { useAttendance } from "../context/AttendanceProvider"

const AttendanceModal = () => {
  const {
    departments,
    selectedDept,
    setSelectedDept,
    selectedDate,
    setSelectedDate,
    filteredEmployees,
    attendance,
    isModalOpen,
    setIsModalOpen,
    filterEmployeesByDept,
    toggleAttendance,
    submitAttendance,
    refreshDepartments, // Add this if available
  } = useAttendance()

  const [showEmployees, setShowEmployees] = useState(false)

  // Add useEffect to log departments when modal opens
  useEffect(() => {
    console.log("Modal opened, available departments:", departments)
  }, [departments])

  const handleDeptChange = (e) => {
    const dept = e.target.value
    setSelectedDept(dept)
    filterEmployeesByDept(dept)
    setShowEmployees(false)
  }

  const handleGetSheet = () => {
    if (!selectedDept) {
      alert("Please select a department first!")
      return
    }
    setShowEmployees(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setShowEmployees(false)
    setSelectedDept("")
  }

  // Add refresh function
  const handleRefreshDepartments = () => {
    if (refreshDepartments) {
      refreshDepartments()
    }
  }

  if (!isModalOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Mark Attendance</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {!showEmployees ? (
            // Department and Date Selection
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Select Department</label>
                  <button
                    onClick={handleRefreshDepartments}
                    className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                  >
                    Refresh
                  </button>
                </div>
                <select
                  value={selectedDept}
                  onChange={handleDeptChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">-- Choose Department --</option>
                  {departments.length > 0 ? (
                    departments.map((dept, i) => (
                      <option key={i} value={dept}>
                        {dept}
                      </option>
                    ))
                  ) : (
                    <option disabled>No departments found</option>
                  )}
                </select>

                {/* Debug info */}
                <p className="text-xs text-gray-500 mt-1">
                  Available departments: {departments.length}
                  {departments.length > 0 && ` (${departments.join(", ")})`}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                onClick={handleGetSheet}
                disabled={!selectedDept}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Get Sheet
              </button>
            </div>
          ) : (
            // Employee Table
            <div>
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800">
                  {selectedDept} Department - {selectedDate}
                </h3>
                <p className="text-sm text-blue-600">Total Employees: {filteredEmployees.length}</p>
              </div>

              {filteredEmployees.length > 0 ? (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-3 text-left">ID</th>
                          <th className="border border-gray-300 px-4 py-3 text-left">Name</th>
                          <th className="border border-gray-300 px-4 py-3 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEmployees.map((emp) => (
                          <tr key={emp.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-3">{emp.id}</td>
                            <td className="border border-gray-300 px-4 py-3">{emp.fullName || emp.name}</td>
                            <td className="border border-gray-300 px-4 py-3 text-center">
                              {/* Toggle Slider */}
                              <div className="flex items-center justify-center">
                                <button
                                  onClick={() => toggleAttendance(emp.id)}
                                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                                    attendance[emp.id] === "Present" ? "bg-green-600" : "bg-gray-300"
                                  }`}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                      attendance[emp.id] === "Present" ? "translate-x-6" : "translate-x-1"
                                    }`}
                                  />
                                </button>
                                <span className="ml-2 text-sm font-medium">
                                  {attendance[emp.id] === "Present" ? "Present" : "Absent"}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Attendance Summary */}
                  {Object.keys(attendance).length > 0 && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Summary</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-green-600 font-medium">Present: </span>
                          {Object.values(attendance).filter((status) => status === "Present").length}
                        </div>
                        <div>
                          <span className="text-red-600 font-medium">Absent: </span>
                          {filteredEmployees.length -
                            Object.values(attendance).filter((status) => status === "Present").length}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-4 mt-6">
                    <button
                      onClick={submitAttendance}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                      Submit Attendance
                    </button>
                    <button
                      onClick={() => setShowEmployees(false)}
                      className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
                    >
                      Back
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No employees found in this department.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AttendanceModal
