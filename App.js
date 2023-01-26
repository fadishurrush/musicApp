import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, View} from 'react-native';
import MiniPlayer from './Assets/Components/MiniPlayerComp';
import {Songs} from './Assets/Data/Songs';
import BottomTabNav from './navigation/BottomTabNav';
import MusicContext from './store/MusicContext';
import MusicProvider from './store/MusicProvider';

const App = () => {
  return (
    <MusicProvider>
      <MusicContext.Consumer>
        {context => {
          return (
            
            <View style={{flex: 1}}>
              <BottomTabNav />
              {context.currentTrack ? <MiniPlayer/> : null} 
            </View>
          );
        }}
      </MusicContext.Consumer>
    </MusicProvider>
  );
};

export default App;
