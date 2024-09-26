import db from '$db';
import type { categorizedTopics } from '$types/Topic.type';

export const getAllTopics = async (categorize: boolean = false) => {
	const allTopics = await db.topic.findMany({
		where: {
			type: 'topics'
		}
	});
	if (categorize) {
		// convert the array into
		// {
		//   'topic1': [{...}, {...}, {...}],
		//   'topic2': [{...}, {...}, {...}],
		//   'topic3': [{...}, {...}, {...}],
		//   ...
		// }
		// where topic1, topic2, topic3 are in the "category" field of the topic
		const categorizedTopics: categorizedTopics = allTopics.reduce(
			(acc: { [key: string]: any[] }, topic) => {
				if (!acc[topic.category]) {
					acc[topic.category] = [];
				}
				const { type, ...rest } = topic;
				acc[topic.category].push(rest);
				return acc;
			},
			{}
		);
		return categorizedTopics;
	}

	return allTopics;
};

export const addUserTopics = async (userId: string, topicIds: string[]) => {
	return await db.userTopic.createMany({
		data: topicIds.map((id) => ({
			userId,
			topicId: id
		}))
	});
};
