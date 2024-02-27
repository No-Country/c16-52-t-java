// Importar módulos necesarios de React y otras bibliotecas
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../../redux/slices/userSlice';
import { Button } from '@mui/material';
import { TiThMenu } from "react-icons/ti";

// Array de enlaces de navegación
export const links = [
    {
        path: '/',
        name: 'Inicio',
    },
    {
        path: '/services',
        name: 'Servicios',
    },
    {
        path: '/support',
        name: 'Soporte',
    },
    {
        path: '/login',
        name: 'Iniciar sesión',
    },
    {
        path: '/register',
        name: 'Registrarme',
    }
];

// Componente funcional para la barra de navegacion
const NavBar = () => {
    // Inicialización de variables de estado utilizando el gancho useState
    const [active, setActive] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef(null); // Creación de una referencia para el componente de navegación
    const location = useLocation();
    const dispatch = useDispatch(); // Acceso a la función de despacho de Redux
    const navigate = useNavigate(); // Acceso a la función de navegación proporcionada por React Router
    const { currentUser } = useSelector(({user}) => user); // Extracción de la información del usuario del almacen de Redux
    // Función para alternar la apertura/cierre del menú
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        
    };

    // Gancho de efecto para manejar clics fuera del menú para cerrarlo
    useEffect(() => {
        const closeMenuOnClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', closeMenuOnClickOutside);

        return () => {
            document.removeEventListener('mousedown', closeMenuOnClickOutside);
        };
    }, []);

    // Función para cerrar la sesión del usuario
    const logout = () => {
        dispatch(setCurrentUser(null)); // Despachar una acción para actualizar el usuario actual en el almacen de Redux
        navigate('/'); // Navegar al usuario a la página de inicio después de cerrar la sesión
    };

    // Renderización del componente de barra de navegación
    return (
        <nav ref={navRef} className='w-full h-24 sticky top-0 bg-white flex items-center justify-between px-4 md:px-20 z-50'>
            {/* Logo y marca */}
            <div className='flex items-center'>
                <Link to={'/'} className='font-bold text-xl text-[#004466]'>
                    LookingProf
                </Link>
            </div>
            <div className='flex items-center'>
                {/* Menú hamburguesa para vista móvil */}
                <div className="lg:hidden p-2">
                    <button className="text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none" onClick={toggleMenu}>
                        
                            <TiThMenu className='text-[#004466] text-2xl'/>
                       
                    </button>
                </div>
                {/* Enlaces de navegación */}
                <div className={`hidden lg:flex flex-row items-center justify-center md:gap-2`}>
                    {links.map((item, index) => (
                        <div key={index} className={`${active === index && 'text-[#004466] after:w-full after:bg-[#004466] font-bold'} ${item.name !== "Iniciar sesión" && item.name !== "Registrarme" && 'after:h-[2px] after:w-0 after:bg-[#004466] relative after:absolute after:-bottom-1 after:left-0'}`}>
                            {/* Renderizado condicional de los enlaces según la autenticación del usuario */}
                            {currentUser ? (
                                item.name === "Iniciar sesión" || item.name === "Registrarme" ? null : (
                                    <NavLink to={item.path} className='' onClick={() => setActive(index)}>
                                        {item.name}
                                    </NavLink>
                                )
                            ) : (
                                <NavLink to={item.path} className=''
                                onClick={() => setActive(index)}>
                           {item.name === "Registrarme" ? (
                               <Button variant="contained" color='primary'>Registrarme</Button>
                           ) : item.name === "Iniciar sesión" ? (
                               <Button variant="outlined" color='success'>Iniciar sesión</Button>
                           ) : (
                               item.name
                           )}
                       </NavLink>
                            )}
                        </div>
                    ))}
                    {/* Renderizado condicional de componentes específicos del usuario */}
                    {currentUser && (
                        <div className='ml-4 relative'>
                            <p className='font-bold cursor-pointer flex flex-row items-center justifr-center px-8 py-2 rounded-full bg-[#004466] text-white' onClick={toggleMenu}>
                                <p>{currentUser.firstName}</p>
                                <svg className="h-4 w-4 ml-1 fill-current" viewBox="0 0 24 24">
                                    <path d="M7 10l5 5 5-5z"/>
                                </svg>
                            </p>
                            {/* Menú desplegable para acciones del usuario */}
                            {menuOpen && (
                                <div className="absolute top-10 right-0 z-10 text-end p-2">
                                    <NavLink to={`/profile/${currentUser.id}`} className='block py-2 px-4 text-green-600 hover:bg-gray-800/10 rounded-xl font-bold'>
                                        Perfil
                                    </NavLink>
                                    <NavLink to={'/login'} className='block py-2 px-4 text-red-600 hover:bg-gray-800/10 rounded-xl font-bold' onClick={logout}>
                                        Cerrar sesión
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {/* Menú desplegable para vista móvil */}
            {menuOpen && (
                <div className="lg:hidden absolute top-20 right-4 bg-white shadow-md rounded-xl z-10">
                     {links.map((item, index) => (
                        <div key={index} className={`${item.name !== "Iniciar sesión" && item.name !== "Registrarme" && 'after:h-[2px] after:w-0 after:bg-[#004466] relative after:absolute after:-bottom-1 after:left-0'}`}>
                            {/* Renderizado condicional de los enlaces según la autenticación del usuario */}
                            {currentUser ? (
                                item.name === "Iniciar sesión" || item.name === "Registrarme" ? null : (
                                    <NavLink to={item.path} className={`block py-2 px-4 ${active === index && 'text-[#004466] font-bold'}`} onClick={() => { setActive(index); toggleMenu(); }}>
                                        {item.name}
                                    </NavLink>
                                )
                            ) : (
                                <NavLink to={item.path} className={`block py-2 px-4 ${active === index && 'text-[#004466] font-bold'}`} onClick={() => { setActive(index); toggleMenu(); }}>
                                    {item.name}
                                </NavLink>
                            )}
                        </div>
                    ))}
                     {currentUser && (
                        <div className='bg-[#004466] rounded-b-lg'>
                            <p className='text-white px-4 font-bold cursor-pointer flex flex-row items-center justifr-center  py-2 rounded-full' onClick={toggleMenu}>
                                <p>{currentUser.firstName}</p>
                                
                            </p>
                            
                            <NavLink to={'/profile'} className='block py-2 px-4 text-green-600 hover:bg-gray-800/10 rounded-xl font-bold'>
                                        Perfil
                                    </NavLink>
                                    <NavLink to={'/login'} className='block py-2 px-4 text-red-600 hover:bg-gray-800/10 rounded-xl font-bold' onClick={logout}>
                                        Cerrar sesión
                                    </NavLink>

                                    
                            
                        </div>
                    )}
                   
                    {/* Renderizado condicional de componentes específicos del usuario */}
                   
                </div>
            )}
        </nav>
    )
}

export default NavBar; // Exportar el componente NavBar
