import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
} from 'react-native';
import TrackPlayer, {
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MusicContext from '../../store/MusicContext';
import {COLORS, FONTS} from '../Data/Dimentions';
import MusicModalComp from './MusicModalComp';

const MiniPlayer = () => {
  const {isPlaying, setIsPlaying, currentTrack, modalVisible, setModalVisible} =
    useContext(MusicContext);
  const playbackState = usePlaybackState();
  const {position, duration} = useProgress();

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
    loading: <ActivityIndicator size={30} />,
    playing: (
      <IonIcon style={styles.icon} name={'pause'} color={'red'} size={30} />
    ),
    paused: (
      <IonIcon style={styles.icon} name={'play'} color={'red'} size={30} />
    ),
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
  const getProgress = () => {
    return (position / duration) * 100;
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <MusicModalComp />
      </Modal>
      <Pressable
        style={{flex: 1}}
        onPress={() => setModalVisible(!modalVisible)}>
        <View style={[styles.progress, {width: `${getProgress()}%`}]} />
        <View style={styles.row}>
          <Image style={styles.image} source={currentTrack?.artwork} />
          <View style={styles.text}>
            <Text style={styles.songname}>{currentTrack?.title}</Text>
            <Octicons name={'dot-fill'} size={10} color={'white'} />
            <Text style={styles.songartist}>{currentTrack?.artist}</Text>
          </View>
          <View style={styles.PressableHolder}>
            <Pressable style={styles.Pressable}>
              <IonIcon style={styles.icon} name="heart" color="red" size={30} />
            </Pressable>
            <Pressable
              style={styles.Pressable}
              onPress={async () => toggleTrack()}>
              {playerModes[isPlaying]}
            </Pressable>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '7%',
    width: '100%',
    position: 'absolute',
    bottom: '5%',
    // bottom: -100,
    backgroundColor: COLORS.darkgray,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  image: {
    width: '30%',
    height: '100%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  text: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  songname: {
    margin: 5,
    ...FONTS.h4,
    color: COLORS.lightGray,
  },
  songartist: {
    margin: 5,
    ...FONTS.h4,
    color: 'gray',
  },
  PressableHolder: {
    alignItems: 'center',
    marginLeft: 15,
    flexDirection: 'row',
    // backgroundColor:"red",
    flex: 1,
    justifyContent: 'flex-end',
  },
  Pressable: {
    marginLeft: 10,
  },
  progress: {
    height: 3,
    backgroundColor: COLORS.terkwaz,
  },
});

export default MiniPlayer;
