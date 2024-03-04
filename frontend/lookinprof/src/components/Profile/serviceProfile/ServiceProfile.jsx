import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material'; // Importamos TextField de Material-UI
import { setCurrentUser } from '../../../redux/slices/userSlice';
import SelectProvince from '../../../UI/SelectProvince';
import axios from 'axios';
import {
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";

const ServiceProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [decodedPayload, setDecodedPayload] = useState(null);
    const [userData, setUserData] = useState("")
    const [provincia, setProvincia] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [about, setAbout] = useState('');
    const [profession, setProfession] = useState('');
    const [editedData, setEditedData] = useState({
        profession: "",
        city: "",
        province: "",
    });
    const token = localStorage.getItem('jwt');
    useEffect(() => {

        const fetchData = async () => {
            if (token) {

                try {
                    const response = await axios.get(`http://localhost:8080/user/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    });
                    const decodedPayload = response.data;
                    setDecodedPayload(decodedPayload);

                } catch (error) {
                    console.error('Failed to decode or parse the JWT:', error);
                }
            }
        }
        fetchData()
    }, [id]);
    useEffect(() => {
        const getProvince = async () => {
            try {
                const response = await axios.get("http://localhost:8080/provinces/get");
                setProvince(response.data)
            } catch (error) {
                console.log(error)
            }

        }
        getProvince()
    }, [setProvince])
    useEffect(() => {
        const fetchProfession = async () => {
            try {
                const response = await axios.get("http://localhost:8080/profession/get")
                setProfession(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProfession()
    }, [setProfession])

    const handleProvinceChange = (event) => {
        const selectedProvinceName = event.target.value;
        setEditedData((prevData) => ({
            ...prevData,
            province: selectedProvinceName,
        }));
    };

    const handleCityChange = (event) => {
        const enteredCity = event.target.value;
        setEditedData((prevData) => ({
            ...prevData,
            city: enteredCity,
        }));
    };
    const handleProfessionChange = (event) => {
        const selectedProfession = event.target.value;
        setEditedData((prevData) => ({
            ...prevData,
            profession: selectedProfession,
        }));
    };
    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8080/user/${id}`,
                editedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );
            setUserData(response.data);
            setEditMode(false);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const handleEditButtonClick = () => {
        setEditMode(true);
    };
    console.log(province)
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
                            {editMode ? (
                                <div>
                                    <form className="flex flex-col item-center justify-center gap-2 w-full">
                                        <FormControl sx={{ minWidth: 120 }}>
                                            <InputLabel id="provincia" size="small">
                                                Provincia
                                            </InputLabel>
                                            <Select
                                                labelId="provincia"
                                                label="Provincia"
                                                value={editedData.province}
                                                size="small"
                                                onChange={handleProvinceChange}
                                            >
                                                {province.map((province) => (
                                                    <MenuItem
                                                        key={province.idProvince}
                                                        value={province.idProvince}
                                                    >
                                                        {province.nameProvince}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            helperText="Por favor digíte la ciudad de residencia"
                                            id="ciudad"
                                            label="Ciudad"
                                            size="small"
                                            value={editedData.city}
                                            onChange={handleCityChange}
                                        />
                                    </form>

                                </div>


                            ) : (
                                <>
                                    <h5 className='font-semibold'>Lugar de residencia</h5>
                                    <span>{decodedPayload?.city}, {decodedPayload?.province}</span>

                                </>
                            )}
                        </div>
                        <div>

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
                                <div>
                                    <h5 className='font-semibold'>Acerca de</h5>
                                    <p>{decodedPayload?.about}</p>
                                </div>
                            )}
                        </div>
                        <div>

                            {editMode ? (
                                <FormControl sx={{ minWidth: 120 }}>
                                    <InputLabel id="profession-label" size="small">
                                        Profession
                                    </InputLabel>
                                    <Select
                                        labelId="profession-label"
                                        label="Profession"
                                        value={editedData.profession}
                                        size="small"
                                        onChange={handleProfessionChange}
                                    >
                                        {profession && profession.map((profession) => (
                                            <MenuItem key={profession.idProfession} value={profession.nameProfession}>
                                                {profession.nameProfession}
                                            </MenuItem>

                                        ))}
                                    </Select>
                                </FormControl>

                            ) : (
                                <div>
                                    <h5 className='font-semibold'>Profesión</h5>
                                    <span>{decodedPayload?.profession}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='border-[1px] p-4 rounded-xl shadow-lg' >
                        <div className='flex flex-col items-center justify-center w-[300px]'>
                            <img src={decodedPayload?.imageUrl} alt='avatar' className='w-[200px] h-[200px]' />
                            <h5 className='font-bold text-xl'>{ }</h5>
                            <p className='text-sm'>{ }</p>
                            <p className='text-xs'>{ }</p>
                            {editMode ? (
                                <Button variant='contained' color='primary' onClick={handleSaveChanges}>Guardar</Button>
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
