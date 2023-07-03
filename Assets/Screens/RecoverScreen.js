import React from "react";
import { Image } from "react-native";

const RecoverScreen=()=>{
    return(
        <Image resizeMode='center' style={{alignSelf:'center'}} source={require("../../Assets/Gif/forgotpassword.gif")}></Image>
    )
}

export default RecoverScreen