import TrackPlayer from 'react-native-track-player';
import {Songs as songsArray} from './Songs';

var curC ={}
export const setcontext = (props) => {
  const {playbackState,setIsPlaying,setCurrentTrack,currentTrack} = props
  c = {
    playbackState: playbackState,
    setIsPlaying: setIsPlaying,
    setCurrentTrack: setCurrentTrack,
    currentTrack: currentTrack,
  };
    curC = c

};

// toggling on and off the song
export const toggleTrack = async () => {
  console.log("curC toggle track",curC);
  const {playbackState} = curC;
  if (playbackState === 'playing' || playbackState === 3) {
    await pasueTrack();
  } else {
    await playTrack();
  }
};
//   functions to toggle on/off the songs
const pasueTrack = async () => {
  console.log("curC pauseTrack",curC);
  const {setIsPlaying} = curC;
  await TrackPlayer.pause();
  setIsPlaying('paused');
};

const playTrack = async () => {
  const {setIsPlaying} = curC;
  await TrackPlayer.play();
  setIsPlaying('playing');
};
  // end of functions to toggle on/off the song

// adding new song from same category
export const AddNewSongSameCategory = item => {
  //filter songs
  let songsList = songsArray.filter(
    a => a.Category.includes(item.Category[1]) && a.title !== item.title,
  );
  TrackPlayer.add(songsList);
  playBack(item);
};

  // toggles / adds songs
export const playBack = async item => {
  const current = await TrackPlayer.getCurrentTrack();
  const track = await TrackPlayer.getTrack(current);

  if (track) {
    if (track.title != item.title) {
      await setNewSongToTrack(item);
    } else {
      await toggleTrack();
    }
  } else {
    await addNewItemToTrack(item);
  }
};

//   add new song
const addNewItemToTrack = async item => {
  const {setIsPlaying, setCurrentTrack} = curC;
  console.log("curC",curC);
  await TrackPlayer.add(item);
  // historyCheck();
  setCurrentTrack(item);
  await TrackPlayer.play();
  setIsPlaying('playing');
};

//   set new song
const setNewSongToTrack = async item => {
  console.log("curC set new song",curC);
  const {setIsPlaying, setCurrentTrack} = curC;
  await TrackPlayer.reset();
  await TrackPlayer.add(item);
  // historyCheck();
  setCurrentTrack(item);
  await TrackPlayer.play();
  setIsPlaying('playing');
};

// plays the next song if there is no song adds one of the same category
export const playNext = async () => {
  const {currentTrack, setCurrentTrack} = curC;
  const current = await TrackPlayer.getCurrentTrack();
  const queue = await TrackPlayer.getQueue();
  if (queue.length == current + 1) {
    SameCategory(currentTrack.Category[1]);
  }
  await TrackPlayer.skipToNext();
  const newcurrent = await TrackPlayer.getCurrentTrack();
  const track = await TrackPlayer.getTrack(newcurrent);
  setCurrentTrack(track);
  await TrackPlayer.play();
};
//  resets the song if song is at 0 progress -> plays the previous song
export const playPrevious = async () => {
  await TrackPlayer.skipToPrevious();
  setCurrentTrack(currentTrack);
  await TrackPlayer.play();
};

export const SameCategory = async category => {
  //filter songs
  const {currentTrack} = curC;

  let songsList = songsArray.filter(
    a => a.Category.includes(category) && a.title !== currentTrack.title,
  );
  TrackPlayer.add(songsList);
};
// this function makes the song selected the first track in the list
export const TrackPosition = (setSongs, item) => {
  //filter songs
  let songs = songsArray.filter(
    a => a.Category.includes(item?.Category[0]) && a.title != item.title,
  );
  songs.unshift(item);

  setSongs(songs);
};
