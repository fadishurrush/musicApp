import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import HistoryComp from '../Components/HistoryComp';
import {COLORS, FONTS} from '../Data/Dimentions';
import UserContext from '../../store/UserContext';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {setUserFavoritesApi} from '../../api/api';
import TrackPlayer from 'react-native-track-player';
import BottomSheetComp, { bottomSheetRef } from '../Components/BottomSheetComp';
import SheetContext from '../../store/SheetContext';

const HistoryScreen = () => {
  const {track,setTrack,title,setTitle,bottomSheetRef,sheetOpen,setSheetOpen}= useContext(SheetContext)
  const {history} = useContext(UserContext);

  const renderComp = song => (
    <HistoryComp track={song.item} index={song.index} {...params.historyComp} />
  );


  const renderItem = ({item}) => {
    const {Date, songs} = item;

    return (
      <View>
        <Text style={styles.TextDate}>{extractDate(Date)}</Text>
        <FlatList data={songs} {...params.compFlatlist} />
      </View>
    );
  };
  const params = {
    FlatList: {
      data: history,
      renderItem: renderItem,
    },
    compFlatlist: {
      style: {flex: 1},
      renderItem: renderComp,
    },
    historyComp: {
      title: title,
      setTitle: setTitle,
      sheetOpen: sheetOpen,
      setSheetOpen: setSheetOpen,
      bottomSheetRef: bottomSheetRef,
      setTrack: setTrack,
    },
  };

  const extractDate = val => {
    var month = [
      'Jan',
      'Feb',
      'Mar',
      'April',
      'May',
      'June',
      'July',
      'August',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var date = new Date(val);
    var y = date.getFullYear();
    var d = date.getDay();
    var m = date.getMonth();
    var UTC = date.getUTCDate();

    // if()

    return day[d] + ',' + month[m] + UTC + ',' + y;
  };

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../BackGroundImages/Dark-background.jpg')}>
      {history && history.length > 0 ? (
        [<FlatList {...params.FlatList} />]

      ) : (
        <Text style={{textAlign: 'center', color: 'black'}}>
          No music have been played on this account
        </Text>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  TextDate: {
    ...FONTS.h2,
    color: COLORS.terkwaz,
    marginTop: '15%',
    marginLeft: '2%',
  },
  headerText: {
    ...FONTS.h2,
    color: COLORS.terkwaz,
    alignSelf: 'center',
    padding: 2,
  },
  bottomSheet: {backgroundColor: '#2E3339', borderRadius: 35},
  options: {
    // backgroundColor: 'rgba(90, 90, 90, 0.2)',
    marginTop: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset: {
          width: 0,
          height: 4,
        },
      },
      android: {
        elevation: 3.5,
      },
    }),
    borderRadius: 4,
    marginRight: '2%',
    marginLeft: '2%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 7,
    overflow: 'hidden',
    // borderRadius:
  },
  optionsText: {
    ...FONTS.h2,
    color: COLORS.greenesh,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default HistoryScreen;
