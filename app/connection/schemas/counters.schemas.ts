import { Schema, model } from 'mongoose';
import { injectable } from 'inversify';

@injectable()
export class CountersSchema {
	Schema = Schema;
	countersSchema: Schema;
	countersModel;

	public initCountersSchema() {
		this.countersSchema = new this.Schema({
			name: String,
			count: Number,
		});
		this.countersModel = model('Counters', this.countersSchema);
	}

	public getModel() {
		return this.countersModel;
	}
}
