import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import profile from "../../../assets/profile.svg";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = localStorage.getItem("jwt");

  const [userData, setUserData] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    city: "",
    province: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${id}`, {
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

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get("http://localhost:8080/provinces/get");
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

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

  const handleSaveChanges = async () => {
    try {
      await axios.put(
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
      window.location.reload();
      setIsEditing(false); 
      
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  const formattedDate = userData?.createdAt
    ? new Date(userData.createdAt).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  return (
    <div className="flex justify-center m-10">
      {/* Profile Image */}
      <div className="shadow-2xl rounded-3xl shadow-gray-400 bg-slate-200 w-1/2 flex items-center relative min-w-96 left-20">
        <img
          src={userData?.imageUrl || profile}
          alt="User Profile"
          className="max-w-64 ml-3 z-20"
        />
      </div>

      {/* User Information Form */}
      <div className="shadow-2xl rounded-3xl shadow-gray-400 px-20 py-20 flex flex-col justify-between w-[500px] z-10  bg-white">
        <div className="text-center space-y-5">
          {/* User Name */}
          <h2 className="text-4xl text-[#004466] font-extrabold">
            {`${userData?.firstName.toUpperCase()} ${userData?.lastName.toUpperCase()}`}
          </h2>

          {/* Member Since */}
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Miembro desde:
            <Typography variant="subtitle1" gutterBottom>
              {formattedDate}
            </Typography>
          </Typography>

          {/* Contact information */}
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Contacto:
            <Typography variant="subtitle1" gutterBottom>
              {userData?.email}
            </Typography>
          </Typography>

          {/* Residence Section */}
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "semi-bold" }}>
           {isEditing ? "Nueva Residencia: " : "Lugar de residencia"}
          </Typography>

          {/* Editable Residence Form */}
          {isEditing ? ( 
            // Editable form when in editing mode
            <form className="flex flex-col item-center justify-center gap-2">
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="provincia" size="small">Provincia</InputLabel>
                <Select
                  labelId="provincia"
                  label="Provincia"
                  value={editedData.province}
                  size="small"
                  onChange={handleProvinceChange}
                >
                  {provinces.map((province) => (
                    <MenuItem key={province.idProvince} value={province.idProvince}>
                      {province.nameProvince}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <TextField
                  helperText="Por favor digíte la ciudad de residencia"
                  id="ciudad"
                  label="Ciudad"
                  size="small"
                  value={editedData.city}
                  onChange={handleCityChange}
                />
              </FormControl>

              <Button
                variant="contained"
                onClick={handleSaveChanges}
                disabled={!editedData.city || !editedData.province}
              >
                Guardar Cambios
              </Button>
            </form>
          ) : (
            // Display static residence information when not in editing mode
            <div>
              <Typography variant="subtitle1" gutterBottom>
                {`${userData?.city}, ${userData?.province}`}
              </Typography>
            </div>
          )}

          {/* Edit and Cancel Buttons */}
          <Button
            variant="contained"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancelar" : "Editar"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
