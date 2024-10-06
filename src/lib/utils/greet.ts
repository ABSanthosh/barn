function getRandomElement(arr: string[]): string {
	const randomIndex = Math.floor(Math.random() * arr.length);
	return arr[randomIndex];
}

export default function getGreeting(userName: string): { greet: string; funny: string } {
	const morningGreetings = {
		greet: [
			`Good morning, ${userName}!`,
			`Rise and shine, ${userName}!`,
			`Morning, ${userName}!`,
			`Welcome to another day, ${userName}!`,
			`Ah, morning, ${userName}!`
		],
		funny: [
			'Time to catch up on the news before your coffee kicks in.',
			'Did you hear the headlines, or are you still in dreamland?',
			"Let's see what drama the news has in store for us today.",
			'Hope your news feed is less chaotic than your dreams.',
			'Ready to face the headlines and the caffeine?'
		]
	};

	const afternoonGreetings = {
		greet: [
			`Happy afternoon, ${userName}! `,
			`Good afternoon, ${userName}! `,
			`Hello, ${userName}! `,
			`Afternoon, ${userName}! `,
			`Good afternoon, ${userName}! .`
		],
		funny: [
			"Let's see how the world is making headlines today.",
			'Ready for another round of news and snacks?',
			"Did you hear what's trending? It's probably wild!",
			'Time to digest the latest stories, not just your lunch.',
			"Let's dive into today's chaos one article at a time"
		]
	};

	const eveningGreetings = {
		greet: [
			`Evening, ${userName}!`,
			`Welcome to the evening, ${userName}!`,
			`Good evening, ${userName}! `,
			`Evening, ${userName}! `,
			`Hello, ${userName}!`
		],
		funny: [
			"Let's unwind with some news and a side of relaxation.",
			'Ready to binge on news instead of shows?',
			'Time to see what the world has been up to today.',
			"Don't worry, the news will still be there while you unwind.",
			'Ready to catch up on the headlines you missed between coffee breaks?'
		]
	};

	const lateNightGreetings = {
		greet: [
			`Good night, ${userName}!`,
			`Hello, ${userName}!`,
			`Welcome to late night, ${userName}!`,
			`Good night, ${userName}!`,
			`Late night, ${userName}!`
		],
		funny: [
			'Did you catch the latest news, or are you blissfully unaware?',
			'Time to check the headlines before you dream about them.',
			"News is still happening, even while you're snoozing.",
			"Let's see if the news is more interesting than your dreams.",
			'The world keeps spinning, and so should you—at least through the headlines!'
		]
	};

	const currentHour = new Date().getHours();
	let greetings: { greet: string[]; funny: string[] };

	if (currentHour < 12) {
		greetings = morningGreetings;
	} else if (currentHour < 17) {
		greetings = afternoonGreetings;
	} else if (currentHour < 21) {
		greetings = eveningGreetings;
	} else {
		greetings = lateNightGreetings;
	}

	return {
		greet: getRandomElement(greetings.greet),
		funny: getRandomElement(greetings.funny)
	};
}
