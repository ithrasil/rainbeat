export default function(
	state={ 
		received: false,
		status: false, 
	  primaryList: [], 
	  secondaryList: [], 
	  query: "" 
	}, 
	action) {
	
  switch(action.type) {
      
    case "RECEIVE_STATUS":
      state.received = action.payload;
      break;
			
		case "SEARCH_STATUS":
			state.status = action.payload;
			break;
      
    case "PRIMARY_LIST_UPDATE":
      state.primaryList = action.payload;
      break;
			
		case "SECONDARY_LIST_UPDATE":
      state.secondaryList = action.payload;
      break;
				
    case "QUERY_UPDATE":
      state.query = action.payload;
      localStorage.setItem('query', action.payload);
      break;
  }
        
  return state;
}

