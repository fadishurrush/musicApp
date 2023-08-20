import {BottomSheetBackdrop, BottomSheetView} from '@gorhom/bottom-sheet';
import React, { useContext, useRef } from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import UserContext from '../../store/UserContext';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../Data/Dimentions';
import IonIcon from 'react-native-vector-icons/Ionicons';
import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheetComp = (props) => {

  const {setSheetOpen,sheetOpen,bottomSheetRef , track , title} = props
  const {
    userFavorites,
    userPlaylists,
    setUserPlaylists,
    currentUserEmail,
    setUserFavorites,
  } = useContext(UserContext);

  const snapPoints = ['20%', '50%'];


  const isFavorite = () => {
    for (let index = 0; index < userFavorites.length; index++) {
      const element = userFavorites[index];
      if (element.title === track?.title) {
        return 'heart';
      }
    }
    return 'heart-outline';
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

  const addToQueue = async () => {
    await TrackPlayer.add(track);
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
      title: 'Add to Queue',
      icon: 'add-circle-outline',
      action: () => addToQueue(),
    },
  ];

  const params = {
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
  }

  return (
    <BottomSheet index={-1} {...params.bottomSheet}>
      <BottomSheetView style={{borderBottomWidth: 1, width: '100%'}}>
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
              <IonIcon
                style={styles.icon}
                name={op.icon}
                size={25}
                color={'grey'}
              />
              <Text style={styles.optionsText}>{op.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </BottomSheetView>
      {/* {sheetOpen? optionsComp() : null} */}
    </BottomSheet>
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

export default BottomSheetComp;
