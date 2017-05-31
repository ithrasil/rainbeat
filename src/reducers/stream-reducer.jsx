import { createStream } from "../helpers.jsx";

export default function(state={ stream: null }, action) {
  switch(action.type) {
    case "STREAM_UPDATE":
      if(state.stream != null) {
        state.stream.pause();
      }

      const clientId = action.payload[1];
      const url = action.payload[0];
      state.stream = createStream(url, clientId);
      break;
  }
        
  return state;
}