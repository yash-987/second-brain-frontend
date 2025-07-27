import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { UserAtom } from '../store/user';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ContentAtom, ContentRefreshAtom } from '../store/content';

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
