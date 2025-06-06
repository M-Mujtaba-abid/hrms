import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { EmployeeProvider } from './context/EmployeeContext'; // ✅ Correct import
import { ThemeProvider } from './context/ThemeContext.jsx';
import { DeleteProvider } from './context/DeleteContext.jsx';
import { AttendanceProvider } from './context/AttendanceProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <EmployeeProvider>
        <ThemeProvider>
          <DeleteProvider>
            <AttendanceProvider>



        <App />
            </AttendanceProvider>
          </DeleteProvider>
        </ThemeProvider>
      </EmployeeProvider>
    </BrowserRouter>
  </StrictMode>
);
