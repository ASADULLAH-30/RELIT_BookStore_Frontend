import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Router, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import  'sweetalert2/dist/sweetalert2.js'



import router from './router/router.jsx'
import { store } from './redux/Store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
</Provider>
)
