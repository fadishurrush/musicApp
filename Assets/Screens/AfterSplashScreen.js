import { View } from "react-native";
import BottomTabNav from "../../navigation/BottomTabNav";
import MusicContext from "../../store/MusicContext";
import MusicProvider from "../../store/MusicProvider";
import MiniPlayer from "../Components/MiniPlayerComp";
import BottomSheetComp from "../Components/BottomSheetComp";
import { useContext } from "react";
import SheetContext from "../../store/SheetContext";
import MessageComp from "../Components/MessageComp";


const AfterSplashScreen =()=>{
  const {setSheetOpen,sheetOpen,bottomSheetRef , track , title,showMessage,message,setShowMessage,setMessage} = useContext(SheetContext)

  const params={
    bottomSheetComp:{
      bottomSheetRef:bottomSheetRef,
      sheetOpen:sheetOpen,
      setSheetOpen:setSheetOpen,
      track:track,
      title:title,
      setShowMessage:setShowMessage,
      setMessage:setMessage,
    }
  }
    return(
        <MusicProvider>
      <MusicContext.Consumer>
        {context => {
          return (
            
            <View style={{flex: 1}}>
              <BottomTabNav />
              {showMessage ? <MessageComp message={message} setShowMessage={setShowMessage}  /> : null}
              {context.currentTrack ? <MiniPlayer/> : null} 
              <BottomSheetComp  {...params.bottomSheetComp}/>
            </View>
          );
        }}
      </MusicContext.Consumer>
    </MusicProvider>
    )
}

export default AfterSplashScreen