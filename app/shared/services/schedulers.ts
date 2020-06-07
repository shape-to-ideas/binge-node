import {inject, injectable} from "inversify";
import {LoggerServices, TMDBServices} from './';
import {Symbols} from "../../config/symbols";
import {MovieServices} from "../../movie";
import {get} from 'lodash';
import {Config} from "../interfaces";
const fs = require('fs');

@injectable()
export class Schedulers {
  constructor(
    @inject(Symbols.LoggerServices) private loggerService: LoggerServices,
    @inject(Symbols.TMDBServices) private tmdbServices: TMDBServices,
    @inject(Symbols.MovieServices) private movieServices: MovieServices,
    @inject(Symbols.Config) private appSettings: Config,
    ) {}
  
  public async run() {
    try {
      let pageNumber = this.appSettings.topRatedApiPage;
      console.log('-----', pageNumber);
      /*const apiResponse = await this.tmdbServices.getTopRatedMovies({page: pageNumber});
      const moviesList = get(apiResponse, 'data.results');
      console.log('running', moviesList);
      await this.movieServices.saveMoviesToDB(moviesList);*/
      ++pageNumber;
      // this.updatePageNumber('topRatedApiPage', pageNumber);
    } catch (e) {
      this.loggerService.logError(e);
    }
  }
  
  private updatePageNumber(indexName: string, value: number) {
    const file = fs.readFileSync(__dirname+ '/../../config.json');
    const fileJsonContent: Config = JSON.parse(file);
    fileJsonContent[indexName] = value;
    console.log(fileJsonContent);
    fs.writeFileSync(__dirname + '/../../config.json', JSON.stringify(fileJsonContent));
  }
  
  public logDeletion() {
    // @TODO error deletion scheduler
  }
}
