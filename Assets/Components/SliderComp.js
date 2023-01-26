import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, {useProgress} from 'react-native-track-player';

const formatTime=(secs)=>{
  let minutes=Math.floor(secs /60);
  let seconds= Math.ceil(secs - minutes * 60);
  if (seconds < 10){
    seconds = `0${seconds}`
  }
  return(
    `${minutes}:${seconds}`
  )
};
export default SliderComp = () => {
  const {position, duration} = useProgress();

  console.log('duration: ' , duration);
  console.log('position: ' , position);
  const handlechange = (val) => {
    console.log(val);
     TrackPlayer.seekTo(val);
  };

  return (
    <View style={styles.container}>
      <Slider
        style={styles.Slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onSlidingComplete={handlechange}
      />
      <View style={styles.timecontainer}>
      <Text>{formatTime(position)}</Text>
      <Text>{formatTime(duration)}</Text>
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    // backgroundColor:'red',
    width: '100%',
  },
  Slider: {
    width: '80%',
    height: 60,
    alignSelf: 'center',
  },
  timecontainer:{
    maxWidth:'80%',
    flexDirection:'row',
    justifyContent:'space-between',
    marginLeft:'10%',
  }
});
