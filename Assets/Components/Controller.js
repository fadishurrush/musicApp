import React, {useEffect, useState} from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import TrackPlayer, {State} from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const COntroller = props => {
  const [playName, setplayname] = useState('play');


  const {playname} = props || {}

  

  useEffect(()=>{
    setplayname(playname)
  },[])

  const playBack = async () => {
    const state = await TrackPlayer.getState();
    const currentTrack = await TrackPlayer.getCurrentTrack();
    console.log(`${state}`);
    console.log(`${currentTrack}`);
    if (currentTrack != null) {
      if (state == State.Playing) {
        setplayname('play');
        await TrackPlayer.pause();
        console.log('pasued');
      } else if (state != State.Playing) {
        await TrackPlayer.play();
        setplayname('pause');
        console.log('playing');
      }
    } else {
      console.log('no songs!');
    }
  };

  return (
    <View style={styles.playbuttonsholder}>
      {/* previous button */}
      <Pressable
        style={{alignSelf: 'center'}}
        onPress={async () => await TrackPlayer.skipToPrevious()}>
        <Ionicons name="play-skip-back" size={50} />
      </Pressable>
      {/* play button */}
      <Pressable onPress={async () => playBack()}>
        <Ionicons name={playName} size={65} />
      </Pressable>
      {/* next button */}
      <Pressable
        style={{alignSelf: 'center'}}
        onPress={async () => await TrackPlayer.skipToNext()}>
        <Ionicons name="play-skip-forward" size={50} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  playbuttonsholder: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
    alignSelf: 'center',
    alignContent: 'center',
    // marginTop: '10%',
  },
});
