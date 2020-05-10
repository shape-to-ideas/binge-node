import * as express from 'express';
import {MovieRoutes} from './admin/movie';
import {LoginRoutes} from './user/login';
import {RegisterRoutes} from './user/register';
import { injectable, inject } from 'inversify';
import {Symbols} from "./config/symbols";
import {Schemas} from "./connection/schemas";

@injectable()
export class Bootstrap {
    constructor(
        @inject(Symbols.MovieRoutes) private movieRoutes: MovieRoutes,
        @inject(Symbols.Schemas) private schemas: Schemas,
        @inject(Symbols.LoginRoutes) private loginRoutes: LoginRoutes,
        @inject(Symbols.RegisterRoutes) private registerRoutes: RegisterRoutes,
    ) {
    }
    public async init (app: express.Application) {
        this.initRouting(app);
        this.schemas.init();
    }
    public initRouting(app: express.Application) {
        this.movieRoutes.register(app);
        this.loginRoutes.register(app);
        this.registerRoutes.register(app);
    }
}
