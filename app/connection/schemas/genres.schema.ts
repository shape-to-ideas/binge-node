import * as mongoose from 'mongoose';
import { injectable } from 'inversify';

@injectable()
export class GenresSchema {
	Schema = mongoose.Schema;
	genresSchema: mongoose.Schema;
	genresModel;

	public initGenresSchema() {
		this.genresSchema = new this.Schema({
			id: String,
			name: String,
		});
		this.genresModel = mongoose.model('Genres', this.genresSchema);
	}

	public getModel() {
		return this.genresModel;
	}
}
