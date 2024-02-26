import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Combined imports
import { servicesData } from '../../utils';
import { Button } from '@mui/material';
import { FaStar } from "react-icons/fa";
import Cards from '../../UI/cards/Cards';
import { RiStarSFill, RiStarSLine } from "react-icons/ri";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const ServicesDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState('');
    const serviceItem = servicesData.find(item => item.id.toString() === id);
    if (!serviceItem) return <div>Service not found</div>;
    const itemsPerPage = 3;
    const servicesOfSameProfession = servicesData.filter(item => item.prof === serviceItem.prof);
    const indexOfLastItem = currentPage * itemsPerPage;

    let lastGoodComment = '';
    for (let i = serviceItem.feedback.length - 1; i >= 0; i--) {
        const feedback = serviceItem.feedback[i];
        if (feedback.stars === 5) {
            lastGoodComment = feedback.comment;
            break;
        }
    }
    
    window.scrollTo(0, 0);

    const handleClickCard = (id) => {
        navigate(`/services/${id}`);
    };
    const shuffledServices = [...servicesOfSameProfession].sort(() => Math.random() - 0.5).slice(0, 3);
    return (
        <div className='flex flex-col justify-center items-center pt-10 pb-5'>
            {serviceItem && (
                <div>
                    <section className='flex flex-row gap-8 w-[1100px]'>
                        <div className='flex flex-col gap-6 m-2'>
                            <div className=''>
                                <h2 className='text-4xl w-[700px] text-[#004466] font-extrabold'>{serviceItem.title}</h2>
                            </div>
                            <div>
                                <h5 className='font-semibold'>Lugar de residencia</h5>
                                <span>{serviceItem.city}</span>
                            </div>
                            <div>
                                <h5 className='font-semibold'>Acerca de {serviceItem.name}</h5>
                                <p>{serviceItem.description}</p>
                            </div>
                        </div>
                        <div className='border-[1px] p-4 rounded-xl shadow-lg' >
                            <div className='flex flex-col items-center justify-center w-[300px]'>
                                <img src={serviceItem.image} alt="" className='rounded-full bg-center w-[200px] h-[200px]' />
                                <h5 className='font-bold text-xl'>{serviceItem.name}</h5>
                                <p className='text-sm'>{serviceItem.prof}</p>
                                <p className='text-xs'>{serviceItem.starts}</p>
                                {lastGoodComment && (
                                    <div>
                                        <p className='text-xs p-4 w-[250px] text-center'>{lastGoodComment}</p>
                                    </div>
                                )}
                                <Button variant='contained' color='primary'>Contactar</Button>
                            </div>
                        </div>
                    </section>
                    <section className='p-2'>
                        <h4>Opiniones del servicio</h4>
                        <div className='flex flex-row items-center gap-2 bg-yellow-200 w-[200px] rounded-full py-1 px-4'>
                            <FaStar className='text-yellow-300' />
                            <span className='text-black/40 text-xs' >{serviceItem.starts}</span>

                            <p className='text-xs'>{serviceItem.feedback.length} opiniones</p>
                        </div>

                        {serviceItem.feedback.map(item =>
                            <div key={item.id} className='flex flex-col m-2 gap-2'>
                                <div className='flex flex-col px-2 py-10 border-2 border-[] rounded-xl'>
                                    <div className='flex justify-between gap-2'>
                                        <div className='flex flex-row gap-2'>
                                            <p className='font-semibold'>{item.user}</p>
                                            <p className='flex flex-row items-center justify-center'>{item.stars} <FaStar className='text-yellow-600 text-[10px]' /></p>
                                        </div>
                                        <span className='text-[10px]'>{item.date}</span>
                                    </div>
                                    <p className='text-xl'>{item.comment}</p>
                                </div>
                            </div>)
                        }
                    </section>
                    {/* mostrar solo 3 perfiles random de la misma profesion*/}
                    {/* Pagination */}
                    <div className='flex justify-center mt-4'>
                    <button className='text-2xl text-[#004466] hover:bg-white' onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}>
                            <FaChevronCircleLeft/>
                        </button>
                    <section className='flex flex-row justify-center'>
                        {shuffledServices.map((item) => ( // Using shuffledServices here based on your comment
                            <div key={item.id} className='m-2 border-[#004466] border-2 rounded-lg h-auto'>
                                <Cards className='flex flex-col items-center'>
                                    <div>
                                        <img src={item.image} alt={item.title} className='w-full h-[200px] object-cover rounded-t-lg mb-4' />
                                        <h4 className='font-semibold text-xl'>{item.name}</h4>
                                        <p className='text-sm'>{item.prof}</p>
                                        <span className='text-xs'>{item.city}</span>
                                        <div className='flex flex-row gap-1 items-center'>
                                            {item.starts}{[...Array(Math.floor(item.starts))].map((_, i) => (
                                                <RiStarSFill key={i} className='text-yellow-500' />
                                            ))}
                                            {item.starts % 1 !== 0 && (
                                                <RiStarSLine className='text-yellow-500' />
                                            )}
                                        </div>
                                    </div>

                                    <div className='flex py-2'>
                                        <Button variant='contained' color='primary' onClick={() => handleClickCard(item.id)}>
                                            Contactar
                                        </Button>
                                    </div>
                                </Cards>
                            </div>
                        ))}
                    </section>
                        <button className='text-2xl text-[#004466] hover:bg-white' onClick={() => setCurrentPage(prevPage => (indexOfLastItem < servicesOfSameProfession.length ? prevPage + 1 : prevPage))}
                        >
                            <FaChevronCircleRight/>
                        </button>
                    </div>
                </div>
            )}
            <div className='p-10'>
                
            <Button color='primary' variant='contained'  size='large'onClick={() => navigate('/services')}>Volver a Servicios</Button>
            </div>
        </div>
    )
}

export default ServicesDetails
