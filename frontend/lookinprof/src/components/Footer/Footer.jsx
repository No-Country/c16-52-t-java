import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from 'react-router-dom';

const SocialsNetwork = [
  {
    name: "Facebook",
    icon: <FaFacebook />,
  }, {
    name: "Instagram",
    icon: <FaInstagram />,
  }, {
    name: "Twitter",
    icon: <FaTwitter />,
  }, {
    name: "LinkedIn",
    icon: <FaLinkedinIn />,
  },
]

const Footer = () => {
  return (
    <footer className='w-full bg-[#004466] py-10 px-6 md:px-20'>
      <div className='container mx-auto flex flex-col items-center md:flex-row md:justify-between gap-10 text-white'>
        {/* Columna 1 */}
        <div>
          <h2 className='text-3xl font-bold mb-4'>LookingProf</h2>
          <p className='text-sm mb-4'>Siguenos en:</p>
          <div className='flex gap-4'>
            {SocialsNetwork.map((item, index) => (
              <Link key={index} to='#' className='text-2xl'>
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
       
        <div>
          <h3 className='text-lg font-semibold mb-4'>Terms and conditions</h3>
          <ul className='text-sm'>
            <li className='py-1'>Terms and Conditions</li>
            <li className='py-1'>Privacy Policy</li>
            <li className='py-1'>Inclusion and Accessibility policy</li>
          </ul>
        </div>
      </div>
      <div className='text-sm text-white text-center mt-8'>
        <p>Copyright @ 2024, LookingProf All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
