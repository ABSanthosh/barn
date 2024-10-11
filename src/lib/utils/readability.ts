import { JSDOM } from 'jsdom';

export function removeEmptyHtmlTags(html: string): string {
	// Create a new JSDOM instance
	const dom = new JSDOM(html);
	const document = dom.window.document;
	const tags = ['p'];

	// Use a loop to find all elements and remove empty ones
	tags.forEach((tag) => {
		const elements = document.querySelectorAll(tag); // Select elements with the specified tag
		elements.forEach((element) => {
			// Check if the element is empty
			if (!element.innerHTML.trim() && element.childElementCount === 0) {
				element.remove(); // Remove the empty element
			}
		});
	});

	// Return the cleaned-up HTML
	return document.body.innerHTML;
}
