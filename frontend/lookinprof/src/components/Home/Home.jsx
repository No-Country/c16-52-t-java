import { Button } from '@mui/material';
import React from 'react';
import { FaStar } from "react-icons/fa";
import ImageHome2 from './../../assets/ImageHomeSection2.svg';
import Cards from '../../UI/cards/Cards';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import Home2 from '../../assets/Home-2.svg';
import { setCurrentUser } from '../../redux/slices/userSlice';

const Home = () => {
  const { currentUser } = useSelector(({user}) => user);
  const [servicesData, setServicesData] = React.useState([]);
  const navigate = useNavigate();
 // const sortedServicesData = servicesData.sort((a, b) => b.starts - a.starts);
  const professionals = servicesData.filter((item) => item.role === 'PROFESSIONAL');
  const servicesHome = professionals.slice(0, 6);
  const dispatch = useDispatch();
  useEffect(() => {
    let didCancel = false; 
    const fetchServicesData = async () => {
        try {
            const response = await axios.get('http://3.142.156.194:8080/user/all',{
              headers: {
                  'Access-Control-Allow-Origin': '*',
              }
          });
            if (!didCancel) { 
                setServicesData(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }
    fetchServicesData();
    return () => {
        didCancel = true; 
    };
}, []);
  const handleClickContact = () => {
    if(currentUser) {
    navigate('/services');
  };}
  //Boton para ir a la pagina de detalle de servicio. Si el usuario no esta logueado, redirecciona a la pagina de login. Si el usuario esta logueado, redirecciona a la pagina de detalle de servicio.
  const handleClickCard = (id) => {
    if(currentUser) {
      navigate(`/services/${id}`);
    } else {
      navigate('/login');
    }
  };


  return (
    <div className='flex flex-col justify-center items-center'>
      {/* Section 1 de la pagina principal */}
    <div >
      <div className='m-6 p-6 flex flex-col md:flex-row justify-center items-center lg:w-[1100px] min-w-[320px] p-auto '>
        
        <div className=' lg:p-6 w-full md:w-[60%] flex flex-col items-center lg:items-start lg:justify-between gap-6'>          
          <h2 className='lg:mt-4 text-3xl text-[#004466] font-black'>¿Necesitas ayuda? Encuentra al profesional perfecto aquí</h2>
          <p className='text-[#004466] bg-slate-100/20'>LookingProf te permite no solo encontrar el profesional más cercano, sino también el mejor puntuando por otros usuarios que ya han requerido sus servicios. La plataforma permite conectar de forma simple e intuitiva a las personas interesadas en contratar un servicio con un profecional que lo brinda. </p>
          <div className='w-26'>
            <Button variant='contained' color='primary' onClick={handleClickContact}>Quiero Contratar</Button>
          </div>
          <div className='flex flex-row items-center gap-4'>
            <div className='bg-yellow-500 w-8 h-8 flex items-center justify-center rounded-xl'>
              <FaStar />
            </div>
          </div>
        </div >
        <div  className='m-4 hidden lg:block max-h-[400px] md:max-h-[500px] rounded-xl' >
        <img src={Home2} alt=''/>
        </div>
        {/* <img src={ImageHome} alt="Home" className='m-4 hidden lg:block max-h-[400px] md:max-h-[500px] rounded-xl' /> */}
      </div>

    </div>
      {/* Section 2 de la pagina principal */}
      <section className='flex flex-col items-center justify-center w-full gap-y-4'>
        <h3 className='text-[#004466] text-xl text-center p-4'>Nuestra selección de profesionales</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-auto max-w-[1100px] min-w-[320px] p-2 justify-center'>
          {servicesHome.map((item) => (
            <div key={item.idUser} className='p-4 m-4 border-[#004466] w-[300px]  shadow-slate-400 shadow-xl border-2 rounded-lg h-auto'>
              <Cards className='flex flex-col items-center'>
              <div className='flex flex-col justify-center items-center'>
                  <img src={item.imageUrl} alt={item.profession} className='w-[9vw] h-[25vh] rounded-t-lg mb-4 cover' />
                  <div className='pl-5'>
                  <h4 className='font-semibold text-xl'>{item.firstName}</h4>
                  <p className='text-sm'>{item.profession}</p>
                  <span className='text-xs'>{item.city}, {item.province}</span>
                  {/*
                  <div className='flex flex-row gap-1 items-center'>
                    {item.starts}{[...Array(Math.floor(item.starts))].map((_, i) => (
                      <RiStarSFill key={i} className='text-yellow-500' />
                    ))}
                    {item.starts % 1 !== 0 && (
                      <RiStarSLine className='text-yellow-500' />
                    )}
                    </div>*/}
                  </div>
                </div>
                
                <div className='flex py-2'>
                  <Button variant='contained' color='primary' onClick={() => handleClickCard(item.idUser)}>
                    Contactar
                  </Button>
                </div>
              </Cards>
            </div>
          ))}
        </div>
        <div>
          <Button variant='contained' color='primary' onClick={()=>navigate('/services')} >Ver más...</Button>
        </div>
      </section>
      {/* Section 3 de la pagina principal */}
      <div className='bg-[#FCE6C4] w-full max-w-[1100px] rounded-xl flex flex-col items-center justify-center m-10 p-10'>
        <div className='w-full flex flex-row items-center justify-evenly'>
          <div className='border-l-8  border-[#004466] p-1 m-1'><p className='m-1 text-sm'>Mas del 50% de nuestros profesionales son expertos</p></div>
          <div className='border-l-8  border-[#004466] p-1 m-1'><p className='m-1 text-sm'>Id interdum velit laoreet id donec</p></div>
          <div className='border-l-8  border-[#004466] p-1 m-1'><p className='m-1 text-sm'>Id interdum velit laoreet id donec</p></div>
        </div>
        <div className='flex flex-row w-full'>
          <img src={ImageHome2} alt="Home2" className='hidden md:block w-[50%] h-[400px] ml-36' />
          <div className='flex flex-col justify-center items-center gap-4 w-2/3'>
            <h2 className='text-4xl font-bold'>¿Te animas a empezar?</h2>
            <h3 className='text-xl font-semibold'>Ofrece tus servicios!!!</h3>
            <div>
              <Button variant='contained' color='primary' onClick={() => navigate('/support')}>Contactanos</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
