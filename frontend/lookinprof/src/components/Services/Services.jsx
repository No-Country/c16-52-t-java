import React, { useState, useMemo, useEffect } from 'react';
import Cards from '../../UI/cards/Cards';
import { servicesData } from '../../utils';
import { Button } from '@mui/material';
import { RiStarSFill, RiStarSLine } from "react-icons/ri";
import ServiciosImages from '../../assets/ServiciosImages.svg';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import SelectProvince from '../../UI/SelectProvince';
import axios from 'axios';

const Services = () => {
    const [profession, setProfession] = useState('');
    const [stars, setStars] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [provincia, setProvincia] = useState({});
    const [filteredServicesData, setFilteredServicesData] = useState([]);
    const [servicesData, setServicesData] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Acceso a la función de navegación proporcionada por React Router
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesResponse, professionsResponse] = await Promise.all([
                    axios.get('http://localhost:8080/user/all'),
                    axios.get('http://localhost:8080/profession/get'),
                ]);
                
                // Set services data and filtered services data separately
                setServicesData(servicesResponse.data);
                setFilteredServicesData(servicesResponse.data.filter(item => item.role === 'PROFESSIONAL'));
                setProfessions(professionsResponse.data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleProfessionChange = (event) => {
        const selectedProfessionId = event.target.value;
        setProfession(selectedProfessionId);
        applyFilters(selectedProfessionId, stars, provincia, sortOrder);
    };

    const handleProvinciaChange = (nuevaProvincia) => {
        setProvincia(nuevaProvincia);
        applyFilters(profession, stars, nuevaProvincia, sortOrder);
    };

    const handleStarsChange = (event) => {
        setStars(event.target.value);
        applyFilters(profession, event.target.value, provincia, sortOrder);
    };

    const handleSortOrderChange = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        applyFilters(profession, stars, provincia, sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const applyFilters = (selectedProfession, selectedStars, selectedProvincia, selectedSortOrder) => {
        let filteredData = servicesData.slice(); // Create a copy of the original data before applying filters

        if (selectedProfession) {
            filteredData = filteredData.filter((item) => item.profession === selectedProfession);
        }

        if (selectedProvincia.id) {
            filteredData = filteredData.filter((item) => item.province === selectedProvincia.id);
        }

        if (selectedStars) {
            filteredData = filteredData.filter((item) => item.rating >= selectedStars);
        }

        filteredData.sort((a, b) => {
            return selectedSortOrder === 'asc' ? a.id - b.id : b.id - a.id;
        });

        setFilteredServicesData(filteredData);
    };
    
    return (
        <section className='p-10 flex flex-col justify-center items-center'>
            <div className='flex flex-row items-center justify-center w-[1100px]'>
                <img src={ServiciosImages} alt="" className='w-[400px] h-[400px]' />
                <div className='flex flex-col items-start justify-center gap-y-10'>
                    <h2 className='lg:mt-4 text-3xl text-[#004466] font-black w-[350px]'>Encuentra a los mejores profesionales cerca de ti</h2>
                    <h5 className='text-[#223139] text-xl font-bold'>Filtrar profesionales por:</h5>
                    <div className='flex flex-col gap-3'>
                        <FormControl>
                            <InputLabel id="select-profession-label">Selecciona una profesión</InputLabel>
                            <Select
                                labelId="select-profession-label"
                                id="select-profession"
                                value={profession}
                                onChange={handleProfessionChange}
                            >
                                <MenuItem value="">
                                    <em>Todas las profesiones</em>
                                </MenuItem>
                                {professions.map((profession) => (
                                    <MenuItem key={profession.idProfession} value={profession.nameProfession}>
                                        {profession.nameProfession}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div>
                            <SelectProvince onProvinciaChange={handleProvinciaChange} />
                        </div>
                        <FormControl className='w-[240px] text-[#004466]'>
                            <InputLabel id="stars-select-label">Stars</InputLabel>
                            <Select
                                labelId="stars-select-label"
                                id="stars-select-small"
                                value={stars}
                                label="Stars"
                                onChange={handleStarsChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {/* Agrega aquí opciones para seleccionar las estrellas */}
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
            <div className='h-[150px] flex flex-row items-center justify-between w-[1100px]'>
                <p>{filteredServicesData.length} Profesionales disponibles</p>
                <Button onClick={handleSortOrderChange} className='flex gap-2'>
                    Ordenar {sortOrder === 'desc' ? <IoMdArrowRoundDown /> : <IoMdArrowRoundUp />}
                </Button>
            </div>
            <div className='flex flex-col items-center justify-center'>
                {filteredServicesData.length > 0 && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-auto max-w-[1100px] min-w-[320px] p-2 justify-center'>
                        {filteredServicesData.map((item) => (
                            <div key={item.idUser} className='p-10 m-10 border-[#004466]  shadow-slate-400 shadow-xl border-2 rounded-lg h-auto'>
                                <Cards className='flex flex-col items-center'>
                                    <div>
                                        <img src={item.imageUrl} alt={item.profession} className='w-full h-[200px] rounded-t-lg mb-4 cover' />
                                        <div className='pl-5'>
                                            <h4 className='font-semibold text-xl'>{item.firstName} {item.lastName}</h4>
                                            <p className='text-sm'>{item.profession}</p>
                                            <span className='text-xs'>{item.city}, {item.province}</span>
                                        </div>
                                    </div>
                                    <div className='flex py-2'>
                                        <Button variant='contained' color='primary' onClick={() => navigate(`/services/${item.idUser}`)}>
                                            Contactar
                                        </Button>
                                    </div>
                                </Cards>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Services;