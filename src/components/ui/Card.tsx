import type { ReactElement } from 'react';
import { ShareIcon } from '../icons/ShareIcon';
import { DeleteIcon } from '../icons/DeleteIcon';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ContentAtom } from '../../store/content';
import { UserAtom } from '../../store/user';
import axios from 'axios';

import { toast } from 'react-toastify';
const BACKEND_URL = import.meta.env.BACKEND_URl;
interface CardProps {
	title: string;
	id: string;
	startIcon: ReactElement;
	link: string;
	type: 'twitter' | 'youtube';
}
export function Card({ id, title, startIcon, link, type }: CardProps) {
	const user = useRecoilValue(UserAtom);
	const setContent = useSetRecoilState(ContentAtom);
	const deleteContent = async () => {
		try {
			// const config = {
			// 	headers: {
			// 		Authorization: `Bearer ${user.token}`,
			// 	},
			// };
			await axios.delete(`${BACKEND_URL}/api/v1/content/delete`, {
				data: { contentId: id },
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
			setContent((prev) => prev.filter((item) => item._id !== id));
		} catch (error) {
			toast.error(`${error}`);
		}
	};
	return (
		<div className="p-6 bg-white max-w-72 border border-gray-200 rounded-md min-h-48 min-w-72">
			<div className="flex justify-between">
				<div className="flex gap-2 items-center text-md">
					<div className="text-gray-500">{startIcon}</div>
					{title}
				</div>
				<div className="flex gap-2 text-gray-500 items-center">
					<a href={link}>
						<ShareIcon size="lg" />
					</a>
					<div className="cursor-pointer" onClick={deleteContent}>
						<DeleteIcon size="lg" />
					</div>
				</div>
			</div>
			<div className="pt-6">
				{type === 'youtube' && (
					<iframe
						className="w-full"
						src={link.replace('watch', 'embed')}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
					></iframe>
				)}

				{/* twitter embeddings */}
				{type === 'twitter' && (
					<blockquote className="twitter-tweet">
						<a href={link.replace('x', 'twitter')}></a>
					</blockquote>
				)}

				{/* <blockquote class="twitter-tweet"><p lang="en" dir="ltr">This man lost $2.4 million when Terra Luna crashed.<br><br>So he did what any desperate investor would do.<br><br>He showed up at the scammer’s front door demanding answers.<br><br>What happened next is absolutely shocking...<br><br>Here&#39;s the crazy story of how ONE knock changed everything: <a href="https://t.co/N3I3ByXysD">pic.twitter.com/N3I3ByXysD</a></p>&mdash; Insider Trackers (@InsiderTrackers) <a href="https://twitter.com/InsiderTrackers/status/1944365199030673764?ref_src=twsrc%5Etfw">July 13, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */}
			</div>
		</div>
	);
}
