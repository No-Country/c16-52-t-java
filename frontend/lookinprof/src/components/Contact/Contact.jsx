import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import mountainImage from '../../assets/montain.png';
import manSettingsImage from '../../assets/manSettings.svg';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const Contact = () => {
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [userSubject, setUserSubject] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://3.142.156.194:8080/supportContact/send', {
        fromName: userName,
        fromEmail: userEmail,
        subject: userSubject,
        text: userMessage,
      });
      setTimeout(() => {
  
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:relative h-full lg:h-screen lg:justify-evenly items-center" style={{ backgroundImage: `url(${mountainImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundColor: '50%' }}>
      <img src={manSettingsImage} alt="manSettings" className="p-4 lg:p-0 hidden lg:block" />

      <div className="shadow-2xl rounded-3xl shadow-gray-400 px-10 py-5 flex flex-col justify-between lg:w-1/4 bg-white">
        <div>
          <h3 className='text-4xl text-[#004466] font-bold'>
            Contáctanos
          </h3>
          <p className='text-xs py-2'>
            Envíanos tu consulta por correo electrónico
          </p>
        </div>
        <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
          <TextField
            label="Nombre y Apellido"
            placeholder="Nombre y Apellido"
            variant="outlined"
            type='text'
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            size='small'
          />
          
          <TextField
            label="Correo Electrónico"
            placeholder="Correo Electrónico"
            variant="outlined"
            type='email'
            required
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            size='small'
          />
          <TextField
            label="Asunto"
            placeholder="Asunto"
            variant="outlined"
            type='text'
            required
            value={userSubject}
            onChange={(e) => setUserSubject(e.target.value)}
            size='small'
          />
          
          <textarea
            rows={3}
            className='border-2 border-gray-400 rounded-md p-1 hover:border-[#004466] selection:border-[#004466]'
            aria-label="Mensaje"
            placeholder="Mensaje"
            required
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          ></textarea>
          <Button type="submit" variant="contained">Enviar</Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
