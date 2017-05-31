import { createStream } from "../helpers.jsx";

export default function(state={ stream: null }, action) {
  switch(action.type) {
    case "STREAM_UPDATE":
      state.stream.pause();
      clientId = action.payload['clientId'];
      url = action.payload['url'];
      state.stream = createStream(url, clientId);
      break;
  }
        
  return state;
}