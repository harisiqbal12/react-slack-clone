import { createSelector } from 'reselect';

const selectUser = state => state.userCredential;

export const selectUserCredential = createSelector([selectUser], user => user);

export const selectIsPasswordConfirmValid = createSelector(
	[selectUser],
	user => user.isPasswordConfirmValid
);

export const selectIsUserEmpty = createSelector(
	[selectUser],
	user => user.isUserEmpty
);

export const selectPasswordLength = createSelector(
	[selectUser],
	user => user.isPasswordLessThanEight
);

export const selectAuthenticatedUser = createSelector(
	[selectUser],
	user => user.authenticatedUser
);

export const selectLoader = createSelector([selectUser], user => user.isLoading);
