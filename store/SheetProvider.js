import React, { useRef, useState } from "react";
import SheetContext from "./SheetContext";

const SheetProvider =props=>{
    const bottomSheetRef = useRef(null);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [track, setTrack] = useState(null);
    const [message, setMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    return(
        <SheetContext.Provider
        value={{
            bottomSheetRef,
            sheetOpen,
            setSheetOpen,
            title,
            setTitle,
            track,
            setTrack,
            message,
            setMessage,
            showMessage,
            setShowMessage,
        }}>
            {props.children}
            </SheetContext.Provider>
    )
}

export default SheetProvider