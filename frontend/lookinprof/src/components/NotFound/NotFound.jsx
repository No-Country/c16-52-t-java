import React from 'react'
import Frame from '../../assets/Frame20.png'

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center p-10 gap-4'>
     
        <h3 className='text-[#004466] text-4xl font-extrabold'>OOPP!!!</h3>
        <p className='text-xl '>Pagina en contruccion...</p>
        <img src={Frame} alt="" className='h-[30%] w-[30%] '/>
    </div>
  )
}

export default NotFound