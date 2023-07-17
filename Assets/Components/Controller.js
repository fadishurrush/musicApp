import React, {useContext, useEffect} from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MusicContext from '../../store/MusicContext';
import {playerModesModal} from '../Data/playerModes';
import { Songs as songsArray } from '../Data/Songs';

export const COntroller = () => {
  const {isPlaying, setIsPlaying, setCurrentTrack, currentTrack} =
    useContext(MusicContext);
  const playbackState = usePlaybackState();

  useEffect(() => {
    setIsPlaying(playbackState);
  }, [playbackState]);

  const RenderPlayButton = () => {
    return (
      <Pressable onPress={async () => toggleTrack()}>
        {playerModesModal[isPlaying]}
      </Pressable>
    );
  };

  const toggleTrack = async () => {
    if (playbackState === 'playing' || playbackState === 3) {
      await pasueTrack();
    } else {
      await playTrack();
    }
  };
  //   functions to toggle on/off the songs
  const pasueTrack = async () => {
    await TrackPlayer.pause();
    setIsPlaying('paused');
  };

  const playTrack = async () => {
    await TrackPlayer.play();
    setIsPlaying('playing');
  };

  const RenderPreviousButton = () => {
    return (
      <Pressable
        style={{alignSelf: 'center'}}
        onPress={async () => playPrevious()}>
        <IonIcon name="play-skip-back" size={50} />
      </Pressable>
    );
  };

  //  resets the song if song is at 0 progress -> plays the previous song
  const playPrevious = async () => {
    await TrackPlayer.skipToPrevious();
    setCurrentTrack(currentTrack);
    await TrackPlayer.play();
  };

  const RenderNextButton = () => {
    return (
      <Pressable style={{alignSelf: 'center'}} onPress={async () => playNext()}>
        <IonIcon name="play-skip-forward" size={50} />
      </Pressable>
    );
  };

  const playNext = async () => {
    const current = await TrackPlayer.getCurrentTrack();
    const queue = await TrackPlayer.getQueue();
    if (queue.length == current + 1) {
      AddNewSongSameCategory(currentTrack.Category[1]);
    }
    await TrackPlayer.skipToNext()
    toggleTrack()
    const newcurrent = await TrackPlayer.getCurrentTrack();
    const track = await TrackPlayer.getTrack(newcurrent);
    setCurrentTrack(track);
    await TrackPlayer.play();
  };

  const AddNewSongSameCategory = () => {
    //filter songs
    let songsList = songsArray.filter(
      a =>
        a.Category.includes(currentTrack.Category[1]) &&
        a.title !== currentTrack.title,
    );
    TrackPlayer.add(songsList);
  };

  return (
    <View style={styles.playbuttonsholder}>
      {/* previous button */}
      {RenderPreviousButton()}
      {/* play button */}
      {RenderPlayButton()}
      {/* next button */}
      {RenderNextButton()}
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
