import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../Data/Dimentions';
import React, {useState} from 'react';
import {ScreenNames} from '../Data/ScreenNames';
import {useNavigation} from '@react-navigation/native';
import Regs from '../Regs';
import {RegisterAccount} from '../../api/api';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [isSecured, setIsSecured] = useState(true);
  const [indicatorOn, setindicatorOn] = useState(false);
  const navigation = useNavigation();

  const inputValidationError = () => {
    let email_pass_isEmpty =
      email.trim().length == 0 || password.trim().length == 0;
    if (email_pass_isEmpty) {
      return 'some fields are empty';
    } else if (Regs.email.test(email) === false) {
      return 'enter a proper email';
    }

    return false;
  };

  const Register = async () => {
    let valedationError = inputValidationError();
    if (valedationError) {
      Alert.alert(valedationError);
      return;
    }

    setindicatorOn(true);
    RegisterAccount(email, password)
      .then(resJson => {
        setindicatorOn(false);
        if (!resJson.user) {
          Alert.alert(resJson?.message);
        } else {
          navigation.replace(ScreenNames.AfterSplashScreen);
        }
      })
      .catch(e => {
        console.log('register error', e);
      });
  };

  const LoadingIndicator = () => {
    return (
      <Modal animationType="fade" transparent={true} visible={indicatorOn}>
        <View style={styles.loadingContainer}>
          <View style={styles.Dialog}>
            <Text style={styles.loading}>Logging in...</Text>
            <ActivityIndicator size={75} color={COLORS.darkerterkwaz} />
          </View>
        </View>
      </Modal>
    );
  };

  const InputTextEmail = () => {
    return (
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
    );
  };

  const InputTextPassword = () => {
    return (
      <View style={styles.container}>
        <View style={styles.searchBarClicked}>
          <TextInput
            // value={passwordhidden}
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
    );
  };

  const RegisterButton = () => {
    return (
      <TouchableOpacity
        style={styles.LoginButton}
        onPress={async () => await Register()}>
        <Text style={styles.LoginText}>Register</Text>
      </TouchableOpacity>
    );
  };
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.background}
      source={require('../BackGroundImages/RegisterBG.jpg')}>
      {/* loading indicator */}
      {LoadingIndicator()}
      <Text style={styles.welcome}>Welcome to Mozik</Text>
      <View style={styles.outerContainer}>
        {/* email input */}
        {InputTextEmail()}
        {/* password input */}
        {InputTextPassword()}
        {/* Register Button */}
        {RegisterButton}
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
