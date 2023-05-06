import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS } from "../Data/Dimentions";



const LibraryScreen = ({navigation}) =>{

    return(
        <ImageBackground
      style={{flex:1}}
      source={require('../BackGroundImages/Dark-background.jpg')}>
        <Text style={styles.Header}>
            Your Library
        </Text>
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
}
})

export default LibraryScreen;