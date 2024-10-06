export type categorizedTopics = {
	[key: string]: {
		id: string;
		desc: string;
		title: string;
		xmlUrl: string;
		category: string;
	}[];
};

export type GithubTopic = {
	title: string;
	link: string;
	description: string;
	author: string;
	published: string;
	image: string;
	source: string;
	categories: null | string[];
};