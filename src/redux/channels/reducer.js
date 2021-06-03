const INITIAL_STATE = {
	currentChannel: {},
};

const channelReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'SET_CURRENT_CHANNEL':
			return {
				...state,
				currentChannel: action,
			};

		default:
			return state;
	}
};

export default channelReducer;
