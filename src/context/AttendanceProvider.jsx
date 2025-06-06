"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AttendanceContext = createContext()

export const AttendanceProvider = ({ children }) => {
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  const [selectedDept, setSelectedDept] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [attendance, setAttendance] = useState({})
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Load data from localStorage
  useEffect(() => {
    const employeeData = JSON.parse(localStorage.getItem("employees")) || []
    const attendanceData = JSON.parse(localStorage.getItem("attendanceRecords")) || []

    console.log("Loaded employees from localStorage:", employeeData) // Debug log

    setEmployees(employeeData)
    setAttendanceRecords(attendanceData)

    // Get unique departments
    const depts = [...new Set(employeeData.map((emp) => emp.department?.trim()).filter(Boolean))]
    console.log("Extracted departments:", depts) // Debug log
    setDepartments(depts)
  }, [])

  // Function to refresh departments
  const refreshDepartments = () => {
    const employeeData = JSON.parse(localStorage.getItem("employees")) || []
    setEmployees(employeeData)
    const depts = [...new Set(employeeData.map((emp) => emp.department?.trim()).filter(Boolean))]
    setDepartments(depts)
    console.log("Refreshed departments:", depts)
  }

  // Filter employees by department
  const filterEmployeesByDept = (dept) => {
    if (!dept) {
      setFilteredEmployees([])
      return
    }

    const filtered = employees.filter((emp) => emp.department?.trim() === dept)
    setFilteredEmployees(filtered)

    // Reset attendance for new department
    setAttendance({})
  }

  // Toggle attendance status
  const toggleAttendance = (empId) => {
    setAttendance((prev) => ({
      ...prev,
      [empId]: prev[empId] === "Present" ? "Absent" : "Present",
    }))
  }

  // Submit attendance
  const submitAttendance = () => {
    if (Object.keys(attendance).length === 0) {
      alert("Please mark attendance for at least one employee!")
      return false
    }

    const attendanceRecord = {
      id: Date.now(),
      department: selectedDept,
      date: selectedDate,
      time: new Date().toLocaleTimeString(),
      attendance: attendance,
      employeeDetails: filteredEmployees.map((emp) => ({
        id: emp.id,
        name: emp.fullName || emp.name,
        status: attendance[emp.id] || "Absent",
      })),
    }

    const updatedRecords = [...attendanceRecords, attendanceRecord]
    setAttendanceRecords(updatedRecords)
    localStorage.setItem("attendanceRecords", JSON.stringify(updatedRecords))

    // Reset form
    setAttendance({})
    setIsModalOpen(false)

    alert(`Attendance submitted successfully for ${selectedDept} department!`)
    return true
  }

  // Get attendance records by department
  const getAttendanceByDept = (dept) => {
    return attendanceRecords.filter((record) => record.department === dept)
  }

  const value = {
    employees,
    departments,
    selectedDept,
    setSelectedDept,
    selectedDate,
    setSelectedDate,
    filteredEmployees,
    attendance,
    attendanceRecords,
    isModalOpen,
    setIsModalOpen,
    filterEmployeesByDept,
    toggleAttendance,
    submitAttendance,
    getAttendanceByDept,
    refreshDepartments,
  }

  return <AttendanceContext.Provider value={value}>{children}</AttendanceContext.Provider>
}

export const useAttendance = () => {
  const context = useContext(AttendanceContext)
  if (!context) {
    throw new Error("useAttendance must be used within AttendanceProvider")
  }
  return context
}
