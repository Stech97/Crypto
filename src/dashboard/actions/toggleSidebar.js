export const toggleSidebar = (isClosed) => {
	return (dispatch) => {
		dispatch({
			type: "TOGGLE_SIDEBAR",
			payload: isClosed,
		})
	}
}