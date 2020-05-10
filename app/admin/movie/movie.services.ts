import {inject, injectable} from "inversify";
import {Symbols} from "../../config/symbols";
import {MoviesSchema} from "../../connection/schemas";
import * as mongoose from 'mongoose';
import {Config} from '../../shared';
import { TMDBServices, LoggerServices } from '../../shared/services';
import { Movies } from './interfaces';
import { MovieFactory } from './movie.factory';
import * as _ from 'lodash';

@injectable()
export class MovieServices {
    constructor(
        @inject(Symbols.MoviesSchema) private movieSchema: MoviesSchema,
        @inject(Symbols.Config) private config: Config,
        @inject(Symbols.MovieFactory) private movieFactory: MovieFactory,
        @inject(Symbols.TMDBServices) private tmdbServices: TMDBServices,
        @inject(Symbols.LoggerServices) private loggerServices: LoggerServices,
    ) {
    }
    
    public getMovieById(id: string) {
        let movieModel = this.movieSchema.getModel();
        return movieModel.find({_id: new mongoose.Types.ObjectId(id)});
    }
    
    public insertMovie(params) {
        let movieModel = this.movieSchema.getModel();
        return movieModel.create(params);
    }
    
    public async searchByTitle(keyword: string) {
        const response: any = await this.tmdbServices.search(keyword, 'en-US');
        if (_.has(response, 'data.results') && !_.isEmpty(response.data.results)) {
            this.saveMoviesToDB(response.data.results);
        }
        return _.map(response.data.results, result => this.movieFactory.buildMovies(result));
    }
    
    public searchByTitleWithApi() {
        const options = {
            host : this.config.tmdbEndpoint,
            path : '',
            method : 'GET'
        }
    }
    
    private async saveMoviesToDB(searchResponse: Movies[]) {
        let movieModel = this.movieSchema.getModel();
        const movieIds = _.map(searchResponse, (movie) => movie.id);
        const movieInDb = await movieModel.find({id: {$in: movieIds}}).lean();
        const moviesToInsert = _.filter(searchResponse, (movie) => _.isEmpty(_.find(movieInDb, {id: movie.id})));
        movieModel.insertMany(moviesToInsert, (error, response) => {
            if (error) {
                this.loggerServices.logError(error)
            } else {
                console.log(response);
            }
        });
    }
}
