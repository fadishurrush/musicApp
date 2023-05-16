import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScreenNames } from "../Assets/Data/ScreenNames";
import AfterSplashScreen from "../Assets/Screens/AfterSplashScreen";
import SplashScreen from "../Assets/Screens/SplashScreen";
import BottomTabNav from "./BottomTabNav";
import LoginScreen from "../Assets/Screens/LoginScreen";

const Stack=createNativeStackNavigator();
export const SplashStackNav=()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={ScreenNames.Splash} component={SplashScreen} />
                <Stack.Screen name={ScreenNames.AfterSplashScreen} component={AfterSplashScreen} options={{headerShown: false}} />
                <Stack.Screen name={ScreenNames.Login} component={LoginScreen} options={{headerShown: false}} />
            </Stack.Navigator>
            </NavigationContainer>
    )
}