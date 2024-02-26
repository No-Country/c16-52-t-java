import React, { useState, useEffect } from 'react';
import man from "../../assets/manLaptop.png";
import bgCard from "../../assets/bgCard.svg";
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
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  const emailExists = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user/email?email=${email}`);
      return response.status === 200;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setEmailError('El correo electrónico no está registrado.');
        return false;
      } else {
        alert('Ocurrió un problema al verificar el correo electrónico.');
        return false;
      }
    }
  };

  const signIn = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    const emailExistsCheck = await emailExists();
    if (!emailExistsCheck) {
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
      if (error.response && error.response.status === 401) {
        setPasswordError('La contraseña es incorrecta.');
      } else {
        alert('Verifica correo y/o contraseña');
      }
    }
  };

  return (
    <div className="flex flex-row items-center justify-center p-10 h-[100vh]" style={{ backgroundImage: `url(${bgCard})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain' }}>
      <div className="flex justify-between items-center w-[1100px]">
        {/* Aquí podrías colocar algo más si quisieras, por ejemplo la imagen o alguna decoración */}
        <div className="w-2/3">
          {/* Contenido opcional */}
        </div>
        <div className="h-[400px] shadow-2xl rounded-3xl shadow-gray-400 p-10 flex flex-col justify-between bg-white">
          <h2 className="text-4xl text-[#004466] font-extrabold font-sans">
            Iniciar Sesión
          </h2>
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

            <Button variant="contained" type="submit">Iniciar Sesión</Button>
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
