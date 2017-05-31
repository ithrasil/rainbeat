const clientId = "stJqxq59eT4rgFHFLYiyAL2BDbuL3BAv";
const volume = localStorage.getItem('volume') ? localStorage.getItem('volume') : 0.5;
const isMuted = localStorage.getItem('muted') == "true" ? true : false;

export default function(state={ clientId: clientId, volume: volume, isMuted: isMuted}, action) {
  switch(action.type) {
    case "VOLUME_UPDATE":
      state.volume = action.payload;
      localStorage.setItem('volume', action.payload);
      break;
    
    case "MUTED_UPDATE":
      state.isMuted = action.payload;
      localStorage.setItem('muted', action.payload);
      break;
  }
  
  return state;
}