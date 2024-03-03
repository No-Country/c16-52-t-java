import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Combined imports
import { Button } from '@mui/material';
import { FaStar } from "react-icons/fa";
import Cards from '../../UI/cards/Cards';
import { RiStarSFill, RiStarSLine } from "react-icons/ri";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import axios from 'axios';
const ServicesDetails = () => {
    const { id } = useParams();
    const jwt = localStorage.getItem('jwt');
    const [servicesData, setServicesData] = useState({});
    const [similarServices, setSimilarServices] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:8080/user/${id}`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                },
            });
            setServicesData(response.data);
        };
        fetchData();
    }, [id, jwt]);

    useEffect(() => {
        const fetchSimilarServices = async () => {
            const response = await axios.get(`http://localhost:8080/profession/get`);
            setSimilarServices(response.data);
        };
        if (servicesData.nameProfession) {
            fetchSimilarServices();
        }
    }, [servicesData.nameProfession]);

    const handleClickCard = (id) => {
        navigate(`/services/${id}`);
    };

    const currentItems = similarServices.slice(indexOfFirstItem, indexOfLastItem);
    return (
        <div className='flex flex-col justify-center items-center pt-10 pb-5'>
            {(
                <div>
                    <section className='flex flex-row gap-8 w-[1100px]'>
                        <div className='flex flex-col gap-6 m-2'>
                            <div className=''>
                                <h2 className='text-4xl w-[700px] text-[#004466] font-extrabold'>Hola, mi nombre es {servicesData.firstName} {servicesData.lastName}</h2>
                            </div>
                            <div>
                                <h5 className='font-semibold text-2xl text-[#004466]'>
                                    Soy {
                                        servicesData && servicesData.profession
                                            ? servicesData.profession.toString().toLowerCase()
                                            : ''
                                    }
                                </h5>
                            </div>
                            <div>
                                <h5 className='font-semibold'>Lugar de residencia</h5>
                                <span>{servicesData.city}, {servicesData.province}</span>
                            </div>
                            <div>
                                <h5 className='font-semibold'>Acerca de {servicesData.description}</h5>
                                <p>{ }</p>
                            </div>
                        </div>
                        <div className='border-[1px] p-4 rounded-xl shadow-lg' >
                            <div className='flex flex-col items-center justify-center w-[300px]'>
                                <img src={servicesData.imageUrl} alt="Descriptive text" className="rounded-full bg-center w-[200px] h-[200px]" />
                                <h5 className='font-bold text-xl'>{ }</h5>
                                <p className='text-sm'>{ }</p>
                                <p className='text-xs'>{ }</p>

                                <Button variant='contained' color='primary'>
                                    <Link to={`https://wa.me/${encodeURIComponent(servicesData.phone)}`} style={{ color: 'inherit', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
                                        Contactar
                                    </Link>
                                </Button>                            </div>
                        </div>
                    </section>
                    <section className='p-2'>
                        <h4>Opiniones del servicio</h4>
                        <div className='flex flex-row items-center gap-2 bg-yellow-200 w-[200px] rounded-full py-1 px-4'>
                            <FaStar className='text-yellow-300' />
                            <span className='text-black/40 text-xs' >{ }</span>

                            <p className='text-xs'>{ } opiniones</p>
                        </div>


                    </section>
                    {/* mostrar solo 3 perfiles random de la misma profesion*/}
                    {/* Pagination */}

                </div>
            )}
            <div className='flex justify-center mt-4'>

                <section className='flex flex-row justify-center'>
                    {currentItems.length === 0 ? (
                        "No hay profesionales similares para mostrar"
                    ) : (currentItems.map((item) => (
                        <div>
                            <button className='text-2xl text-[#004466] hover:bg-white' onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}>
                                <FaChevronCircleLeft />
                            </button>
                            <div key={item.idUser} className='m-2 border-[#004466] border-2 rounded-lg h-auto'>
                                <Cards className='flex flex-col items-center'>
                                    <div>
                                        <img src={item.imageUrl} alt={item.title} className='w-full h-[200px] object-cover rounded-t-lg mb-4' />
                                        <div className='pl-5'>
                                            <h4 className='font-semibold text-xl'>{item.firstName}</h4>
                                            <p className='text-sm'>{item.profession}</p>
                                            <span className='text-xs'>{item.city}, {item.province}</span>

                                        </div>
                                    </div>

                                    <div className='flex py-2'>
                                        <Button variant='contained' color='primary' onClick={() => handleClickCard(item.idUser)}>
                                            Contactar
                                        </Button>
                                    </div>
                                </Cards>
                            </div>
                            <button className='text-2xl text-[#004466] hover:bg-white' onClick={() => setCurrentPage(prevPage => prevPage + 1)}>
                                <FaChevronCircleRight />
                            </button>
                        </div>
                    )))}
                </section>

            </div>
            <div className='p-10'>

                <Button color='primary' variant='contained' size='large' onClick={() => navigate('/services')}>Volver a Servicios</Button>
            </div>
        </div>
    )
}

export default ServicesDetails
