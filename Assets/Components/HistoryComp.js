import React from 'react';
import {View,Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '../Data/Dimentions';

// IMPORTANT continue and maybe adjust the mechanic in which to add the song to the array with only the same day and not every new song (Y)
const HistoryComp = props => {
  return (
    <View style={styles.TrackHolder}>
      <Image style={styles.image} resizeMode="contain" source={props?.track.artwork} />
      <Text style={styles.title}>{props?.track.title}</Text>
      <View style={{alignItems:'flex-end',marginRight:'4%',flex:1}}>
      <TouchableOpacity>
      <IonIcon name={'ellipsis-vertical'} size={30} color={'black'} />
      </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: '30%',
    height: 50,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  title:{
  ...FONTS.h4,
  marginLeft: 5,
  alignSelf: 'center',
  color: COLORS.terkwaz,
},TrackHolder: {
  width: '100%',
  height: 50,
  flexDirection: 'row',
  margin:'2%',
  marginBottom: '2%',
  alignItems: 'center',
  backgroundColor: 'rgba(90, 90, 90, 0.3)',
  borderRadius: 5,
},
});

export default HistoryComp;
