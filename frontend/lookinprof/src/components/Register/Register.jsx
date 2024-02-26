import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/slices/userSlice";
import deliveryMan from "../../assets/deliveryMan.png";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {FormHelperText} from "@mui/material";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "USER",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  
  const handleMouseDownPassword = (event) => event.preventDefault();

  const validateEmail = (email) => 
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toLowerCase());

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8080/user/email?email=${email}`);
      if (response.data.email) {
        setFormErrors(prevErrors => ({ ...prevErrors, email: 'El correo electrónico ya está registrado.' }));
        return true; // Correo ya existe
      }
      return; // Correo no existe, todo bien
    } catch (error) {
      console.error('Error al verificar el correo electrónico', error);
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.email) {
      errors.email = "El correo electrónico es requerido";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = "El formato del correo electrónico no es correcto";
      isValid = false;
    }

    if (!formData.firstName.trim()) {
      errors.firstName = "El nombre es requerido";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "El apellido es requerido";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "La contraseña es requerida";
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const doesEmailExist = await checkEmailExists(formData.email);
    if(doesEmailExist) {
      return; // No continúa si el correo ya existe
    }

    try {
      const response = await axios.post('http://localhost:8080/auth/register', formData);
      const token = response.data.token;
      localStorage.setItem('jwt', token);
      const payload = JSON.parse(atob(token.split('.')[1]));
      dispatch(setCurrentUser(payload));
      alert(`Gracias ${payload.firstName} por registrarte`);
      navigate('/');
    } catch (error) {
      console.error("Error during registration", error);
    }
  };
  return (
    <div className="flex flex-row items-center justify-center p-10">
      <div className="flex justify-center">
        <div className="shadow-2xl rounded-3xl shadow-gray-400 bg-slate-300 h-[500px] flex flex-col items-center justify-center">
          <img src={deliveryMan} alt="Man delivery" className="relative h-[450px]" />
        </div>
        <div className="shadow-2xl rounded-3xl shadow-gray-400 p-4 flex flex-col justify-between h-[500px] relative right-16 bg-white">
          <Typography variant="h4" gutterBottom>
            Registrarse
          </Typography>
          <form className="flex flex-col align-items: center justify-content: center space-y-2" onSubmit={handleFormSubmit}>
            {/* Role Selection */}
            <FormControl component="fieldset">
              <RadioGroup row name="role" value={formData.role} onChange={handleChange}>
                <FormControlLabel value="USER" control={<Radio />} label="Usuario" />
                <FormControlLabel value="PROFESSIONAL" control={<Radio />} label="Professional" />
              </RadioGroup>
            </FormControl>

            {/* Email Field */}
            <TextField
              name="email"
              label="Correo Electrónico"
              placeholder="Correo Electrónico"
              variant="outlined"
              size="small"
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email || ''}
            />

            {/* First Name Field */}
            <TextField
              name="firstName"
              label="Nombres"
              placeholder="Nombres"
              variant="outlined"
              size="small"
              onChange={handleChange}
              error={!!formErrors.firstName}
              helperText={formErrors.firstName || ''}
            />

            {/* Last Name Field */}
            <TextField
              name="lastName"
              label="Apellidos"
              placeholder="Apellidos"
              variant="outlined"
              size="small"
              onChange={handleChange}
              error={!!formErrors.lastName}
              helperText={formErrors.lastName || ''}
            />

            {/* Password Field */}
            <FormControl variant="outlined" size="small">
              <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
              <OutlinedInput
                name="password"
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
                onChange={handleChange}
                error={!!formErrors.password}
              />
              <FormHelperText error>{formErrors.password || ''}</FormHelperText>
            </FormControl>

            {/* Submit Button */}
            <Button variant="contained" type="submit" className="shadow-2xl mt-4">
              Registrarme
            </Button>
          </form>

          {/* Login Redirect */}
          <Typography variant="body2" className="pt-5">
            Ya tienes una cuenta,{" "}
            <Link to="/login" className="text-blue-700 font-semibold">
              haz clic aquí
            </Link>.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Register;
