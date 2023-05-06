import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeStackNav} from './HomeStackNav';
import Muiscscreen from '../Assets/Components/MusicModalComp';
import {ScreenNames} from '../Assets/Data/ScreenNames';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../Assets/Data/Dimentions';
import SearchScreen from '../Assets/Screens/SearchScreen';
import LibraryScreen from '../Assets/Screens/LibraryScreen';

const tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
      <tab.Navigator screenOptions={({ route }) => ({
            tabBarStyle:{
                backgroundColor:'black',
                height:'5%',
                // position:'absolute',
            },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === ScreenNames.HomeStackNav) {
              iconName = focused
                ? 'home'
                : 'home-outline';
            }else if(route.name === ScreenNames.Search) {
              iconName = focused
                ? 'search'
                : 'search-outline';
            }
            else if(route.name === ScreenNames.Library) {
              iconName = focused
                ? 'library'
                : 'library-outline';
            }

            return <IonIcon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: COLORS.terkwaz,
          tabBarInactiveTintColor: COLORS.greenesh,
          tabBarHideOnKeyboard:true,
        })}
        >
        <tab.Screen name={ScreenNames.HomeStackNav} component={HomeStackNav} options={{headerShown:false}} />
        <tab.Screen name={ScreenNames.Search} component={SearchScreen} options={{headerShown:false}}/>
        <tab.Screen name={ScreenNames.Library} component={LibraryScreen} options={{headerShown:false}}/>
        {/* <tab.Screen name={Settings} component={StackNav} /> */}
      </tab.Navigator>
  );
};

export default BottomTabNav;
