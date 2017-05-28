export default function(state=null, action) {
  
  state = { text: localStorage.getItem('query'), execution: false }
  
  switch(action.type) {
    case "QUERY_UPDATED":
      state.text = action.payload;
      localStorage.setItem('query', action.payload);
      break;
      
    case "QUERY_EXECUTED":
      state.execution = action.payload;
      break;
  }
  
  return state;
}