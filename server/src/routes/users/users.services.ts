import bcrypt from "bcrypt";
import db from "../../db/index";

function findUserByEmail(email: string) {
	return db.user.findUnique({
		where: {
			email,
		},
	});
}

function createUserByEmailAndPassword(user: any) {
	user.password = bcrypt.hashSync(user.password, 12);
	return db.user.create({
		data: user,
	});
}

function findUserById(id: string) {
	return db.user.findUnique({
		where: {
			id,
		},
	});
}

export { findUserByEmail, findUserById, createUserByEmailAndPassword };
