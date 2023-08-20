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
import IonIcon from 'react-native-vector-icons/Ionicons';
import {setUserFavoritesApi} from '../../api/api';
import TrackPlayer from 'react-native-track-player';

const HistoryScreen = () => {
  const bottomSheetRef = useRef(null);
  const {
    userFavorites,
    userPlaylists,
    setUserPlaylists,
    currentUserEmail,
    setUserFavorites,
  } = useContext(UserContext);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [track, setTrack] = useState(null);
  const {history} = useContext(UserContext);

  const renderComp = song => (
    <HistoryComp track={song.item} index={song.index} {...params.historyComp} />
  );

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
        return 'heart' 
      }
    }
    return 'heart-outline'
  };

  const makeFavorite = async () => {
    console.log('clicked');
    setUserFavoritesApi(title, currentUserEmail)
      .then(() => {
        if (isFavorite() == 'heart') {
          var temp = userFavorites.filter(val => val.title !== title);
          setUserFavorites(temp);
        } else {
          setUserFavorites([...userFavorites, track]);
        }
      })
      .catch(e => {
        console.log('set fav error mini player comp ', e);
      });
  };

  const addToQueue=async ()=>{
    await TrackPlayer.add(track)

  }

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
      title: 'Add to Queue',
      icon: 'add-circle-outline',
      action: () => addToQueue(),
    },
  ];


  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../BackGroundImages/Dark-background.jpg')}>
      {history && history.length > 0 ? (
        [
          <FlatList {...params.FlatList} />,
          <BottomSheet index={-1} {...params.bottomSheet}>
            <BottomSheetView style={{borderBottomWidth:1,width:'100%'}}>
              <Text style={styles.headerText}>{title}</Text>
            </BottomSheetView>
            <BottomSheetView style={{flex: 1}}>
              {/* {optionsComp()} */}
              {options.map((op, i) => (
                <View key={i} style={[styles.options]}>
                  <TouchableOpacity
                    key={i}
                    onPress={op.action}
                    style={[
                      styles.container,
                      {
                        // borderBottomWidth: i === options.length - 1 ? 0 : 1,
                        borderTopRightRadius: i == 0 ? 10 : 0,
                        borderTopLeftRadius: i == 0 ? 10 : 0,
                      },
                    ]}>
                    <IonIcon style={styles.icon} name={op.icon} size={25} color={'grey'} />
                    <Text style={styles.optionsText}>{op.title}</Text>
                  </TouchableOpacity>
                </View>
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
    alignSelf:'center',
    padding:2
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
  icon:{
    marginHorizontal:10
  }
});

export default HistoryScreen;
