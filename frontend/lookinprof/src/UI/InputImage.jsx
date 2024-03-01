import React, { useState } from 'react';
import axios from 'axios';
import UserInfo from './../components/Profile/serviceProfile/UserInfo';

function FileUploadForm({name, title, valoration, about}) {
  const [username, setUsername] = useState('');


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <form className='flex flex-col gap-2 w-10/12 '>
      <UserInfo text={name} className={"font-bold text-2xl text-blue-900 "}/>
      <UserInfo text={title} className={"font-semibold text-base text-gray-500"}/>
      <UserInfo valoration={5}/>
      
      <textarea  className='border border-gray-400 rounded-3xl w-full h-32 p-3 mb-4 overflow-hidden resize-none text-sm focus:outline-none cursor-default' value={about} readOnly></textarea>
    </form>
  );
}

export default FileUploadForm;
