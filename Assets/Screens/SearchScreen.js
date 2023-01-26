import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import QueryComp from '../Components/QueryComp';
import QueryList from '../Components/QueryList';
import SearchBar from '../Components/SearchBar';
import {COLORS, FONTS} from '../Data/Dimentions';
import {Songs} from '../Data/Songs';

const textComp = () => {
  return (
    <View style={styles.textcontanier}>
      <Text style={styles.mainText}>Search what you love</Text>
      <Text style={styles.secondaryText}>
        Search for artist, songs, podcast, and more.
      </Text>
    </View>
  );
};

const SearchScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);

  return (
    <View style={styles.container}>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {searchPhrase == '' && textComp()}

      <QueryList
        searchPhrase={searchPhrase}
        data={Songs}
        setClicked={setClicked}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  textcontanier: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  mainText: {
    ...FONTS.h1,
    color: 'white',
  },
  secondaryText: {
    ...FONTS.h4,
    color: COLORS.lightGray,
  },
});
export default SearchScreen;
