const changeReceiveStatus = (boolean) => {
  return {
    type: "RECEIVE_STATUS",
    payload: boolean
  }
};

const updateSongs = (obj) => { 
  return {
    type: "SONGS_UPDATE",
    payload: obj
  }
};

export { changeReceiveStatus, updateSongs };