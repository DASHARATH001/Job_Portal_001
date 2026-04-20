import React from 'react'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/ui/auth/Login'
import Signup from './components/ui/auth/Signup'
import Home from './Home'
import Jobs from './Jobs'
import Browse from './Browse'
import Profile from './Profile'
import JobDescription from './components/ui/JobDescription'
import Compines from './components/ui/admin/Compines'
import CompinesCreate from './components/ui/admin/CompinesCreate'
import CompanySetup from './components/ui/admin/CompanySetup'
import AdminJobs from './components/ui/admin/AdminJobs'
import PostJob from './components/ui/admin/PostJob'
import Applicants from './components/ui/admin/Applicants'
import ProtectedRoute from './components/ui/admin/ProtectedRoute'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  }, {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: 'jobs/description/:id',
    element: <JobDescription />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  // admin ke liye 
  {
    path: '/admin/companies',
    element: <ProtectedRoute><Compines /></ProtectedRoute>
  },
  {
    path: '/admin/companies/create',
    element: <ProtectedRoute><CompinesCreate /></ProtectedRoute>
  },
  {
    path: '/admin/companies/:id',
    element: <ProtectedRoute> <CompanySetup /></ProtectedRoute>
  },
  {
    path: '/admin/jobs',
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: '/admin/jobs/create',
    element: <ProtectedRoute><PostJob /></ProtectedRoute>
  }, {
    path: '/admin/jobs/:id/applicants',
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  }

])

const App = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App