import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material'; // Importamos TextField de Material-UI
import { setCurrentUser } from '../../../redux/slices/userSlice';
import InputImage from '../../../UI/InputImage';
import axios from 'axios';
import Select from "./Select"

const ServiceProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [decodedPayload, setDecodedPayload] = useState(null);

    const [username, setUsername] = useState("");

    const [profession, setProfession] = useState("");
    const [professionList, setProfessionList] = useState([]);
    const [provinceList, setProvinceLIst] = useState([]);
    const [province, setProvince] = useState('');
    const [cityList, setCityList] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [city, setCity] = useState('');
    const [about, setAbout] = useState('');
    const [file, setFile] = useState(null);

    const [editMode, setEditMode] = useState(false);
    
    const [responseUrl, setResponseUrl] = useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            try {
                const [, payload] = token.split('.');
                const _decodedPayload = JSON.parse(atob(payload));
                dispatch(setCurrentUser(_decodedPayload));
                setDecodedPayload(_decodedPayload);
                // Establecer los valores de los campos editables con los datos del usuario
                setCity(_decodedPayload.city || '');
                setProvince(_decodedPayload.province || '');
                setAbout(_decodedPayload.about || '');
                setProfession(_decodedPayload.profession || '');
            } catch (error) {
                console.error('Failed to decode or parse the JWT:', error);
            }
        }
    }, [dispatch]);

    const handleEditButtonClick = () => {
        setEditMode(true);
    };

    const handleSaveButtonClick = () => {
        // Aquí puedes enviar los datos actualizados al servidor si es necesario
        // Por simplicidad, aquí solo mostramos cómo cambiar el modo de edición a falso
        setEditMode(false);
        handleSubmit();
    };

    const handleProfessionChange = (event) => {
        setProfession(event.target.value);
    };
    const handleProvinceChange = (event) => {
        setProvince(event.target.value);

        const filterCities = cityList.filter(city => city.idProvince === parseInt(event.target.value));
        setFilteredCities(filterCities);
    };
    const handleCityChange = (event) => {
        setCity(event.target.value);
    };
    const handleAboutChange = (event) => {
        setAbout(event.target.value);
    };

    
    useEffect(()=>{
        const fetchData = async (  ) =>{
            const token = localStorage.getItem('jwt'); 
            
            try {
                const [, payload] = token.split('.');
                const decodedPayload = JSON.parse(atob(payload));
                const userId = decodedPayload.id;
                const response = await axios.get(`http://localhost:8080/user/${userId}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                } )

                const allProvinces = await axios.get(`http://localhost:8080/provinces/get`,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                
                const allCity = await axios.get(`http://localhost:8080/city/get`,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })

                const allProfessions = await axios.get(`http://localhost:8080/profession/get`,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })

                setProfessionList(allProfessions.data)
                setProvinceLIst(allProvinces.data)
                setCityList(allCity.data)
                const username = response.data.firstName + " " + response.data.lastName;
                setUsername(username);
                setProvince(response.data.province)
                setCity(response.data.city)
                setAbout(response.data.description)
                setProfession(response.data.profession)
                setResponseUrl(response.data.imageUrl)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])
    

    const handleSubmit = async () => {
        
    try {
        const token = localStorage.getItem('jwt');
        const [, payload] = token.split('.');
        const decodedPayload = JSON.parse(atob(payload));
        const userId = decodedPayload.id;
        const userRole = decodedPayload.role;
        const userQualify = decodedPayload.qualification;

        const formData = new FormData();
        formData.append('province', province);
        formData.append('city', city);
        formData.append('profession', profession);
        formData.append('role', userRole);
        formData.append('description', about);

        // Agregar la imagen al FormData
        formData.append('image', file);
        
    // Aquí puedes enviar formData a tu servidor usando fetch o axios
        const responseUpdate = axios.put(`http://localhost:8080/user/${userId}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        setEditMode(false);
        }
        catch (error) {
            console.error('Error al enviar los datos actualizados al servidor:', error);
        }
    
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
      };

      

    return (
        <div className='flex flex-col justify-center items-center pt-10 pb-5'>
            <div>
                <section className='flex flex-row gap-8 justify-center w-[1100px]'>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-6 m-2 w-1/2'>
                        <div className=''>
                            <h2 className='text-2xl text-[#004466] font-bold pl-2 mb-1'>Como te llamas</h2>
                            <input type="text" name="" id="" className='border border-gray-400 rounded-full h-12 w-full pt-2 pb-2 pl-6 pr-6 focus:outline-none' value={username} readOnly />
                        </div>

                        <Select label={"Profesion"} options={professionList} onClick={handleProfessionChange} value={profession} editMode={editMode}/>
                        
                        <Select label={"Provincia"} options={provinceList} onClick={handleProvinceChange} value={province} editMode={editMode}/>
                        
                        <Select label={"Ciudad"} options={filteredCities} onClick={handleCityChange} value={city} editMode={editMode}/>
                                                
                        <div className='h-32'>
                            <h2 className='text-2xl text-[#004466] font-bold pl-2 mb-1'>Acerca de</h2>
                            <textarea  className='border border-gray-400 rounded-3xl w-full h-full pl-6 pr-6 pt-5 overflow-hidden resize-none text-sm' value={about} onChange={handleAboutChange} readOnly={!editMode} ></textarea>
                        </div>

                        <div className='mt-8'>
                            <input type="file" name='image' className='text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-2 px-4 border border-blue-400 rounded shadow' onChange={handleFileChange} />
                        </div>
                       
                        </form>
                    

                    <div className='border-[1px] p-4 rounded-xl shadow-lg w-5/12 flex justify-center align-middle' >
                        <div className='flex flex-col items-center justify-center w-full'>
                        {
                            responseUrl && <img src={'http://localhost:8080/user/images/' + responseUrl} alt='avatar' className='w-[200px] h-[200px] rounded-full p-4' />
                        }
                            <h5 className='font-bold text-xl'>{}</h5>
                            <p className='text-sm'>{}</p>
                            <p className='text-xs'>{}</p>

                            <InputImage name={username} title={profession} qualification={5} about={about}/>
                            {editMode ? (
                                <Button variant='contained' color='primary' onClick={handleSaveButtonClick}>Guardar</Button>
                            ) : (
                                <Button variant='contained' color='primary' onClick={handleEditButtonClick}>Editar</Button>
                            )}
                        </div>
                    </div>
                </section>
            </div>
            <div className='p-10'>
                <Button color='primary' variant='contained' size='large' onClick={() => navigate('/services')}>Volver a Servicios</Button>
            </div>
        </div>
    );
}

export default ServiceProfile;