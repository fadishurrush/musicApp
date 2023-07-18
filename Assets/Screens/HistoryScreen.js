import React, {useContext, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import MusicContext from '../../store/MusicContext';
import HistoryComp from '../Components/HistoryComp';
import {FONTS} from '../Data/Dimentions';
import UserContext from '../../store/UserContext';

const HistoryScreen = () => {
  const {history} = useContext(UserContext);
  const renderComp = songArr => {
    for (let index = 0; index < songArr.length; index++) {
      const song = songArr[index];
      return <HistoryComp track={song} />;
    }
  };

  useEffect(()=>{
    console.log("history ",history);
  },[])

  const renderItem = (item) => {
    console.log("history ,",history);
    console.log('item ', item);
    const {date, songs} = item;

    return (
      <View>
        <Text style={styles.TextDate}>
          {/* {extractDate(time)} */}
          {date}
        </Text>
        {/* {renderComp(songs)} */}
      </View>
    );
  };
  const params = {
    FlatList: {
      data: history,
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
      {history && history.length > 0 ? (
        <FlatList {...params.FlatList} />
      ) : (
        <Text style={{textAlign: 'center', color: 'black'}}>
          No music have been played on this account
        </Text>
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
