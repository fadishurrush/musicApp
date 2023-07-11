import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {SplashStackNav} from './navigation/SplashStackNav';
import UserProvider from './store/UserProvider';
import UserContext from './store/UserContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler'
const App = () => {
  return (
    <UserProvider>
      <UserContext.Consumer>
        {context => {
          return (
            <GestureHandlerRootView style={{flex: 1}}>
            <KeyboardAvoidingView style={{flex: 1}} enabled={true}>
              <SplashStackNav />
            </KeyboardAvoidingView>
            </GestureHandlerRootView>
          );
        }}
      </UserContext.Consumer>
    </UserProvider>
  );
};

export default App;
