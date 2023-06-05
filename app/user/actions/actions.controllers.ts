import { inject, injectable } from 'inversify';
import { Symbols } from '../../config/symbols';
import { LoggerServices } from '../../shared/services';
import { ActionsServices } from './actions.services';
import * as express from 'express';

@injectable()
export class ActionsControllers {
	constructor(
		@inject(Symbols.ActionsServices)
		private actionsServices: ActionsServices,
		@inject(Symbols.LoggerServices) private loggerServices: LoggerServices,
	) {}
	addMovieToLikeList = async (req: any, res: express.Response) => {
		try {
			const movieId = req.body.movie_id;
			const userData = req.user_data;
			const response = await this.actionsServices.addToLike(
				userData,
				movieId,
			);
			this.loggerServices.logResponseSent(res, req, { response });
		} catch (e) {
			this.loggerServices.logErrorResponse(res, e);
		}
	};

	unlikeMovie = async (req: any, res: express.Response) => {
		try {
			const movieId = req.body.movie_id;
			const userData = req.user_data;
			const response = await this.actionsServices.unlikeMovie(
				userData,
				movieId,
			);
			this.loggerServices.logResponseSent(res, req, { response });
		} catch (e) {
			this.loggerServices.logErrorResponse(res, e);
		}
	};
}
