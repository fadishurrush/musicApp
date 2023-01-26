import React from 'react';
import {Keyboard, StyleSheet, TextInput, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';

const SearchBar = ({clicked, setClicked, searchPhrase, setSearchPhrase}) => {
  return (
    <View style={styles.container}>
      <View
        style={styles.searchBarClicked }>
        {clicked && (
          <IonIcons
            name="arrow-back"
            size={30}
            color="black"
            style={{margin: 5}}
            onPress={() => {
              setSearchPhrase('');
              setClicked(false);
              Keyboard.dismiss()
            }}
          />
        )}
        <IonIcons name="search" size={20} color="black" style={{margin: 1}} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  searchBarClicked: {
    flex:1,
    padding: 10,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
  },
});
export default SearchBar;
