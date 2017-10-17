const updateQueue = (obj) => { 
  return {
    type: "UPDATE_QUEUE",
    payload: obj
  }
};

export { updateQueue };