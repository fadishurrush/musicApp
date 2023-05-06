import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import { SplashStackNav } from './navigation/SplashStackNav';
const App = () => {
  return (
    // <KeyboardAvoidingView style={{flex:1}} enabled={true}>
    <SplashStackNav />
    // </KeyboardAvoidingView>
  );
};

export default App;
