import * as mongoose from 'mongoose';
import { injectable } from 'inversify';

@injectable()
export class Connection {
	constructor() {
		console.log('Creating DatabaseService');
	}

	public connectToDb() {
		mongoose.connect(process.env.CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		return mongoose.connection;
	}
}
