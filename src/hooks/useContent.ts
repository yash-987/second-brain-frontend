import { useEffect } from 'react';
import axios from 'axios';
import { UserAtom } from '../store/user';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ContentAtom, ContentRefreshAtom } from '../store/content';
const BACKEND_URL = import.meta.env.BACKEND_URl;
export function useContent() {
	const [content, setContent] = useRecoilState(ContentAtom);
	const user = useRecoilValue(UserAtom);
	const refresh = useRecoilValue(ContentRefreshAtom);
	async function fetchContent() {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.get(`${BACKEND_URL}/api/v1/content`, config);
			console.log(data);
			setContent(Array.isArray(data) ? data : []);
			console.log(`content: `, content);
		} catch (error) {
			toast.error(`${error}`);
		}
	}
	useEffect(() => {
		fetchContent();
	}, [refresh]);

	return content;
}
