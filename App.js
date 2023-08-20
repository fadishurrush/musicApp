import React, {useEffect, useState} from 'react';
import {AppState, KeyboardAvoidingView, Platform} from 'react-native';
import {SplashStackNav} from './navigation/SplashStackNav';
import UserProvider from './store/UserProvider';
import UserContext from './store/UserContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TrackPlayer, {
  TrackPlayerEvents,
  STATE_PLAYING,
  Capability,
  AppKilledPlaybackBehavior,
} from 'react-native-track-player';
const App = () => {

  const checkInitialization = async () => {
    const isInitialized = await TrackPlayer.isServiceRunning();
    if (isInitialized) {
      console.log('TrackPlayer is already initialized.');
      // You can perform any additional actions here
    } else {
      console.log('TrackPlayer is not initialized yet.');
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        AppKilledPlaybackBehavior: AppKilledPlaybackBehavior.PausePlayback,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
        ],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        progressUpdateEventInterval: 2,
      });
    }
  };
  useEffect(() => {
    checkInitialization();
   const remoteNext =  TrackPlayer.addEventListener('remote-next', () => TrackPlayer.skipToNext())
    const remotePrevious =TrackPlayer.addEventListener('remote-previous', () => TrackPlayer.skipToPrevious());
    return ()=>{
      remoteNext.remove()
      remotePrevious.remove()
    }
  }, []);

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
