import { Schema, model } from 'mongoose';
import { injectable } from 'inversify';

@injectable()
export class GenresSchema {
	Schema = Schema;
	genresSchema: Schema;
	genresModel;

	public initGenresSchema() {
		this.genresSchema = new this.Schema({
			id: String,
			name: String,
		});
		this.genresModel = model('Genres', this.genresSchema);
	}

	public getModel() {
		return this.genresModel;
	}
}
