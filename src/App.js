import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './Components/Auth/Login';
import Homepage from './Components/Homepage';

function App() {
	return (
		<div>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/" component={Homepage} />
			</Switch>
		</div>
	);
}

export default App;
