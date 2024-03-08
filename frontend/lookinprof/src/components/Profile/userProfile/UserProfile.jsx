import React, { useState, useEffect } from "react";
//import { useDispatch } from "react-redux";
import axios from "axios";
//import {   Typography,  Button,  Select,  MenuItem,  InputLabel,  FormControl,  TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import profile from "../../../assets/profile.svg";

const UserProfile = () => {
  const { id } = useParams();
  const token = localStorage.getItem("jwt");

  const [userData, setUserData] = useState(null);
 // const [provinces, setProvinces] = useState([]);
 // const [isEditing, setIsEditing] = useState(false);
  // const [editedData, setEditedData] = useState({
  //   city: "",
  //   province: "",
  // });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://3.142.156.194:8080/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [id, token]);

  // useEffect(() => {
  //   const fetchProvinces = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8080/provinces/get");
  //       setProvinces(response.data);
  //     } catch (error) {
  //       console.error("Error fetching provinces:", error);
  //     }
  //   };
  //   fetchProvinces();
  // }, []);

  // const handleProvinceChange = (event) => {
  //   const selectedProvinceName = event.target.value;
  //   setEditedData((prevData) => ({
  //     ...prevData,
  //     province: selectedProvinceName,
  //   }));
  // };

  // const handleCityChange = (event) => {
  //   const enteredCity = event.target.value;
  //   setEditedData((prevData) => ({
  //     ...prevData,
  //     city: enteredCity,
  //   }));
  // };

  // const handleSaveChanges = async () => {
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:8080/user/${id}`,
  //       editedData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //           'Access-Control-Allow-Origin': '*',
            
  //         },
  //       }
  //     );
  //     setUserData(response.data);
  //     setIsEditing(false);
  //   } catch (error) {
  //     console.error("Error updating user data:", error);
  //   }
  // };

  const formattedDate = userData?.createAt
    ? new Date(userData?.createAt).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    : "";

  return ( 
    <div className="flex flex-col md:flex-row items-center justify-center w-[600px] lg:h-[600px] m-4 rounded-3xl md:bg-slate-300 p-2">
      <div className='bg-white h-[450px] flex flex-row items-center justify-center rounded-3xl  w-full'>
        <img
          src={userData?.imageUrl || profile}
          alt="User Profile"
          className="max-w-64 mb-5 hidden md:block p-10 drop-shadow-2xl shadow-black"
        />
     


      {/* User Information Form */}
      <div className="shadow-2xl shadow-black rounded-3xl md:p-5 p-1 flex flex-col items-center justify-center md:w-[500px] h-[450px] w-full bg-white">
        <div className="text-center space-y-5">
          {/* User Name */}
          <h2 className="md:text-2xl text-xl font-bold">
            {`${userData?.firstName.toUpperCase()} ${userData?.lastName.toUpperCase()}`}
          </h2>
          <p className="text-xs md-text-xl" gutterBottom>
            Miembro desde: {formattedDate}
          </p>
          <p className="text-xs md-text-xl" gutterBottom>
            Contacto: {userData?.email}
          </p>
          {/* <p className="text-xs md:text-xl font-semibold" gutterBottom>
            {isEditing ? "Nueva Residencia: " : "Lugar de residencia"}
          </p>
          {isEditing ? (
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
                  {provinces.map((province) => (
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
              <Button
                variant="contained"
                onClick={handleSaveChanges}
                disabled={!editedData.city || !editedData.province}
              >
                Guardar Cambios
              </Button>
            </form>
          ) : (
            <div>
              <p className="text-xs md-text-xl" gutterBottom>
                {`${userData?.city}, ${userData?.province}`}
              </p>
            </div>
          )}
          <Button
            variant="contained"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancelar" : "Editar"}
          </Button>*/}
        </div>
      </div>
      </div>
    </div>
  );
};

export default UserProfile;