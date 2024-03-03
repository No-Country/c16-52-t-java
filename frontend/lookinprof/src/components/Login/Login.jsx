import React, { useState, useEffect } from "react";
import mountain from "../../assets/montain.png";
import manSettings from "../../assets/manSettings.svg";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setEmail(storedUser.username);
    }
  }, []);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const validateEmail = (email) => {
    if (!email) {
      setEmailError('El correo electrónico es requerido');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('El formato del correo electrónico no es válido');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('La contraseña es requerida');
      return false;
    } else if (password.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }
    setPasswordError('');
    return true;
  };

 

  const signIn = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

   
    try {
      const responseData = await axios.post('http://localhost:8080/auth/login', { email, password });
      const token = responseData.data.token;
      localStorage.setItem('jwt', token);
      const [header, payload, signature] = token.split('.');
      const decodedPayload = JSON.parse(atob(payload));
      dispatch(setCurrentUser(decodedPayload));
      alert(`Hola de nuevo!! ${decodedPayload.firstName}`);
      navigate('/');
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 401) {
        setPasswordError('La contraseña es incorrecta.');
      } else {
        alert('Verifica correo y/o contraseña');
      }
    }
  };

 
  
  return (
    <div className=" flex flex-col-reverse lg:relative h-screen flex lg:justify-center items-center" style={{
      backgroundImage: `url(${mountain})`,
      backgroundSize: "cover",
    }}>


      <div className="lg:flex justify-center items-center">
      
        

        <div className="h-auto relative sm:relative lg:rounded-3xl p-10 z-20  bg-white lg:bottom-[-1px] lg:h-[400px] justify-center">
          <div className="sm:text-sm">
            <Typography variant="h3" gutterBottom>
              Iniciar Sesión
            </Typography>
          </div>

          <form onSubmit={signIn} className="flex flex-col gap-5 z-10">
            <TextField
              label="Correo Electrónico"
              placeholder="Correo Electrónico"
              variant="outlined"
              size="small"
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
            />
            <FormControl variant="outlined" error={!!passwordError}>
              <InputLabel htmlFor="outlined-adornment-password" size="small">
                Password
              </InputLabel>
              <OutlinedInput
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
                label="Password"
                size="small"
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && (
                <p className="text-sm text-red-500">{passwordError}</p>
              )}
            </FormControl>

            <Button variant="contained" type="submit">
              Iniciar Sesión
            </Button>
          </form>
          <p className="pt-5 text-xs font-medium">
            No tienes una cuenta aún,{" "}
            <Link to={`/register`} className="text-blue-700 bold font-semibold">
              click aquí.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
