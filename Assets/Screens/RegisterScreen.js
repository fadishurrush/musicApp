import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../Data/Dimentions';
import {TextInput} from 'react-native-gesture-handler';
import React, {useState} from 'react';
import { urls } from '../../api/urls';
import { ScreenNames } from '../Data/ScreenNames';

const RegisterScreen = navigation => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [isSecured, setIsSecured] = useState(true);
  const [indicatorOn,setindicatorOn] = useState(false)

  const Register = async () => {
    let emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    console.log('Register pressed');
    if (email.trim().length == 0 || password.trim().length == 0) {
      Alert.alert('some fields are empty');
      return;
    }else if(emailreg.test(email) === false){
      Alert.alert("enter a proper email")
    }
    setindicatorOn(true)
    
    await fetch(urls.Register,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.toLowerCase(),
            password: password,
          }),
    })
      .then(res => res.json())
      .then(resJson => {
        setindicatorOn(false)
        if (!resJson.user) {
          Alert.alert(resJson?.message);
        } else {
          navigation.replace(ScreenNames.AfterSplashScreen);
        }
      })
      .catch(e => {
        console.log('login error', e);
      });
  };

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.background}
      source={require('../BackGroundImages/RegisterBG.jpg')}>
        <Modal animationType="fade" transparent={true} visible={indicatorOn}>
        <View style={styles.loadingContainer}>
          <View style={styles.Dialog}>
            <Text style={styles.loading}>Logging in...</Text>
            <ActivityIndicator size={75} color={COLORS.darkerterkwaz} />
          </View>
        </View>
      </Modal>
      <Text style={styles.welcome}>Welcome to Mozik</Text>
      <View style={styles.outerContainer}>
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
        <View style={styles.container}>
          <View style={styles.searchBarClicked}>
            <TextInput
              secureTextEntry={isSecured}
              onChangeText={setpassword}
              value={password}
              placeholderTextColor={COLORS.darkerterkwaz}
              style={styles.input}
              placeholder="Password..."
            />
            <TouchableOpacity
              onPress={() => {
                setIsSecured(!isSecured);
              }}>
              <Text style={{marginRight: '4%'}}>
                {isSecured ? 'Show' : 'hide'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {indicatorOn && Alert.alert("Logging in",<ActivityIndicator></ActivityIndicator>)}
        <TouchableOpacity
          style={styles.LoginButton}
          onPress={async () => await Register()}>
          <Text style={styles.LoginText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  welcome: {
    ...FONTS.h1,
    color: COLORS.terkwaz,
    alignSelf: 'center',
    margin: '4%',
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
  },
  container: {
    margin: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
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
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerContainer: {
    margin: '8%',
    marginBottom: '40%',
  },
  register: {
    ...FONTS.h5,
    color: COLORS.darkerterkwaz,
  },
  registerLink: {
    ...FONTS.h4,
    color: COLORS.terkwaz,
    marginLeft: '5%',
  },
  registerContainer: {
    // flex: 1,
    flexDirection: 'row',
  },
  forgotPass: {
    ...FONTS.h5,
    color: COLORS.darkerterkwaz,
  },
  forgotPassLink: {
    ...FONTS.h4,
    color: COLORS.terkwaz,
    marginLeft: '5%',
  },
  forgotPassContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  LoginButton: {
    borderRadius: 15,
    backgroundColor: 'rgba(200,200,200,0.2)',
    marginTop: '10%',
    height: SIZES.height / 12,
    width: SIZES.width / 2,
    alignSelf: 'center',
    padding: '5%',
    alignContent: 'center',
    alignItems: 'center',
  },
  LoginText: {
    fontSize: SIZES.h2,
    color: COLORS.terkwaz,
    fontFamily: 'Roboto-regular',
  },
  Dialog: {
    backgroundColor: 'rgba(200,200,200,0.4)',
    width: SIZES.width / 1.2,
    height: SIZES.height / 6,
    alignSelf: 'center',
    padding: SIZES.padding2,
    alignContent: 'center',
    borderRadius: 15,
    borderColor: COLORS.darkerterkwaz,
    borderWidth: 1,
    // justifyContent:'center'
  },
  loading: {fontSize: SIZES.h2, color: COLORS.terkwaz},
  loadingContainer: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(48,170,200,0.1)',
  },
});
export default RegisterScreen;
