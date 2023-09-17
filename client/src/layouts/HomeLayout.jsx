import React from 'react'
import Footer from '../components/Footer'
import { FiMenu } from 'react-icons/fi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function HomeLayout({ children }) {
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
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
            <li>
              <Link to="/courses">All courses</Link>
            </li>
          </ul>
        </div>
      </div>
      {children}
      <Footer />
    </div>
  )
}
