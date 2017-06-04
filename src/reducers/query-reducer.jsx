export default function(state=null, action) {
  
  state = { value: localStorage.getItem('query') || "", execution: false }
  
  switch(action.type) {
    case "QUERY_UPDATE":
      state.value = action.payload;
      localStorage.setItem('query', action.payload);
      break;
      
    case "QUERY_EXECUTE":
      state.execution = action.payload;
      break;
  }
  
  return state;
}