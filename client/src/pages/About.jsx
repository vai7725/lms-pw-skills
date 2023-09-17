import React from 'react'
import HomeLayout from '../layouts/HomeLayout'
import aboutMainImg from '../assets/Images/aboutMainImage.png'
import apj from '../assets/Images/apj.png'
import billGates from '../assets/Images/billGates.png'
import einstein from '../assets/Images/einstein.png'
import nelsonMandela from '../assets/Images/nelsonMandela.png'
import steveJobs from '../assets/Images/steveJobs.png'

export default function About() {
  return (
    <HomeLayout>
      <div className="flex flex-col text-white sm:px-20 pt-20">
        <div className="flex sm:flex-row flex-col-reverse justify-center items-center gap-5 mx-10">
          <section className="sm:w-1/2 space-y-10">
            <h1 className="text-5xl text-yellow-500 font-semibold">
              Affordable and quality education
            </h1>
            <p className="sm:text-xl text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quam
              incidunt, eligendi animi quae aut eveniet qui dicta dolor itaque
              quod magnam pariatur? Quis amet praesentium obcaecati. Numquam
              nesciunt et impedit magnam blanditiis! Nisi, aliquid fugiat ipsam
              tempore voluptatem magni!
            </p>
          </section>
          <div className="sm:w-1/2">
            <img src={aboutMainImg} alt="aboutImg" />
          </div>
        </div>
        <div className="carousel w-1/2 mx-auto">
          <div id="slide1" className="carousel-item relative w-full">
            <div className="flex items-center justify-center w-3/4 m-auto">
              <img
                src={apj}
                className="w-full rounded-full border-2 border-gray-200 aspect-square"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>

          <div id="slide2" className="carousel-item relative w-full">
            <div className="flex items-center justify-center w-3/4 m-auto">
              <img
                src={billGates}
                className="w-full  rounded-full border-2 border-gray-200 aspect-square"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>

          <div id="slide3" className="carousel-item relative w-full">
            <div className="flex items-center justify-center w-3/4 m-auto">
              <img
                src={einstein}
                className="w-full rounded-full border-2 border-gray-200 aspect-square"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>

          <div id="slide4" className="carousel-item relative w-full">
            <div className="flex items-center justify-center w-3/4 m-auto">
              <img
                src={nelsonMandela}
                className="w-full rounded-full border-2 border-gray-200 aspect-square"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide1" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>

          <div id="slide4" className="carousel-item relative w-full">
            <div className="flex items-center justify-center w-3/4 m-auto">
              <img
                src={steveJobs}
                className="w-full rounded-full border-2 border-gray-200 aspect-square"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide1" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}
