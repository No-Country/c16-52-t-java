import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import ServiciosImages from '../../assets/ServiceImage.svg';
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
    const [selectProv, setSelectProv] = useState('');
    const [selectCity, setSelectCity] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesResponse, professionsResponse, provincesResponse, citiesResponse] = await Promise.all([
                    axios.get('http://3.142.156.194:8080/user/all',{
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                        }
                    }),
                    axios.get('http://3.142.156.194:8080/profession/get',{
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                        }
                    }),
                    axios.get('http://3.142.156.194:8080/provinces/get',{
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                        }
                    }),
                    axios.get('http://3.142.156.194:8080/city/get',{
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                        }
                    })
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
    useEffect(() => {
        // Filtrar ciudades según el id de la provincia seleccionada
        const filteredCities = cities.filter(city => city.idProvince === filters.provincia);
        setSelectCity(filteredCities);
    }, [filters.provincia, cities]);

    const handleFilterChange = (key, value) => {
        if (key === 'provincia') {
            // Filtrar ciudades según la provincia seleccionada
            const filteredCities = cities.filter(city => city.idProvince === value);
            setSelectCity(filteredCities);
            // También necesitas resetear el valor de selectedCityId
            setFilters(prevFilters => ({ ...prevFilters, [key]: value, selectedCityId: '' }));
        } else {
            setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
        }
    };

    const filterServices = (service) => {
        const { profession, provincia, selectedCityId } = filters;

        if (profession && service.profession !== profession) {
            return false;
        }

        if (provincia && service.province !== selectProv) {
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
        const sortedServices = services.slice().sort((a, b) => {
            const provinceA = a.province || ''; // Handle potential null value
            const provinceB = b.province || ''; // Handle potential null value
            return (sortOrder === 'asc' ? 1 : -1) * provinceA.localeCompare(provinceB);
        });
        setServices(sortedServices);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };
    useEffect(() => {
        const fetchData = async () => {
            if(filters.provincia){
            try {
                const response = await axios.get(`http://3.142.156.194:8080/provinces/get/${filters.provincia}`);
                setSelectProv(response.data.nameProvince)
            } catch (error) {
                console.error('Error fetching province data:', error);
            }}
        }
        fetchData()
    }, [filters.provincia]);

    return (
        <section className='lg:p-10 flex flex-col justify-center items-center'>
            <div className='flex flex-row xs:flex-col items-center justify-between lg:max-w-[1100px] lg:w-full'>
                <img src={ServiciosImages} alt="" className='w-full h-[500px] lg:block hidden rounded-2xl' />
                <div className='flex flex-col items-center justify-center lg:justify-start lg:items-start p-2  gap-y-2 md:w-[500px] '>
                    <h2 className='text-2xl text-[#004466] font-black  text-center lg:text-start'>Encuentra a los mejores profesionales cerca de ti</h2>
                    <h5 className='text-[#223139] text-xl font-bold'>Filtrar profesionales por:</h5>
                    <div className='flex flex-col gap-3 md:w-full '>
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
                                        <MenuItem key={prov.idProvince} value={prov.idProvince}>
                                            {prov.nameProvince}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl >

                            
                            <InputLabel id="city-select-label" size='small'>Ciudad</InputLabel>
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
                                {selectCity && selectCity.map((city) => (
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
            <div className='md:h-[150px] text-xs p-5 flex md:flex-row flex-col items-center md:justify-between lg:max-w-[1100px] lg:w-full'>
                {services.length > 0 ? (<p>{services.length} Profesionales disponibles</p>) : <p>No hay profesionales disponibles</p>}
                <Button onClick={() => handleSortOrderChange()} className='flex gap-2'>
                    Ordenar {sortOrder === 'desc' ? <IoMdArrowRoundDown /> : <IoMdArrowRoundUp />}
                </Button>
            </div>
            <div class='services' className='flex flex-col items-center justify-center w-full'>
                {services.filter(filterServices).length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:w-full max-w-[1100px] lg:min-w-[320px] p-2 justify-center'>
                        {Array.isArray(services) && services.filter(filterServices).length > 0 ? (services.filter(filterServices).map((item) => (
                            <div key={item.idUser} className='p-4 lg:m-10 m-4 border-[#004466]  shadow-slate-400 shadow-xl border-2 rounded-lg h-auto'>
                                <Cards className='flex flex-col items-center'>
                                    <div className='flex flex-col justify-center items-center'>
                                        <img src={item.imageUrl} alt={item.profession} className='w-full  md:w-[9vw] h-full md:h-[25vh] rounded-t-lg mb-4 cover' />
                                        <div className=''>
                                            <h4 className='font-semibold text-xl'>{item.firstName} {item.lastName}</h4>
                                            <p className='text-sm'>{item.profession}</p>
                                            <p>{item.city},</p>
                                            <p> {item.province}</p>
                                        </div>
                                    </div>
                                    <div className='flex py-2'>
                                        <Button variant='contained' color='primary' onClick={() => navigate(`/services/${item.idUser}`)}>
                                            Contactar
                                        </Button>
                                    </div>
                                </Cards>
                            </div>
                        ))):(
                            {}
                        )}
                    </div>
                ) : (
                    <div className='flex flex-col bg-slate-200 p-10 rounded-2xl g-4'>
                    <h4  className='text-center text-4xl text-[#004466]'>OOOPP!!!!!!!</h4>
                    <p className='text-center text-xl'>No hay ningún profesional con los filtros que elegiste</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Services;
