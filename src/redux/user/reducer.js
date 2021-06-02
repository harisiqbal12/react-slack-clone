const INITIA_STATE = {
	userCredential: {},
	isPasswordConfirmValid: false,
	isUserEmpty: true,
	isPasswordLessThanEight: true,
	authenticatedUser: null,
	isLoading: true,
};

const userReducer = (state = INITIA_STATE, action) => {
	switch (action.type) {
		case 'GET_USER_CREDENTIAL':
			return {
				...state,
				userCredential: {
					username: action.payload.username,
					email: action.payload.email,
					password: action.payload.password,
					passwordConfirm: action.payload.passwordConfirm,
				},
			};
		case 'CHECK_USER_VALIDATION':
			if (
				state.userCredential.pasword !== '' &&
				state.userCredential.passwordConfirm !== ''
			) {
				console.log('hairs');
				if (
					state.userCredential.password === state.userCredential.passwordConfirm
				)
					return {
						...state,
						isPasswordConfirmValid: (state.isPasswordConfirmValid = true),
					};
			}
			return {
				...state,
				isPasswordConfirmValid: (state.isPasswordConfirmValid = false),
			};

		case 'CHECK_USER_IS_EMPTY':
			if (Object.entries(state.userCredential).length !== 0) {
				return { ...state, isUserEmpty: (state.isUserEmpty = false) };
			}

			return { ...state, isUserEmpty: (state.isUserEmpty = true) };

		case 'CHECK_USER_PASSWORD_LENGTH':
			if (state.userCredential.password.length < 8)
				return {
					...state,
					isPasswordLessThanEight: (state.isPasswordLessThanEight = true),
				};

			return {
				...state,
				isPasswordLessThanEight: (state.isPasswordLessThanEight = false),
			};

		case 'GET_AUTHENTICATED_USER_FROM_DATABASE':
			return {
				...state,
				authenticatedUser: action.payload,
			};

		case 'SET_GLOBAL_LOADER_FALSE':
			return {
				...state,
				isLoading: false,
			};

		case 'SET_GLOBAL_LOADER_TRUE':
			return {
				...state,
				isLoading: true,
			};

		case 'CLEAR_USER':
			return {
				...state,
				authenticatedUser: (state.authenticatedUser = null),
			};
		default:
			return state;
	}
};

export default userReducer;
