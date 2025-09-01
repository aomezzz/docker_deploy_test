import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/sweetalert-custom.css'
import router from './Routes/Routes'
import { RouterProvider } from 'react-router'
import { AuthProvider } from './context/authcontext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)