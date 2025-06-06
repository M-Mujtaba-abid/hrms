import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRouting = () => {
    const isLogin=sessionStorage.getItem("login")

  return (
    <div>
        {isLogin? <Outlet/>:  <Navigate to="/login"/>}
      {/* protecttined */}
    </div>
  )
}

export default ProtectedRouting
