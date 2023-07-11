import { urls } from "./urls"

const appFetch = async ( url , method , body ) => {
    return await fetch ( url , {method:method || 'GET' , body: body}).then(res => res.json())
}

export const LoginReq = async (email , pass ) => {
        const url = urls.Login(email , pass)
        return await appFetch (url)
}

export const GetUserFavorites = async (email) => {
    const url = urls.GetFav(email)
    return await appFetch (url)
}

export const GetAllSongs = async () =>{
    const url = urls.getAllSongs
    return await appFetch (url)
}

export const RegisterAccount = async (email ,password)=>{
    const url = urls.Register 
    const body = JSON.stringify({
        email: email.toLowerCase(),
        password: password,
      })  
    return await appFetch(url,"POST",body)
}

export const setUserFavorites = async ()=>{
    const url = urls.SetFav
    const body = JSON.stringify({
        title: currentTrack.title,
        userEmail: currentUserEmail.toLowerCase(),
      })
      
      return await appFetch(url,"PATCH",body)
}