import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';

import DashBoard from "../components/ui/DashBoard";
import SideBar from "../components/ui/SideBar";
import Topbar from "../components/ui/Topbar";
import SettingsModal from "../model/SettingsModel";

import AddNewEmploye from "../pages/employeManagement/AddNewEmploye";
import EmployeeDirectory from "../pages/employeManagement/EmployeeDirectory";
import EmployeeProfile from "../pages/employeManagement/EmployeeProfile";
import DepartmentAndRolls from "../pages/depart&rolls/DepartmentAndRolls";
import MarkAttandance from "../pages/attandanceTracking/MarkAttandance";
import ViewAttandance from "../pages/attandanceTracking/ViewAttandance";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  // Auto close sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };

    handleResize(); // Set initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
            {/* <ToastContainer position="top-right" autoClose={1000} /> */}
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "w-[260px]" : "w-0"
        } overflow-y-auto`}
      >
        <SideBar isSidebarOpen={isSidebarOpen} />
      </div>

      {/* Main content area */}
      <div className="flex-1  flex flex-col overflow-hidden  bg-gray-100">
        <div className=" lg:hidd">
          {/* Topbar */}
          <Topbar
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            openSettings={() => setShowSettings(true)}
          />
        </div>
        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-1 hide-scrollbar">
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/employee/:id" element={<EmployeeProfile />} />
            <Route path="/addnewemploye/:id" element={<AddNewEmploye />} />
            
            <Route path='/addnewemploye' element={<AddNewEmploye />} />
            <Route path="/employeedirectory" element={<EmployeeDirectory />} />
            <Route path="/departmentandrolls" element={<DepartmentAndRolls/>}/>

            <Route path="/markattandance" element={<MarkAttandance/>}/>
            <Route path="/viewattandance" element={<ViewAttandance/>}/>
          </Routes>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        show={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
};

export default Layout;
