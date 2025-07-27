export interface User {
	_id: string;
	username: string;
	password: string;
	token: string;
}

export interface Content {
	_id: string;
	title: string;
	link: string;
	type: 'youtube' | 'twitter';
	tags: string;
	userId: string;
}
