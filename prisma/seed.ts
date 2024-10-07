import { PrismaClient } from '@prisma/client';

// import countries from '/home/santhosh/Desktop/Projects/TypeScript/2024/9_Barn/Data/countries.json';
import recommended from '/home/santhosh/Desktop/Projects/TypeScript/2024/9_Barn/Data/recommended.json';

const prisma = new PrismaClient();

async function ImportCSV() {
	return Promise.all([
		prisma.topic.createMany({
			data: recommended
		})
	]);
}

ImportCSV()
	.catch((e) => {
		console.error(e);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
