import {Text, View} from 'react-native';
import {ScreenNames} from '../Data/ScreenNames';

const SplashScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate(ScreenNames.AfterSplashScreen);
  }, 2000);
  return (
    <View style={{flex:1}}>
  <Text style={{color:'black'}}>this is splash Screen</Text>
    </View>
  )
};

export default SplashScreen;
