const executeQuery = (boolean) => { 
  return {
    type: "QUERY_EXECUTED",
    payload: boolean
  }
};

const saveQuery = (event) => { 
  return {
    type: "QUERY_UPDATED",
    payload: event.target.value
  }
};

export { executeQuery, saveQuery };