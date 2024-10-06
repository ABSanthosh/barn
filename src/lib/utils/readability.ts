import { isProbablyReaderable, Readability } from '@mozilla/readability';

function canBeParsed(document: Document) {
	return isProbablyReaderable(document, {
		minContentLength: 100
	});
}

// remove extra whitespace and newlines from the article
function cleanText(text: string) {
	return text
		.replace(/\n{2,}/g, '\n')
		.replace(/\s+/g, ' ')
		.trim();
}

function readingTime(length: number) {
	// https://github.com/mozilla/gecko-dev/blob/906cf04e249dd79ee496f01f9ed79cc16b1ff78c/toolkit/components/reader/ReaderMode.sys.mjs#L482
	const en = { cpm: 987, variance: 118 };
	const charactersPerMinuteLow = en.cpm - en.variance;
	const charactersPerMinuteHigh = en.cpm + en.variance;
	const duration = Math.round(
		(Math.ceil(length / charactersPerMinuteLow) + Math.ceil(length / charactersPerMinuteHigh)) / 2
	);

	return duration > 1 ? `${duration} min read` : 'Less than 1 min';
}

export default function parse(document: Document) {
	if (!canBeParsed(document)) {
		return null;
	}
	const documentClone = document.cloneNode(true) as Document;
	const article = new Readability(documentClone).parse();
	return {
		title: article?.title!,
		content: article?.content!,
		length: article?.length!,
		excerpt: article?.excerpt!,
		byline: article?.byline!,
		dir: article?.dir!,
		siteName: article?.siteName!,
		lang: article?.lang!,
		estimatedReadingTime: readingTime(article?.length!),
		publishedTime: new Date(article?.publishedTime!).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}),
		textContent: cleanText(article?.textContent ?? '')!
	};
}
