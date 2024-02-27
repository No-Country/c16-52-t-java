import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material'; // Importamos TextField de Material-UI
import { setCurrentUser } from '../../../redux/slices/userSlice';
import SelectProvince from '../../../UI/SelectProvince';

const ServiceProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [decodedPayload, setDecodedPayload] = useState(null);

    const [provincia, setProvincia] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [about, setAbout] = useState('');
    const [profession, setProfession] = useState('');

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
    };
    const handleProvinciaChange = (nuevaProvincia) => {
        setProvincia(nuevaProvincia);
    };

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
                            {editMode ? (
                                <SelectProvince  onProvinciaChange={handleProvinciaChange}/>
                            ) : (
                                <>
                                    <span>{decodedPayload?.city}</span>
                                    <span>{decodedPayload?.province}</span>
                                </>
                            )}
                        </div>
                        <div>
                            <h5 className='font-semibold'>Acerca de</h5>
                            {editMode ? (
                                <TextField
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    label="Acerca de"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                />
                            ) : (
                                <p>{decodedPayload?.about}</p>
                            )}
                        </div>
                        <div>
                            <h5 className='font-semibold'>Profesión</h5>
                            {editMode ? (
                                <TextField
                                    value={profession}
                                    onChange={(e) => setProfession(e.target.value)}
                                    label="Profesión"
                                    variant="outlined"
                                />
                            ) : (
                                <span>{decodedPayload?.profession}</span>
                            )}
                        </div>
                    </div>
                    <div className='border-[1px] p-4 rounded-xl shadow-lg' >
                        <div className='flex flex-col items-center justify-center w-[300px]'>
                            <img src={decodedPayload?.imageUrl} alt='avatar' className='w-[200px] h-[200px]' />
                            <h5 className='font-bold text-xl'>{}</h5>
                            <p className='text-sm'>{}</p>
                            <p className='text-xs'>{}</p>
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
