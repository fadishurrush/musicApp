import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../Data/Dimentions';
import IonIcon from 'react-native-vector-icons/Ionicons';
import SliderComp from './SliderComp';
import {COntroller} from './Controller';
import {useContext} from 'react';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import MusicContext from '../../store/MusicContext';

const MusicModalComp = () => {
  const {currentTrack, modalVisible, setModalVisible} =
    useContext(MusicContext);

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../BackGroundImages/Gradient-blue.jpg')}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Pressable
            style={styles.back}
            onPress={() => setModalVisible(!modalVisible)}>
            <IonIcon
              style={{alignSelf: 'center'}}
              name="arrow-down"
              size={35}
              color={COLORS.terkwaz}
            />
          </Pressable>
          <Image
            style={styles.Img}
            resizeMode="cover"
            source={currentTrack?.artwork}></Image>
          <Text style={styles.songname}>{currentTrack?.title}</Text>
          <Text style={styles.songartist}>{currentTrack?.artist}</Text>

          <SliderComp />
          {/* controller comp */}
          <COntroller />
        </View>
        <Text style={styles.lyricTitle}>Lyrics</Text>
        <View style={styles.lyricsContainer}></View>
      </ScrollView>
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
  },
  back: {
    position: 'absolute',
    left: 20,
    top: 25,
    width: '10%',
    height: '5%',
    // backgroundColor:"red",
  },
  container: {
    width: '100%',
    height: SIZES.height,
    flex: 1,
    justifyContent: 'center',
  },
  lyricTitle: {
    textAlign: 'center',
    ...FONTS.largeTitle,
  },
  lyricsContainer: {
    width: '90%',
    height: SIZES.height / 2,
    alignSelf: 'center',
  },
});

export default MusicModalComp;
