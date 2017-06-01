import { createStream } from "../helpers.jsx";

export default function(state={ stream: new Audio(""), time: 0}, action) {
  switch(action.type) {
    case "STREAM_UPDATE":
      if(state.stream.src != "") {
        state.stream.pause();
      }

      state.stream.src = action.payload[0] + "?client_id=" + action.payload[1];
      state.stream.load();
      break;
  }
        
  return state;
}