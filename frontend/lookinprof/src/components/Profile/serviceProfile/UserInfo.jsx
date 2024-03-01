import React from 'react'
import StarRating from "../serviceProfile/StarRating"

const UserInfo = ({ text, className, valoration }) => {
  return (
    <div className={`text-center ${className}`}>
      
      {valoration ? (
        <StarRating rating={valoration} />
      ) : (
        <input type="text" className='text-center focus:outline-none cursor-default' value={text} readOnly />
      )}
    </div>
  );
};

export default UserInfo
