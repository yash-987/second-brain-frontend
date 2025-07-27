import { useRef, useState } from 'react';
import { CrossIcon } from '../icons/CrossIcon';
import { InputBox } from './InputBox';
import { Button } from './Button';
import { toast } from 'react-toastify';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { UserAtom } from '../../store/user';

import axios from 'axios';
import type { User } from '../../utils/index';
import { ContentAtom, ContentRefreshAtom } from '../../store/content';
// Using relative URL with Vite proxy
const BACKEND_URL = 'https://brainly-olive.vercel.app';
interface CreateContentProps {
	open: boolean;
	onClose: () => void;
}

const ContentTypes = {
	Twitter: 'twitter',
	Youtube: 'youtube',
} as const;

function CreateContent({ open, onClose }: CreateContentProps) {
	const titleRef = useRef<HTMLInputElement>(null);
	const linkRef = useRef<HTMLInputElement>(null);
	const [loading, setLoading] = useState(false);
	const setContent = useSetRecoilState(ContentAtom);
	const user: User = useRecoilValue(UserAtom);
	const [type, setType] = useState<keyof typeof ContentTypes>('Youtube');
	const setRefresh = useSetRecoilState(ContentRefreshAtom);
	async function addContent() {
		const title = titleRef.current?.value;
		const link = linkRef.current?.value;
		console.log(titleRef, linkRef);
		if (!title || !link) {
			toast.warning('Please fill all the fields');
			setLoading(false);
			return;
		}
		setLoading(true);

		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${user?.token}`,
				},
			};

			const { data } = await axios.post(
				`${BACKEND_URL}/api/v1/content/create`,
				{
					title,
					link,
					type: ContentTypes[type],
				},
				config
			);

			toast.success('Created Successfully');
			setContent(data);

			onClose();
			setRefresh((val) => val + 1);
		} catch (error) {
			toast.error(`${error}`);
		} finally {
			setLoading(false);
		}
	}
	return (
		<>
			{open && (
				<div className="flex justify-center w-screen h-screen top-0 left-0 fixed bg-slate-500 opacity-90">
					<div className="flex flex-col justify-center">
						<span className="bg-white opacity-100 rounded p-4">
							<div className="text-xl  font-bold">Add Content</div>
							<div className="flex justify-end">
								<div onClick={onClose} className="cursor-pointer">
									<CrossIcon size="lg" />
								</div>
							</div>
							<div className="flex flex-col">
								<InputBox ref={titleRef} placeholder="Title" />
								<InputBox ref={linkRef} placeholder="Link" />
							</div>
							<span className="text-lg font-semibold">Type</span>
							<div className="flex gap-2 my-2">
								<Button
									variant={type === 'Youtube' ? 'primary' : 'secondary'}
									onClick={() => setType('Youtube')}
									size="lg"
									text="Youtube"
								/>
								<Button
									variant={type === 'Twitter' ? 'primary' : 'secondary'}
									onClick={() => setType('Twitter')}
									size="lg"
									text="Twitter"
								/>
							</div>
							<div className="flex justify-center">
								<Button
									onClick={addContent}
									size="lg"
									variant="primary"
									text={loading ? 'Creating Content...' : 'Submit'}
								/>
							</div>
						</span>
					</div>
				</div>
			)}
		</>
	);
}

export default CreateContent;
