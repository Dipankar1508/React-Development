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
import PatientForm from './views/PatientForm'
import PatientDashboard from './views/PatientDashboard'
import PatientEditForm from './views/PatientEditForm'

function App() {

  return (
    <>
      <Navbar />

      <main className='flex-1 '>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/doctor/dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor/form' element={<DoctorForm />} />
          <Route path='/doctor/edit/:id' element={<DoctorEditForm />} />
          <Route path='/patient/form' element={<PatientForm />} />
          <Route path='/patient/dashboard' element={<PatientDashboard />} />
          <Route path='/patient/edit/:id' element={<PatientEditForm />} />

          <Route path='*' element={<NotFound />} />


        </Routes>
      </main>

      <Footer />

    </>

  )
}

export default App
