const INITIAL_STATE = {
	currentChannel: {},
	isDisplayChats: false,
	showSnackBar: false,
	snackBarProperties: {},
};

const channelReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'SET_CURRENT_CHANNEL':
			return {
				...state,
				currentChannel: action,
			};

		case 'DISPLAY_CHATS':
			return {
				...state,
				displayChats: true,
			};

		case 'SHOW_SNACK_BAR':
			return {
				...state,
				showSnackBar: true,
				snackBarProperties: action.payload,
			};

		case 'CLOSE_SNACK_BAR':
			return {
				...state,
				showSnackBar: false,
			};

		default:
			return state;
	}
};

export default channelReducer;
