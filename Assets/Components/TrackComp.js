import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MusicContext from '../../store/MusicContext';
import {FONTS, COLORS} from '../Data/Dimentions';
import {History} from '../Data/History';

const TrackComp = props => {
  const [heartname, setheartname] = useState('heart-outline');
  const [heartcolor, setheartcolor] = useState('black');

  const playbackState = usePlaybackState();
  const {
    isPlaying,
    setIsPlaying,
    currentTrack,
    setCurrentTrack,
    trackArr,
    date,
  } = useContext(MusicContext);

  // useEffect(() => {
  //   console.log('playbackstate = ', playbackState);
  //   setIsPlaying(playbackState)
  // }, [playbackState]);

  const addSong = async () => {
    await TrackPlayer.add(props.item);
  };

  const playerModes = {
    loading: <ActivityIndicator size={30} />,
    playing: (
      <IonIcon style={styles.icon} name={'pause'} color={'black'} size={30} />
    ),
    paused: (
      <IonIcon style={styles.icon} name={'play'} color={'black'} size={30} />
    ),
  };

  const renderPlayButton = () => {
    console.log('item title is ', props.item.title);
    console.log('currentTrack is ', currentTrack);
    console.log('is playing is ', isPlaying);
    if (currentTrack?.title == props?.item.title) {
      return playerModes[isPlaying];
    } else {
      return (
        <IonIcon style={styles.icon} name={'play'} color={'black'} size={30} />
      );
    }
  };

  const validDate = () => {
    var day = new Date();

    let UTC = day.getUTCDate();
    let dateUTC = date.getUTCDate();
    let month = day.getMonth();
    let datemonth = date.getMonth();
    let year = day.getFullYear();
    let dateyear = date.getFullYear();

    console.log('current date ', month, UTC, year);
    console.log('opened app in ', datemonth, dateUTC, dateyear);
    console.log('track arr', trackArr);

    if (
      date.getUTCDate() != day.getUTCDate() ||
      date.getMonth() != day.getMonth() ||
      date.getFullYear() != day.getFullYear()
    ) {
      trackArr = [];
      console.log('new TrackArr new day ', trackArr);
      trackArr.push(props?.item);
      History.push({time: day, trackArr: trackArr});
    } else if (History.length < 1) {
      trackArr.push(props?.item);
      History.push({time: day, trackArr: trackArr});
      console.log('new TrackArr ', trackArr);
    }else{

    }
  };

  const addNewItemToTrack = async () => {
    console.log('no songs!');
    await TrackPlayer.add(props.item);
    // validDate();
    setCurrentTrack(props?.item);
    await TrackPlayer.play();
    setIsPlaying('playing');
    console.log('song added!');
  };

  const setNewSongToTrack = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add(props.item);
    // validDate();
    setCurrentTrack(props?.item);
    await TrackPlayer.play();
    setIsPlaying('playing');
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

  const playBack = async () => {
    const track = await TrackPlayer.getTrack(0);
    const state = await TrackPlayer.getState();
    console.log('TrackPlayer State :', `${state}`);

    if (track) {
      console.log('track : ', track);
      if (track.title != props?.item.title) {
        console.log('setting new song');
        await setNewSongToTrack();
      } else {
        await toggleTrack();
        console.log('toggling track');
      }
    } else {
      await addNewItemToTrack();
    }
  };

  return (
    <View style={styles.TrackHolder}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={props?.item.artwork}
      />
      <Text style={styles.title}>{props?.item.title}</Text>
      <View style={styles.PressableHolder}>
        <Pressable style={styles.Pressable}>
          <IonIcon
            style={styles.icon}
            name={heartname}
            color={heartcolor}
            size={30}
          />
        </Pressable>
        <Pressable style={styles.Pressable} onPress={async () => playBack()}>
          {renderPlayButton()}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '30%',
    height: 50,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  TrackHolder: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    marginBottom: '2%',
    alignItems: 'center',
    backgroundColor: 'rgba(90, 90, 90, 0.3)',
    borderRadius: 5,
  },
  title: {
    ...FONTS.h4,
    marginLeft: 5,
    alignSelf: 'center',
    color: COLORS.terkwaz,
  },
  PressableHolder: {
    alignItems: 'flex-end',
    marginLeft: 15,
    flexDirection: 'row',
    // backgroundColor:"red",
    flex: 1,
    justifyContent: 'flex-end',
  },
  Pressable: {
    marginLeft: 10,
  },
  icon: {
    // backgroundColor: 'red',
  },
});

export default TrackComp;
