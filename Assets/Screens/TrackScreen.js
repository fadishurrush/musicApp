import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import TrackComp from '../Components/TrackComp';
import {COLORS, FONTS} from '../Data/Dimentions';
import {Songs as songsArray} from '../Data/Songs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TrackScreen = ({route, navigation}) => {
  const [songs, setSongs] = useState(songsArray);
  const {item} = route?.params || {};

  useEffect(() => {
    TrackPosition();
  }, []);

  const TrackPosition = () => {
    //filter songs
    let songs = songsArray.filter(
      a => a.Category.includes(item?.Category[0]) && a.title != item.title,
    );
    songs.unshift(item);
  
    setSongs(songs);
  };

  const renderItem = ({item}) => {
    return <TrackComp item={item} />;
  };
  const params = {
    FlatList: {
      data: songs,
      renderItem: renderItem,
      showsHorizontalScrollIndicator: false,
      style: {...styles.TrackFlatList},
      // contentContainerStyle: {},
    },
  };

  const NavBack = () => {
    return (
      <Pressable style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={35} color={COLORS.terkwaz} />
      </Pressable>
    );
  };

  return (
    <ImageBackground
      style={{flex: 1, alignItems: 'center'}}
      source={require('../BackGroundImages/Gradient-blue_black.jpg')}>
      {NavBack()}
      {/* {detailes()} */}
      <Image style={styles.Img} resizeMode="cover" source={item?.artwork} />
      <Text style={styles.songname}>{item?.title}</Text>
      <Text style={styles.songartist}>{item?.artist}</Text>
      <FlatList {...params.FlatList} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  Img: {
    width: '60%',
    height: '25%',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: '2%',
    marginTop: '15%',
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
    ...FONTS.h3,
    textAlign: 'center',
  },
  songname: {
    color: COLORS.greenesh,
    ...FONTS.h2,
    textAlign: 'center',
    marginTop: 5,
  },
  TrackFlatList: {
    marginTop: '5%',
    width: '70%',
  },
  back: {
    position: 'absolute',
    left: 25,
    top: 25,
  },
});

export default TrackScreen;
