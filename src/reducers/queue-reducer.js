export default (state={ list: [], title: "Mixed"}, action) => {
  
  switch(action.type) {
    case "UPDATE_QUEUE":
			state.title = action.payload.title
      state.list = action.payload.list;
      break;
  }
  
  return state;
}