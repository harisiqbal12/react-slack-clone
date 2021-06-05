export const setCurrentChannel = channel => ({
	type: 'SET_CURRENT_CHANNEL',
	payload: channel,
});

export const displayChats = () => ({
	type: 'DISPLAY_CHATS',
});
