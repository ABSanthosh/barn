export interface Route {
	name: string;
	route: string;
	icon: number;
	alt?: string[];
	children: Route[];
}

export const ROUTES: Route[] = [
	{
		name: 'Feed',
		route: '/app',
		icon: 59530,
		children: [] as Route[]
	}
];
