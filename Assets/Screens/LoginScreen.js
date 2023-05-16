import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS} from '../Data/Dimentions';

const LoginScreen = () => {
  return (
    <ImageBackground
      source={require('../BackGroundImages/loginbackground.jpg')}
      style={styles.background}
      resizeMode="stretch">
      <Text style={styles.welcome}>Welcome</Text>
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <View style={styles.searchBarClicked}>
            <TextInput
              placeholderTextColor={COLORS.darkerterkwaz}
              style={styles.input}
              placeholder="Email..."
            />
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.searchBarClicked}>
            <TextInput
              placeholderTextColor={COLORS.darkerterkwaz}
              style={styles.input}
              placeholder="Password..."
            />
          </View>
        </View>
        <View style={styles.forgotPassContainer}>
        <Text style={styles.forgotPass}>Forgot Password?</Text>
        <TouchableOpacity>
          <Text style={styles.forgotPassLink}>Recover here</Text>
        </TouchableOpacity>
      </View>
      </View>
      
      <View style={styles.registerContainer}>
        <Text style={styles.register}>Don't have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.registerLink}>Register now!</Text>
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
    justifyContent:'center',

    
  },
});

export default LoginScreen;
