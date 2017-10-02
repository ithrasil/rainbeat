export default function(state={ list: [] }, action) {
  
  switch(action.type) {
    case "UPDATE_QUEUE":
      state.list = action.payload;
      break;
  }
  
  return state;
}