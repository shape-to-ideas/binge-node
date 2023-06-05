import * as express from 'express';
import { inject, injectable } from 'inversify';
// import * as bodyParser from 'body-parser';
import { Symbols } from '../config/symbols';
import { GenreControllers } from './genre.controllers';
// const jsonParser = bodyParser.json();
@injectable()
export class GenreRoutes {
	constructor(
		@inject(Symbols.GenreControllers)
		private genreControllers: GenreControllers,
	) {}
	public register(app: express.Application) {
		app.get('/genres/featured', this.genreControllers.getFeaturedGenres);
	}
}
