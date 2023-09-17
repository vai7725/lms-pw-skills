import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'

import './index.css'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import HomeLayout from './layouts/HomeLayout'
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'about',
    element: <div>About</div>,
  },
])

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  )
}

export default App
