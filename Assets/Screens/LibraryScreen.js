import { FlatList, ImageBackground, StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../Data/Dimentions";
import { useContext } from "react";
import MusicContext from "../../store/MusicContext";
import TrackComp from "../Components/TrackComp";



const LibraryScreen = ({navigation}) =>{
    const {tracks,settracks} = useContext(MusicContext)
    const params = {
        FlatList:{
            data: tracks,
            renderItem: renderItem,
            showsHorizontalScrollIndicator: false,
            contentContainerStyle: {paddingVertical: SIZES.padding * 2},
            style: {...styles.tracks},
        }
    }
    const renderItem = ({item}) => {
        return <TrackComp item={item} />;
         
      };
    return(
        <ImageBackground
      style={{flex:1}}
      source={require('../BackGroundImages/Dark-background.jpg')}>
        <Text style={styles.Header}>
            Your Library
        </Text>
        <Text style={styles.title}>
            Favs
        </Text>
        <FlatList {...params.FlatList} />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
Header:{
    alignSelf: 'flex-start',
    color: COLORS.terkwaz,
    marginLeft: '8%',
    fontWeight: '100',
    ...FONTS.h1,
    marginTop:'10%'
},
title:{
    alignSelf: 'flex-start',
    color: COLORS.darkerterkwaz,
    marginLeft: '5%',
    fontWeight: '100',
    ...FONTS.h1,
    marginTop:'5%'
},
tracks:{
    margin:'5%',
    // backgroundColor:'red',
    maxHeight:'40%',
    padding:'2%'
}
})

export default LibraryScreen;