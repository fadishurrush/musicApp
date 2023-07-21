import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, SIZES} from '../Data/Dimentions';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../Data/ScreenNames';
import UserContext from '../../store/UserContext';
import BottomSheet from '@gorhom/bottom-sheet';

// IMPORTANT continue and maybe adjust the mechanic in which to add the song to the array with only the same day and not every new song (Y)
const HistoryComp = props => {
  const navigation = useNavigation();
  const {userFavorites, userPlaylists, setUserPlaylists} =
    useContext(UserContext);
  const bottomSheetRef = useRef<BottomSheet>(null)

  const {track} = props;
  const item = track;

  const showActionSheet = () => {
    bottomSheetRef.current.show();
  };

  const hideActionSheet = () => {
    bottomSheetRef.current.hide();
  };

  const isFavorite = () => {
    for (let index = 0; index < userFavorites.length; index++) {
      const element = userFavorites[index];
      if (element.title === track.title) {
        return 'heart';
      }
    }
    return 'heart-outline';
  };

  const options = [
    {
      title: 'fav',
      icon: isFavorite(),
      action: () => makeFavorite(),
    },
    {
      title: 'save',
      icon: 'save-outline',
      action: () => makeFavorite(),
    },
    {
      title: 'cancel',
      icon: 'save-outline',
      action: () => makeFavorite(),
    },
  ];

  const detailes = () => {
    return (
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.title}>{track.title}</Text>
        <Text style={styles.artist}>{track.artist}</Text>
      </View>
    );
  };

  const elipises = () => {
    return (
      <TouchableOpacity onPress={() => showActionSheet()}>
        <IonIcon name={'ellipsis-vertical'} size={30} color={'black'} />
      </TouchableOpacity>
    );
  };

  return (
    <TouchableOpacity
      style={styles.TrackHolder}
      onPress={() => {
        navigation.navigate(ScreenNames.Track, {item});
      }}>
      <Image style={styles.image} resizeMode="contain" source={track.artwork} />
      {detailes()}
      <View style={{alignItems: 'flex-end', marginRight: '4%', flex: 1}}>
        {elipises()}
        {/* action sheet 1 */}
        <BottomSheet ref={bottomSheetRef}>

        </BottomSheet>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  image: {
    width: '30%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    height: 0.1 * SIZES.height,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  title: {
    ...FONTS.h3,
    marginLeft: '10%',
    alignSelf: 'center',
    color: COLORS.terkwaz,
    alignSelf: 'flex-start',
  },
  TrackHolder: {
    height: 0.1 * SIZES.height,
    flexDirection: 'row',
    margin: '2%',
    marginBottom: '2%',
    alignItems: 'center',
    backgroundColor: 'rgba(90, 90, 90, 0.3)',
    borderRadius: 10,
  },
  artist: {
    ...FONTS.h5,
    marginLeft: '10%',
    alignSelf: 'flex-start',
    color: COLORS.darkerterkwaz,
  },
  popup: {
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: COLORS.darkgray,
    paddingHorizontal: 10,
    position: 'absolute',
    right: SIZES.width * 0.125,
    width: '40%',
    height: '15%',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
    borderBottomColor: '#ccc',
    flex: 1,
  },
  savePopUp: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    position: 'absolute',
    top: SIZES.height * 0.5,
    right: SIZES.width * 0.5,
    width: '40%',
    height: '15%',
  },
});

export default HistoryComp;
