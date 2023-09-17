import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs'

export default function Footer() {
  const date = new Date()

  const year = date.getFullYear()
  return (
    <>
      <footer className="mt-6 min-h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between sm:px-20 text-white bg-gray-800">
        <section className="text-lg">
          Copyright {year} | All right reserved
        </section>
        <section className="flex item-center justify-center gap-5 text-2xl text-white mt-2 sm:mt-0 ">
          <a href="#" className="hover:text-yellow-500">
            <BsFacebook />
          </a>
          <a href="#" className="hover:text-yellow-500">
            <BsInstagram />
          </a>
          <a href="#" className="hover:text-yellow-500">
            <BsLinkedin />
          </a>
        </section>
      </footer>
    </>
  )
}
