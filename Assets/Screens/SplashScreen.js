import {Text, View} from 'react-native';
import {ScreenNames} from '../Data/ScreenNames';
import {useEffect} from 'react';
import {Songs as SongsArray} from '../Data/Songs';
import {urls} from '../../api/urls';
import AnimatedLottieView from 'lottie-react-native';
import { GetAllSongs } from '../../api/api';

const SplashScreen = ({navigation}) => {

  const timeout=()=>{
    setTimeout(() => {
      navigation.replace(ScreenNames.Login);
    }, 3000);
  }
  useEffect(() => {
    SongsArray.length == 0
      ? GetAllSongs()
          .then(resJson => {
            if (resJson) {
              resJson?.all.forEach(element => {
                element.artwork = {uri: element.artwork};
                delete element['__v'];
                SongsArray.push(element);
              });
              timeout()
            } else {
              console.log('response was null');
              timeout()
            }
          })
          .catch(e => {
            timeout()
            console.log('fetch error , ', e);
          })
      : timeout()
  }, []);
  return (
    <View style={{flex: 1}}>
      <AnimatedLottieView
        style={{backgroundColor: 'black'}}
        source={require('../lottie/1st_Logo_MusicApp.mp4.lottie.json')}
        autoPlay
        loop={false}
      />
    </View>
  );
};

export default SplashScreen;
