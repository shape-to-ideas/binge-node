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
            res.send({})
            return;
            const {email, username, password, firstname, lastname} = req.body;
            const registerUser = await this.registerServices.registerUser(email, username, password, firstname, lastname);
            this.loggerServices.logResponseSent(res, req, registerUser);
        } catch (e) {
            this.loggerServices.logErrorResponse(res, e)
        }
    }
}
