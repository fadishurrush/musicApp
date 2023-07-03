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
import {Songs as songsArray} from '../Data/Songs';

const TrackComp = props => {
  const [heartname, setheartname] = useState('heart-outline');
  const [heartcolor, setheartcolor] = useState('black');

  const playbackState = usePlaybackState();
  const {
    isPlaying,
    setIsPlaying,
    currentTrack,
    setCurrentTrack,
    History,
    today,
  } = useContext(MusicContext);

  const SameCategory = category => {
    //filter songs
    let songsList = songsArray.filter(
      a => a.Category.includes(category) && a.title !== props?.item.title,
    );
    TrackPlayer.add(songsList);
    playBack();
  };

  useEffect(() => {
    if (isPlaying === 'stopped') {
      SameCategory(props?.item.Category[1]);
    }
  }, [isPlaying]);

  const playerModes = {
    loading: <ActivityIndicator size={30} />,
    idle: <ActivityIndicator size={30} />,
    connecting: <ActivityIndicator size={30} />,
    playing: (
      <IonIcon style={styles.icon} name={'pause'} color={'black'} size={30} />
    ),
    paused: (
      <IonIcon style={styles.icon} name={'play'} color={'black'} size={30} />
    ),
    ready: (
      <IonIcon style={styles.icon} name={'play'} color={'black'} size={30} />
    ),
    stopped: (
      <IonIcon style={styles.icon} name={'play'} color={'black'} size={30} />
    ),
  };

  const renderPlayButton = () => {
    if (currentTrack?.title == props?.item.title) {
      return playerModes[isPlaying];
    } else {
      return (
        <IonIcon style={styles.icon} name={'play'} color={'black'} size={30} />
      );
    }
  };

  const historyValid = () => {
    if (History) {
      return true;
    }
    const {day} = History[0];

    let UTC = day.getUTCDate();
    let TodayUTC = today.getUTCDate();
    let month = day.getMonth();
    let Todaymonth = today.getMonth();
    let year = day.getFullYear();
    let Todayyear = today.getFullYear();
    var tod = new Date(Todayyear, Todaymonth, TodayUTC);
    var d = new Date(year, month, UTC);
    if (tod === d) {
      return false;
    }
    return true;
  };
  const historyCheck = () => {
    if (!historyValid) {
      let {item} = props;
      var newDay = {day: today, song: [item]};
      fetch('https://mozikapp.onrender.com/addHistory', {
        method: 'POST',
        body: JSON.stringify(newDay),
      })
        .then(res => res.json())
        .then(data => {
        })
        .catch(e => {
          console.log('error ', e);
        });
    } else {
      var {song} = History;
      song?.includes(props?.item)
        ? null
        : song?.add(props?.item);
    }
  };
  const addNewItemToTrack = async () => {
    await TrackPlayer.add(props.item);
    // historyCheck();
    setCurrentTrack(props?.item);
    await TrackPlayer.play();
    setIsPlaying('playing');
  };

  const setNewSongToTrack = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add(props.item);
    // historyCheck();
    setCurrentTrack(props?.item);
    await TrackPlayer.play();
    setIsPlaying('playing');
  };

  const pasueTrack = async () => {
    await TrackPlayer.pause();
    setIsPlaying('paused');
  };

  const playTrack = async () => {
    await TrackPlayer.play();
    setIsPlaying('playing');
  };

  const toggleTrack = async () => {
    if (playbackState === 'playing' || playbackState === 3) {
      await pasueTrack();
    } else {
      await playTrack();
    }
  };

  const playBack = async () => {
    const current = await TrackPlayer.getCurrentTrack()
    const track = await TrackPlayer.getTrack(current);

    if (track) {
      if (track.title != props?.item.title) {
        await setNewSongToTrack();
      } else {
        await toggleTrack();
      }
    } else {
      await addNewItemToTrack();
    }
  };

  return (
    <View style={styles.TrackHolder}>
      <Image
        style={styles.image}
        resizeMode="contain"
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
        <Pressable
          style={styles.Pressable}
          onPress={async () => await playBack()}>
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
