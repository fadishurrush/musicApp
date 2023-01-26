import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import HistoryComp from '../Components/HistoryComp';
import {FONTS} from '../Data/Dimentions';
import {History} from '../Data/History';

const HistoryScreen = () => {
    
  const renderComp = trackArr => {
    console.log(trackArr);
    for (let index = 0; index < trackArr.length; index++) {
        const element = trackArr[index];
        return <HistoryComp track={element} />
    }
  };
  const renderItem = ({item}) => {
    const {time, trackArr} = item;
    console.log("track arr ", trackArr);
    return (
      <View>
        <Text style={styles.TextDate}>{extractDate(time)}</Text>
        {renderComp(trackArr)}
      </View>
    );
  };
  const params = {
    FlatList: {
      data: History,
      renderItem: renderItem,
      extraData: History.trackArr
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
  useEffect(() => {
    // console.log("History Track arr -> ",History[0].trackArr)
  }, []);
  const WatchedHistory = () => {
    if (History.length < 1) {
      return (
        <Text style={{textAlign: 'center', color: 'black'}}>
          No music recently played
        </Text>
      );
    } else {
      return <FlatList {...params.FlatList} />;
    }
  };
  return <View>{WatchedHistory()}</View>;
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
