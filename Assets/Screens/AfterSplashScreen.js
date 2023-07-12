import { View } from "react-native";
import BottomTabNav from "../../navigation/BottomTabNav";
import MusicContext from "../../store/MusicContext";
import MusicProvider from "../../store/MusicProvider";
import MiniPlayer from "../Components/MiniPlayerComp";


const AfterSplashScreen =()=>{
    return(
        <MusicProvider>
      <MusicContext.Consumer>
        {context => {
          return (
            
            <View style={{flex: 1}}>
              <BottomTabNav />
              {context.currentTrack ? <MiniPlayer/> : null} 
            </View>
          );
        }}
      </MusicContext.Consumer>
    </MusicProvider>
    )
}

export default AfterSplashScreen