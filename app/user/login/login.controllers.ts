import { inject, injectable } from 'inversify';
import { Symbols } from '../../config/symbols';
import { LoggerServices } from '../../shared/services';
import { LoginServices } from './login.services';
import * as express from 'express';

@injectable()
export class LoginControllers {
    constructor(
        @inject(Symbols.LoginServices) private loginServices: LoginServices,
        @inject(Symbols.LoggerServices) private loggerServices: LoggerServices
    ){}
    loginUser = async (req: express.Request, res: express.Response) => {
        try {
            const userName = req.body.username;
            const password = req.body.password;
            const token = await this.loginServices.loginUser(userName, password);
            this.loggerServices.logResponseSent(res, req, {token});
        } catch (e) {
            this.loggerServices.logErrorResponse(res, e)
        }
    }
}
