import { inject, injectable } from 'inversify';
import { CountersSchema } from '../../connection';
import { Symbols } from '../../config/symbols';

@injectable()
export class CounterServices {
	constructor(
		@inject(Symbols.CountersSchema) private counterSchema: CountersSchema,
	) {}

	public getTopRatedPageCount(params) {
		let counterModel = this.counterSchema.getModel();
		return counterModel.find(params);
	}

	public insertTopRatedCounter(params) {
		let counterModel = this.counterSchema.getModel();
		return counterModel.create(params);
	}

	public updateTopRatedCounter(query, data) {
		let counterModel = this.counterSchema.getModel();
		return counterModel.updateOne(query, data);
	}
}
