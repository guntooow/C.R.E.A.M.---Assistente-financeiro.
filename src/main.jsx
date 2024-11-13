import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './output.css'
import "./input.css"
import MainPage from './components/MainPage'
import Dashboard from './components/Dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  }
])


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
