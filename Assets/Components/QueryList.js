import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, SIZES} from '../Data/Dimentions';
import {SearchCatagories} from '../Data/SearchCategories';
import QueryComp from './QueryComp';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../Data/ScreenNames';

const QueryList = ({searchPhrase, setClicked, data}) => {
  const [list, setList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const onSelectCategory = category => {
    //filter songs
    let songsList = data.filter(a => {
      (a.Category.includes(category.id) &&
        a.title
          .toUpperCase()
          .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))) ||
        a.artist
          .toUpperCase()
          .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''));
    });

    setList(songsList);
    setSelectedCategory(category);
  };

  useEffect(() => {
    check();
  }, [searchPhrase]);

  const check = () => {
    if (searchPhrase == '') {
      setList([]);
      return;
    }
    let titleList = data.filter(val => {
      return (
      val.title
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, '')) ||
        val.artist
          .toUpperCase()
          .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
      )
    });
    console.log("title list ", titleList);
    setList(titleList);
  };

  const renderList = ({item}) => {
    return <QueryComp item={item} />;
  };

  const renderCate = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.Touchable}
        onPress={() => onSelectCategory(item)}>
        <Text
          style={[
            styles.Text,
            {
              color:
                selectedCategory?.id == item.id
                  ? COLORS.secondary
                  : COLORS.terkwaz,
            },
          ]}>
          {item.name}
        </Text>
        <Octicons
          name={selectedCategory?.id == item.id ? 'dot-fill' : 'dot'}
          color={
            selectedCategory?.id == item.id
              ? COLORS.secondary
              : COLORS.transparent
          }
          size={15}
        />
      </TouchableOpacity>
    );
  };
  const params = {
    Flatlist: {
      data: list,
      renderItem: renderList,
      keyExtractor: item => item.id,
      //   style: {backgroundColor: 'red'},
      extraData: data,
    },
    CateFlatList: {
      horizontal: true,
      data: SearchCatagories,
      renderItem: renderCate,
      showsHorizontalScrollIndicator: false,
      keyExtractor: item => `${item.id}`,
      style: {...styles.CateFlatList},
    },
  };
  return (
    <View
      style={{flex: 1}}
      onStartShouldSetResponder={() => {
        setClicked(false);
      }}>
      {/* {!searchPhrase == '' && <FlatList {...params.CateFlatList} />} */}
      <FlatList {...params.Flatlist} />
    </View>
  );
};

const styles = StyleSheet.create({
  CateFlatList: {
    maxHeight: '10%',
    minHeight: '10%',
    width: '100%',
    backgroundColor: 'red',
  },
  Text: {
    fontSize: 30,
  },
  Touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.padding,
  },
});

export default QueryList;
