import React from 'react';
import {useState} from 'react';
import UserContext from './UserContext';

const UserProvider = props => {
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]);
  const [history,setHistory]= useState([]);



  return (
    <UserContext.Provider
      value={{
        currentUserEmail,
        setCurrentUserEmail,
        userFavorites,
        setUserFavorites,
        history,
        setHistory
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
