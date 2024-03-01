import profile from "../../../assets/profile.svg";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../redux/slices/userSlice";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [decodedPayload, setDecodedPayload] = useState(null);

  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");

  const [city, setCity] = useState("");
  const [isProvinceSelected, setIsProvinceSelected] = useState(false);
  const [isCityEntered, setIsCityEntered] = useState(false);
  const[isCityValid, setIsCityValid] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        const [, payload] = token.split(".");
        const _decodedPayload = JSON.parse(atob(payload));
        dispatch(setCurrentUser(_decodedPayload));
        setDecodedPayload(_decodedPayload);
      } catch (error) {
        console.error("Failed to decode or parse the JWT:", error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/provinces/get")
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
      });
  }, []);

  const handleProvinceChange = (event) => {
    const selectedProvinceName = event.target.value;
    setSelectedProvince(selectedProvinceName);
    setIsProvinceSelected(true);
  };

  const handleCityChange = (event) => {
    const enteredCity = event.target.value;
    setCity(enteredCity);
    setIsCityEntered(enteredCity.trim() !== "");
    const isValid = /^[a-zA-Z\s]{3,25}$/.test(enteredCity);
    setIsCityValid(isValid);
  };

  
  const handleSaveChanges = () => {
    console.log("Provincia seleccionada:", selectedProvince);
    console.log("Ciudad ingresada:", city);
  };


  return (
    <div className="flex justify-center m-10 ">
      <div className="shadow-2xl rounded-3xl shadow-gray-400 bg-slate-200 w-1/2 flex items-center relative min-w-96 left-20 ">
        <img
          src={profile}
          alt="man with laptop"
          className="max-w-64 ml-3 z-20"
        ></img>
      </div>

      <div className="shadow-2xl rounded-3xl shadow-gray-400 px-20 py-20 flex flex-col justify-between w-[500px] z-10  bg-white">
        <div className="text-center space-y-5">
          <h2 className="text-4xl text-[#004466] font-extrabold">
            {decodedPayload?.firstName}
          </h2>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Miembro desde:
            <Typography variant="subtitle1" gutterBottom>
              Mayo 07
            </Typography>
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Contacto:
            <Typography variant="subtitle1" gutterBottom>
              ivana@hmtil.es
            </Typography>
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Lugar de residencia:
          </Typography>
          <form style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="provincia">Provincia</InputLabel>
              <Select
                labelId="provincia"
                label="Provincia"
                value={selectedProvince}
                onChange={handleProvinceChange}
              >
                {provinces.map((province) => (
                  <MenuItem
                    key={province.idProvince}
                    value={province.nameProvince}
                  >
                    {province.nameProvince}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Ciudad:
            </Typography>

            <FormControl>
              <TextField
                helperText="Por favor digíte la ciudad de residencia"
                id="demo-helper-text-misaligned"
                label="Ciudad"
                onChange={handleCityChange}
                error={!isCityValid && isCityEntered}
              />
            </FormControl>

            <Button variant="contained"  onClick={handleSaveChanges} disabled={!isProvinceSelected || !isCityEntered || !isCityValid }>Guardar Cambios</Button>
          </form>
         
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
