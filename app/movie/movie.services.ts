import {inject, injectable} from "inversify";
import {Symbols} from "../config/symbols";
import {MoviesSchema} from "../connection/schemas";
import {Config, CounterServices} from '../shared';
import {TMDBServices, LoggerServices} from '../shared/services';
import {Movies} from './interfaces';
import {MovieFactory} from './movie.factory';
import {get, head, has, isEmpty, map, filter, find} from 'lodash';

@injectable()
export class MovieServices {
  private topRatedSchedulerLogPath = 'applicationLogs/topRatedScheduler.log';
  constructor(
    @inject(Symbols.MoviesSchema) private movieSchema: MoviesSchema,
    @inject(Symbols.Config) private config: Config,
    @inject(Symbols.MovieFactory) private movieFactory: MovieFactory,
    @inject(Symbols.TMDBServices) private tmdbServices: TMDBServices,
    @inject(Symbols.LoggerServices) private loggerServices: LoggerServices,
    @inject(Symbols.CounterServices) private counterServices: CounterServices,
  ) {
  }
  
  public async getMovieById(id: string) {
    let movieModel = this.movieSchema.getModel();
    const movieResponse = await movieModel.findOne({id: id});
    return this.movieFactory.buildMovies(movieResponse)
  }
  
  public async getMovies(ids: number[]) {
    let movieModel = this.movieSchema.getModel();
    const movieResponse = await movieModel.find({id: ids});
    return map(movieResponse, result => this.movieFactory.buildMovies(result));
  }
  
  public insertMovie(params) {
    let movieModel = this.movieSchema.getModel();
    return movieModel.create(params);
  }
  
  public async searchByTitle(keyword: string) {
    const response: any = await this.tmdbServices.search(keyword, 'en-US');
    if (has(response, 'data.results') && !isEmpty(response.data.results)) {
      this.saveMoviesToDB(response.data.results);
    }
    return map(response.data.results, result => this.movieFactory.buildMovies(result));
  }
  
  public async saveMoviesToDB(moviesData: Movies[]) {
    let movieModel = this.movieSchema.getModel();
    const movieIds = map(moviesData, (movie) => movie.id);
    const movieInDb = await movieModel.find({id: {$in: movieIds}}).lean();
    const moviesToInsert = filter(moviesData, (movie) => isEmpty(find(movieInDb, {id: movie.id})));
    movieModel.insertMany(moviesToInsert, (error, response) => {
      console.log('inserted', moviesToInsert);
      if (error) {
        this.loggerServices.logError(error)
      }
    });
  }
  
  public async insertMoviesByPopularity() {
    try {
      let pageNumber;
      const counter = await this.counterServices.getTopRatedPageCount({name: 'topRatedPageCount'});
      if (counter.length == 0) {
        await this.counterServices.insertTopRatedCounter({name: 'topRatedPageCount', count: 1})
        pageNumber = 1;
      } else {
        const currentCount = head(counter).count;
        const nextCounter = currentCount + 1;
        pageNumber = nextCounter;
        await this.counterServices.updateTopRatedCounter({name: 'topRatedPageCount'}, {count: nextCounter})
      }
    
      const apiResponse = await this.tmdbServices.getTopRatedMovies({page: pageNumber});
      const moviesList = get(apiResponse, 'data.results');
      await this.saveMoviesToDB(moviesList);
      this.loggerServices.logger(this.topRatedSchedulerLogPath).info(`successfully inserted page number ${pageNumber}`);
    } catch (e) {
      this.loggerServices.logError(e);
    }
  }
  
  public async getMovieByGenre(genreId: number, page: number, pageSize: number) {
    let movieModel = this.movieSchema.getModel();
    const skip = (page - 1) * pageSize;
    // const movies = await movieModel.find({genre_ids: genreId}).limit(pageSize).skip(skip);
    const movies = await movieModel.aggregate([
      { $match: { genre_ids: genreId } },
      {
        $addFields: {
          vote_by_rating:
          {
            $cond: {
              if: { $gt: ["$vote_average", 0] }, then: { $divide: ['$vote_count', '$vote_average'] },
              else: 10
            }
          }
        }
      },
      { $sort: { vote_by_rating: -1 } },
      { $skip: skip },
      { $limit: pageSize }
    ]);
    return map(movies, result => this.movieFactory.buildMovies(result));
  }
  
  public async getMoviesByTitle(movieTitles: string[]) {
    let movieModel = this.movieSchema.getModel();
    const movies = await movieModel.find({title: movieTitles});
    return map(movies, result => this.movieFactory.buildMovies(result));
  }
}
