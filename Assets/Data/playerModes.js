import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {ActivityIndicator} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLORS} from './Dimentions';

export const playerModesMini = {
  loading: <ActivityIndicator size={30} />,
  idle: <ActivityIndicator size={30} />,
  connecting: <ActivityIndicator size={30} />,
  playing: (
    <AnimatedLottieView
      source={require('../lottie/sound-voice-waves.json')}
      autoPlay
    />
  ),
  paused: <IonIcon name={'play'} color={COLORS.greenesh} size={30} />,
  stopped: <ActivityIndicator size={30} />,
  ready: <IonIcon name={'play'} color={COLORS.greenesh} size={30} />,
  buffering: <ActivityIndicator size={30} />,
};

export const playerModesTrack = {
  loading: <ActivityIndicator size={30} />,
  idle: <ActivityIndicator size={30} />,
  connecting: <ActivityIndicator size={30} />,
  playing: <IonIcon name={'pause'} color={'black'} size={30} />,
  paused: <IonIcon name={'play'} color={'black'} size={30} />,
  stopped: <ActivityIndicator size={30} />,
  ready: <IonIcon name={'play'} color={'black'} size={30} />,
  buffering: <ActivityIndicator size={30} />,
};

export const playerModesModal = {
    loading: <ActivityIndicator size={50} />,
    idle: <ActivityIndicator size={50} />,
    connecting: <ActivityIndicator size={50} />,
    playing: <IonIcon name={'pause'}  size={50} />,
    paused: <IonIcon name={'play'}  size={50} />,
    stopped: <ActivityIndicator size={50} />,
    ready: <IonIcon name={'play'}  size={50} />,
    buffering: <ActivityIndicator size={50} />,
  };
