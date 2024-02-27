  import React, { useState, useMemo } from 'react';
  import Cards from '../../UI/cards/Cards';
  import { servicesData } from '../../utils';
  import { Button } from '@mui/material';
  import { RiStarSFill, RiStarSLine } from "react-icons/ri";
  import mountain from "../../assets/montain.png";
  import imageServices from "../../assets/imageServices.svg";
  import InputLabel from '@mui/material/InputLabel';
  import MenuItem from '@mui/material/MenuItem';
  import FormControl from '@mui/material/FormControl';
  import Select from '@mui/material/Select';
  import { useNavigate } from 'react-router-dom';
  import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";

  const Services = () => {
    const [profesion, setProfesion] = useState('');
    const [provincia, setProvincia] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [stars, setStars] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const navigate = useNavigate();

    const uniqueProfessions = useMemo(() => [...new Set(servicesData.map(item => item.prof))], []);
    const uniqueProvincias = useMemo(() => {
      if (profesion) {
        const provincias = servicesData.filter(item => item.prof === profesion).map(item => item.city);
        return [...new Set(provincias)];
      } else {
        return [];
      }
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profesion, servicesData]);

    const uniqueCiudades = useMemo(() => {
      if (profesion && provincia) {
        const ciudades = servicesData.filter(item => item.prof === profesion && item.provincia === provincia).map(item => item.city);
        return [...new Set(ciudades)];
      } else {
        return [];
      }
    }, [profesion, provincia, servicesData]);

    const uniqueStars = useMemo(() => {
      if (profesion && provincia) {
        const starsArray = servicesData.filter(item => item.prof === profesion && item.city === provincia).map(item => item.starts.toString());
        return [...new Set(starsArray)];
      } else {
        return [];
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profesion, provincia, servicesData]);

    const sortedServicesData = useMemo(() => {
      let data = [...servicesData];
      if (sortOrder === 'desc') {
        data.sort((a, b) => b.starts - a.starts);
      } else {
        data.sort((a, b) => a.starts - b.starts);
      }
      return data;
    }, [sortOrder]);

    const handleProfessionChange = (event) => {
      setProfesion(event.target.value);
      setProvincia('');
      setCiudad('');
      setStars('');
    };

    const handleProvinciaChange = (event) => {
      setProvincia(event.target.value);
      setCiudad('');
      setStars('');
    };

    const handleCiudadChange = (event) => {
      setCiudad(event.target.value);
      setStars('');
    };

    const handleStarsChange = (event) => {
      setStars(event.target.value);
    };

    const handleSortOrderChange = () => {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    };

    const filteredServicesData = useMemo(() => {
      let filteredData = sortedServicesData;
      if (profesion) {
        filteredData = filteredData.filter(item => item.prof === profesion);
      }
      if (provincia) {
        filteredData = filteredData.filter(item => item.provincia === provincia);
      }
      if (ciudad) {
        filteredData = filteredData.filter(item => item.city === ciudad);
      }
      if (stars) {
        filteredData = filteredData.filter(item => item.starts.toString() === stars);
      }
      return filteredData;
    }, [profesion, provincia, ciudad, stars, sortedServicesData]);

    return (
      <section className='p-10 flex flex-col justify-center items-center'>
        <div className='flex flex-row items-center justify-center gap-[20px]'>
        
        <img
        src={imageServices}
        alt="manSettings"
        className=""
        style={{ height:500}} 
      />
          
          <div className='flex flex-col items-start justify-center gap-y-10 '>
            <h2 className='lg:mt-4 text-2xl text-[#004466] font-black w-[350px] '>Encuentra a los mejores profesionales cerca de ti</h2>
            <h5 className='text-[#223139] text-xl font-bold'>Filtrar profesionales por:</h5>
            <div className='flex flex-col gap-6'>
              <FormControl className='w-[240px] text-[#004466]'>
                <InputLabel id="profesion-select-label">Profesión</InputLabel>
                <Select
                  labelId="profesion-select-label"
                  id="profesion-select-small"
                  value={profesion}
                  label="Profesión"
                  onChange={handleProfessionChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {uniqueProfessions.map((prof, index) => (
                    <MenuItem key={index} value={prof}>{prof}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className='w-[240px] text-[#004466]'>
                <InputLabel id="provincia-select-label">Provincia</InputLabel>
                <Select
                  labelId="provincia-select-label"
                  id="provincia-select-small"
                  value={provincia}
                  label="Provincia"
                  onChange={handleProvinciaChange}
                  disabled={!profesion}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {uniqueProvincias.map((loc, index) => (
                    <MenuItem key={index} value={loc}>{loc}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className='w-[240px] text-[#004466]'>
              <InputLabel id="ciudad-select-label">Ciudad</InputLabel>
              <Select
                labelId="ciudad-select-label"
                id="ciudad-select-small"
                value={ciudad}
                label="Ciudad"
                onChange={handleCiudadChange}
                disabled={!provincia}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {uniqueCiudades.map((city, index) => (
                  <MenuItem key={index} value={city}>{city}</MenuItem>
                ))}
              </Select>
            </FormControl>
              <FormControl className='w-[240px] text-[#004466]'>
                <InputLabel id="stars-select-label">Stars</InputLabel>
                <Select
                  labelId="stars-select-label"
                  id="stars-select-small"
                  value={stars}
                  label="Stars"
                  onChange={handleStarsChange}
                  disabled={!provincia}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {uniqueStars.map((star, index) => (
                    <MenuItem key={index} value={star}>{star}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
            </div>
          </div>
        </div>
        <div className='h-[150px] flex flex-row items-center justify-between w-[1100px]'>
        <p>{servicesData.length} Profecionales disponibles</p>
        <Button onClick={handleSortOrderChange} className='flex gap-2'>
          Ordenar {sortOrder === 'desc' ? <IoMdArrowRoundDown /> : <IoMdArrowRoundUp />}
        </Button>
      </div>
        <div className='grid grid-cols-3 w-[1100px]'>
          {filteredServicesData.map((item, index) => (
            <div key={index} className='m-2 border-[#004466] border-2 rounded-lg h-auto'>
              <Cards className='p-4'>
                <div>
                  <img src={item.image} alt={item.title} className='w-[400px] h-[200px] rounded-lg mb-4' />
                </div>
                <div className='flex flex-col text-start'>
                  <h4 className='font-semibold text-xl'>{item.name}</h4>
                  <p className='text-sm'>{item.prof}</p>
                  <p className='text-sm'>{item.city}</p>
                  <div className='flex flex-row gap-1 items-center'>
                    {item.starts}
                    {[...Array(Math.floor(item.starts))].map((_, i) => (
                      <RiStarSFill key={i} className='text-yellow-500' />
                    ))}
                    {item.starts % 1 !== 0 && (
                      <RiStarSLine className='text-yellow-500' />
                    )}
                  </div>
                </div>
                <div className='flex py-2'>
                  <Button variant='contained' color='primary' onClick={() => navigate(`/services/${item.id}`)}>
                    Contactar
                  </Button>
                </div>
              </Cards>
            </div>
          ))}
        </div>
      </section>
    );
  };

  export default Services;
