import { FaBars, FaCog } from 'react-icons/fa';

export default function Topbar({ toggleSidebar, openSettings }) {
  return (
    <div className="bg-white p-4 bg-white text-black dark:bg-[#0a2540] dark:text-white  flex justify-between items-center shadow-md">
      <button onClick={toggleSidebar} className="md:hidden text-xl">
        <FaBars />
      </button>
     <h2 className="text-xl sm:text-lg font-semibold text-center w-full sm:w-auto ml-4 sm:ml-0">
  HRMS Dashboard
</h2>

      <button onClick={openSettings} className="text-xl">
        <FaCog />
      </button>
    </div>
  );
}




