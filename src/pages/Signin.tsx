import { useRef, useState } from 'react';
import { Button } from '../components/ui/Button';
import { InputBox } from '../components/ui/InputBox';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { UserAtom } from '../store/user';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import axios from 'axios';

export function Signin() {
	const [loading, setLoading] = useState(false);

	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const setUser = useSetRecoilState(UserAtom);

	const navigate = useNavigate();
	const signin = async () => {
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
				`${BACKEND_URL}/api/v1/user/signin`,
				{ username, password },
				config
			);
			toast.success('Signin Successfull');
			localStorage.setItem('user-info', JSON.stringify(data));
			setUser(data);
			setTimeout(() => {
				navigate('/dashboard');
			}, 800);
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.log(error);
				// If backend sends a message in error.response.data.error
				const backendMsg = error.response?.data?.msg;
				if (backendMsg && backendMsg.includes('Incorrect')) {
					toast.error('Invalid Username or password');
				} else {
					toast.error(backendMsg || 'Signin failed. Please try again.');
				}
			} else {
				toast.error('Signin failed. Please try again.');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
			<div className="flex flex-col bg-white rounded-xl border min-w-48 py-6 px-8">
				<div className="flex justify-center text-2xl my-1 font-semibold">
					Signin
				</div>
				<InputBox ref={usernameRef} placeholder="Username" />
				<InputBox ref={passwordRef} placeholder="Password" />
				<div className="flex justify-center py-2">
					<Button
						onClick={signin}
						size="md"
						loading={loading}
						variant="primary"
						text="Signin"
						fullWidth={true}
					/>
				</div>
			</div>
		</div>
	);
}
