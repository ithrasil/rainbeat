import { createStream } from "../helpers.jsx";

export default function(state={ stream: null, time: 0}, action) {
  switch(action.type) {
    case "STREAM_UPDATE":
      if(state.stream != null) {
        state.stream.pause();
      }

      state.stream = createStream(action.payload[0], action.payload[1]);
      break;
  }
        
  return state;
}