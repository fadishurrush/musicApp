import {Text, View} from 'react-native';
import {ScreenNames} from '../Data/ScreenNames';
import { useEffect } from 'react';
import { Songs as SongsArray } from '../Data/Songs';
const SplashScreen = ({navigation}) => {
  useEffect(()=>{
    console.log('songs array -> ', SongsArray);
    var songurl = 'https://mozikapp.onrender.com/getAllSongs';
    fetch(songurl)
      .then(res => res.json())
      .then(resJson => {
        if(resJson){
          console.log("resJosn " , resJson);
          resJson?.all.forEach(element => {
            element.artwork = {uri : element.artwork}
            
            SongsArray.push(element)
          })
    console.log('songs array after -> ', SongsArray);
    setTimeout(() => {
      navigation.replace(ScreenNames.Login);
    }, 1500);
    
        }else{console.log('response was null');
        setTimeout(() => {
          navigation.replace(ScreenNames.Login);
        }, 1500);
      }
      })
      .catch(e => {
        console.log('fetch error , ', e);
      });

//   var songurl =
//   'https://mozikapp.onrender.com/getSong?title=Clouds';
// fetch(songurl)
//   .then(res => res.json())
//   .then(resJson => {
//     console.log('resJson ', resJson);
//     track = resJson;
//     track.artwork = {uri: track.artwork};

//     SongsArray.push(track);
//     console.log('songs array after -> ', SongsArray)
//   }).then(setTimeout(() => {
//     navigation.replace(ScreenNames.AfterSplashScreen);
//   }, 1500))
    
  },[])
  
  setTimeout(() => {
            navigation.replace(ScreenNames.Login);
          }, 3000);
  return (
    <View style={{flex:1}}>
  <Text style={{color:'black'}}>this is splash Screen</Text>
    </View>
  )
};

export default SplashScreen;
