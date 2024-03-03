import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import UserProfile from './userProfile/UserProfile';
import ServiceProfile from './serviceProfile/ServiceProfile';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setCurrentUser } from '../../redux/slices/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('jwt');
  const { id } = useParams();  // Added parentheses to useParams

  const [userData, setUserData] = useState(null);

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

  const hasUserRole = userData?.role === "USER"; 

  return (
    <div className='flex flex-col items-center justify-center'>
      {hasUserRole ? <UserProfile /> : <ServiceProfile />}
    </div>
  );
};

export default Profile;
