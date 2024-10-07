import pkg from 'natural';

export const nlp = (text: string) => {
	const { PorterStemmer } = pkg;
	const stemmer = PorterStemmer;
	return stemmer.tokenizeAndStem(text).join(' ');
};
