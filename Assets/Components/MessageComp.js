import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { View , Text} from "react-native";
import { FONTS } from "../Data/Dimentions";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const MessageComp = (props)=>{
    const {message,setShowMessage} =props
    useEffect(()=>{
        setTimeout(() => {
            setShowMessage(false)
        }, 1500);
    })
    return(
        <Animated.View entering={FadeIn.duration(500)} exiting={FadeOut.duration(500)} style={styles.messageContainer}>
            <Text style={styles.message}>
                {message}
            </Text>
        </Animated.View>
    )
}

const styles= StyleSheet.create({
    messageContainer:{
        position:'absolute',
        bottom:'13%',
        height:'5%',
        backgroundColor:'white',
        width:'90%',
        alignSelf:'center',
        borderRadius:5,
        justifyContent:'center',
        padding:5


    },
    message:{
        color:'black',
        ...FONTS.body3,
    },
})

export default MessageComp