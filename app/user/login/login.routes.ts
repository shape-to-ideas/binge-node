import * as bodyParser from 'body-parser';
import { inject, injectable } from 'inversify';
import * as express from 'express';
import { Symbols } from '../../config/symbols';
import { LoginControllers } from './login.controllers';
const jsonParser = bodyParser.json();

@injectable()
export class LoginRoutes {
    constructor(@inject(Symbols.LoginControllers)private loginControllers: LoginControllers) {}
    public register(app: express.Application) {
        app.post('/user/login', jsonParser, this.loginControllers.loginUser);
    }
}
