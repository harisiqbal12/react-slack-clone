const INITIAL_STATE = {
	currentChannel: {},
	isDisplayChats: false,
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

		default:
			return state;
	}
};

export default channelReducer;
