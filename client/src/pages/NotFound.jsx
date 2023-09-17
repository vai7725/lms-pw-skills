import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-9xl font-extrabold text-white">404</h1>
      <div>Page not found</div>
      <button
        onClick={() => navigate(-1)}
        className="mt-5 border-[1px] border-white p-2 rounded-md hover:bg-white hover:text-gray-800 transition-all ease-linear"
      >
        Go back
      </button>
    </div>
  )
}
