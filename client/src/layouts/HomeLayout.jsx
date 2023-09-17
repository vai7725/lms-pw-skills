import React from 'react'
import Footer from '../components/Footer'
import { FiMenu } from 'react-icons/fi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export default function HomeLayout({ children }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoggedIn, role } = useSelector((state) => state.auth)

  const changeWidth = () => {
    const drawerSide = document.getElementsByClassName('drawer-side')
    drawerSide[0].style.width = 'auto'
  }

  const hideDrawer = () => {
    const el = document.getElementsByClassName('drawer-toggle')
    el[0].checked = false
    const drawerSide = document.getElementsByClassName('drawer-side')
    drawerSide[0].style.width = '0'
  }

  const handleLogout = (e) => {
    // todo
    e.preventDefault()

    // todo
    navigate('/')
  }

  return (
    <div className="min-h-[90vh]">
      <div className="drawer position absolute left-0 z-50 w-full">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer">
            <FiMenu
              onClick={changeWidth}
              size={'32px'}
              className="font-bold text-white m-4"
            />
          </label>
        </div>

        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle />
              </button>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn && role === 'ADMIN' && (
              <li>
                <Link to="/">Admin Dashboard</Link>
              </li>
            )}
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
            <li>
              <Link to="/courses">All courses</Link>
            </li>
            <li className="flex flex-row items-center justify-around bg-gray-800 py-2 rounded-md">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="bg-indigo-800 rounded-md font-semibold hover:bg-indigo-500 text-white hover:text-gray-800"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-yellow-700 rounded-md font-semibold hover:bg-yellow-500 hover:text-gray-800 text-white"
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/user/profile"
                    className="bg-indigo-800 rounded-md font-semibold hover:bg-indigo-500 text-white hover:text-gray-800"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-yellow-700 rounded-md font-semibold hover:bg-yellow-500 hover:text-gray-800 text-white"
                  >
                    Log out
                  </button>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
      {children}
      <Footer />
    </div>
  )
}
