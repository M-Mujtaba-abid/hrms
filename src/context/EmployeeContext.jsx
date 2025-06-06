
import React, { createContext, useEffect, useState } from "react";

import { toast } from 'react-toastify';
export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    // try {
    //   // const stored = localStorage.getItem("employees");
    //   if (stored) {
    //     const parsedData = JSON.parse(stored);
    //     if (parsedData.length > 0) {
    //       setEmployees(parsedData);
    //     }
    //   }
    //   setIsLoading(false);
    // } catch (error) {
    //   console.error("Error loading employees from localStorage:", error);
    //   setIsLoading(false);
    // }
  }, []); // Empty dependency array means this runs once on mount

  // Save to localStorage whenever employees change
  useEffect(() => {
    try {
      // localStorage.setItem("employees", JSON.stringify(employees));
    } catch (error) {
      console.error("Error saving employees to localStorage:", error);
    }
  }, [employees]);

  const addEmployee = (employee) => {
    // try {
    //   setEmployees(prevEmployees => [...prevEmployees, employee]);
    // } catch (error) {
    //   console.error("Error adding employee:", error);
    // }
  };

  const updateEmployee = (updated) => {
    try {
      setEmployees(prevEmployees => 
        prevEmployees.map((emp) => emp.id === updated.id ? updated : emp)
      );
      toast.success("update kr lia ");

    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const deleteEmployee = (id) => {
    try {
      setEmployees(prevEmployees => 
        prevEmployees.filter((emp) => emp.id !== id)
      );
      toast.success("deleted successfull");
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{ 
        employees, 
        setEmployees, 
        addEmployee, 
        updateEmployee, 
        deleteEmployee, 
        isLoading 
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};