import React, {useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS} from '../Data/Dimentions';
import {ScreenNames} from '../Data/ScreenNames';
import Regs from '../Regs';

const RecoverScreen = ({navigation}) => {
  const [email, setEmail] = useState('');

  const checkEmail = async () => {
    if (email.trim().length == 0) {
      Alert.alert('email field is empty');
      return;
    } else if (Regs.email.test(email) === false) {
      Alert.alert('enter a proper email');
      return;
    } else {
      await requestEmailRecover();
    }
  };
  // needs a domain to power up the recover method
  const requestEmailRecover = async () => {
    try {
    } catch (error) {}
  };
  return (
    <ImageBackground
      source={require('../BackGroundImages/loginbackground.jpg')}
      style={styles.background}
      resizeMode="stretch">
      <Image
        resizeMode="center"
        style={styles.gif}
        source={require('../../Assets/Gif/forgotpassword.gif')}></Image>
      {/* Email text input view */}
      <Text style={styles.Text}>enter your email here</Text>
      <View style={styles.container}>
        <View style={styles.searchBarClicked}>
          <TextInput
            placeholderTextColor={COLORS.darkerterkwaz}
            onChangeText={setEmail}
            value={email}
            style={styles.input}
            placeholder="Email..."
          />
        </View>
      </View>
      {/*  recover button view */}
      <TouchableOpacity onPress={() => checkEmail()}>
        <Text style={styles.Recover}>Recover</Text>
      </TouchableOpacity>
      {/* Sign in view */}
      <View style={{flexDirection: 'row'}}>
        <Text style={{...FONTS.h3}}> Go To</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNames.Login);
          }}>
          <Text style={styles.SignIn}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  gif: {
    width: '50%',
    height: '20%',
    marginTop: '15%',
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
  },
  searchBarClicked: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: 'rgba(200,200,200,0.2)',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  container: {
    margin: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  Text: {
    ...FONTS.h1,
    color: COLORS.terkwaz,
    margin: 10,
  },
  Recover: {
    ...FONTS.h1,
    color: COLORS.greenesh,
    backgroundColor: 'rgba(120,222,200,0.2)',
    borderRadius: 10,
    margin: '5%',
  },
  SignIn: {
    ...FONTS.h3,
    color: COLORS.greenesh,
    backgroundColor: 'rgba(120,222,200,0.05)',
    borderRadius: 10,
    marginLeft: '5%',
  },
});

export default RecoverScreen;
