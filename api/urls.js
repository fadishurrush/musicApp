const baseurl = 'https://mozikapp.onrender.com';

export const urls = {
  Login: (email, pass) =>
    `${baseurl}/Login?email=${email.toLowerCase()}&password=${pass}`,
  Register: baseurl + '/Register',
  getSong: baseurl + '/getSong',
  getAllSongs: baseurl + '/getAllSongs',
  GetFav: email => `${baseurl}/getFav?email=${email.toLowerCase()}`,
  SetFav: baseurl + '/setFav',
  AccountRecover: baseurl + '/AccountRecover',
  getHistory:(email)=> `${baseurl}/getHistory${email}`,
  addHistory: baseurl+'/addHistory',
};
