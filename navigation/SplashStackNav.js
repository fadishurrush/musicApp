import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScreenNames } from "../Assets/Data/ScreenNames";
import AfterSplashScreen from "../Assets/Screens/AfterSplashScreen";
import SplashScreen from "../Assets/Screens/SplashScreen";
import BottomTabNav from "./BottomTabNav";
import LoginScreen from "../Assets/Screens/LoginScreen";
import RegisterScreen from "../Assets/Screens/RegisterScreen";
import RecoverScreen from "../Assets/Screens/RecoverScreen";

const Stack=createNativeStackNavigator();
export const SplashStackNav=()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={ScreenNames.Splash} component={SplashScreen} options={{headerShown:false}}/>
                <Stack.Screen name={ScreenNames.AfterSplashScreen} component={AfterSplashScreen} options={{headerShown: false , animation:'fade'}} />
                <Stack.Screen name={ScreenNames.Login} component={LoginScreen} options={{headerShown: false}} />
                <Stack.Screen name={ScreenNames.Register} component={RegisterScreen} options={{headerShown: false,animation:'slide_from_bottom'}} />
                <Stack.Screen name={ScreenNames.Recover} component={RecoverScreen} options={{headerShown: false , animation:'slide_from_right',presentation:'transparentModal'}} />
            </Stack.Navigator>
            </NavigationContainer>
    )
}