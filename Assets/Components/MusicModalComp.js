import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS, FONTS} from '../Data/Dimentions';
import IonIcon from 'react-native-vector-icons/Ionicons';
import SliderComp from './SliderComp';
import {COntroller} from './Controller';
import {ScreenNames} from '../Data/ScreenNames';
import {useContext, useEffect, useState} from 'react';
import TrackPlayer, {State} from 'react-native-track-player';
import MusicContext from '../../store/MusicContext';

const MusicModalComp = () => {
  const [playname, setplayname] = useState('play');
  const [loading, setLoading] = useState('true');
  const {isPlaying, setIsPlaying, currentTrack,setCurrentTrack  , modalVisible, setModalVisible} =
    useContext(MusicContext);
  useEffect(() => {
    console.log('current Track =', currentTrack);
    togglePlayname();
  }, []);

  const togglePlayname = async () => {
    const state = await TrackPlayer.getState();
    if (state == State.Playing) {
      setLoading(false);
      setplayname('pause');
    } else if (state == State.Paused) {
      setLoading(false);
      setplayname('play');
    } else {
      setLoading(true);
    }
  };
  return (
    <ImageBackground
      style={{flex: 1, justifyContent: 'center'}}
      source={require('../BackGroundImages/Gradient-blue.jpg')}>
        <Pressable style={styles.back} onPress={() => setModalVisible(!modalVisible)}>
        <IonIcon name="arrow-down" size={35} color={COLORS.terkwaz} />
      </Pressable>
      <Image
        style={styles.Img}
        resizeMode="cover"
        source={currentTrack?.artwork}></Image>
      <Text style={styles.songname}>{currentTrack?.title}</Text>
      <Text style={styles.songartist}>
        {currentTrack?.artist}
      </Text>

      <SliderComp />
      {/* controller comp */}
      {!loading && <COntroller playname={playname} />}
      {loading && <ActivityIndicator size={65} />}
      <Pressable
        onPress={() =>
          navigation.navigate(ScreenNames.Track, {currentTrack})
        }></Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  Img: {
    width: '70%',
    height: '40%',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: '5%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  songartist: {
    color: COLORS.greenesh,
    ...FONTS.h2,
    textAlign: 'center',
  },
  songname: {
    color: COLORS.greenesh,
    ...FONTS.h1,
    textAlign: 'center',
    marginTop: 5,
  },back: {
    position: 'absolute',
    left: 25,
    top: 25,
  },
});

export default MusicModalComp;
