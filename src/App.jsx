import React from 'react'
import Layout from './routing/Layout'
import Login from './authenntication/Login'
import { Route, Routes } from 'react-router-dom'
import ProtectedRouting from './routing/ProtectedRouting'
import { ToastContainer } from 'react-toastify';
import Form from './authenntication/Form'
const App = () => {
  return (
    <div className=''>
      {/* <Form  /> */}
 <ToastContainer position="top-right" autoClose={1000} />
<Routes >
<Route path='/login' element={<Login/>}/>

<Route element={<ProtectedRouting/>}>

  
       <Route path="/*" element={<Layout/>}/>

</Route>
</Routes>
    </div>
  )
}

export default App
