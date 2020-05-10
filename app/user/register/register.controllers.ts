import { inject, injectable } from 'inversify';
import { Symbols } from '../../config/symbols';
import { LoggerServices } from '../../shared/services';
import { RegisterServices } from './register.services';
import * as express from 'express';

@injectable()
export class RegisterControllers {
    constructor(
        @inject(Symbols.RegisterServices) private registerServices: RegisterServices,
        @inject(Symbols.LoggerServices) private loggerServices: LoggerServices
    ){}
    registerUser = async (req: express.Request, res: express.Response) => {
        try {
            const email = req.body.email;
            const username = req.body.username;
            const password = req.body.password;
            const firstname = req.body.firstname;
            const lastname = req.body.lastname;
            const registerUser = await this.registerServices.registerUser(email, username, password, firstname, lastname);
            this.loggerServices.logResponseSent(res, req, registerUser);
        } catch (e) {
            this.loggerServices.logErrorResponse(res, e)
        }
    }
}
