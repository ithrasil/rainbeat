export default function(state={ received: false, searchStatus: 0, primaryList: [], secondaryList: [] }, action) {
  switch(action.type) {
      
    case "RECEIVE_STATUS":
      state.received = action.payload;
      break;
			
		case "SEARCH_STATUS":
			state.searchStatus = action.payload;
			break;
      
    case "PRIMARY_LIST_UPDATE":
      state.primaryList = action.payload;
      break;
			
		case "SECONDARY_LIST_UPDATE":
      state.secondaryList = action.payload;
      break;
  }
        
  return state;
}

