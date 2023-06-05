import { inject, injectable } from 'inversify';
import { Symbols } from '../config/symbols';
import * as express from 'express';
import { LoggerServices } from '../shared';
import { GenreServices } from './genre.services';

@injectable()
export class GenreControllers {
	constructor(
		@inject(Symbols.GenreServices) private genresServices: GenreServices,
		@inject(Symbols.LoggerServices) private loggerService: LoggerServices,
	) {}

	getFeaturedGenres = async (req: express.Request, res: express.Response) => {
		try {
			let genres = await this.genresServices.getAllGenres({
				featured: true,
			});
			this.loggerService.logResponseSent(res, req, genres);
		} catch (err) {
			this.loggerService.logErrorResponse(res, err);
		}
	};
}
