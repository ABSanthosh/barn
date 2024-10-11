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
	id: string;
	title: string;
	link: string;
	description: string;
	author: string;
	published: string;
	image: string;
	source: string;
	topic: string;
	categories: null | string[];
};

export type GithubReadability = Partial<GithubTopic> & {
	byline: string;
	length: number;
	excerpt: string;
	siteName: string;
	favicon: string;
	text: string;
	html: string;
	readingTime: string;
	publishedTime: string;
	modifiedTime: string;
};

export const GitHubTopicList = [
	'iOS Development',
	'Books',
	'Gaming',
	'Space',
	'Business & Economy',
	'Cars',
	'Food',
	'DIY',
	'UIUX',
	'Beauty',
	'Interior design',
	'Web Development',
	'Fashion',
	'Movies',
	'Tech',
	'Architecture',
	'Android Development',
	'Sports',
	'Tennis',
	'Television',
	'Photography',
	'Android',
	'Cricket',
	'Music',
	'Funny',
	'News',
	'Programming',
	'Travel',
	'Apple',
	'Football',
	'Personal finance',
	'History',
	'Startups',
	'Science'
] as const;
