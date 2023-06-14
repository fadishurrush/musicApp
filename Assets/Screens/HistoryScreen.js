import React, {useContext, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import MusicContext from '../../store/MusicContext';
import HistoryComp from '../Components/HistoryComp';
import {FONTS} from '../Data/Dimentions';

const HistoryScreen = () => {
  const {History} = useContext(MusicContext);
  const renderComp = songArr => {
    for (let index = 0; index < songArr.length; index++) {
      const song = songArr[index];
      return <HistoryComp track={song} />;
    }
  };
  const renderItem = ({item}) => {
    const {day, songArr} = item;

    return (
      <View>
        <Text style={styles.TextDate}>
          {/* {extractDate(time)} */}
          {day}
        </Text>
        {renderComp(songArr)}
      </View>
    );
  };
  const params = {
    FlatList: {
      data: History,
      renderItem: renderItem,
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
    var date = val;
    var y = date.getFullYear();
    var d = date.getDay();
    var m = date.getMonth();
    var UTC = date.getUTCDate();

    return day[d] + ',' + month[m] + UTC + ',' + y;
  };
  return (
    <View>
      {History ? (
        <Text style={{textAlign: 'center', color: 'black'}}>
          No music recently played
        </Text>
      ) : (
        <FlatList {...params.FlatList} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  TextDate: {
    ...FONTS.h1,
    color: 'black',
    marginTop: '5%',
    marginLeft: '2%',
  },
});

export default HistoryScreen;
