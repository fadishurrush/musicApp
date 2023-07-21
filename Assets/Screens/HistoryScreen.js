import React, {useContext, useEffect} from 'react';
import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import HistoryComp from '../Components/HistoryComp';
import {COLORS, FONTS} from '../Data/Dimentions';
import UserContext from '../../store/UserContext';

const HistoryScreen = () => {
  const {history} = useContext(UserContext);
  const renderComp = song => <HistoryComp track={song.item} index={song.index} />;

  useEffect(() => {}, []);

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
      style:{flex:1},
      renderItem: renderComp,
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
    <ImageBackground style={{flex: 1}}  source={require('../BackGroundImages/Dark-background.jpg')}>
      {history && history.length > 0 ? (
        <FlatList {...params.FlatList} />
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
});

export default HistoryScreen;
