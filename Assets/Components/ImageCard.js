import React from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../Data/Dimentions';
import AnimatedLottieView from 'lottie-react-native';

const ImageCard = props => {
  const duration = () => {
    let minutes = Math.floor(props.item.duration / 60);
    let seconds = Math.ceil(props.item.duration - minutes * 60);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    var time = `${minutes}:${seconds}`;
    return time;
  };
  return (
    <View>
      <View>
        {/* image */}
        <Image
          source={props.item.artwork}
          resizeMode="contain"
          style={styles.Image}
        />
        {/* song name */}
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View
        //  style={{backgroundColor:'red'}}
        >
          <Text style={styles.TextSongName}>{props.item.title}</Text>
          <Text style={styles.TextArtistName}>{props.item.artist}</Text>
        </View>
        <View style={styles.time}>
          <Text style={styles.TextSongTime}>{duration()}</Text>
        <AnimatedLottieView style={styles.clock} source={require('../lottie/timer.json')} autoPlay />
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Image: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radius,
  },
  TextSongName: {
    color: COLORS.terkwaz,
    // alignSelf: 'flex-start',
    ...FONTS.h2,
    marginBottom: 2,
  },
  TextArtistName: {
    color: COLORS.darkerterkwaz,
    // alignSelf: 'flex-start',
    ...FONTS.h4,
    marginBottom: 10,
  },
  TextSongTime: {
    color: COLORS.darkerterkwaz,
    alignSelf: 'center',
    ...FONTS.h4,
    // marginBottom:10,
    textDecorationLine: 'underline',
    // textDecorationStyle:'double'
    marginHorizontal:'5%'
  },
  clock:{
    marginLeft:'5%'
  },
  time:{
    flexDirection:'row',
    width:'30%',
  }
});

export default ImageCard;
