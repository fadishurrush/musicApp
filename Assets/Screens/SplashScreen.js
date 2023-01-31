import {Text} from 'react-native';
import {ScreenNames} from '../Data/ScreenNames';

const SplashScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate(ScreenNames.AfterSplashScreen);
  }, 1500);
  return <Text>this is splash Screen</Text>;
};

export default SplashScreen;
