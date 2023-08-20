import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, SIZES} from '../Data/Dimentions';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../Data/ScreenNames';
import SheetContext from '../../store/SheetContext';

const HistoryComp = props => {
  const navigation = useNavigation();
  const {track} = props;
  const item = track;
  const {bottomSheetRef, setSheetOpen, setTitle, setTrack} =
    useContext(SheetContext);

  const detailes = () => {
    return (
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.title}>{track.title}</Text>
        <Text style={styles.artist}>{track.artist}</Text>
      </View>
    );
  };

  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index);
    setSheetOpen(true);
    setTitle(track.title);
    setTrack(track);
  }, []);

  const elipises = () => {
    return (
      <View style={styles.elipises}>
        <TouchableOpacity onPress={() => handleSnapPress(0)}>
          <IonIcon name={'ellipsis-vertical'} size={30} color={'black'} />
        </TouchableOpacity>
      </View>
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
      {elipises()}
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
  elipises: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: '4%',
    flex: 1,
  },
});

export default HistoryComp;
