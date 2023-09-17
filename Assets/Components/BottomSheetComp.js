import {BottomSheetBackdrop, BottomSheetView} from '@gorhom/bottom-sheet';
import React, {useContext, useEffect, useRef, useState} from 'react';
import UserContext from '../../store/UserContext';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Button,
  BackHandler,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../Data/Dimentions';
import IonIcon from 'react-native-vector-icons/Ionicons';
import BottomSheet from '@gorhom/bottom-sheet';
import TrackPlayer, {State} from 'react-native-track-player';
import {addPlaylistsFromApi, setUserFavoritesApi} from '../../api/api';
import MusicContext from '../../store/MusicContext';

const BottomSheetComp = props => {
  const {
    setSheetOpen,
    setMessage,
    setShowMessage,
    bottomSheetRef,
    track,
    title,
    sheetOpen,
  } = props;
  const {userFavorites, playlists, currentUserEmail, setUserFavorites} =
    useContext(UserContext);
  const {setCurrentTrack} = useContext(MusicContext);
  const [state, setState] = useState('default');
  const [playlistName, setPlaylistName] = useState('');

  const snapPoints = ['30%', '30%', '50%', '50%', '80%'];

  useEffect(() => {
    const backAction = () => {
      bottomSheetRef.current.close();
      backHandler.remove()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
  }, [sheetOpen]);
  const isFavorite = () => {
    for (let index = 0; index < userFavorites.length; index++) {
      const element = userFavorites[index];
      if (element.title === track?.title) {
        return 'heart';
      }
    }
    return 'heart-outline';
  };
  const makeFavorite = async () => {
    setUserFavoritesApi(title, currentUserEmail)
      .then(() => {
        bottomSheetRef?.current.close();
        setSheetOpen(false);
        if (isFavorite() == 'heart') {
          var temp = userFavorites.filter(val => val.title !== title);
          setUserFavorites(temp);
          setMessage('removed from favorites');
          setShowMessage(true);
        } else {
          setUserFavorites([...userFavorites, track]);
          setMessage('song added to favorites');
          setShowMessage(true);
        }
      })
      .catch(e => {
        console.log('set fav error mini player comp ', e);
      });
  };

  const addToQueue = async () => {
    const state = await TrackPlayer.getState();
    const queue = await TrackPlayer.getQueue();
    if (queue.length == 0) {
      setCurrentTrack(track);
    }
    await TrackPlayer.add(track).then(async () => {
      state == State.Playing ? await TrackPlayer.play() : null;
      bottomSheetRef?.current.close();
      setSheetOpen(false);
      setMessage('song added to queue');
      setShowMessage(true);
    });
  };

  const addToPlaylist = async name => {
    const playlist = playlists.find(playlist => playlist.name === name);
    const index = playlist?.songs?.findIndex(song => song.title === title);
    if (index > -1) {
      playlist?.songs?.splice(index, 1);
      setMessage('song removed from playlist');
    } else {
      playlist?.songs.push(track);
      setMessage('song added to playlist');
    }
    await addPlaylistsFromApi(
      currentUserEmail,
      songObject(playlist.name, playlist.songs),
    )
      .then(() => {
        bottomSheetRef?.current.close();
        setSheetOpen(false);
        setShowMessage(true);
      })
      .catch(e => {
        console.log('add history error ->', e);
      });
  };

  const songObject = (name, songs) => {
    const obj = {
      name: name,
      songs: songs,
    };
    return obj;
  };

  const createNewPlaylist = () => {
    setState('newPlaylist');
  };
  // opens the save options bottom sheet
  const openSaveOptions = () => {
    const op = {
      title: 'new playlist',
      icon: 'add',
      action: () => createNewPlaylist(),
    };
    return (
      <View>
        {optionComp({op})}
        {playlists?.map((playlist, i) => {
          var op = {
            title: playlist?.name,
            icon: 'list-outline',
            action: () => addToPlaylist(playlist?.name),
          };
          return optionComp({op, i});
        })}
      </View>
    );
  };
  // the main option layout component | Fav | save | Add to Queue
  const optionComp = props => {
    const {i, op} = props;
    return (
      <View key={i} style={[styles.options]}>
        <TouchableOpacity
          key={i}
          onPress={op.action}
          style={[
            styles.container,
            {
              // borderBottomWidth: i === options.length - 1 ? 0 : 1,
              borderTopRightRadius: i == 0 ? 10 : 0,
              borderTopLeftRadius: i == 0 ? 10 : 0,
            },
          ]}>
          <IonIcon
            style={styles.icon}
            name={op.icon}
            size={25}
            color={'grey'}
          />
          <Text style={styles.optionsText}>{op.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const options = [
    {
      title: 'fav',
      icon: isFavorite(),
      action: () => makeFavorite(),
    },
    {
      title: 'save',
      icon: 'save-outline',
      action: () => setState('save'),
    },
    {
      title: 'Add to Queue',
      icon: 'add-circle-outline',
      action: () => addToQueue(),
    },
  ];

  const params = {
    bottomSheet: {
      ref: bottomSheetRef,
      snapPoints: snapPoints,
      onClose: () => {
        setSheetOpen(false), setState('default');
      },
      enablePanDownToClose: true,
      backgroundStyle: styles.bottomSheet,
      backdropComponent: backdropProps => (
        <BottomSheetBackdrop
          {...backdropProps}
          enableTouchThrough={false}
          pressBehavior={'close'}
        />
      ),
    },
  };

  const showCreatePlaylist = () => {
    return (
      <View style={{flex: 1}}>
        <TextInput
          placeholderTextColor={COLORS.darkerterkwaz}
          onChangeText={setPlaylistName}
          value={playlistName}
          style={styles.input}
          placeholder="Name..."
        />
        <Button title="done" onPress={() => bottomSheetRef?.current.close()} />
      </View>
    );
  };

  const optionsSort = key => {
    switch (key) {
      case 'default':
        return options.map((op, i) => optionComp({i, op}));

      case 'save':
        return openSaveOptions();

      case 'newPlaylist':
        return showCreatePlaylist();
    }
  };

  return (
    <BottomSheet index={-1} {...params.bottomSheet}>
      <BottomSheetView style={{borderBottomWidth: 1, width: '100%'}}>
        <Text style={styles.headerText}>{title}</Text>
      </BottomSheetView>
      <BottomSheetView style={{flex: 1}}>
        {/* {optionsComp()} */}

        {optionsSort(state)}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  TextDate: {
    ...FONTS.h2,
    color: COLORS.terkwaz,
    marginTop: '15%',
    marginLeft: '2%',
  },
  headerText: {
    ...FONTS.h2,
    color: COLORS.terkwaz,
    alignSelf: 'center',
    padding: 2,
  },
  bottomSheet: {backgroundColor: '#2E3339', borderRadius: 35},
  options: {
    // backgroundColor: 'rgba(90, 90, 90, 0.2)',
    marginTop: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset: {
          width: 0,
          height: 4,
        },
      },
      android: {
        elevation: 3.5,
      },
    }),
    borderRadius: 4,
    marginRight: '2%',
    marginLeft: '2%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 7,
    overflow: 'hidden',
    // borderRadius:
  },
  optionsText: {
    ...FONTS.h2,
    color: COLORS.greenesh,
  },
  icon: {
    marginHorizontal: 10,
  },
  input: {
    fontSize: 20,
    padding: 15,
    marginLeft: 10,
    width: '90%',
    marginTop: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset: {
          width: 0,
          height: 4,
        },
      },
      android: {
        elevation: 3.5,
      },
    }),
    borderRadius: 4,
    marginRight: '2%',
    marginLeft: '2%',
  },
});

export default BottomSheetComp;
