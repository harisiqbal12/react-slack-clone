import { createSelector } from 'reselect';

const selectChannel = state => state.channels;

export const selectCurrentChannel = createSelector(
	[selectChannel],
	channel => channel.currentChannel
);
