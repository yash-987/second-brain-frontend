import { atom } from 'recoil';
import type { User } from '../utils';

export const UserAtom = atom<User>({
	key: 'User',
	default: localStorage.getItem('user-info')
		? JSON.parse(localStorage.getItem('user-info')!)
		: null,
});
