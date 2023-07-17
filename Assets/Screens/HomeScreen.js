import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SIZES, FONTS, COLORS} from '../Data/Dimentions';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {
  Capability,
  usePlaybackState,
} from 'react-native-track-player';
import ImageCard from '../Components/ImageCard';
import {Songs as SongsArray} from '../Data/Songs';
import {ScreenNames} from '../Data/ScreenNames';
import {setcontext} from '../Data/playBack';
import MusicContext from '../../store/MusicContext';

export const Homescreen = ({navigation}) => {
  const [songs, setSongs] = useState(SongsArray);
  const [isTrackerReady, setIsTrackerReady] = useState(false);
  const [text, setText] = useState('');
  const {setIsPlaying, setCurrentTrack, currentTrack} =
    useContext(MusicContext);
  const playbackState = usePlaybackState();

  const MainIcons = () => {
    return (
      // bell icon
      <View style={styles.Container}>
        <TouchableOpacity>
          <Octicons name={'bell'} size={35} color={COLORS.terkwaz} />
        </TouchableOpacity>
        {/* history icon */}
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenNames.History)}>
          <MaterialIcons name={'history'} size={40} color={COLORS.terkwaz} />
        </TouchableOpacity>
        {/* settings icon */}
        <TouchableOpacity>
          <MaterialIcons name={'settings'} size={40} color={COLORS.terkwaz} />
        </TouchableOpacity>
      </View>
    );
  };
  const WelcomingText = () => {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.Text}>{'hello'}</Text>
        <Text style={styles.timeText}>{text}</Text>
      </View>
    );
  };
  const TrackPlayerRestarter = async () => {
    const isServiceRunning = await TrackPlayer.isServiceRunning();
    if (!isServiceRunning) {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        // AppKilledPlaybackBehavior: AppKilledPlaybackBehavior.PausePlayback,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
      setIsTrackerReady(true);
    } else {
      setIsTrackerReady(true);
    }
  };

  useEffect(() => {
    // player set up
    TrackPlayerRestarter();
    
    // Time related text

    let today = new Date();

    let hours = today.getHours();
    if (hours <= 12 && hours >= 6) {
      setText('Good morning');
    } else if (hours <= 17 && hours > 12) {
      setText('Good afternoon');
    } else if (hours <= 22 && hours > 17) {
      setText('Good evening');
    } else {
      setText('sleep time');
    }
  }, []);

  const renderItem2 = ({item}) => {
    return (
      <TouchableOpacity
        onPress={async () =>
          navigation.navigate(ScreenNames.Track, {item, isTrackerReady})
        }>
        <ImageCard item={item} />
      </TouchableOpacity>
    );
  };

  const params = {
    SongFlatList: {
      data: songs,
      renderItem: renderItem2,
      showsVerticalsScrollIndicator: false,
      keyExtractor: item => `${item?._id}`,
      contentContainerStyle: {
        paddingHorizontal: SIZES.padding * 2,
        paddingBottom: 30,
      },
      style: {...styles.SongFlatList},
    },
  };
  return (
    <ImageBackground
      style={styles.Backgroundimg}
      source={require('../BackGroundImages/Dark-background.jpg')}>
      <View style={styles.HeaderContainer}>
        {WelcomingText()}
        {MainIcons()}
      </View>
      <FlatList {...params.SongFlatList} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: '10%',
    // backgroundColor:'red',
    marginRight: '5%',
    flexDirection: 'row',
  },
  textContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '60%',
    // backgroundColor:'red',
    height: '100%',
  },
  Text: {
    color: COLORS.terkwaz,
    alignSelf: 'flex-start',
    marginTop: '5%',
    marginLeft: '10%',
    ...FONTS.h2,
  },
  timeText: {
    alignSelf: 'flex-start',
    color: COLORS.terkwaz,
    marginLeft: '10%',
    fontWeight: '100',
    ...FONTS.h1,
  },
  Backgroundimg: {
    flex: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  CateFlatList: {
    // backgroundColor:'red',
    maxHeight: '15%',
    minHeight: '15%',
  },
  SongFlatList: {
    // backgroundColor:'yellow',
    marginTop: '5%',
    marginHorizontal: '5%',
  },
  playButtonsHolder: {
    flexDirection: 'row',
    height: '10%',
    // backgroundColor:'red',
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },
  HeaderContainer: {
    flexDirection: 'row',
    height: '10%',
    marginTop: '5%',
  },
  Touchable: {
    padding: SIZES.padding,
    paddingBottom: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.padding,
  },
  CateText: {
    fontSize: 30,
  },
});
