export default function(state={ id: 0 }, action) {
  
  switch(action.type) {
    case "CHANGE_CARD":
      state.id = action.payload;
      break;
  }
  
  return state;
}