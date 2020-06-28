import * as express from 'express';
import {inject, injectable} from "inversify";
import {Symbols} from "../config/symbols";
import {MoviesSchema} from "../connection/schemas";
import {MovieControllers} from "./movie.controllers";
import * as bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
@injectable()
export class MovieRoutes {
    constructor(
        @inject(Symbols.MoviesSchema) private movies: MoviesSchema,
        @inject(Symbols.MovieControllers) private movieControllers: MovieControllers
    ){}
    public register(app: express.Application) {
        app.get('/movie/:id', this.movieControllers.getMovieById);
        // app.post('/movie', jsonParser, this.movieControllers.insertMovie);
        app.get('/search/:title', this.movieControllers.searchByTitle);
        app.get('/movie/genre/:genreId', this.movieControllers.getMovieByGenre);
    }
}
