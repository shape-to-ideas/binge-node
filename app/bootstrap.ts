import * as express from 'express';
import {MovieRoutes} from './movie';
import {LoginRoutes} from './user/login';
import {RegisterRoutes} from './user/register';
import { injectable, inject } from 'inversify';
import {Symbols} from "./config/symbols";
import {Schemas} from "./connection/schemas";
import {GenreRoutes} from "./genre";
import {ActionsRoutes} from "./user/actions";
import {decode} from 'jsonwebtoken';

@injectable()
export class Bootstrap {
    constructor(
        @inject(Symbols.MovieRoutes) private movieRoutes: MovieRoutes,
        @inject(Symbols.Schemas) private schemas: Schemas,
        @inject(Symbols.LoginRoutes) private loginRoutes: LoginRoutes,
        @inject(Symbols.RegisterRoutes) private registerRoutes: RegisterRoutes,
        @inject(Symbols.GenreRoutes) private genreRoutes: GenreRoutes,
        @inject(Symbols.ActionsRoutes) private actionsRoutes: ActionsRoutes,
    ) {
    }
    public async init (app: express.Application) {
        app.route('*').all((req: any, res, next) => {
            if (req.headers.access_token) {
                const token = req.headers.access_token as string;
                req.user_data = decode(token);
            }
            next();
        });
        this.initRouting(app);
        this.schemas.init();
    }
    public initRouting(app: express.Application) {
        this.movieRoutes.register(app);
        this.loginRoutes.register(app);
        this.registerRoutes.register(app);
        this.genreRoutes.register(app);
        this.actionsRoutes.register(app);
    }
}
