import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom'; // Combined imports
import { Button } from '@mui/material';
import { setCurrentUser } from '../../../redux/slices/userSlice';


const ServiceProfile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [decodedPayload, setDecodedPayload] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const [, payload] = token.split('.');
        const _decodedPayload = JSON.parse(atob(payload));
        dispatch(setCurrentUser(_decodedPayload));
        setDecodedPayload(_decodedPayload);
      } catch (error) {
        console.error('Failed to decode or parse the JWT:', error);
      }
    }
  }, [dispatch]);
  console.log(decodedPayload?.imageUrl)
    return (
        <div className='flex flex-col justify-center items-center pt-10 pb-5'>

                <div>
                    <section className='flex flex-row gap-8 w-[1100px]'>
                        <div className='flex flex-col gap-6 m-2'>

                            <h3>Editar Perfil</h3>
                            <div className=''>
                                <h2 className='text-4xl w-[700px] text-[#004466] font-extrabold'>{decodedPayload?.firstName}</h2>
                            </div>
                            <div>
                                <h5 className='font-semibold'>Lugar de residencia</h5>
                                <span>{decodedPayload?.country}</span>
                            </div>
                            <div>
                                <h5 className='font-semibold'>Acerca de {}</h5>
                                <p>{}</p>
                            </div>
                        </div>
                        <div className='border-[1px] p-4 rounded-xl shadow-lg' >
                            <div className='flex flex-col items-center justify-center w-[300px]'>
                            <img src={decodedPayload?.imageUrl} alt='avatar' className='w-[200px] h-[200px]' />
                                <h5 className='font-bold text-xl'>{}</h5>
                                <p className='text-sm'>{}</p>
                                <p className='text-xs'>{}</p>
                                
                                <Button variant='contained' color='primary'>Contactar</Button>
                            </div>
                        </div>
                    </section>
                    
                    
                </div>
          
            <div className='p-10'>
                
            <Button color='primary' variant='contained'  size='large'onClick={() => navigate('/services')}>Volver a Servicios</Button>
            </div>
        </div>
    )

}

export default ServiceProfile