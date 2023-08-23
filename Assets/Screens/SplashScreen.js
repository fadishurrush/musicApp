import { View} from 'react-native';
import {ScreenNames} from '../Data/ScreenNames';
import {useEffect} from 'react';
import {Songs as SongsArray} from '../Data/Songs';
import AnimatedLottieView from 'lottie-react-native';
import { GetAllSongs } from '../../api/api';

const SplashScreen = ({navigation}) => {

  const timeout=()=>{
    setTimeout(() => {
      navigation.replace(ScreenNames.Login);
    }, 3000);
  }
  useEffect(() => {
    timeout()
    SongsArray.length == 0
      ? GetAllSongs()
          .then(resJson => {
            if (resJson) {
              resJson?.all.forEach(element => {
                element.artwork = {uri: element.artwork};
                delete element['__v'];
                SongsArray.push(element);
              });
            } else {
              console.log('response was null');
            }
          })
          .catch(e => {
            console.log('fetch error , ', e);
          })
      : null

  }, []);
  return (
    <View style={{flex: 1}}>
      <AnimatedLottieView
        style={{backgroundColor: 'black'}}
        source={require('../lottie/1st_Logo_MusicApp.mp4.lottie.json')}
        autoPlay
        loop={true}
      />
    </View>
  );
};

export default SplashScreen;
