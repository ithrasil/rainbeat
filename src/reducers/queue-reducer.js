export default (state={ list: JSON.parse(localStorage.getItem('query_list')) || [], title: "Mixed"}, action) => {

  switch(action.type) {
    case "UPDATE_QUEUE":
			const list = action.payload.list.slice(0);
			
			state.title = action.payload.title
      state.list = list;
			
			localStorage.setItem('query_list', JSON.stringify(list));

      break;
  }
  
  return state;
}