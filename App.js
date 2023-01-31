import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, View} from 'react-native';
import MiniPlayer from './Assets/Components/MiniPlayerComp';
import {Songs} from './Assets/Data/Songs';
import BottomTabNav from './navigation/BottomTabNav';
import { SplashStackNav } from './navigation/SplashStackNav';
import MusicContext from './store/MusicContext';
import MusicProvider from './store/MusicProvider';

const App = () => {
  return (
    <SplashStackNav />
  );
};

export default App;
