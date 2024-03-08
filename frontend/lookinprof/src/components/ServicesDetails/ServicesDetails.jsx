import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import axios from 'axios';

const ServicesDetails = () => {
    const { id } = useParams();
    const jwt = localStorage.getItem('jwt');
    const [servicesData, setServicesData] = useState({});
    const [similarServices, setSimilarServices] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = window.innerWidth < 1024 ? 1 : 3; // Show 1 item on mobile, 3 items on desktop

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://3.142.156.194:8080/user/${id}`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
            setServicesData(response.data);
        };
        fetchData();
    }, [id, jwt]);

    useEffect(() => {
        const fetchSimilarServices = async () => {
            const { data } = await axios.get('http://3.142.156.194:8080/user/all');
            const filteredServices = data.filter(item =>
                item.role === 'PROFESSIONAL' &&
                item.profession === servicesData.profession &&
                item.idUser !== servicesData.idUser
            );
            setSimilarServices(filteredServices);
        };
        if (servicesData.profession) {
            fetchSimilarServices();
        }
    }, [servicesData, servicesData.idUser]);

    useEffect(() => {
        setSimilarServices(prevServices => prevServices.filter(service => service.idUser !== id));
    }, [id]);

    const handleNext = () => {
        setCurrentPage(prevPage => (prevPage % Math.ceil(similarServices.length / itemsPerPage)) + 1);
    };

    const handlePrev = () => {
        setCurrentPage(prevPage => (prevPage === 1 ? Math.ceil(similarServices.length / itemsPerPage) : prevPage - 1));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = similarServices.slice(startIndex, endIndex);

    return (
        <div className='flex flex-col justify-center items-center pt-10 pb-5'>
            {servicesData.firstName && (
                <div>
                    <section className='py-4 px-10 flex flex-col justify-center items-center lg:flex-row gap-8 w-full lg:w-[1100px]'>
                        <div className='flex flex-col gap-6 m-2 w-full lg:w-[600px]'>
                            <div>
                                <h2 className='text-4xl md:text-5xl text-[#004466] font-extrabold'>Hola, mi nombre es {servicesData.firstName} {servicesData.lastName}</h2>
                            </div>
                            <div>
                                <h5 className='font-semibold text-2xl text-[#004466]'>
                                    Soy {servicesData.profession && servicesData.profession.toString().toLowerCase()}
                                </h5>
                            </div>
                            <div>
                                <h5 className='font-semibold'>Lugar de residencia</h5>
                                <span>{servicesData.city}, {servicesData.province}</span>
                            </div>
                            <div>
                                <h5 className='font-semibold'>Acerca de </h5>
                                <p>{ servicesData.description}</p>
                            </div>
                        </div>
                        <div className='border-[1px] p-4 rounded-xl shadow-lg w-full md:w-[400px]'>
                            <div className='flex flex-col items-center justify-center'>
                                <img src={servicesData.imageUrl} alt="Descriptive text" className="rounded-xl bg-center w-[200px] h-[auto] pb-2" />
                                <h5 className='font-bold text-xl'>{ }</h5>
                                <p className='text-sm'>{ }</p>
                                <p className='text-xs'>{ }</p>
                                <Button variant='contained' color='primary'>
                                    <Link to={`https://wa.me/${encodeURIComponent(servicesData.phone)}`} style={{ color: 'inherit', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
                                        Contactar
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </section>
                    {/* mostrar solo 3 perfiles random de la misma profesion*/}
                    {/* Pagination */}
                </div>
            )}
            <div className='hidden xl:block flex flex-col items-center justify-center mt-4'>
                <section className=' flex flex-col md:flex-row items-center justify-center lg:w-[1100px]'>
                    {currentItems.length > 0 ? (
                        currentItems.map((item) => (
                            <div key={item.idUser} className='lg:p-4 lg:m-4 border-[#004466] w-[300px] shadow-slate-400 shadow-xl border-2 rounded-lg h-auto'>
                                <div className='flex flex-col justify-center items-center'>
                                    <img src={item.imageUrl} alt={item.profession} className='w-full lg:w-[9vw] h-[30%] lg:h-[25vh] rounded-t-lg mb-4 cover' />
                                    <div>
                                        <h4 className='font-semibold text-xl'>{item.firstName} {item.lastName}</h4>
                                        <p className='text-sm'>{item.profession}</p>
                                        <p>{item.city}, {item.province}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col items-center py-2'>
                                    <Button variant='contained' color='primary' onClick={() => navigate(`/services/${item.idUser}`)}>
                                        Contactar
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        "No hay profesionales similares para mostrar"
                    )}
                    </section>
                    <div className='flex flex-row items-center justify-center mt-4 gap-5'>
                        <button className=' text-2xl text-[#004466]' onClick={handlePrev}>
                            <FaChevronCircleLeft />
                        </button>
                        <button className='  text-2xl text-[#004466]' onClick={handleNext}>
                            <FaChevronCircleRight />
                        </button>
                    </div>
                
                
            </div>
            <div className='p-10'>
                <Button color='primary' variant='contained' size='large' onClick={() => navigate('/services')}>
                    Volver a Servicios
                </Button>
            </div>
        </div>
    )
}

export default ServicesDetails;
