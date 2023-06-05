import * as bodyParser from 'body-parser';
import { inject, injectable } from 'inversify';
import * as express from 'express';
import { Symbols } from '../../config/symbols';
import { LoginControllers } from './login.controllers';
const jsonParser = bodyParser.json();
import { ParamValidation, requestParams } from '../../shared';

@injectable()
export class LoginRoutes {
	constructor(
		@inject(Symbols.LoginControllers)
		private loginControllers: LoginControllers,
		@inject(Symbols.ParamValidation)
		private paramValidation: ParamValidation,
	) {}
	public register(app: express.Application) {
		app.post(
			'/user/login',
			jsonParser,
			this.paramValidation.validateParams(requestParams.login),
			this.loginControllers.loginUser,
		);
		// app.get('/user', jsonParser, this.loginControllers.getUser);
	}
}
