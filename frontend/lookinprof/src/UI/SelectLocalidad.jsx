import React, { useEffect, useState } from 'react';
import SelectProvince from '../../UI/SelectProvince';
import axios from 'axios';

const SelectLocalidad = () => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const citiesRes = await axios.get("http://localhost:8080/city/get");
                setCities(citiesRes.data || []);
            } catch (error) {
                console.error('Error al obtener las ciudades:', error);
            }
        };
        fetchCities();
    }, []);

    return (
        <div>
            <SelectProvince cities={cities} />
        </div>
    )
}

export default SelectLocalidad;