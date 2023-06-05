import * as bodyParser from 'body-parser';
import { inject, injectable } from 'inversify';
import * as express from 'express';
import { Symbols } from '../../config/symbols';
import { RegisterControllers } from './register.controllers';
const jsonParser = bodyParser.json();
import { ParamValidation, requestParams } from '../../shared';

@injectable()
export class RegisterRoutes {
	constructor(
		@inject(Symbols.RegisterControllers)
		private registerControllers: RegisterControllers,
		@inject(Symbols.ParamValidation)
		private paramValidation: ParamValidation,
	) {}
	public register(app: express.Application) {
		app.post(
			'/user/register',
			jsonParser,
			this.paramValidation.validateParams(requestParams.register),
			this.registerControllers.registerUser,
		);
	}
}
