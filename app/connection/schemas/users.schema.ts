import { Schema, model } from 'mongoose';
import { injectable } from 'inversify';

@injectable()
export class UsersSchema {
	Schema = Schema;
	usersSchema: Schema;
	usersModel;
	public initUsersSchema() {
		this.usersSchema = new this.Schema({
			email: String,
			username: String,
			password: String,
			firstname: String,
			lastname: String,
			liked_movies: [],
		});
		this.usersModel = model('Users', this.usersSchema);
	}

	public getModel() {
		return this.usersModel;
	}
}
