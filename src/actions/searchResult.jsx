const changeReceiveStatus = (boolean) => {
  return {
    type: "RECEIVE_STATUS",
    payload: boolean
  }
};

const changeCountValue = (boolean) => {
  return {
    type: "COUNT_VALUE",
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
    type: "PRIMARY_LIST_UPDATE",
    payload: obj
  }
};

export { changeReceiveStatus, changeCountValue, updatePrimaryList, updateSecondaryList };