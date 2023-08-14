import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  Animated,
} from 'react-native';
import TrackPlayer, {
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MusicContext from '../../store/MusicContext';
import {COLORS, FONTS, SIZES} from '../Data/Dimentions';
import MusicModalComp from './MusicModalComp';
import UserContext from '../../store/UserContext';
import {addHistoryFromApi, setUserFavoritesApi} from '../../api/api';
import {Swipeable} from 'react-native-gesture-handler';
import {playerModesMini} from '../Data/playerModes';
import {Songs as songsArray} from '../Data/Songs';
import { BleManager } from 'react-native-ble-plx';

const MiniPlayer = () => {
  const {
    isPlaying,
    setIsPlaying,
    currentTrack,
    modalVisible,
    setModalVisible,
    setCurrentTrack,
  } = useContext(MusicContext);
  const {
    userFavorites,
    setUserFavorites,
    currentUserEmail,
    history,
    setHistory,
  } = useContext(UserContext);
  const playbackState = usePlaybackState();
  const {position, duration} = useProgress();
  const [heartShape, setHeartShape] = useState('heart-outline');
  const swipeableRef = useRef(null);
  const manager = new BleManager();

  const scanAndRetrieve=()=>{
    manager.startDeviceScan(null,null,(error,device)=>{
      if(error){
        console.log("error scanning" , error);
        return
      }
      if(device.name){
        console.log("device name ", device.name);
      }
    })
  }

  scanAndRetrieve()

  useEffect(() => {
    setIsPlaying(playbackState);
  }, [playbackState]);

  useEffect(() => {
    isFavorite() ? setHeartShape('heart') : setHeartShape('heart-outline');
  }, [userFavorites]);

  useEffect(() => {
    checkHistory();
  }, [currentTrack]);

  const checkHistory = async () => {
    var newHistory;
    if (!history?.length) {
      let obj = historyObject();
      setHistory([obj]);
      newHistory = [obj];
    } else if (checkDate()) {
      setHistory([historyObject(), ...history]);
      newHistory = [historyObject(), ...history];
    } else {
      if (!songExists()) {
        newHistory = addSongToHistory();
      } else {
        newHistory = sortHistory();
      }
    }
    addHistoryFromApi(currentUserEmail, newHistory).catch(e => {
      console.log('add history error ->', e);
    });
  };

  // adds a song to histroy array in the same day
  const addSongToHistory = () => {
    songArr = history[0]?.songs;
    let newSongArr = [currentTrack];
    songArr = newSongArr.concat(songArr);
    let date = history[0].Date;
    const songObject = {
      Date: date,
      songs: songArr,
    };
    let slicedHistory = history.slice(1);
    setHistory([songObject, ...slicedHistory]);
    return [songObject, ...slicedHistory];
  };

  const historyObject = () => {
    let date = new Date();
    let track = currentTrack;
    const newHistory = {
      Date: date,
      songs: [track],
    };
    return newHistory;
  };

  const checkDate = () => {
    const latestDate = new Date(history[0]?.Date);
    const date = new Date();
    // years
    let latestYear = latestDate.getUTCFullYear();
    let currentYear = date.getUTCFullYear();
    // months
    let latestMonth = latestDate.getMonth();
    let currentMonth = date.getMonth();
    // days
    let latestDay = latestDate.getDay();
    let currentDay = date.getDay();

    if (checkYear(latestYear, currentYear)) {
      return true;
    } else if (checkMonth(latestMonth, currentMonth)) {
      return true;
    } else if (checkDay(latestDay, currentDay)) {
      return true;
    }
    return false;
  };
  // returns true if currentYear is bigger than latestYear else returns false
  const checkYear = (latestYear, currentYear) => {
    return latestYear < currentYear ? true : false;
  };
  // returns true of currentMonth is bigger than latestMonth else returns false
  const checkMonth = (latestMonth, currentMonth) => {
    return currentMonth > latestMonth ? true : false;
  };
  //  returns true if current day is bigger than latest month else returns false
  const checkDay = (latestDay, currentDay) => {
    return currentDay > latestDay ? true : false;
  };
  // sorts the song to make it on the start of the array
  const sortHistory = () => {
    let hisArray = history[0]?.songs;
    hisArray = hisArray.filter((val)=> val.title !== currentTrack.title)
    let newArr = [currentTrack];
    let sortedHistory = newArr.concat(hisArray);
    let date = history[0].Date;
    const songObject = {
      Date: date,
      songs: sortedHistory,
    };
    let slicedHistory = history.slice(1);
    setHistory([songObject, ...slicedHistory]);
    return [songObject, ...slicedHistory];
  };
  // checks if song is in the history array
  const songExists = () => {
    const songsArray = history[0].songs;
    if (songsArray.some(e => e.title === currentTrack.title)) {
      return true;
    } else {
      return false;
    }
  };

  const getProgress = () => {
    return (position / duration) * 100;
  };

  const isFavorite = () => {
    for (let index = 0; index < userFavorites.length; index++) {
      const element = userFavorites[index];
      if (element.title === currentTrack.title) {
        return true;
      }
    }
    return false;
  };

  const Favorite = async () => {
    setUserFavoritesApi(currentTrack.title, currentUserEmail)
      .then(() => {
        if (isFavorite()) {
          var temp = userFavorites.filter(
            val => val.title !== currentTrack.title,
          );
          setUserFavorites(temp);
        } else {
          setUserFavorites([...userFavorites, currentTrack]);
        }
      })
      .catch(e => {
        console.log('set fav error mini player comp ', e);
      });
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
          name={heartShape}
          color={COLORS.greenesh}
          size={30}
        />
      </Pressable>
    );
  };

  const PlayIconRender = () => {
    return (
      <Pressable style={styles.Pressable} onPress={async () => toggleTrack()}>
        {playerModesMini[isPlaying]}
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

  const playNext = async () => {
    const current = await TrackPlayer.getCurrentTrack();
    const queue = await TrackPlayer.getQueue();
    if (queue.length == current + 1) {
      AddNewSongSameCategory(currentTrack.Category[1]);
    }
    await TrackPlayer.skipToNext();
    toggleTrack();
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

  const playPrevious = async () => {
    await TrackPlayer.skipToPrevious();
    setCurrentTrack(currentTrack);
    await TrackPlayer.play();
  };

  const LeftSwipeActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.swipe}>
        <Animated.Text style={{transform: [{scale: scale}]}}>
          Previous Song
        </Animated.Text>
      </View>
    );
  };

  const RightSwipeActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-200, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.swipe}>
        <Animated.Text style={{transform: [{scale: scale}]}}>
          Next Song
        </Animated.Text>
      </View>
    );
  };

  const SwipeOpened = direction => {
    direction === 'left'
      ? playPrevious() && closeSwipeable()
      : playNext() && closeSwipeable();
  };

  const closeSwipeable = () => {
    swipeableRef.current.close();
  };

  const detailes = () => (
    <View style={styles.row}>
      {/* image */}
      <Image style={styles.image} source={currentTrack?.artwork} />
      {/* swipeable */}
      {renderSwipeable()}

      {/*  icons */}
      <View style={styles.PressableHolder}>
        {HeartIconPress()}
        {PlayIconRender()}
      </View>
    </View>
  );

  const renderSwipeable = () => {
    return (
      <Swipeable
        ref={swipeableRef}
        childrenContainerStyle={{flex: 1}}
        renderLeftActions={LeftSwipeActions}
        renderRightActions={RightSwipeActions}
        onSwipeableOpen={direction => SwipeOpened(direction)}>
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
      </Swipeable>
    );
  };

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
    // backgroundColor:'black'
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
    flexDirection: 'row',
    // backgroundColor: 'red',
    position: 'absolute',
    width: '25%',
    height: '100%',
    left: SIZES.width - 105,
    justifyContent: 'flex-end',
  },
  Pressable: {
    // marginLeft: 10,
    // backgroundColor:'yellow',
    height: '100%',
    width: 50,
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
    width: SIZES.width - 0.4 * SIZES.width,
    // backgroundColor: 'yellow',
  },
  bluetooth: {
    marginBottom: 5,
  },
  dot: {
    margin: 2,
    marginBottom: 8,
  },
  swipe: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: 100,
    height: '100%',
    // backgroundColor: 'red',
    // position:'absolute',
    // right:0,
  },
});

export default MiniPlayer;
