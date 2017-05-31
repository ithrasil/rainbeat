const updateVolume = (val) => { 
  return {
    type: "VOLUME_UPDATE",
    payload: val
  }
};

const changeMuted = (val) => { 
  return {
    type: "MUTED_UPDATE",
    payload: val
  }
};

export { updateVolume, changeMuted };
