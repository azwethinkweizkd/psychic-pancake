import { PrismaClient } from "@prisma/client";
import faker from "faker";

const prisma = new PrismaClient();

async function seed() {
	try {
		// Number of users you want to generate
		const numberOfUsers = 10;

		for (let i = 0; i < numberOfUsers; i++) {
			await prisma.user.create({
				data: {
					name: faker.name.findName(),
					email: faker.internet.email(),
					// Add any other fields you may have in your User model
				},
			});
		}

		console.log(`Seeded ${numberOfUsers} users successfully.`);
	} catch (error) {
		console.error("Error seeding users:", error);
	} finally {
		await prisma.$disconnect();
	}
}

seed();
