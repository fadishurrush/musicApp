import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {SplashStackNav} from './navigation/SplashStackNav';
import UserProvider from './store/UserProvider';
import UserContext from './store/UserContext';
const App = () => {
  return (
    <UserProvider>
      <UserContext.Consumer>
        {context => {
          return (
            <KeyboardAvoidingView style={{flex: 1}} enabled={true}>
              <SplashStackNav />
            </KeyboardAvoidingView>
          );
        }}
      </UserContext.Consumer>
    </UserProvider>
  );
};

export default App;
