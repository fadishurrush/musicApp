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
import UserContext from '../../store/UserContext';
import AnimatedLottieView from 'lottie-react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

const MiniPlayer = () => {
  const {
    isPlaying,
    setIsPlaying,
    currentTrack,
    modalVisible,
    setModalVisible,
    setCurrentTrack,
  } = useContext(MusicContext);
  const {userFavorites, setUserFavorites, currentUserEmail} =
    useContext(UserContext);
  const playbackState = usePlaybackState();
  const {position, duration} = useProgress();
  const toggleTrack = async () => {
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
    idle: <ActivityIndicator size={30} />,
    connecting: <ActivityIndicator size={30} />,
    playing: (
      <AnimatedLottieView
        source={require('../lottie/sound-voice-waves.json')}
        autoPlay
      />
    ),
    paused: (
      <IonIcon
        style={styles.icon}
        name={'play'}
        color={COLORS.greenesh}
        size={30}
      />
    ),
    stopped: (
      <IonIcon
        style={styles.icon}
        name={'play'}
        color={COLORS.greenesh}
        size={30}
      />
    ),
    ready: (
      <IonIcon
        style={styles.icon}
        name={'play'}
        color={COLORS.greenesh}
        size={30}
      />
    ),
  };

  const pasueTrack = async () => {
    await TrackPlayer.pause();
    setIsPlaying('paused');
  };

  const playTrack = async () => {
    await TrackPlayer.play();
    setIsPlaying('playing');
  };
  const getProgress = () => {
    return (position / duration) * 100;
  };
  const Favorite = async () => {
    setUserFavorites()
      .then(val => {
        if (userFavorites.includes(currentTrack)) {
          var temp = userFavorites.filter(
            val => val.title !== currentTrack.title,
          );
          setUserFavorites(temp);
        } else {
          setUserFavorites([...userFavorites, currentTrack]);
        }
      })
      .catch(e => console.log('setfav error ', e));
  };
  const SameCategory = async category => {
    //filter songs

    let songsList = songsArray.filter(
      a => a.Category.includes(category) && a.title !== currentTrack.title,
    );
    TrackPlayer.add(songsList);
  };
  const playNext = async () => {
    const current = await TrackPlayer.getCurrentTrack();
    const queue = await TrackPlayer.getQueue();
    if (queue.length == current + 1) {
      SameCategory(currentTrack.Category[1]);
    }
    await TrackPlayer.skipToNext();
    const newcurrent = await TrackPlayer.getCurrentTrack();
    const track = await TrackPlayer.getTrack(newcurrent);
    setCurrentTrack(track);
    await TrackPlayer.play();
  };
  const playPrevious = async () => {
    await TrackPlayer.skipToPrevious();
    current = await TrackPlayer.getCurrentTrack();
    track = await TrackPlayer.getTrack(current);
    setCurrentTrack(track);
    await TrackPlayer.play();
  };

  const MusicModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <MusicModalComp />
      </Modal>
    );
  };

  // const imageRender=()=>{
  //   return(

  //   )
  // }

  const HeartIconPress = () => {
    return (
      <Pressable style={styles.Pressable} onPress={() => Favorite()}>
        <IonIcon
          style={styles.icon}
          name={
            userFavorites.includes(currentTrack) ? 'heart' : 'heart-outline'
          }
          color={COLORS.greenesh}
          size={30}
        />
      </Pressable>
    );
  };

  const PlayIconRender = () => {
    return (
      <Pressable style={styles.Pressable} onPress={async () => toggleTrack()}>
        {playerModes[isPlaying]}
      </Pressable>
    );
  };

  const detailes = () => (
    <View style={styles.row}>
      {/* image */}
      <Image style={styles.image} source={currentTrack?.artwork} />
      <View style={styles.vertical}>
        {/* title */}
        <View style={styles.text}>
          {/* artist name */}
          <Text style={styles.songname}>{currentTrack?.title}</Text>
          <Octicons name={'dot-fill'} size={10} color={'white'} />
          <Text style={styles.songartist}>{currentTrack?.artist}</Text>
        </View>
        {/* bluetooth icon */}
        <View style={styles.text}>
          <IonIcon
            style={styles.bluetooth}
            name={'bluetooth-sharp'}
            size={20}
            color={COLORS.terkwaz}
          />
          {/* dot icon */}
          <Octicons
            style={styles.dot}
            name={'dot-fill'}
            size={10}
            color={COLORS.terkwaz}
          />
          <Text style={styles.songartist}></Text>
        </View>
      </View>
      {/* heart icon */}
      <View style={styles.PressableHolder}>
        {HeartIconPress()}
        {PlayIconRender()}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* music pop up page */}
      {MusicModal()}

      <Pressable
        style={{flex: 1}}
        onPress={() => setModalVisible(!modalVisible)}>
        {/* progress bar */}
        <View style={[styles.progress, {width: `${getProgress()}%`}]} />
        {/* detailes */}
        {detailes()}
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
    flex: 1,
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
    marginRight: '3%',
  },
  Pressable: {
    marginLeft: 10,
    // backgroundColor:'red',
    height: '100%',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: {
    height: 3,
    backgroundColor: COLORS.terkwaz,
  },
  vertical: {
    flexDirection: 'column',
    flex: 1,
    // backgroundColor:"yellow"
  },
  bluetooth: {
    marginBottom: 5,
  },
  dot: {
    margin: 2,
    marginBottom: 8,
  },
});

export default MiniPlayer;
