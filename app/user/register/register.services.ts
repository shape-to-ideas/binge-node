import { inject, injectable } from 'inversify';
import { Symbols } from '../../config/symbols';
import { UsersSchema } from '../../connection';
import { LoggerServices } from '../../shared';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

@injectable()
export class RegisterServices {
	constructor(
		@inject(Symbols.UsersSchema) private usersSchema: UsersSchema,
		@inject(Symbols.LoggerServices) private loggerServices: LoggerServices,
	) {}
	public async registerUser(
		email: string,
		username: string,
		password: string,
		firstname: string,
		lastname: string,
	) {
		let userModel = this.usersSchema.getModel();
		const existingUser = await userModel
			.find({ $or: [{ email }, { username }] })
			.lean();
		if (!_.isEmpty(existingUser)) {
			throw new Error('Username or email already Exists');
		} else {
			const passwordHash = bcrypt.hashSync(
				password,
				parseInt(process.env.SALT_ROUNDS),
			);
			return userModel.insertMany({
				email,
				username,
				password: passwordHash,
				firstname,
				lastname,
			});
		}
	}
}
