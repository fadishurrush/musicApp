import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS} from '../Data/Dimentions';
import {ScreenNames} from '../Data/ScreenNames';

const QueryComp = ({item}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        console.log('item = ', item);
        navigation.navigate(ScreenNames.Track, {item});
      }}>
      <Image style={styles.image} source={item?.artwork} resizeMode="cover" />
      <View>
        <Text style={styles.SongName}>{item?.title}</Text>
        <Text style={styles.Songartist}>{item?.artist}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    height: 70,
    // backgroundColor: 'red',
    margin: '2%',
  },
  image: {
    width: '20%',
    height: '100%',
    borderBottomLeftRadius: 2,
    borderTopLeftRadius: 2,
  },
  SongName: {
    ...FONTS.h2,
    color: COLORS.lightGray,
    margin: '2%',
    marginLeft: '5%',
  },
  Songartist: {
    ...FONTS.h4,
    color: 'gray',
    margin: '2%',
    marginLeft: '5%',
  },
});

export default QueryComp;
