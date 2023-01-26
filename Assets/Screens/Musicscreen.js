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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useEffect, useState} from 'react';
import TrackPlayer, {State} from 'react-native-track-player';
import {Songs} from '../Data/Songs';
import SliderComp from '../Components/SliderComp';
import {COntroller} from '../Components/Controller';
import { ScreenNames } from '../Data/ScreenNames';

const Muiscscreen = ({route, navigation}) => {
  const [isTrackerReady, setIsTrackerReady] = useState(false);
  const [playname,setplayname]=useState('play')
  const {item} = route?.params || {};

  const check = async () => {
    const track = await TrackPlayer.getTrack(0);
    const state = await TrackPlayer.getState();
    console.log("track : " , track);
    if(track!=null){
      console.log("item : ", item);
      if (track.title != item.title) {
        setplayname('play');
      } else {
        if(state==State.Playing){
          setplayname('pause')
        }
      }
    }else{
      setplayname('play');
    }
  };

  const updateTrackPlayer = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add([item]);
  };

  const TrackPlayerRestarter = async item => {
    const isServiceRunning = await TrackPlayer.isServiceRunning();
    if (!isServiceRunning) {
      
      await TrackPlayer.setupPlayer();
      await updateTrackPlayer()
      setIsTrackerReady(true);
    } else {
      console.log('is running');
      await updateTrackPlayer();
      setIsTrackerReady(true);
    }
  };


  useEffect(() => {
    check();
    console.log('item: ', item);
    TrackPlayerRestarter(item);
    return () => {
      console.log('out');
    };
  }, []);

  if (!isTrackerReady) {
    return <ActivityIndicator size={'large'} style={{flex: 1}} />;
  }

  return (
    <ImageBackground
      style={{flex: 1, justifyContent: 'center'}}
      source={require('../BackGroundImages/Gradient-blue.jpg')}>
      <Pressable style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={35} color={COLORS.terkwaz} />
      </Pressable>
      <Image
        style={styles.Img}
        resizeMode="cover"
        source={route.params.item?.artwork}></Image>
      <Text style={styles.songname}>{route.params.item?.title}</Text>
      <Text style={styles.songartist}>{route.params.item?.artist}</Text>

      <SliderComp />
      {/* controller comp */}
      <COntroller playname={playname}/>

      <Pressable 
        onPress={()=> navigation.navigate(ScreenNames.Track,{item})}>
        <Text>
          press to go to Track screen
        </Text>
      </Pressable>
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
    left: 25,
    top: 25,
  },
});

export default Muiscscreen;
