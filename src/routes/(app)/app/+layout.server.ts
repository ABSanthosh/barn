import { getAllTopics } from "$db/Topic.db";
import type { categorizedTopics } from "$types/Topic.type";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
	return {
		allTopics: (await getAllTopics(true)) as categorizedTopics
	};
};
