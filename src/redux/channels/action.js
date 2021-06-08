export const setCurrentChannel = channel => ({
	type: 'SET_CURRENT_CHANNEL',
	payload: channel,
});

export const displayChats = () => ({
	type: 'DISPLAY_CHATS',
});

export const showSnackBar = info => ({
	type: 'SHOW_SNACK_BAR',
	payload: info,
});

export const closeSnackBar = () => ({
	type: 'CLOSE_SNACK_BAR',
});
