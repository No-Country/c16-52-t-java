import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import ServiciosImages from '../../assets/ServiciosImages.svg';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import axios from 'axios';
import Cards from '../../UI/cards/Cards';

const Services = () => {
    const [filters, setFilters] = useState({
        profession: '',
        provincia: '',
        selectedCityId: ''
    });
    const [services, setServices] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesResponse, professionsResponse, provincesResponse, citiesResponse] = await Promise.all([
                    axios.get('http://localhost:8080/user/all'),
                    axios.get('http://localhost:8080/profession/get'),
                    axios.get('http://localhost:8080/provinces/get'),
                    axios.get('http://localhost:8080/city/get')
                ]);

                setServices(servicesResponse.data.filter(item => item.role === 'PROFESSIONAL'));
                setProfessions(professionsResponse.data);
                setProvincias(provincesResponse.data || []);
                setCities(citiesResponse.data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
    };


    const filterServices = (service) => {
        const { profession, provincia, selectedCityId } = filters;

        if (profession && service.profession !== profession) {
            return false;
        }

        if (provincia && service.province !== provincia) {
            return false;
        }

        if (selectedCityId && service.city !== selectedCityId) {
            return false;
        }

        return true;
    };
    const resetFilters = () => {
        setFilters({ profession: '', province: '', selectedCityId: '' });
    };
    const handleSortOrderChange = () => {
        const sortedServices = [...services].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.province.localeCompare(b.province);
            } else {
                return b.province.localeCompare(a.province);
            }
        });
        setServices(sortedServices);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <section className='lg:p-10 flex flex-col justify-center items-center'>
            <div className='flex flex-row xs:flex-col items-center justify-center lg:max-w-[1100px] w-full'>
                <img src={ServiciosImages} alt="" className='w-[400px] h-[400px] mb-8 lg:block hidden' />
                <div className='flex flex-col items-center justify-center lg:gap-y-2 gap-y-10 md:w-full '>
                    <h2 className='lg:mt-4 lg:text-3xl text-[#004466] font-black md:w-[350px] text-center'>Encuentra a los mejores profesionales cerca de ti</h2>
                    <h5 className='text-[#223139] md:text-xl font-bold'>Filtrar profesionales por:</h5>
                    <div className='flex flex-col gap-3 md:w-full lg:p-4 '>
                        <FormControl >
                            <InputLabel id="select-profession-label" size='small' >Selecciona una profesión</InputLabel>
                            <Select
                                labelId="select-profession-label"
                                label='Selecciona una profesión'
                                className='text-xs'
                                size='small'
                                value={filters.profession}
                                onChange={(e) => handleFilterChange('profession', e.target.value)}
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
                        <div className='flex flex-col gap-4'>
                            <FormControl >
                                <InputLabel id="provincia-select-label" size='small'>Provincias</InputLabel>
                                <Select
                                    labelId="provincia-select-label"
                                    value={filters.provincia}
                                    onChange={(e) => handleFilterChange('provincia', e.target.value)}
                                    label="Provincias"
                                    size='small'
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {provincias.map((prov) => (
                                        <MenuItem key={prov.idProvince} value={prov.nameProvince}>
                                            {prov.nameProvince}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl >
                                <InputLabel id="city-select-label" size='small'>Ciudades</InputLabel>
                                <Select
                                    labelId="city-select-label"
                                    value={filters.selectedCityId}
                                    onChange={(e) => handleFilterChange('selectedCityId', e.target.value)}
                                    label="Ciudades"
                                    size='small'
                                    disabled={!filters.provincia}
                                >
                                    <MenuItem value="">
                                        <em>Seleccione una ciudad</em>
                                    </MenuItem>
                                    {cities.map((city) => (
                                        <MenuItem key={city.idCity} value={city.nameCity}>
                                            {city.nameCity}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button color='error' variant='outlined' onClick={resetFilters}>Reset Filtros</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-[150px] flex flex-row items-center justify-between lg:max-w-[1100px] lg:w-full'>
                {services.length > 0 ? (<p>{services.length} Profesionales disponibles</p>) : <p>No hay profesionales disponibles</p>}
                <Button onClick={() => handleSortOrderChange()} className='flex gap-2'>
                    Ordenar {sortOrder === 'desc' ? <IoMdArrowRoundDown /> : <IoMdArrowRoundUp />}
                </Button>
            </div>
            <div className='flex flex-col items-center justify-center w-full'>
                {services.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:w-full max-w-[1100px] lg:min-w-[320px] p-2 justify-center'>
                        {services.filter(filterServices).map((item) => (
                            <div key={item.idUser} className='lg:p-10 p-4 lg:m-10 m-4 border-[#004466]  shadow-slate-400 shadow-xl border-2 rounded-lg h-auto'>
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
                ) : (
                    <p className='w-full text-center'>No hay ningun profesional con los filtros que elegiste</p>
                )}
            </div>
        </section>
    );
};

export default Services;
