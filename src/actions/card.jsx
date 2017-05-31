const changeCard = (id) => { 
  return {
    type: "CHANGE_CARD",
    payload: id
  }
};

export { changeCard };