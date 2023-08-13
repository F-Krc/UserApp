import { useState, useEffect } from 'react';
import axios from 'axios';

function Liste() {
  const [users, setUsers] = useState([]);
 const [token, setToken] = useState('');

  const getUsers = async () => {
    try {
      const response = await axios.get('https://userlogin-api.onrender.com/api/user/userslist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

 useEffect(() => {
   const userToken = localStorage.getItem('userToken');
   setToken(userToken);
 }, []);

 useEffect(() => {
   if (token) {
     getUsers();
   }
 }, [token]);

  return (
    <div>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Liste;
