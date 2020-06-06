import {inject, injectable} from "inversify";
import {GenresSchema} from "../connection/schemas";
// import * as mongoose from 'mongoose';
import {Config} from '../shared';
import {TMDBServices, LoggerServices} from '../shared/services';
// import * as _ from 'lodash';
import {Symbols} from "../config/symbols";

@injectable()
export class GenreServices {
  constructor(
    @inject(Symbols.GenresSchema) private genresSchema: GenresSchema,
    @inject(Symbols.Config) private config: Config,
    @inject(Symbols.TMDBServices) private tmdbServices: TMDBServices,
    @inject(Symbols.LoggerServices) private loggerServices: LoggerServices,
  ) {
  }
  
  public getAllGenres = (options) => {
    let genreModel = this.genresSchema.getModel();
    return genreModel.find(options);
  }
}
