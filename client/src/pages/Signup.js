import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../component/Loading';

const Signup = ({ history, setIsLogged }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (password === confirmPassword) {
			setLoading(true);
			const res = await axios.post('http://localhost:5000/auth/signup', {
				email,
				password,
			});

			setLoading(false);

			if (res.status !== 201) {
				console.log(res.msg);
				return;
			}
			console.log(res.data.token);

			localStorage.setItem('token', res.data.token);
			setIsLogged(res.data.token);
			setLoading(false);
			console.log(history.location);
			history.push('/profile');
			window.location.reload();
		}
	};

	return (
		<div style={parent}>
			{loading ? (
				<Loading />
			) : (
				<div style={box}>
					<form style={style} onSubmit={onSubmitHandler}>
						<h1 className='text-center'>Signup</h1>
						<hr />
						<div className='mb-3'>
							<label htmlFor='email'>Email address</label>
							<input
								type='email'
								className='form-control'
								id='email'
								aria-describedby='emailHelp'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='password' className='form-label'>
								Password
							</label>
							<input
								type='password'
								className='form-control'
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								minLength='5'
								required
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='confirmPassword' className='form-label'>
								Password
							</label>
							<input
								type='password'
								className='form-control'
								id='confirmPassword'
								minLength='5'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</div>
						<button type='submit' className='btn btn-primary btn-block'>
							Register
						</button>
					</form>
					<h6 className='text-center'>
						Already Registered? <Link to='/login'>Login</Link>
					</h6>
				</div>
			)}
		</div>
	);
};

const parent = {
	height: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

const box = {
	padding: '1rem',
	flexDirection: 'Column',
	border: '1px solid grey',
	borderRadius: '5px',
};

const style = {
	width: '50vw',
	borderRadius: '.3rem',
	padding: '1rem',
};

export default Signup;
