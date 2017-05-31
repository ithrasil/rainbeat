const updateStream = (obj) => { 
  return {
    type: "STREAM_UPDATE",
    payload: obj
  }
};

export { updateStream };