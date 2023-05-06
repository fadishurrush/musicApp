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
import { useBluetoothHeadsetDetection } from 'react-native-bluetooth-headset-detect';

const MiniPlayer = () => {
  const {isPlaying, setIsPlaying, currentTrack, modalVisible, setModalVisible} =
    useContext(MusicContext);
  const playbackState = usePlaybackState();
  const {position, duration} = useProgress();
  var device = useBluetoothHeadsetDetection();
  console.log("device ," , device);
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
      <IonIcon style={styles.icon} name={'pause'} color={COLORS.greenesh} size={30} />
    ),
    paused: (
      <IonIcon style={styles.icon} name={'play'} color={COLORS.greenesh} size={30} />
    ),
    stopped :(
      <IonIcon style={styles.icon} name={'play'} color={COLORS.greenesh} size={30} />
    ),
    ready :(
      <IonIcon style={styles.icon} name={'play'} color={COLORS.greenesh} size={30} />
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
    const current = await TrackPlayer.getCurrentTrack();
    const queue = await TrackPlayer.getQueue();
    var track = await TrackPlayer.getTrack(current);

    if (queue.length - 1 == current) {
      SameCategory(track.Category[1]);
    }
    await TrackPlayer.skipToPrevious();
    current = await TrackPlayer.getCurrentTrack();
    track = await TrackPlayer.getTrack(current);
    setCurrentTrack(track);
    await TrackPlayer.play()
    
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
          <View style={styles.vertical}>
          <View style={styles.text}>
            <Text style={styles.songname}>{currentTrack?.title}</Text>
            <Octicons name={'dot-fill'} size={10} color={'white'} />
            <Text style={styles.songartist}>{currentTrack?.artist}</Text>
          </View>
        
          <View style={styles.text}>
          <IonIcon style={styles.bluetooth} name={'bluetooth-sharp'} size={20} color={COLORS.terkwaz}/>
            <Octicons style={styles.dot} name={'dot-fill'} size={10} color={COLORS.terkwaz} />
            <Text style={styles.songartist}>{useBluetoothHeadsetDetection()}</Text>
            </View>
          
          </View>
          <View style={styles.PressableHolder}>
            <Pressable style={styles.Pressable}>
              <IonIcon style={styles.icon} name="heart" color={COLORS.greenesh} size={30} />
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
    // backgroundColor:'yellow'
  },
  image: {
    width: '15%',
    height: '100%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex:1,
    // backgroundColor:'red',
  },
  songname: {
    marginLeft: 5,
    marginRight: 5,
    ...FONTS.h5,
    color: COLORS.lightGray,
    // padding:'2%'
  },
  songartist: {
    marginLeft: 5,
    ...FONTS.h5,
    color: 'gray',
  },
  PressableHolder: {
    alignItems: 'center',
    marginLeft: 15,
    flexDirection: 'row',
    // backgroundColor:"red",
    justifyContent: 'flex-end',
    marginRight:'3%'
  },
  Pressable: {
    marginLeft: 10,
  },
  progress: {
    height: 3,
    backgroundColor: COLORS.terkwaz,
  },
  vertical:{
    flexDirection:'column',
    flex:1,
    // backgroundColor:"yellow"
  },
  bluetooth:{
    marginBottom:5
  },
  dot:{
    margin:2,
    marginBottom:8
  }
});

export default MiniPlayer;
