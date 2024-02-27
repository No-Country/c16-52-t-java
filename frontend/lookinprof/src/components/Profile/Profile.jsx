import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import UserProfile from './userProfile/UserProfile';
import ServiceProfile from './serviceProfile/ServiceProfile';
import { setCurrentUser } from '../../redux/slices/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const [decodedPayload, setDecodedPayload] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const [, payload] = token.split('.');
        const _decodedPayload = JSON.parse(atob(payload));
        dispatch(setCurrentUser(_decodedPayload));
        setDecodedPayload(_decodedPayload);
      } catch (error) {
        console.error('Failed to decode or parse the JWT:', error);
      }
    }
  }, [dispatch]);
  
  // Conditional logic to check if the user has the "USER" role.
  const hasUserRole = decodedPayload?.role?.[0]?.authority === "USER";

  return (
    <div className='flex flex-col items-center justify-center'>
      {decodedPayload && <h1>Welcome {decodedPayload.firstName}</h1>}
      {hasUserRole ? <UserProfile /> : <ServiceProfile />}
    </div>
  );
};

export default Profile;
