import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SelectProvince = ({ onProvinciaChange }) => {
    const [provincias, setProvincias] = useState([]);
    const [selectedProvId, setSelectedProvId] = useState("");
    const [departamentos, setDepartamentos] = useState([]);
    const [selectedDepId, setSelectedDepId] = useState("");
    const [localidades, setLocalidades] = useState([]);
    const [selectedLocId, setSelectedLocId] = useState("");

    useEffect(() => {
        const getProvincias = async () => {
            try {
                const res = await axios.get("https://apis.datos.gob.ar/georef/api/provincias");
                setProvincias(res.data.provincias);
            } catch (error) {
                console.error('Error al obtener las provincias:', error);
            }
        };

        getProvincias();
    }, []);

    const handleProvinceChange = async (event) => {
        const newSelectedProvId = event.target.value;
        setSelectedProvId(newSelectedProvId);
        setSelectedDepId("");
        setSelectedLocId("");

        try {
            const res = await axios.get(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${newSelectedProvId}&max=200`);
            setDepartamentos(res.data.departamentos);
        } catch (error) {
            console.error('Error al obtener los departamentos:', error);
        }
        
        if (onProvinciaChange) {
            const selectedProvince = provincias.find(prov => prov.id === newSelectedProvId);
            const selectedProvinceData = {
                provincia: selectedProvince,
                departamento: null,
                localidad: null
            };
            onProvinciaChange(selectedProvinceData);
        }
    };

    const handleDepartamentoChange = async (event) => {
        const newSelectedDepId = event.target.value;
        setSelectedDepId(newSelectedDepId);
        setSelectedLocId("");

        try {
            const res = await axios.get(`https://apis.datos.gob.ar/georef/api/localidades?departamento=${newSelectedDepId}&max=200`);
            setLocalidades(res.data.localidades);
        } catch (error) {
            console.error('Error al obtener las localidades:', error);
        }

        const selectedDep = departamentos.find(dep => dep.id === newSelectedDepId);
        const selectedProvince = provincias.find(prov => prov.id === selectedProvId);
        const selectedProvinceData = {
            provincia: selectedProvince,
            departamento: selectedDep,
            localidad: null
        };
        onProvinciaChange(selectedProvinceData);
    };

    const handleLocalidadChange = (event) => {
        const newSelectedLocId = event.target.value;
        setSelectedLocId(newSelectedLocId);

        const selectedLoc = localidades.find(loc => loc.id === newSelectedLocId);
        const selectedDep = departamentos.find(dep => dep.id === selectedDepId);
        const selectedProvince = provincias.find(prov => prov.id === selectedProvId);
        const selectedProvinceData = {
            provincia: selectedProvince.nombre,
            departamento: selectedDep.nombre,
            localidad: selectedLoc.nombre
        };
        onProvinciaChange(selectedProvinceData);
    };

    return (
        <div className='flex flex-col gap-4'>
            <FormControl fullWidth>
                <InputLabel id="provincia-select-label">Provincias</InputLabel>
                <Select
                    labelId="provincia-select-label"
                    value={selectedProvId}
                    onChange={handleProvinceChange}
                    label="Provincias"
                >
                    {provincias.map((prov) => (
                        <MenuItem key={prov.id} value={prov.id}>
                            {prov.nombre}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {departamentos.length > 0 && (
                <FormControl fullWidth>
                    <InputLabel id="departamento-select-label">Departamentos</InputLabel>
                    <Select
                        labelId="departamento-select-label"
                        value={selectedDepId}
                        onChange={handleDepartamentoChange}
                        label="Departamentos"
                    >
                        {departamentos.map((dep) => (
                            <MenuItem key={dep.id} value={dep.id}>
                                {dep.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            {localidades.length > 0 && (
                <FormControl fullWidth>
                    <InputLabel id="localidad-select-label">Localidades</InputLabel>
                    <Select
                        labelId="localidad-select-label"
                        value={selectedLocId}
                        onChange={handleLocalidadChange}
                        label="Localidades"
                    >
                        {localidades.map((loc) => (
                            <MenuItem key={loc.id} value={loc.id}>
                                {loc.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </div>
    );
};

export default SelectProvince;
