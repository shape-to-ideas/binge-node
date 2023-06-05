import * as bodyParser from 'body-parser';
import { inject, injectable } from 'inversify';
import * as express from 'express';
import { Symbols } from '../../config/symbols';
import { ActionsControllers } from './actions.controllers';
const jsonParser = bodyParser.json();
import { ParamValidation, requestParams } from '../../shared';

@injectable()
export class ActionsRoutes {
	constructor(
		@inject(Symbols.ActionsControllers)
		private actionsControllers: ActionsControllers,
		@inject(Symbols.ParamValidation)
		private paramValidation: ParamValidation,
	) {}
	public register(app: express.Application) {
		app.post(
			'/user/action/like',
			jsonParser,
			this.actionsControllers.addMovieToLikeList,
		);
		app.post(
			'/user/action/unlike',
			jsonParser,
			this.actionsControllers.unlikeMovie,
		);
	}
}
