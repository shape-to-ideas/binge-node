import { inject, injectable } from 'inversify';
import { Symbols } from '../../config';
import { LoggerServices } from '../../shared';
import { RegisterServices } from './register.services';
import * as express from 'express';

@injectable()
export class RegisterControllers {
	constructor(
		@inject(Symbols.RegisterServices)
		private registerServices: RegisterServices,
		@inject(Symbols.LoggerServices) private loggerServices: LoggerServices,
	) {}
	registerUser = async (req: express.Request, res: express.Response) => {
		try {
			const { email, username, password, firstname, lastname } = req.body;
			const registerUser = await this.registerServices.registerUser(
				email,
				username,
				password,
				firstname,
				lastname,
			);
			this.loggerServices.logResponseSent(res, req, registerUser);
		} catch (e) {
			this.loggerServices.logErrorResponse(res, e);
		}
	};
}
