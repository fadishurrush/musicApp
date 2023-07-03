import React, {useEffect} from 'react';
import {useState} from 'react';
import UserContext from './UserContext';
import {urls} from '../api/urls';

const UserProvider = props => {
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    try {
      fetch(`${urls.getFav}?email=${currentUserEmail.toLowerCase()}`)
        .then(res => res.json())
        .then(resJson => {
          resJson.isArray() ? setUserFavorites(resJson.Favorites) : null;
        });
    } catch (error) {}
  }, [currentUserEmail]);

  return (
    <UserContext.Provider
      value={{
        currentUserEmail,
        setCurrentUserEmail,
        userFavorites,
        setCurrentUserEmail,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
