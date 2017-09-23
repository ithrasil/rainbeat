export default function(state={ received: false, songs: [] }, action) {
  switch(action.type) {
      
    case "RECEIVE_STATUS":
      state.received = action.payload;
      break;
      
    case "SONGS_UPDATE":
      state.songs = action.payload;
      break;
  }
        
  return state;
}

