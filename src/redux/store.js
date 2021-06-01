import logger from 'redux-logger';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import userReducer from './user/reducer';

const middleWares = [logger];
const rootReducer = combineReducers({
	userCredential: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(...middleWares));

export default store;
