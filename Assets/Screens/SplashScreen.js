import {Text, View} from 'react-native';
import {ScreenNames} from '../Data/ScreenNames';
import {  useEffect } from 'react';
import { Songs as SongsArray } from '../Data/Songs';
import {urls} from '../../api/urls'
import AnimatedLottieView from 'lottie-react-native';
const SplashScreen = ({navigation}) => {
  useEffect(()=>{
    fetch(urls.getAllSongs)
      .then(res => res.json())
      .then(resJson => {
        if(resJson){
          resJson?.all.forEach(element => {
            element.artwork = {uri : element.artwork}
            delete element['__v'];
            SongsArray.push(element)
          })
    setTimeout(() => {
      console.log("Array ->",SongsArray);
      navigation.replace(ScreenNames.Login);
    }, 4540);
    
        }else{console.log('response was null');
        setTimeout(() => {
          navigation.replace(ScreenNames.Login);
        }, 4540);
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
  return (
    <View style={{flex:1}}>
      <AnimatedLottieView style={{backgroundColor:'black'}}source={require('../lottie/1st_Logo_MusicApp.mp4.lottie.json')} autoPlay loop={false}/>
    </View>
  )
};

export default SplashScreen;
