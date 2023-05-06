import React, {useContext, useEffect, useState} from 'react';
import {View, Pressable, StyleSheet, ActivityIndicator} from 'react-native';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MusicContext from '../../store/MusicContext';
import {Songs as songsArray} from '../Data/Songs';

export const COntroller = () => {
  const {isPlaying, setIsPlaying, setCurrentTrack, currentTrack} =
    useContext(MusicContext);
  const playbackState = usePlaybackState();

  const toggleTrack = async () => {
    console.log('playbackState = ', playbackState);
    if (playbackState === 'playing' || playbackState === 3) {
      await pasueTrack();
    } else if (
      playbackState === 'paused' ||
      playbackState === 2 ||
      playbackState === 'ready' ||
      playbackState === 'stopped'
    ) {
      await playTrack();
    }
  };
  useEffect(() => {
    setIsPlaying(playbackState);
  }, [playbackState]);

  const playerModes = {
    loading: <ActivityIndicator size={50} />,
    playing: <IonIcon style={styles.icon} name={'pause'} size={65} />,
    paused: <IonIcon style={styles.icon} name={'play'} size={65} />,
    stopped: <IonIcon style={styles.icon} name={'play'} size={65} />,
    ready: <IonIcon style={styles.icon} name={'play'} size={65} />,
  };

  const pasueTrack = async () => {
    await TrackPlayer.pause();
    setIsPlaying('paused');
    console.log('pasued');
  };

  const playTrack = async () => {
    await TrackPlayer.play();
    setIsPlaying('playing');
    console.log('playing');
  };
  const SameCategory = async category => {
    //filter songs

    let songsList = songsArray.filter(
      a => a.Category.includes(category) && a.title !== currentTrack.title,
    );
    console.log('songs array ', songsList);
    TrackPlayer.add(songsList);
  };
  const playNext = async () => {
    const current = await TrackPlayer.getCurrentTrack();
    const queue = await TrackPlayer.getQueue();
    // console.log('queue length and current ', queue.length, current);
    if (queue.length == current + 1) {
      SameCategory(currentTrack.Category[1]);
    }
    await TrackPlayer.skipToNext();
    const newcurrent = await TrackPlayer.getCurrentTrack();
     const  track = await TrackPlayer.getTrack(newcurrent);
    console.log('track', track);
    setCurrentTrack(track);
    await TrackPlayer.play();
  };
  const playPrevious = async () => {
    await TrackPlayer.skipToPrevious();
    current = await TrackPlayer.getCurrentTrack();
    track = await TrackPlayer.getTrack(current);
    setCurrentTrack(track);
    await TrackPlayer.play()
  };
  return (
    <View style={styles.playbuttonsholder}>
      {/* previous button */}
      <Pressable
        style={{alignSelf: 'center'}}
        onPress={async () => playPrevious()}>
        <IonIcon name="play-skip-back" size={50} />
      </Pressable>
      {/* play button */}
      <Pressable onPress={async () => toggleTrack()}>
        {playerModes[isPlaying]}
      </Pressable>
      {/* next button */}
      <Pressable style={{alignSelf: 'center'}} onPress={async () => playNext()}>
        <IonIcon name="play-skip-forward" size={50} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  playbuttonsholder: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
    alignSelf: 'center',
    alignContent: 'center',
    // marginTop: '10%',
  },
});
