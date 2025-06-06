import { useTheme } from "../context/ThemeContext"; // ✅ import this

export default function SettingsModal({ show, onClose }) {
  const { darkMode, toggleTheme } = useTheme(); // ✅ access theme context

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg p-6 w-80 shadow-md transition-all duration-300">
        <h3 className="text-xl font-semibold mb-4">Settings</h3>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between mb-4">
          <span>Theme:</span>
          <button
            onClick={toggleTheme}
            className="px-4 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded"
          >
            {darkMode ? " ☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Coming Soon Placeholder */}
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Coming soon: Password Change
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
