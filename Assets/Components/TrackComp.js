import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MusicContext from '../../store/MusicContext';
import {FONTS, COLORS, SIZES} from '../Data/Dimentions';
import UserContext from '../../store/UserContext';
import {setUserFavoritesApi} from '../../api/api';
import {playerModesTrack} from '../Data/playerModes';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import {Songs as songsArray} from '../Data/Songs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SheetContext from '../../store/SheetContext';
const TrackComp = props => {
  const {
    isPlaying,
    currentTrack,
    setCurrentTrack,
    setIsPlaying,
    History,
    today,
  } = useContext(MusicContext);
  const {userFavorites, setUserFavorites, currentUserEmail} =
    useContext(UserContext);
  const [heartShape, setHeartShape] = useState('heart-outline');
  const playbackState = usePlaybackState();
  const {bottomSheetRef, setSheetOpen, setTitle, setTrack} =
    useContext(SheetContext);

  useEffect(() => {
    isFavorite() ? setHeartShape('heart') : setHeartShape('heart-outline');
  });

  const isFavorite = () => {
    for (let index = 0; index < userFavorites.length; index++) {
      const element = userFavorites[index];
      if (element.title === props.item?.title) {
        return true;
      }
    }
    return false;
  };
  useEffect(() => {
    if (isPlaying === 'stopped') {
      AddNewSongSameCategory();
    }
  }, [isPlaying]);

  const AddNewSongSameCategory = () => {
    //filter songs
    let songsList = songsArray.filter(
      a =>
        a.Category.includes(props?.item?.Category[1]) &&
        a.title !== props?.item.title,
    );
    TrackPlayer.add(songsList);
    playBack();
  };

  const renderPlayButton = () => {
    if (currentTrack?.title == props?.item.title) {
      return playerModesTrack[isPlaying];
    } else {
      return (
        <IonIcon style={styles.icon} name={'play'} color={'black'} size={30} />
      );
    }
  };

  const playBack = async () => {
    const current = await TrackPlayer.getCurrentTrack();
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

  //   add new song
  const addNewItemToTrack = async () => {
    await TrackPlayer.add(props?.item);
    // historyCheck();
    setCurrentTrack(props?.item);
    await TrackPlayer.play();
    setIsPlaying('playing');
  };

  //   set new song
  const setNewSongToTrack = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add(props?.item);
    // historyCheck();
    setCurrentTrack(props?.item);
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

  //   functions to toggle on/off the songs
  const pasueTrack = async () => {
    await TrackPlayer.pause();
    setIsPlaying('paused');
  };

  const playTrack = async () => {
    await TrackPlayer.play();
    setIsPlaying('playing');
  };
  //   end of functions to toggle on/off the song

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
        .then(data => {})
        .catch(e => {
          console.log('error ', e);
        });
    } else {
      var {song} = History;
      song?.includes(props?.item) ? null : song?.add(props?.item);
    }
  };

  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index);
    setSheetOpen(true);
    setTitle(props?.item?.title);
    setTrack(props?.item);
  }, []);

  const Favorite = async () => {
    setUserFavoritesApi(props?.item?.title, currentUserEmail)
      .then(val => {
        if (isFavorite()) {
          var temp = userFavorites.filter(
            val => val.title !== props?.item?.title,
          );
          setUserFavorites(temp);
        } else {
          setUserFavorites([...userFavorites, props?.item]);
        }
      })
      .catch(e => console.log('setfav error ', e));
  };
  const checktitleLength = title => {
    return title.length > 12 ? `${title.substring(0, 12)}...` : title;
  };
  return (
    <View style={styles.TrackHolder}>
      <TouchableOpacity
        style={styles.sheetPress}
        onPress={() => handleSnapPress(0)}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={props?.item?.artwork}
        />
        <Text style={styles.title}>{checktitleLength(props?.item?.title)}</Text>
      </TouchableOpacity>

      <View style={styles.PressableHolder}>
        <Pressable style={styles.Pressable} onPress={() => Favorite()}>
          <IonIcon
            style={styles.icon}
            name={heartShape}
            color={userFavorites.includes(props?.item) ? 'black' : 'black'}
            size={30}
          />
        </Pressable>
        <Pressable
          style={styles.Pressable}
          onPress={async () => await playBack(props?.item)}>
          {renderPlayButton()}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: SIZES.width * 0.21,
    height: '100%',
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
    justifyContent: 'space-between',
  },
  title: {
    ...FONTS.h4,
    marginLeft: 5,
    alignSelf: 'center',
    color: COLORS.terkwaz,
    width: SIZES.width * 0.29,
  },
  PressableHolder: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: SIZES.width * 0.2,
  },
  Pressable: {
    marginLeft: 10,
  },
  sheetPress: {
    flexDirection: 'row',
    borderRadius: 5,
    width: SIZES.width * 0.5,
    height: '100%',
  },
});

export default TrackComp;
