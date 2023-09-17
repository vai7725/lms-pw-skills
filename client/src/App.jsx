import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'

import './index.css'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import About from './pages/About'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
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
