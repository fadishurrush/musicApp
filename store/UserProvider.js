import React from 'react';
import {useState} from 'react';
import UserContext from './UserContext';

const UserProvider = props => {
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]);
  const [history,setHistory]= useState([]);
  const [playlists,setPlaylists]= useState([]);



  return (
    <UserContext.Provider
      value={{
        currentUserEmail,
        setCurrentUserEmail,
        userFavorites,
        setUserFavorites,
        history,
        setHistory,
        playlists,
        setPlaylists
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
