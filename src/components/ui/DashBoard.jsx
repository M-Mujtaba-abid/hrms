
import React from "react";
import {
  FaUsers,
  FaBuilding,
  FaClock,
  FaUserCheck,
  FaComments,
  FaRobot,
} from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const DashBoard = () => {
  const cards = [
    { icon: <FaUsers />, title: "Total Employees", count: 120 },
    { icon: <FaBuilding />, title: "Total Departments", count: 8 },
    { icon: <FaComments />, title: "Pending Complaints", count: 5 },
    { icon: <FaClock />, title: "Pending Leave Requests", count: 7 },
    { icon: <FaUserCheck />, title: "Employees on Leave Today", count: 3 },
    { icon: <FaRobot />, title: "AI Sentiment Analysis", count: "Positive" },
  ];

  const overallAttendanceData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Attendance",
        data: [100, 95, 98, 92, 97],
        backgroundColor: "#0ea5e9",
      },
    ],
  };

  const departmentAttendanceData = {
    labels: ["HR", "Sales", "Tech", "Support", "Logistics"],
    datasets: [
      {
        label: "Attendance %",
        data: [95, 90, 88, 93, 85],
        backgroundColor: "#4ade80",
      },
    ],
  };

  const employeeCategoryData = {
    labels: ["Full-time", "Part-time", "Interns"],
    datasets: [
      {
        label: "Employees",
        data: [80, 25, 15],
        backgroundColor: ["#facc15", "#f97316", "#6366f1"],
      },
    ],
  };

  return (
    <div className="p-5 space-y-6 w-full bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 min-h-screen">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex items-center gap-4 transition-colors duration-300"
          >
            <div className="text-2xl text-blue-500">{card.icon}</div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{card.title}</p>
              <h2 className="text-xl font-bold">{card.count}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Overall Attendance Graph */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 transition-colors duration-300">
        <h3 className="text-lg font-semibold mb-4">Overall Attendance View</h3>
        <Bar data={overallAttendanceData} />
      </div>

      {/* Two Column Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 transition-colors duration-300">
          <h3 className="text-lg font-semibold mb-4">
            Attendance Overview by Department
          </h3>
          <Bar data={departmentAttendanceData} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 transition-colors duration-300">
          <h3 className="text-lg font-semibold mb-4">
            Employee Category Distribution
          </h3>
          <Pie data={employeeCategoryData} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
