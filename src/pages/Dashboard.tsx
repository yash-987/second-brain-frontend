import { useState } from 'react';
import { Sidebar } from '../components/ui/Sidebar';
import CreateContent from '../components/ui/CreateContent';
import { Button } from '../components/ui/Button';
import { ShareIcon } from '../components/icons/ShareIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { Card } from '../components/ui/Card';
import { useContent } from '../hooks/useContent';
import type { Content } from '../utils';
import { YoutubeIcon } from '../components/icons/YoutubeIcon';
import { TwitterIcon } from '../components/icons/TwitterIcon';
import axios from 'axios';

import { useRecoilValue } from 'recoil';
import { UserAtom } from '../store/user';
import { toast } from 'react-toastify';
const BACKEND_URL = import.meta.env.BACKEND_URl;
export function Dashboard() {
	const [isOpen, setIsOpen] = useState(false);
	const content: Content[] = useContent();
	const [share, setShare] = useState(false);
	const user = useRecoilValue(UserAtom);
	const shareBrain = async () => {
		setShare(true);
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.post(
				`${BACKEND_URL}/api/v1/brain/share`,
				{ share: true },
				config
			);
			const hash = await data.hash;
			window.navigator.clipboard.writeText(
				`http://localhost:5173/share/${hash}`
			);
			toast.success('copied to clipboard');
		} catch (error) {
			toast.error(`${error}`);
		}
	};

	return (
		<div>
			<Sidebar />
			<div className="p-4 ml-72 min-h-screen bg-gray-100">
				<CreateContent open={isOpen} onClose={() => setIsOpen(false)} />
				<div className="flex justify-end gap-4">
					<Button
						onClick={() => setIsOpen(true)}
						startIcon={<PlusIcon size="lg" />}
						size="sm"
						text="Add content"
						variant="primary"
					/>
					<Button
						onClick={shareBrain}
						startIcon={<ShareIcon size="md" />}
						size="md"
						text={share ? 'Sharing..' : 'Share brain'}
						variant="secondary"
					/>
				</div>
				<div className="flex gap-4 flex-wrap my-4">
					{Array.isArray(content) &&
						content.map((c: Content) => (
							<Card
								id={c._id}
								key={c._id}
								type={c.type}
								link={c.link}
								startIcon={
									c.type === 'youtube' ? <YoutubeIcon /> : <TwitterIcon />
								}
								title={c.title}
							/>
						))}
				</div>
			</div>
		</div>
	);
}
