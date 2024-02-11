import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	const alice = await prisma.user.upsert({
		where: { email: "alice@prisma.io" },
		update: { password: bcrypt.hashSync("soopersecret", 12) },
		create: {
			email: "alice@prisma.io",
			firstname: "Alice",
			lastname: "Whocares",
		},
	});
	const bob = await prisma.user.upsert({
		where: { email: "bob@prisma.io" },
		update: { password: bcrypt.hashSync("password1234", 12) },
		create: {
			email: "bob@prisma.io",
			firstname: "Bob",
			lastname: "Da Bildier",
		},
	});
	console.log({ alice, bob });
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
