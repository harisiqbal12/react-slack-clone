export const getUserCredential = userCredential => ({
	type: 'GET_USER_CREDENTIAL',
	payload: userCredential,
});

export const checkUserValidation = () => ({
	type: 'CHECK_USER_VALIDATION',
});

export const checkUserInputEmpty = () => ({
	type: 'CHECK_USER_IS_EMPTY',
});

export const checkUserValidationPasswordLength = () => ({
	type: 'CHECK_USER_PASSWORD_LENGTH',
});

export const getAuthenticatedUserFromDatabase = user => ({
	type: 'GET_AUTHENTICATED_USER_FROM_DATABASE',
	payload: user,
});

export const setLoaderFalse = () => ({
	type: 'SET_GLOBAL_LOADER_FALSE',
});

export const setLoaderTrue = () => ({
	type: 'SET_GLOBAL_LOADER_TRUE'
})

export const clearUser = () => ({
	type: 'CLEAR_USER'
})