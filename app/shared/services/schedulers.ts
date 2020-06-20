import {inject, injectable} from "inversify";
import {LoggerServices, TMDBServices} from './';
import {Symbols} from "../../config/symbols";
import {MovieServices} from "../../movie";
import {Config} from "../interfaces";
import {scheduleJob} from 'node-schedule';

@injectable()
export class Schedulers {
  constructor(
    @inject(Symbols.LoggerServices) private loggerService: LoggerServices,
    @inject(Symbols.TMDBServices) private tmdbServices: TMDBServices,
    @inject(Symbols.MovieServices) private movieServices: MovieServices,
    @inject(Symbols.Config) private appSettings: Config,
    ) {}
  
  public run() {
    scheduleJob({hour: 13, minute: 0}, () => {
      this.movieServices.insertMoviesByPopularity();
    })
    // this.loggerService.deleteLogFiles();
  }
}
