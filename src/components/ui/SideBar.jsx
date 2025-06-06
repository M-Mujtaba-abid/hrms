import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaChevronDown, FaUsers, FaCalendarAlt, FaPlaneDeparture, FaMoneyCheckAlt, FaChartLine, FaBullhorn, FaCommentAlt } from "react-icons/fa";
import { MdSpaceDashboard, MdWork } from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";

export default function Sidebar({ isSidebarOpen }) {
  const navigate=useNavigate()
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (key) => {
    setOpenMenu(prev => (prev === key ? null : key));
  };

  const handleLogout=()=>{
    alert("logout")
    localStorage.removeItem("login")
    navigate("/login")

  }

  return (
     <div className={`h-full bg-[#0a2540] text-white transition-all duration-300 ${isSidebarOpen ? 'w-[260px]' : 'w-0 overflow-hidden'}  `}>
  <div className="h-full overflow-y-auto overflow-x-hidden p-4 hide-scrollbar">


      <h1 className="text-3xl font-bold text-center mb-6">Metro Cash & Carry</h1>

      <nav className="flex flex-col gap-2 text-sm">

        <Link to="/" className="flex items-center gap-2 hover:text-blue-300 px-4 py-2 rounded">
          <MdSpaceDashboard /> Dashboard
        </Link>

        {/* EMPLOYEE MANAGEMENT */}
        <div>
          <button
            onClick={() => toggleMenu("employee")}
            className="w-full flex justify-between items-center hover:text-blue-300 px-4 py-2 rounded"
          >
            <span className="flex items-center gap-2"><FaUsers /> Employee Management</span>
            <FaChevronDown className={`transition-transform duration-300 ${openMenu === "employee" ? "rotate-180" : ""}`} />
          </button>
          <div className={`ml-4 mt-1 flex flex-col gap-1 overflow-hidden transition-all duration-500 ${openMenu === "employee" ? "max-h-40 bg-[#12335a] p-2 rounded" : "max-h-0"}`}>
            <Link to="/employeedirectory" className="hover:text-blue-100 px-4 py-1 rounded">Employee Directory</Link>
            <Link to="/addnewemploye" className="hover:text-blue-100 px-4 py-1 rounded">Add New Employee</Link>
          </div>
        </div>

        <Link to="/departmentandrolls" className="flex items-center gap-2 hover:text-blue-300 px-4 py-2 rounded">
          <BiBuildingHouse /> Departments & Roles
        </Link>

        {/* ATTENDANCE */}
        <div>
          <button
            onClick={() => toggleMenu("attendance")}
            className="w-full flex justify-between items-center hover:text-blue-300 px-4 py-2 rounded"
          >
            <span className="flex items-center gap-2"><FaCalendarAlt /> Attendance Tracking</span>
            <FaChevronDown className={`transition-transform duration-300 ${openMenu === "attendance" ? "rotate-180" : ""}`} />
          </button>
          <div className={`ml-4 mt-1 flex flex-col gap-1 overflow-hidden transition-all duration-500 ${openMenu === "attendance" ? "max-h-40 bg-[#12335a] p-2 rounded" : "max-h-0"}`}>
            <Link to="/viewattandance" className="hover:text-blue-100 px-4 py-1 rounded">View Attendance</Link>
            <Link to="/markattandance" className="hover:text-blue-100 px-4 py-1 rounded">Mark Attendance</Link>
          </div>
        </div>

        {/* LEAVE */}
        <div>
          <button
            onClick={() => toggleMenu("leave")}
            className="w-full flex justify-between items-center hover:text-blue-300 px-4 py-2 rounded"
          >
            <span className="flex items-center gap-2"><FaPlaneDeparture /> Leave & Time-Off</span>
            <FaChevronDown className={`transition-transform duration-300 ${openMenu === "leave" ? "rotate-180" : ""}`} />
          </button>
          <div className={`ml-4 mt-1 flex flex-col gap-1 overflow-hidden transition-all duration-500 ${openMenu === "leave" ? "max-h-40 bg-[#12335a] p-2 rounded" : "max-h-0"}`}>
            <Link to="/apply-leave" className="hover:text-blue-100 px-4 py-1 rounded">Apply Leave</Link>
            <Link to="/leave-status" className="hover:text-blue-100 px-4 py-1 rounded">Leave Status</Link>
          </div>
        </div>

        <Link to="/payroll" className="flex items-center gap-2 hover:text-blue-300 px-4 py-2 rounded">
          <FaMoneyCheckAlt /> Payroll Processing
        </Link>

        <Link to="/performance" className="flex items-center gap-2 hover:text-blue-300 px-4 py-2 rounded">
          <FaChartLine /> Performance Reviews
        </Link>

        {/* RECRUITMENT */}
        <div>
          <button
            onClick={() => toggleMenu("recruitment")}
            className="w-full flex justify-between items-center hover:text-blue-300 px-4 py-2 rounded"
          >
            <span className="flex items-center gap-2"><MdWork /> Recruitment & Hiring</span>
            <FaChevronDown className={`transition-transform duration-300 ${openMenu === "recruitment" ? "rotate-180" : ""}`} />
          </button>
          <div className={`ml-4 mt-1 flex flex-col gap-1 overflow-hidden transition-all duration-500 ${openMenu === "recruitment" ? "max-h-40 bg-[#12335a] p-2 rounded" : "max-h-0"}`}>
            <Link to="/job-postings" className="hover:text-blue-100 px-4 py-1 rounded">Job Postings</Link>
            <Link to="/applicants" className="hover:text-blue-100 px-4 py-1 rounded">Applicants</Link>
          </div>
        </div>

        <Link to="/communication" className="flex items-center gap-2 hover:text-blue-300 px-4 py-2 rounded">
          <FaBullhorn /> Employee Communication
        </Link>

        <Link to="/complaints" className="flex items-center gap-2 hover:text-blue-300 px-4 py-2 rounded">
          <FaCommentAlt /> Complaint Handling
        </Link>

        <Link to="/feedback" className="flex items-center gap-2 hover:text-blue-300 px-4 py-2 rounded">
          <FaCommentAlt /> Employee Feedback
        </Link>
        <Link to="/feedback" className="flex items-center gap-2 hover:text-blue-300 px-4 py-2 rounded">
           <FaChartLine />  HR Analytics & Reports
        </Link>
        <button

        onClick={handleLogout}
         className="flex items-center gap-2 hover:text-blue-300 px-4 py-2 rounded">
             <FaSignOutAlt />  Log Out
        </button>
      </nav>
</div>
    </div>
  );
}
