export default function(state={ loaded: true, received: false, songs: [] }, action) {
  switch(action.type) {
    
    case "ACTIVE_SONG_STATUS":
      state.loaded = action.payload;
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

