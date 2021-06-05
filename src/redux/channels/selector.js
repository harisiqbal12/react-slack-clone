import { createSelector } from 'reselect';

const selectChannel = state => state.channels;

export const selectCurrentChannel = createSelector(
	[selectChannel],
	channel => channel.currentChannel
);

export const selectIsDisplayChats = createSelector(
	[selectChannel],
	channel => channel.displayChats
);
