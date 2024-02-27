import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/slices/userSlice";
import mountain from "../../assets/montain.png";
import manWorking from "../../assets/manWorking.svg";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText"; // Import FormHelperText
import { Link, useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";

const Register = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "USER",
  });
  const [formErrors, setFormErrors] = useState({});

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
      return
    } catch (error) {
      console.error('Error al verificar el correo electrónico', error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
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

  return (
    <div
      className=" flex flex-col-reverse lg:relative h-screen flex lg:justify-center items-center"
      style={{
        backgroundImage: `url(${mountain})`,
        backgroundSize: "cover",
      }}
    >
      <img
        src={manWorking}
        alt="manWorking"
        className="absolute left-0 p-[43px] hidden lg:block"
      />
      
        <div className="flex flex-col lg:justify-center items-center relative sm:relative lg:rounded-3xl p-10 z-20  bg-white lg:bottom-[-1px] justify-center">
          <Typography variant="h3" gutterBottom>
            Registrarse
          </Typography>
          <form
            className="flex flex-col align-items: center justify-content: center space-y-2"
            onSubmit={handleFormSubmit}
          >
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="USER"
                  control={<Radio />}
                  label="Usuario"
                />
                <FormControlLabel
                  value="professional"
                  control={<Radio />}
                  label="Professional"
                />
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
              helperText={formErrors.email ? !formErrors.email : ""}
            />
            <FormHelperText error className="text-xs">
              {formErrors.email}
            </FormHelperText>

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
            <FormHelperText error className="text-xs">
              {formErrors.firstName}
            </FormHelperText>

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

            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password" size="small">
                Contraseña
              </InputLabel>
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

            <Button variant="contained" className="shadow-2xl" type="submit">
              Registrarme
            </Button>
          </form>

          {/* Login Redirect */}
          <Typography variant="body2" className="pt-5">
            Ya tienes una cuenta,{" "}
            <Link to="/login" className="text-blue-700 font-semibold">
              haz clic aquí
            </Link>
            .
          </Typography>
       
      </div>
    </div>
  );
};

export default Register;
