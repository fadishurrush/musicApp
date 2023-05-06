import React, {useEffect, useState} from 'react';
import TrackPlayer from 'react-native-track-player';
import MusicContext from './MusicContext';
import {Songs} from '../Assets/Data/Songs';

const MusicProvider = props => {
  
  const [isPlaying, setIsPlaying] = useState('loading');
  const [currentTrack, setCurrentTrack] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const today = new Date();
  const History = fetch('https://mozikapp.onrender.com/getHistory');
  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        currentTrack,
        setCurrentTrack,
        modalVisible,
        setModalVisible,
        today,
        History,
      }}>
      {props.children}
    </MusicContext.Provider>
  );
};

export default MusicProvider;
