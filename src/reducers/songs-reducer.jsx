export default function(state={ activeSong: {}, songLoaded: true, received: false, songs: [] }, action) {
  switch(action.type) {
    case "ACTIVE_SONG_UPDATE":
      state.activeSong = action.payload;
      break;
    
    case "ACTIVE_SONG_STATUS":
      state.songLoaded = action.payload;
      break;
      
    case "RECEIVE_STATUS":
      state.received = action.payload;
      break;
      
    case "SONGS_UPDATE":
      state.songs = action.payload;
      break;
  }
        
  return state;
}

