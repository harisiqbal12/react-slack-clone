import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyAEex82v9xioPN09Uqxl2IEDeMo5uRvR7Y',
	authDomain: 'react-slack-clone-19e65.firebaseapp.com',
	databaseURL:
		'https://react-slack-clone-19e65-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: 'react-slack-clone-19e65',
	storageBucket: 'react-slack-clone-19e65.appspot.com',
	messagingSenderId: '166428985315',
	appId: '1:166428985315:web:bd9b9bffec65d06c8182d6',
	measurementId: 'G-3X9CMQ8GTN',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
