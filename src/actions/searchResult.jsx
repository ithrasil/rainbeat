const changeReceiveStatus = (boolean) => {
  return {
    type: "RECEIVE_STATUS",
    payload: boolean
  }
};

const changeState = (boolean) => { 
  return {
    type: "SEARCH_STATUS",
    payload: boolean
  }
};

const updatePrimaryList = (obj) => { 
  return {
    type: "PRIMARY_LIST_UPDATE",
    payload: obj
  }
};

const updateSecondaryList = (obj) => { 
  return {
    type: "SECONDARY_LIST_UPDATE",
    payload: obj
  }
};

export { changeReceiveStatus, changeState, updatePrimaryList, updateSecondaryList };