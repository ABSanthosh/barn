import { render, fireEvent } from '@testing-library/svelte';
import FeedBuilder from './FeedBuilder.svelte';
import { describe, it, expect } from 'vitest';

const allTopics = {
	allTopics: {
		Space: [
			{
				desc: 'Space is the boundless three-dimensional extent in which objects and events have relative position and direction.',
				id: '1',
				title: 'Space Thing',
				xmlUrl: 'https://www.nasa.gov/rss/dyn/breaking_news.rss'
			},
			{
				desc: 'Space is the boundless three-dimensional extent in which objects and events have relative position and direction.',
				id: '2',
				title: 'Space Thing 2',
				xmlUrl: 'https://www.nasa.gov/rss/dyn/breaking_news.rss'
			}
		],
		Sports: [
			{
				desc: 'Sports are all usually forms of competitive physical activity or games which, through casual or organized participation, aim to use, maintain or improve physical ability and skills while providing enjoyment to participants, and in some cases, entertainment for spectators.',
				id: '3',
				title: 'Sports Thing',
				xmlUrl: 'https://www.nasa.gov/rss/dyn/breaking_news.rss'
			}
		],
		News: [
			{
				desc: 'News is information about current events. This may be provided through many different media: word of mouth, printing, postal systems, broadcasting, electronic communication, or through the testimony of observers and witnesses to events.',
				id: '4',
				title: 'News Thing',
				xmlUrl: 'https://www.nasa.gov/rss/dyn/breaking_news.rss'
			}
		]
	}
};

describe('FeedBuilder Component', () => {
	it('initializes correctly', () => {
		const { container } = render(FeedBuilder, {
			props: allTopics
		});
		expect(container).toBeInTheDocument();
	});

	it('renders with initial props', () => {
		const { container } = render(FeedBuilder, {
			props: allTopics
		});
		const sidebar = container.querySelector('.FeedBuilder__sidebar')!;
		const button = sidebar.querySelectorAll('button');
		expect(button.length).toBe(3);
	});

	it('updates state on input change', async () => {
		const { container, getByPlaceholderText } = render(FeedBuilder, {
			props: allTopics
		});
		const input = getByPlaceholderText('Search for topics');
		await fireEvent.input(input, { target: { value: 'sp' } });

		const sidebar = container.querySelector('.FeedBuilder__sidebar')!;
		const button = sidebar.querySelector('button');
		expect(button!.textContent?.trim()).toBe('Space');
	});
});
