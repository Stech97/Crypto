const initialState = {
  isClosed: true
};

export const sidebarReducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
	    case "TOGGLE_SIDEBAR":
		    return {
		    	...state,
	    	    isClosed: !action.payload
	      	};
	    default:
		    return state;
	}
};