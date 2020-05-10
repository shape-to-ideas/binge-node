import * as bodyParser from 'body-parser';
import { inject, injectable } from 'inversify';
import * as express from 'express';
import { Symbols } from '../../config/symbols';
import { RegisterControllers } from './register.controllers';
const jsonParser = bodyParser.json();

@injectable()
export class RegisterRoutes {
    constructor(@inject(Symbols.RegisterControllers)private registerControllers: RegisterControllers) {}
    public register(app: express.Application) {
        app.post('/user/register', jsonParser, this.registerControllers.registerUser);
    }
}
