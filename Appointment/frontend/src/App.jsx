import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Landing from './Components/Landing'
import About from './Components/About'
import Contact from './Components/Contact'
import NotFound from './Components/NotFound'

import Login from './Components/Login'
import Register from './Components/Register'

import DoctorForm from './views/DoctorForm'
import DoctorDashboard from './views/DoctorDashbaord'
import DoctorEditForm from './views/DoctorEditForm'
import DoctorAppointments from './views/DoctorAppointments'

import PatientForm from './views/PatientForm'
import PatientDashboard from './views/PatientDashboard'
import PatientEditForm from './views/PatientEditForm'
import PatientBookAppointment from './views/PatientBookAppointment'
import PatientAppointments from './views/PatientAppointments'

import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import ManageUsers from './admin/ManageUsers'
import ManageDoctors from './admin/ManageDoctors'
import ManagePatients from './admin/ManagePatients'
import ManageAppointments from './admin/ManageAppointments'
import AdminGuard from './admin/AdminGuard'

function App() {

  return (
    <>
      <Navbar />

      <main className="flex-1 min-h-screen items-center justify-center bg-[#0b1b30] ">

        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/doctor/dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor/form' element={<DoctorForm />} />
          <Route path='/doctor/edit/:id' element={<DoctorEditForm />} />
          <Route path="/doctor/appointment/:doctorId" element={<DoctorAppointments />} />

          <Route path='/patient/form' element={<PatientForm />} />
          <Route path='/patient/dashboard' element={<PatientDashboard />} />
          <Route path='/patient/edit/:id' element={<PatientEditForm />} />

          <Route path="/patient/book-appointment" element={<PatientBookAppointment />} />
          <Route path="/patient/appointment/:id" element={<PatientAppointments />} />

          {/* Admin */}
          {/* <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/manageusers' element={<ManageUsers />} />
          <Route path='/admin/managedoctors' element={<ManageDoctors />} />
          <Route path='/admin/managepatients' element={<ManagePatients />} />
          <Route path='/admin/manageappointments' element={<ManageAppointments />} /> */}

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
          <Route path="/admin/manageusers" element={<AdminGuard><ManageUsers /></AdminGuard>} />
          <Route path="/admin/managedoctors" element={<AdminGuard><ManageDoctors /></AdminGuard>} />
          <Route path="/admin/managepatients" element={<AdminGuard><ManagePatients /></AdminGuard>} />
          <Route path="/admin/manageappointments" element={<AdminGuard><ManageAppointments /></AdminGuard>} />

          <Route path='*' element={<NotFound />} />


        </Routes>
      </main>

      <Footer />

    </>

  )
}

export default App
