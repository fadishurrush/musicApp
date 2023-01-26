import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ScreenNames } from "../Assets/Data/ScreenNames";
import { Homescreen } from '../Assets/Screens/HomeScreen';
import Muiscscreen from '../Assets/Screens/Musicscreen';
import TrackScreen from '../Assets/Screens/TrackScreen';
import HistoryScreen from '../Assets/Screens/HistoryScreen';
import MiniPlayer from '../Assets/Components/MiniPlayerComp';

const Stack=createNativeStackNavigator();
export const HomeStackNav=({navigation})=>{
    return(
            <Stack.Navigator>
                <Stack.Screen name={ScreenNames.Main} component={Homescreen} options={{headerShown: false}} />
                <Stack.Screen name={ScreenNames.Track} component={TrackScreen} options={{headerShown: false}} />
                <Stack.Screen name={ScreenNames.History} component={HistoryScreen} 
                // options={{}}
                 />
            </Stack.Navigator>
    )
}