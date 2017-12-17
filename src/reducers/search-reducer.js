export default (
	state={ 
		received: false,
		status: false, 
		artists: [],
	  tracks: [], 
		playlists: [],
	  query: "" 
	}, 
	action) => {
	
  switch(action.type) {
      
    case "RECEIVE_STATUS":
      state.received = action.payload;
      break;
			
		case "SEARCH_STATUS":
			state.status = action.payload;
			break;
			
		case "DATA_UPDATE":
      state.tracks = action.payload[0];
      state.artists = action.payload[1];
			state.playlists = action.payload[2];
      break;
		
    case "QUERY_UPDATE":
      state.query = action.payload;
      localStorage.setItem('query', action.payload);
      break;
  }
        
  return state;
}

