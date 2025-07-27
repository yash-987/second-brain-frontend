import { atom } from 'recoil';
import type { Content } from '../utils';

export const ContentAtom = atom<Content[]>({
	key: 'Content',
	default: [],
});

export const ContentRefreshAtom = atom({
	key: 'ContentRefreshAtom',
	default: 0,
});
