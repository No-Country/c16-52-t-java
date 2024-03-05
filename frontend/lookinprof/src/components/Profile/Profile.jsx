import React, { useEffect, useState } from 'react';
import UserProfile from './userProfile/UserProfile';
import ServiceProfile from './serviceProfile/ServiceProfile';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../../redux/slices/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();  
  const [userData, setUserData] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (token) {
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
          dispatch(setCurrentUser(response.data)); // Dispatching user data to Redux store
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchData();
  }, [id, dispatch]);

  // Verificar si userData existe y tiene el rol de usuario
  const hasUserRole = userData && userData.role === "USER"; 
  
  return (
    <div className=''>
      {hasUserRole ? <UserProfile /> : <ServiceProfile />}
    </div>
  );
};

export default Profile;
