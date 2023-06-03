import {inject, injectable} from "inversify";
import {LoggerServices, TMDBServices} from './';
import {Symbols} from "../../config/symbols";
import {MovieServices} from "../../movie";
import {scheduleJob} from 'node-schedule';

@injectable()
export class Schedulers {
  constructor(
    @inject(Symbols.LoggerServices) private loggerService: LoggerServices,
    @inject(Symbols.TMDBServices) private tmdbServices: TMDBServices,
    @inject(Symbols.MovieServices) private movieServices: MovieServices,
    ) {}
  
  public run() {
    if (process.env.TOP_RATED_MOVIES_SCHEDULER==='true') {
      scheduleJob('*/10 * * * *', () => {
        this.movieServices.insertMoviesByPopularity();
      })
    }
    
    // this.loggerService.deleteLogFiles();
  }
}
