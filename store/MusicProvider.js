import React, {useEffect, useState} from 'react';
import TrackPlayer from 'react-native-track-player';
import MusicContext from './MusicContext';
import { Songs } from '../Assets/Data/Songs';

const MusicProvider = props => {
  const [isPlaying, setIsPlaying] = useState('loading');
  const [currentTrack, setCurrentTrack] = useState(null);

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        currentTrack,
        setCurrentTrack,
      }}>
      {props.children}
    </MusicContext.Provider>
  );
};

export default MusicProvider;
