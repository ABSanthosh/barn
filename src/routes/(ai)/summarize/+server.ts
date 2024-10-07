import { GEMINI_API_KEY } from '$env/static/private';
import { nlp } from '$utils/nlp';
import type { RequestHandler } from './$types';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const POST: RequestHandler = async ({ request }) => {
	const { content } = await request.json();
	const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
	const model = genAI.getGenerativeModel({
		model: 'gemini-1.5-flash',
		generationConfig: {
			temperature: 1.0
		}
	});
	const prompt = `you are a professional journalist, and you have been asked to write a summary of a news article. Explain the main points of the article in a few sentences. Article: ${content}`;
	const result = await model.generateContent(prompt);

	return new Response(JSON.stringify(result.response.text()));
};
