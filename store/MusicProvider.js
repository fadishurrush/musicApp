import React, {useEffect, useState} from 'react';
import MusicContext from './MusicContext';

const MusicProvider = props => {
  
  const [isPlaying, setIsPlaying] = useState('loading');
  const [tracks, settracks] = useState([]);
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
        tracks,
        settracks,
      }}>
      {props.children}
    </MusicContext.Provider>
  );
};

export default MusicProvider;
