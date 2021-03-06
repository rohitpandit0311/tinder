import React, { Fragment, useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import history from './uitls/history';
import axios from 'axios';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Index from './pages/Index';
import Chat from './pages/Chat';
import Match from './pages/Match';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';
import './bootstrap.min.css';
import './app.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const [isLogged, setIsLogged] = useState(localStorage.getItem('token'));
	const [totalViewed, setTotalViewed] = useState(
		localStorage.getItem('totalViewed')
	);

	useEffect(() => {
		if (
			localStorage.getItem('totalViewed') === 0 ||
			localStorage.getItem('totalViewed') === null
		) {
			localStorage.setItem('totalViewed', 0);
		}
	}, [isLogged]);

	axios.defaults.headers.common = {
		// Authorization: `Bearer ${localStorage.getItem('token')}`,
		Authorization: `Bearer ${isLogged}`,
	};

	return (
		<Fragment>
			<Router history={history}>
				<Switch>
					<Route exact path='/'>
						{isLogged !== null ? (
							<Index
								totalViewed={totalViewed}
								setTotalViewed={setTotalViewed}
								history={history}
								setIsLogged={setIsLogged}
							/>
						) : (
							<Redirect from='/' to='/login' />
						)}
					</Route>
					<Route exact path='/match'>
						{isLogged !== null ? (
							<Match
								setTotalViewed={setTotalViewed}
								history={history}
								setIsLogged={setIsLogged}
							/>
						) : (
							<Redirect from='/match' to='/login' />
						)}
					</Route>
					<Route exact path='/profile'>
						{isLogged !== null ? (
							<Profile
								setTotalViewed={setTotalViewed}
								history={history}
								setIsLogged={setIsLogged}
							/>
						) : (
							<Redirect from='/profile' to='/login' />
						)}
					</Route>
					<Route exact path='/chat/:id'>
						{isLogged !== null ? (
							<Chat
								setTotalViewed={setTotalViewed}
								history={history}
								setIsLogged={setIsLogged}
							/>
						) : (
							<Redirect from='/chat/:id' to='/login' />
						)}
					</Route>
					<Route exact path='/login'>
						{isLogged === null ? (
							<Login history={history} setIsLogged={setIsLogged} />
						) : (
							<Redirect from='/login' to='/' />
						)}
					</Route>
					<Route exact path='/signup'>
						{isLogged === null ? (
							<Signup history={history} setIsLogged={setIsLogged} />
						) : (
							<Redirect from='/signup' to='/' />
						)}
					</Route>
					<Route path='*'>
						{isLogged !== null ? (
							<PageNotFound
								setTotalViewed={setTotalViewed}
								history={history}
								setIsLogged={setIsLogged}
							/>
						) : (
							<Redirect to='/login' />
						)}
					</Route>
				</Switch>
			</Router>
		</Fragment>
	);
}

export default App;
