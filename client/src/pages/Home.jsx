import React from 'react'
import HomeLayout from '../layouts/HomeLayout'
import { Link } from 'react-router-dom'
import homePageImg from '../assets/Images/homePageMainImage.png'

export default function Home() {
  return (
    <HomeLayout>
      <div className="pt-10  text-white flex item-center justify-center gap-10 mx-16 h-screen">
        <div className="w-1/2 space-y-6 flex flex-col items-start justify-center">
          <h1 className="text-5xl font-semibold">
            Find out best{' '}
            <span className="text-yellow-500 font-bold">Online Courses</span>
          </h1>
          <p className="text-xl ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta,
            omnis! Alias laboriosam accusamus sequi adipisci optio voluptates
            sit quasi perspiciatis
          </p>
          <div className="space-x-6">
            <Link
              to="/courses"
              className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-linear"
            >
              {' '}
              Explore courses{' '}
            </Link>
            <Link
              to="/courses"
              className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-linear"
            >
              {' '}
              Contact us{' '}
            </Link>
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <img src={homePageImg} alt="main img" />
        </div>
      </div>
    </HomeLayout>
  )
}
