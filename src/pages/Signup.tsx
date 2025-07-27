import { useRef, useState } from 'react';
import { Button } from '../components/ui/Button';
import { InputBox } from '../components/ui/InputBox';
import { toast } from 'react-toastify';
import axios from 'axios';

import { useSetRecoilState } from 'recoil';
import { UserAtom } from '../store/user';
import { useNavigate } from 'react-router-dom';
// import { BACKEND_URL } from '../config/api';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export function Signup() {
	const [loading, setLoading] = useState(false);

	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const setUser = useSetRecoilState(UserAtom);

	const navigate = useNavigate();
	const signup = async () => {
		const username = usernameRef.current?.value;
		const password = passwordRef.current?.value;
		if (!username || !password) {
			toast.warning('Please fill in all the fields');
			setLoading(false);
			return;
		}
		setLoading(true);
		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};
			const { data } = await axios.post(
				`${BACKEND_URL}/api/v1/user/signup`,
				{ username, password },
				config
			);
			toast.success('Signup Successfull');
			localStorage.setItem('user-info', JSON.stringify(data));
			setUser(data);
			setTimeout(() => {
				navigate('/dashboard');
			}, 800);
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				// If backend sends a message in error.response.data.error
				const backendMsg = error.response?.data?.message;
				if (backendMsg && backendMsg.includes('User')) {
					toast.error('Username is already taken. Please choose another.');
				} else {
					toast.error(backendMsg || 'Signup failed. Please try again.');
				}
			} else {
				toast.error('Signup failed. Please try again.');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
			<div className="flex flex-col bg-white rounded-xl border min-w-48 py-6 px-8">
				<div className="flex justify-center text-2xl my-1 font-semibold">
					Signup
				</div>
				<InputBox ref={usernameRef} placeholder="Username" />
				<InputBox ref={passwordRef} placeholder="Password" />
				<div className="flex justify-center py-2">
					<Button
						onClick={signup}
						size="md"
						loading={loading}
						variant="primary"
						text="Signup"
						fullWidth={true}
					/>
				</div>
			</div>
		</div>
	);
}
