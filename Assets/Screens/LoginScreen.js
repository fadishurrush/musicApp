import React, {useContext, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../Data/Dimentions';
import {ScreenNames} from '../Data/ScreenNames';
import {useNavigation} from '@react-navigation/native';
import UserContext from '../../store/UserContext';
import {GetUserFavorites, LoginReq} from '../../api/api';
import Regs from '../Regs';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [isSecured, setIsSecured] = useState(true);
  const [indicatorOn, setindicatorOn] = useState(false);
  const {setCurrentUserEmail, setUserFavorites,userFavorites} = useContext(UserContext);
  const navigation = useNavigation();
  const recover = () => {
    navigation.navigate(ScreenNames.Recover);
  };

  const register = () => {
    navigation.navigate(ScreenNames.Register);
  };

  const inputValidationError = () => {
    let email_pass_isEmpty =
      email.trim().length == 0 || password.trim().length == 0;
    if (email_pass_isEmpty) {
      // Alert.alert('some fields are empty');
      return 'some fields are empty';
    } else if (Regs.email.test(email) === false) {
      // Alert.alert();
      return 'enter a proper email';
    }

    return false;
  };

  const getUserFavoratesFromApi = async () => {
    await GetUserFavorites(email).then(favresJson => {
      console.log("Fav",favresJson.Favorites);
      setUserFavorites(favresJson.Favorites)
      setCurrentUserEmail(email);
      navigation.replace(ScreenNames.AfterSplashScreen,);
    }).catch(e => console.log('get fav error ->', e));
  };

  const Login = async () => {
    //TODO:
    //      make out side functions

    let valedationError = inputValidationError();
    if (valedationError) {
      Alert.alert(valedationError);
      return;
    }
    setindicatorOn(true);
    LoginReq(email, password)
      .then(resJson => {
        setindicatorOn(false);
        if (!resJson.user) {
          Alert.alert(resJson?.message);
          return;
        }
        getUserFavoratesFromApi();
      })
      .catch(e => {
        setindicatorOn(false);
        console.log('login error', e);
      });
  };
  const LoginButton = () => {
    return (
      <TouchableOpacity
        style={styles.LoginButton}
        onPress={async () => await Login()}>
        <Text style={styles.LoginText}>Login</Text>
      </TouchableOpacity>
    );
  };

  const RecoverButton = () => {
    return (
      <View style={styles.forgotPassContainer}>
        <Text style={styles.forgotPass}>Forgot Password?</Text>
        <TouchableOpacity onPress={() => recover()}>
          <Text style={styles.forgotPassLink}>Recover here</Text>
        </TouchableOpacity>
      </View>
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

  const LoadingModal = () => {
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
  return (
    <ImageBackground
      source={require('../BackGroundImages/loginbackground.jpg')}
      style={styles.background}
      resizeMode="stretch">
      {/* loading indicator */}
      {LoadingModal()}
      <Text style={styles.welcome}>Welcome</Text>
      <View style={styles.outerContainer}>
        {/* inputs */}
        {InputTextEmail()}
        {InputTextPassword()}
        {/* nav buttons */}
        {RecoverButton()}
        {LoginButton()}
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.register}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => register()}>
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

export default LoginScreen;
