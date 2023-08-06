import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  Touchable,
  View,
} from 'react-native';
import HistoryComp from '../Components/HistoryComp';
import {COLORS, FONTS, SIZES} from '../Data/Dimentions';
import UserContext from '../../store/UserContext';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IonIcon from 'react-native-vector-icons/Ionicons';

const HistoryScreen = () => {
  const bottomSheetRef = useRef(null);
  const {userFavorites, userPlaylists, setUserPlaylists} =
    useContext(UserContext);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [track, setTrack] = useState(null);
  const {history} = useContext(UserContext);
  const renderComp = song => (
    <HistoryComp track={song.item} index={song.index} {...params.historyComp} />
  );

  useEffect(() => {}, []);
  const snapPoints = ['20%', '50%'];

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
    bottomSheet: {
      ref: bottomSheetRef,
      snapPoints: snapPoints,
      onClose: () => setSheetOpen(false),
      enablePanDownToClose: true,
      backgroundStyle: styles.bottomSheet,
      backdropComponent: backdropProps => (
        <BottomSheetBackdrop
          {...backdropProps}
          enableTouchThrough={false}
          pressBehavior={'close'}
        />
      ),
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

  const isFavorite = () => {
    for (let index = 0; index < userFavorites.length; index++) {
      const element = userFavorites[index];
      if (element.title === track?.title) {
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
  ];

  const optionsComp = () =>
    options.map((op, i) => (
      <TouchableOpacity
        key={i}
        onPress={op.action}
        style={{
          backgroundColor: 'yellow',
          flex: 1,
          borderBottomWidth: i === options.length - 1 ? 0 : 1,
        }}>
        {console.log('index is ,', i)}
        {console.log('op is ,', op)}
        <Text style={{fontSize: 38}}>{op.title}</Text>
        <IonIcon name={op.icon} size={25} color={'black'} />
      </TouchableOpacity>
    ));

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../BackGroundImages/Dark-background.jpg')}>
      {history && history.length > 0 ? (
        [
          <FlatList {...params.FlatList} />,
          <BottomSheet index={-1} {...params.bottomSheet}>
            <BottomSheetView style={{alignSelf: 'center'}}>
              <Text style={styles.headerText}>{title}</Text>
            </BottomSheetView>
            <BottomSheetView style={{ flex: 1}}>
              {/* {optionsComp()} */}
              {options.map((op, i) => (
                <TouchableOpacity onPress={op.action} style={[styles.options , {borderBottomWidth: i === options.length - 1 ? 0 : 1}]}>
                  <Text style={{fontSize: 38}}>{op.title}</Text>
                  <IonIcon name={op.icon} size={25} color={'black'} />
                </TouchableOpacity>
              ))}
            </BottomSheetView>
            {/* {sheetOpen? optionsComp() : null} */}
          </BottomSheet>,
        ]
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
  },
  bottomSheet: {backgroundColor: COLORS.gray, borderRadius: 35},
  options:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingVertical:7
  },

});

export default HistoryScreen;
