const executeQuery = (boolean) => { 
  return {
    type: "QUERY_EXECUTE",
    payload: boolean
  }
};

const saveQuery = (event) => { 
  return {
    type: "QUERY_UPDATE",
    payload: event.target.value
  }
};

export { executeQuery, saveQuery };