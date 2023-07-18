import {urls} from './urls';

const appFetch = async (url, method, body, header) => {
  return header
    ? await fetch(url, {
        method: method || 'GET',
        headers: {'Content-Type': 'application/json'},
        body: body,
      }).then(res => res.json())
    : await fetch(url, {method: method || 'GET', body: body}).then(res =>
        res.json(),
      );
};

export const LoginReq = async (email, pass) => {
  const url = urls.Login(email, pass);
  return await appFetch(url);
};

export const GetUserFavorites = async email => {
  const url = urls.GetFav(email);
  return await appFetch(url);
};

export const GetAllSongs = async () => {
  const url = urls.getAllSongs;
  return await appFetch(url);
};

export const RegisterAccount = async (email, password) => {
  const url = urls.Register;
  const body = JSON.stringify({
    email: email.toLowerCase(),
    password: password,
  });
  return await appFetch(url, 'POST', body, header);
};

export const setUserFavoritesApi = async (title, email) => {
  const url = urls.SetFav;
  const body = JSON.stringify({
    title: title,
    userEmail: email.toLowerCase(),
  });
  header = true;

  return await appFetch(url, 'PATCH', body, header);
};

export const getHistoryFromApi = async email => {
  const url = urls.getHistory(email);
  return await appFetch(url);
};

export const addHistoryFromApi = async (email,date,songsArr) => {
    const url = urls.addHistory
    const body = JSON.stringify({
        email:email,
        newHistory:{
            Date:date,
            songsArr:songsArr
        }
    })
    return await appFetch(url,'POST',body);
  };
