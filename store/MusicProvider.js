import React, {useEffect, useState} from 'react';
import MusicContext from './MusicContext';

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
